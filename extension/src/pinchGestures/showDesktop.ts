import Clutter from '@gi-types/clutter8';
import GObject from '@gi-types/gobject2';
import Meta from '@gi-types/meta8';
import Shell from '@gi-types/shell0';
import { global, imports, __shell_private_types } from 'gnome-shell';
import { TouchpadPinchGesture } from '../trackers/pinchTracker';
import { easeActor } from '../utils/environment';
import { findCentroid, findCornerForWindow, Point } from '../utils/pointsArithmetic';

const Main = imports.ui.main;
const Layout = imports.ui.layout;
const { lerp } = imports.misc.util;

// declare enum 
enum WorkspaceManagerState {
	DEFAULT = 0,
	SHOW_DESKTOP = 1,
}

// declare enum
enum ExtensionState {
	DEFAULT,
	ANIMATING,
}

declare type Type_TouchpadPinchGesture = typeof TouchpadPinchGesture.prototype;

declare type CornerPositions =
	| 'top-left' | 'top-mid' | 'top-right'
	| 'bottom-left' | 'bottom-mid' | 'bottom-right'
	;

declare type Corner = Point & {
	position: CornerPositions;
}

declare type WindowActorClone = {
	windowActor: Meta.WindowActor,
	clone: Clutter.Clone,
	translation?: {
		start: Point,
		end: Point,
	},
	apertureDistances?: [number, number, number, number],
	apertureCorner?: number,
};

class MonitorGroup {
	public monitor: __shell_private_types.IMonitorState;
	private _container: Clutter.Actor;
	private _windowActorClones: WindowActorClone[] = [];
	private _corners: Corner[];
	private _bottomMidCorner: Corner;

	constructor(monitor: __shell_private_types.IMonitorState) {
		this.monitor = monitor;

		this._container = new Clutter.Actor({ visible: false });
		const constraint = new Layout.MonitorConstraint({ index: monitor.index });
		this._container.add_constraint(constraint);

		this._bottomMidCorner = { x: this.monitor.width / 2, y: this.monitor.height, position: 'bottom-mid' };
		this._corners = [
			{ x: 0, y: 0, position: 'top-left' },
			// { x: this.monitor.width / 2, y: 0, position: 'top-mid' },
			{ x: this.monitor.width, y: 0, position: 'top-right' },
			{ x: this.monitor.width, y: this.monitor.height, position: 'bottom-right' },
			// { x: this.monitor.width / 2, y: this.monitor.height, position: 'bottom-mid' },
			{ x: 0, y: this.monitor.height, position: 'bottom-left' },
		];

		this._container.set_clip_to_allocation(true);
		Main.layoutManager.uiGroup.insert_child_above(this._container, global.window_group);
	}

	_addWindowActor(windowActor: Meta.WindowActor) {
		const clone = new Clutter.Clone({
			source: windowActor,
			x: windowActor.x - this.monitor.x,
			y: windowActor.y - this.monitor.y,
		});

		// windowActor.opacity = 0;
		windowActor.hide();

		this._windowActorClones.push({ clone, windowActor });
		this._container.insert_child_below(clone, null);
	}

	private _getCloneCentroid(windowActorsClones: WindowActorClone[]) {
		const point = findCentroid(
			windowActorsClones.map(actorClone => {
				return {
					x: actorClone.clone.x + actorClone.clone.width / 2,
					y: actorClone.clone.y + actorClone.clone.height / 2,
					weight: actorClone.clone.width * actorClone.clone.height,
					// weight: 1,
				};
			}),
		);
		if (point) {
			point.x = Math.round(point.x);
			point.y = Math.round(point.y);
		}
		return point;
	}

	private _getDestPoint(clone: Clutter.Clone, destCorner: Corner): Point {
		const destY = destCorner.y;
		const cloneRelXCenter = Math.round(clone.width / 2);
		switch (destCorner.position) {
			case 'top-left':
				return { x: destCorner.x - clone.width, y: destY - clone.height };
			case 'top-mid':
				return { x: destCorner.x - cloneRelXCenter, y: destY - clone.height };
			case 'top-right':
				return { x: destCorner.x, y: destY - clone.height };
			case 'bottom-right':
				return { x: destCorner.x, y: destY };
			case 'bottom-mid':
				return { x: destCorner.x - cloneRelXCenter, y: destY };
			case 'bottom-left':
				return { x: destCorner.x - clone.width, y: destY };
		}
	}

	private _calculateDist(p: Point, q: Point) {
		return Math.abs(p.x - q.x) + Math.abs(p.y - q.y);
	}

	private _assignCorner(actorClone: WindowActorClone, corner: Corner) {
		const { clone } = actorClone;
		const destPoint = this._getDestPoint(clone, corner);
		actorClone.translation = {
			start: { x: clone.x, y: clone.y },
			end: { x: destPoint.x, y: destPoint.y },
		};
	}

	private _fillCloneDestPosition(windowActorsClones: WindowActorClone[]) {
		interface IMetricData {
			value: number,
			actorClone: WindowActorClone,
			corner: Corner,
		}

		const distanceMetrics: IMetricData[] = [];
		this._corners.forEach(corner => {
			windowActorsClones.forEach(actorClone => {
				distanceMetrics.push({
					value: this._calculateDist(actorClone.clone, this._getDestPoint(actorClone.clone, corner)),
					actorClone,
					corner,
				});
			});
		});

		const minActorsPerCorner = Math.floor(windowActorsClones.length / this._corners.length);
		let extraActors = windowActorsClones.length - this._corners.length * minActorsPerCorner;
		const clusterSizes = new Map<CornerPositions, number>();
		const takenActorClones = new Set<WindowActorClone>();
		distanceMetrics.sort((a, b) => a.value - b.value);
		distanceMetrics.forEach(metric => {
			const size = clusterSizes.get(metric.corner.position) ?? 0;
			if (takenActorClones.has(metric.actorClone)) return;
			if (size >= minActorsPerCorner) {
				if (size > minActorsPerCorner || extraActors <= 0) return;
				extraActors -= 1;
			}

			takenActorClones.add(metric.actorClone);
			clusterSizes.set(metric.corner.position, size + 1);

			this._assignCorner(metric.actorClone, metric.corner);
		});
	}

	private _fillCloneDestPosition_kde(windowActorsClones: WindowActorClone[]) {
		// corner's closest actor
		type CornerCluster = {
			postition: CornerPositions,
			closestClone?: WindowActorClone,
			assignedClones?: WindowActorClone[],
		}
		const cornerClusters = new Map<CornerPositions, CornerCluster>();
		this._corners.forEach(c => cornerClusters.set(c.position, { postition: c.position }));

		const closestWindows: (undefined | WindowActorClone)[] = [undefined, undefined, undefined, undefined];
		const screenGeo = this.monitor;
		let movedWindowsCount = 0;
		for (let i = 0; i < windowActorsClones.length; ++i) {
			const actorClone = windowActorsClones[i];

			// calculate the corner distances
			const geo = actorClone.clone;
			const dl = geo.x + geo.width - screenGeo.x;
			const dr = screenGeo.x + screenGeo.width - geo.x;
			const dt = geo.y + geo.height - screenGeo.y;
			const db = screenGeo.y + screenGeo.height - geo.y;
			actorClone.apertureDistances = [dl + dt, dr + dt, dr + db, dl + db];
			movedWindowsCount += 1;

			// if this window is the closest one to any corner, set it as preferred there
			let nearest = 0;
			for (let j = 1; j < 4; ++j) {
				if (actorClone.apertureDistances[j] < actorClone.apertureDistances[nearest] ||
					(actorClone.apertureDistances[j] === actorClone.apertureDistances[nearest] && closestWindows[j] === undefined)) {
					nearest = j;
				}
			}
			if (closestWindows[nearest] === undefined ||
				closestWindows[nearest]!.apertureDistances![nearest] > actorClone.apertureDistances[nearest])
				closestWindows[nearest] = actorClone;
		}

		// second pass, select corners

		// 1st off, move the nearest windows to their nearest corners
		// this will ensure that if there's only on window in the lower right
		// it won't be moved out to the upper left
		const movedWindowsDec = [0, 0, 0, 0];
		for (let i = 0; i < 4; ++i) {
			if (closestWindows[i] === undefined)
				continue;
			closestWindows[i]!.apertureCorner = i;
			delete closestWindows[i]!.apertureDistances;
			movedWindowsDec[i] = 1;
		}

		// 2nd, distribute the remainders according to their preferences
		// this doesn't exactly have heapsort performance ;-)
		movedWindowsCount = Math.floor((movedWindowsCount + 3) / 4);
		for (let i = 0; i < 4; ++i) {
			for (let j = 0; j < movedWindowsCount - movedWindowsDec[i]; ++j) {
				let bestWindow = undefined;
				for (let k = 0; k < windowActorsClones.length; ++k) {
					if (windowActorsClones[k].apertureDistances === undefined)
						continue;
					if (bestWindow === undefined ||
						windowActorsClones[k].apertureDistances![i] < bestWindow.apertureDistances![i])
						bestWindow = windowActorsClones[k];
				}
				if (bestWindow === undefined)
					break;
				bestWindow.apertureCorner = i;
				delete bestWindow.apertureDistances;
			}
		}

		// fill translation properties
		for (let i = 0; i < windowActorsClones.length; ++i) {
			const actorClone = windowActorsClones[i];
			const cornerIndex = actorClone.apertureCorner ?? 1;
			const destCorner = this._corners[cornerIndex];

			this._assignCorner(actorClone, destCorner);
		}
	}

	private _fillCloneDestPosition_centroid(windowActorsClones: WindowActorClone[]) {
		const centroid = this._getCloneCentroid(windowActorsClones);

		windowActorsClones.map(actorClone => {
			const { clone } = actorClone;
			const cloneCenter: Point = {
				x: clone.x + Math.round(clone.width / 2),
				y: clone.y + Math.round(clone.height / 2),
			};

			let destCorner = centroid ? findCornerForWindow(cloneCenter, centroid, this._corners) : undefined;
			destCorner = destCorner ?? this._bottomMidCorner;

			this._assignCorner(actorClone, destCorner);
		});
	}

	gestureBegin(windowActors: Meta.WindowActor[]) {
		windowActors.forEach(this._addWindowActor.bind(this));
		this._fillCloneDestPosition(this._windowActorClones);
		this._container.show();
	}

	gestureUpdate(progress: number) {

		this._windowActorClones.forEach(actorClone => {
			const { clone, translation } = actorClone;
			if (translation === undefined)
				return;
			clone.x = lerp(translation.start.x, translation.end.x, progress);
			clone.y = lerp(translation.start.y, translation.end.y, progress);
			clone.opacity = lerp(255, 128, progress);
		});
	}

	gestureEnd(progress: WorkspaceManagerState, duration: number) {
		this._windowActorClones.forEach(actorClone => {
			const { clone, translation, windowActor } = actorClone;
			if (translation === undefined) {
				clone.destroy();
				return;
			}

			easeActor(clone, {
				x: lerp(translation.start.x, translation.end.x, progress),
				y: lerp(translation.start.y, translation.end.y, progress),
				opacity: lerp(255, 128, progress),
				mode: Clutter.AnimationMode.EASE_OUT_QUAD,
				duration,
				onStopped: () => {
					this._container.hide();

					const window = windowActor.meta_window as Meta.Window | null;
					if (window?.can_minimize()) {
						Main.wm.skipNextEffect(windowActor);
						if (progress === WorkspaceManagerState.DEFAULT) {
							window.unminimize();
							windowActor.show();
						}
						else {
							window.minimize();
							windowActor.hide();
						}
					} else {
						windowActor.show();
					}

					clone.destroy();
				},
			});
		});

		if (this._windowActorClones.length === 0)
			this._container.hide();

		this._windowActorClones = [];
	}

	destroy() {
		this._container.destroy();
	}
}

export class ShowDesktopExtension implements ISubExtension {
	private _windows = new Set<Meta.Window>();

	private _workspace?: Meta.Workspace;
	private _workspaceChangedId = 0;
	private _windowAddedId = 0;
	private _windowRemovedId = 0;
	private _windowUnMinimizedId = 0;
	private _monitorChangedId = 0;
	private _extensionState = ExtensionState.DEFAULT;

	private _minimizingWindows: Meta.Window[] = [];
	private _workspaceManagerState = WorkspaceManagerState.DEFAULT;
	private _monitorGroups: MonitorGroup[] = [];
	private _pinchTracker: Type_TouchpadPinchGesture;

	constructor(nfingers: number[]) {
		this._pinchTracker = new TouchpadPinchGesture({
			nfingers: nfingers,
			allowedModes: Shell.ActionMode.NORMAL,
		});
	}

	apply(): void {
		this._pinchTracker.connect('begin', this.gestureBegin.bind(this));
		this._pinchTracker.connect('update', this.gestureUpdate.bind(this));
		this._pinchTracker.connect('end', this.gestureEnd.bind(this));

		for (const monitor of Main.layoutManager.monitors)
			this._monitorGroups.push(new MonitorGroup(monitor));

		this._workspaceChangedId = global.workspace_manager.connect('active-workspace-changed', this._workspaceChanged.bind(this));
		this._workspaceChanged();
		this._windowUnMinimizedId = global.window_manager.connect('unminimize', this._windowUnMinimized.bind(this));

		this._monitorChangedId = Main.layoutManager.connect('monitors-changed', () => {
			this._monitorGroups.forEach(m => m.destroy());
			this._monitorGroups = [];
			for (const monitor of Main.layoutManager.monitors)
				this._monitorGroups.push(new MonitorGroup(monitor));
		});
	}

	destroy(): void {
		this._pinchTracker?.destroy();

		if (this._monitorChangedId)
			Main.layoutManager.disconnect(this._monitorChangedId);

		if (this._windowAddedId)
			this._workspace?.disconnect(this._windowAddedId);

		if (this._windowRemovedId)
			this._workspace?.disconnect(this._windowRemovedId);

		if (this._workspaceChangedId)
			global.workspace_manager.disconnect(this._workspaceChangedId);

		if (this._windowUnMinimizedId)
			global.window_manager.disconnect(this._windowUnMinimizedId);

		this._resetState();

		for (const monitor of this._monitorGroups)
			monitor.destroy();
		this._monitorGroups = [];
	}

	private _getMinimizableWindows() {
		if (this._workspaceManagerState === WorkspaceManagerState.DEFAULT) {
			this._minimizingWindows = global
				.get_window_actors()
				.filter(a => a.visible)
				// top actors should be at the beginning
				.reverse()
				.map(actor => actor.meta_window)
				.filter(win =>
					win.get_window_type() !== Meta.WindowType.DESKTOP &&
					this._windows.has(win) &&
					(win.is_always_on_all_workspaces() || win.get_workspace().index === this._workspace?.index) &&
					!win.minimized);
		}

		return this._minimizingWindows;
	}

	gestureBegin(tracker: Type_TouchpadPinchGesture) {
		this._extensionState = ExtensionState.ANIMATING;

		Meta.disable_unredirect_for_display(global.display);

		this._minimizingWindows = this._getMinimizableWindows();
		// this._setDesktopWindowsBelow();

		for (const monitor of this._monitorGroups) {
			const windowActors = this._minimizingWindows
				.map(win => win.get_compositor_private())
				.filter((actor: GObject.Object): actor is Meta.WindowActor => {
					return actor instanceof Meta.WindowActor && actor.meta_window.get_monitor() === monitor.monitor.index;
				});
			monitor.gestureBegin(windowActors);
		}

		tracker.confirmPinch(
			1,
			[WorkspaceManagerState.DEFAULT, WorkspaceManagerState.SHOW_DESKTOP],
			this._workspaceManagerState,
		);

	}

	gestureUpdate(_tracker: unknown, progress: number) {
		// progress 0 -> NORMAL state, 1 -> SHOW Desktop
		// printStack();
		for (const monitor of this._monitorGroups)
			monitor.gestureUpdate(progress);
	}

	gestureEnd(_tracker: unknown, duration: number, endProgress: number) {
		// endProgress 0 -> NORMAL state, 1 -> SHOW Desktop
		for (const monitor of this._monitorGroups)
			monitor.gestureEnd(endProgress, duration);

		if (endProgress === WorkspaceManagerState.DEFAULT)
			this._minimizingWindows = [];

		this._extensionState = ExtensionState.DEFAULT;
		this._workspaceManagerState = endProgress;

		Meta.enable_unredirect_for_display(global.display);
	}

	private _resetState(animate = false) {
		// reset state, aka. undo show desktop
		this._minimizingWindows.forEach(win => {
			if (!this._windows.has(win))
				return;
			const onStopped = () => {
				Main.wm.skipNextEffect(win.get_compositor_private());
				win.unminimize();
			};
			const actor = win.get_compositor_private() as Meta.WindowActor;
			if (animate && actor) {
				actor.show();
				actor.opacity = 0;
				easeActor(actor, {
					opacity: 255,
					duration: 500,
					mode: Clutter.AnimationMode.EASE_OUT_QUAD,
					onStopped,
				});
			}
			else
				onStopped();
		});

		this._minimizingWindows = [];
		this._workspaceManagerState = WorkspaceManagerState.DEFAULT;
	}

	private _workspaceChanged() {
		if (this._windowAddedId)
			this._workspace?.disconnect(this._windowAddedId);

		if (this._windowRemovedId)
			this._workspace?.disconnect(this._windowRemovedId);

		this._resetState(false);
		this._windows.clear();
		this._workspace = global.workspace_manager.get_active_workspace();

		this._windowAddedId = this._workspace.connect('window-added', this._windowAdded.bind(this));
		this._windowRemovedId = this._workspace.connect('window-removed', this._windowRemoved.bind(this));
		this._workspace.list_windows().forEach(win => this._windowAdded(this._workspace, win));
	}

	private _windowAdded(_workspace: unknown, window: Meta.Window) {
		if (this._windows.has(window))
			return;

		if (!window.skip_taskbar && this._extensionState === ExtensionState.DEFAULT)
			this._resetState(true);
		this._windows.add(window);
	}

	private _windowRemoved(_workspace: unknown, window: Meta.Window) {
		if (!this._windows.has(window))
			return;
		this._windows.delete(window);
	}

	private _windowUnMinimized(_wm: Shell.WM, actor: Meta.WindowActor) {
		if (actor.meta_window.get_workspace().index !== this._workspace?.index)
			return;

		this._minimizingWindows = [];
		this._workspaceManagerState = WorkspaceManagerState.DEFAULT;
	}
}