import Clutter from '@gi-types/clutter8';
import Meta from '@gi-types/meta8';
import Shell from '@gi-types/shell0';
import { global, imports } from 'gnome-shell';

const Main = imports.ui.main;
const { lerp } = imports.misc.util;

import { printStack } from '../../common/utils/logging';
import { easeActor } from '../utils/environment';

// declare enum 
enum WorkspaceManagerState {
	SHOW_DESKTOP = -1,
	DEFAULT = 0,
}

// declare enum
enum ExtensionState {
	DEFAULT,
	ANIMATING,
}

declare type SwipeTrackerT = typeof imports.ui.swipeTracker.SwipeTracker.prototype;

export class ShowDesktopExtension implements ISubExtension {
	private _windows = new Map<Meta.Window, Partial<{
		start: Meta.Rectangle,
		end: Meta.Rectangle,
		actor: Meta.WindowActor,
	}>>();

	private _workspace?: Meta.Workspace;
	private _workspaceChangedId = 0;
	private _windowAddedId = 0;
	private _windowRemovedId = 0;
	private _windowUnMinimizedId = 0;
	private _extensionState = ExtensionState.DEFAULT;

	private _circularValue = 0;
	private _finalLocations: { [unit: string]: number[] } = {};

	private _minimizingWindows: Meta.Window[] = [];
	private _workspaceManagerState = WorkspaceManagerState.DEFAULT;

	apply(): void {
		this._workspaceChangedId = global.workspace_manager.connect('active-workspace-changed', this._workspaceChanged.bind(this));
		this._workspaceChanged();

		this._windowUnMinimizedId = global.window_manager.connect('unminimize', this._windowUnMinimized.bind(this));
	}

	destroy(): void {
		if (this._windowAddedId)
			this._workspace?.disconnect(this._windowAddedId);

		if (this._windowRemovedId)
			this._workspace?.disconnect(this._windowRemovedId);

		if (this._workspaceChangedId)
			global.workspace_manager.disconnect(this._workspaceChangedId);

		if (this._windowUnMinimizedId)
			global.window_manager.disconnect(this._windowUnMinimizedId);
	}

	private _isDesktopIconExtensionWindow(window: Meta.Window) {
		return window.skip_taskbar &&
			window.gtk_application_id === 'com.rastersoft.ding' &&
			window.gtk_application_object_path === '/com/rastersoft/ding';
	}

	private _easeOpacityDesktopWindows(_opacity: number, _duration: number) {
		// if (this._minimizingWindows.length === 0)
		// 	return;

		const windowActors = (global.window_group
			.get_children()
			.filter(w => w instanceof Meta.WindowActor) as Meta.WindowActor[])
			.filter(w => w.meta_window.is_always_on_all_workspaces() || w.meta_window.get_workspace().index === this._workspace?.index);

		const topActor = this._minimizingWindows
			.map(w => w.get_compositor_private() as Meta.WindowActor)
			.filter(actor => windowActors.includes(actor))
			// top actors will be at the end
			.sort((a, b) => windowActors.indexOf(a) - windowActors.indexOf(b))[0] as Meta.WindowActor | undefined;

		if (topActor) {
			Array.from(this._windows.keys())
				.map(w => w.get_compositor_private() as Meta.WindowActor)
				.filter(actor => windowActors.includes(actor) && this._isDesktopIconExtensionWindow(actor.meta_window))
				// top actors will be at the end
				.sort((a, b) => windowActors.indexOf(a) - windowActors.indexOf(b))
				.forEach(actor => global.window_group.set_child_below_sibling(actor, topActor));
		}
	}

	private _getMinimizableWindows() {
		const types = [Meta.WindowType.MODAL_DIALOG, Meta.WindowType.NORMAL, Meta.WindowType.DIALOG];

		if (this._workspaceManagerState === WorkspaceManagerState.DEFAULT) {
			this._minimizingWindows = Array.from(this._windows.keys())
				.filter(win =>
					!win.minimized &&
					types.includes(win.get_window_type()) &&
					!this._isDesktopIconExtensionWindow(win));
		}

		this._minimizingWindows.forEach(win => {
			const value = this._windows.get(win);
			if (value === undefined)
				return;
			value.actor = win.get_compositor_private() as Meta.WindowActor;
			value.actor.show();
			value.start = win.get_buffer_rect();
			value.end = this._getMinimizedRect(win);
			value.actor.set_pivot_point(0, 0);
		});

		return this._minimizingWindows;
	}

	gestureBegin(tracker: SwipeTrackerT) {
		printStack();
		log(JSON.stringify({ _workspaceManagerState: this._workspaceManagerState }));
		this._extensionState = ExtensionState.ANIMATING;
		this._minimizingWindows = this._getMinimizableWindows();
		this._easeOpacityDesktopWindows(0, this._workspaceManagerState === WorkspaceManagerState.DEFAULT ? 0 : 100);

		// add minimization location (final location not minimization)
		// TL, TR, BL, BR
		this._minimizingWindows.forEach((win) => {
			let finalLoc: number[] = [];
			const value = this._windows.get(win);
			if (value === undefined)
				return;
			if (value.actor === undefined || value.end === undefined || value.start === undefined)
				return;
			
			switch (this._circularValue) {
				case 0: // top-left
					finalLoc = [-value.actor.width, -value.actor.height];
					break;
				case 1: // top-right
					finalLoc = [global.screen_width, -value.actor.height];
					break;
				case 2: // bottom-right
					finalLoc = [global.screen_width, global.screen_height];
					break;
				case 3: // bottom-left
					finalLoc = [-value.actor.width, global.screen_height];
					break;
			}
			this._finalLocations[win.get_id()] = finalLoc;
			this._circularValue = (this._circularValue + 1) % 4;
		});

		log(JSON.stringify(
			{
				_workspaceManagerState: this._workspaceManagerState,
				windows: this._minimizingWindows.map(win => win.title),
			},
			undefined,
			2,
		));

		tracker.confirmSwipe(
			global.screen_height,
			[WorkspaceManagerState.SHOW_DESKTOP, WorkspaceManagerState.DEFAULT],
			this._workspaceManagerState,
			this._workspaceManagerState,
		);
	}

	gestureUpdate(_tracker: unknown, progress: number) {
		// progress 0 -> NORMAL state, - 1 -> SHOW Desktop
		// printStack();
		this._minimizingWindows.forEach((win) => {
			const value = this._windows.get(win);
			if (value === undefined)
				return;
			// winActor.x = lerp(value.start.x, value.end.x, -progress);
			// winActor.y = lerp(value.start.y, value.end.y, -progress);

			if (value.actor === undefined || value.end === undefined || value.start === undefined)
				return;

			const { actor, start } = value;
			const [ fx, fy ] = [...this._finalLocations[win.get_id()]];

			actor.translation_x = lerp(
				0,
				fx - start.x < 0 ? fx - start.x - global.screen_width*0.3 : fx - start.x + global.screen_width*0.3,
				progress,
			);
			actor.translation_y = lerp(
				0,
				fy - start.y < 0 ? fy - start.y - global.screen_height*0.3 : fy - start.y + global.screen_width*0.3,
				progress,
			);
		});
	}

	gestureEnd(_tracker: unknown, duration: number, endProgress: number) {
		// endProgress 0 -> NORMAL state, 1 -> SHOW Desktop
		// throw new Error('Method not implemented.');
		printStack();
		let has_actor = false;
		this._minimizingWindows.forEach(win => {
			const value = this._windows.get(win);
			if (value === undefined)
				return;
			if (value.actor === undefined || value.end === undefined || value.start === undefined)
				return;

			has_actor = true;

			const { start } = value;
			const [ fx, fy ] = [...this._finalLocations[win.get_id()]];

			easeActor(value.actor, {
				translation_x: lerp(
					0,
					fx - start.x < 0
						? fx - start.x - global.screen_width*0.3
						: fx - start.x + global.screen_width*0.3,
					endProgress,
				),
				translation_y: lerp(
					0,
					fy - start.y < 0
						? fy - start.y - global.screen_height*0.3
						: fy - start.y + global.screen_width*0.3,
					endProgress,
				),
				duration,
				mode: Clutter.AnimationMode.EASE_OUT_QUAD,
				onStopped: () => {
					if (value.actor === undefined)
						return;
					if (win.can_minimize()) {
						Main.wm.skipNextEffect(value.actor);
						if (endProgress === WorkspaceManagerState.DEFAULT)
							value.actor.meta_window.unminimize();
						else {
							value.actor.meta_window.minimize();
							value.actor.hide();
						}
					}

					this._easeOpacityDesktopWindows(255, duration);

					value.actor.scale_x = 1;
					value.actor.scale_y = 1;
					value.actor.translation_x = 0;
					value.actor.translation_y = 0;
				},
			});
		});

		if (!has_actor)
			this._easeOpacityDesktopWindows(255, duration);

		if (endProgress === WorkspaceManagerState.DEFAULT)
			this._minimizingWindows = [];

		this._extensionState = ExtensionState.DEFAULT;
		this._workspaceManagerState = endProgress;

		this._finalLocations = {};
	}

	private _resetState(animate = false) {
		// reset state, aka. undo show desktop
		this._minimizingWindows.forEach(win => {
			log(`resetting state: ${win.title}`);
			if (!this._windows.has(win))
				return;
			const onStopped = (isFinished?: boolean) => {
				log('animate complete: ' + isFinished);
				Main.wm.skipNextEffect(win.get_compositor_private());
				win.unminimize();
			};
			const actor = win.get_compositor_private() as Meta.WindowActor;
			if (animate && actor) {
				log('animatine + ' + win.title);
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
				onStopped(false);
			// log(`state reset: ${win.title}`);
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
		log(`window adding: ${window.title}, size: ${this._windows.size}, skipbar: ${window.skip_taskbar}, id: ${window.gtk_application_id}, path: ${window.gtk_application_object_path}`);
		if (this._windows.has(window))
			return;

		if (!window.skip_taskbar && this._extensionState === ExtensionState.DEFAULT)
			this._resetState(true);
		this._windows.set(window, {});
		// log(`window added: ${window.title}, size: ${this._windows.size} `);
	}

	private _windowRemoved(_workspace: unknown, window: Meta.Window) {
		log(`window removing: ${window.title}, size: ${this._windows.size} `);
		if (!this._windows.has(window))
			return;
		this._windows.delete(window);
		// log(`window removed: ${window.title}, size: ${this._windows.size} `);
	}

	private _windowUnMinimized(_wm: Shell.WM, actor: Meta.WindowActor) {
		if (actor.meta_window.get_workspace().index !== this._workspace?.index)
			return;

		this._minimizingWindows = [];
		this._workspaceManagerState = WorkspaceManagerState.DEFAULT;
	}

	private _getMinimizedRect(win: Meta.Window): Meta.Rectangle {
		const [has_icon, rect] = win.get_icon_geometry();
		if (has_icon)
			return rect;
		const parent = win.get_transient_for() as Meta.Window | null;
		if (parent)
			return this._getMinimizedRect(parent);
		const box = Main.layoutManager.getWorkAreaForMonitor(win.get_monitor());
		return new Meta.Rectangle({
			x: box.x,
			y: box.y,
			width: 0,
			height: 0,
		});
	}
}