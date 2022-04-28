import Clutter from '@gi-types/clutter';
import GObject from '@gi-types/gobject2';
import Meta from '@gi-types/meta';
import Shell from '@gi-types/shell';
import { global, imports, __shell_private_types } from 'gnome-shell';
import { TouchpadPinchGesture } from '../trackers/pinchTracker';
import { easeActor } from '../utils/environment';

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

declare type Point = {
	x: number,
	y: number,
}

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
		if (windowActorsClones.length === 0) return;
		if (windowActorsClones.length === 1) {
			this._assignCorner(windowActorsClones[0], this._bottomMidCorner);
			return;
		}

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