import Shell from '@gi-types/shell';
import Meta from '@gi-types/meta';
import St from '@gi-types/st';
import GObject from '@gi-types/gobject';
import GLib from '@gi-types/glib';
import Clutter from '@gi-types/clutter';

import { imports, global } from 'gnome-shell';

const Main = imports.ui.main;
const Utils = imports.misc.util;

import { createSwipeTracker, TouchpadSwipeGesture } from './swipeTracker';
import { ExtSettings } from '../constants';

const { SwipeTracker } = imports.ui.swipeTracker;

declare interface EaseParamsType {
	duration: number,
	mode: Clutter.AnimationMode,
	repeatCount?: number,
	autoReverse?: boolean,
	onStopped?: (isFinished?: boolean) => void,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function easeActor(actor: any, value: any, params: EaseParamsType) {
	if (value !== undefined)
		actor.ease(value, params);
	else
		actor.ease(params);
}

enum GestureMaxUnMaxState {
	UNMAXIMIZE = 0,
	MAXIMIZE = 1,
}

enum GestureTileState {
	RIGHT_TILE = -1,
	NORMAL = 0,
	LEFT_TILE = 1,
}

const TilePreview = GObject.registerClass(
	class TilePreview extends St.Widget {
		private _adjustment: St.Adjustment;

		private _window?: Meta.Window;
		private _direction = Clutter.Orientation.VERTICAL;
		private _normalBox?: Meta.Rectangle;
		private _maximizeBox?: Meta.Rectangle;
		private _leftSnapBox?: Meta.Rectangle;
		private _rightSnapBox?: Meta.Rectangle;
		private _virtualDevice: Clutter.VirtualInputDevice;

		constructor() {
			super({
				reactive: false,
				style_class: 'tile-preview',
				style: 'border-radius: 8px',
				visible: false,
			});
			this.connect('destroy', this._onDestroy.bind(this));

			this._adjustment = new St.Adjustment({
				actor: this,
				value: 0,
				lower: -1,
				upper: 1,
			});

			this._adjustment.connect('notify::value', this._valueChanged.bind(this));
			const seat = Clutter.get_default_backend().get_default_seat();
			this._virtualDevice = seat.create_virtual_device(Clutter.InputDeviceType.KEYBOARD_DEVICE);
		}

		open(window: Meta.Window, currentProgress: GestureMaxUnMaxState): boolean {
			if (this.visible) {
				return false;
			}

			const currentMonitor = window.get_monitor();
			const monitorGeometry = global.display.get_monitor_geometry(currentMonitor);

			const frame_rect = window.get_frame_rect();

			let [width, height] = [0, 0];
			if (currentProgress === GestureMaxUnMaxState.MAXIMIZE) {
				[width, height] = [frame_rect.width * 0.05, frame_rect.height * 0.05];
			}

			this._window = window;
			this._normalBox = new Meta.Rectangle({
				x: frame_rect.x + width,
				y: frame_rect.y + height,
				width: frame_rect.width - width * 2,
				height: frame_rect.height - height * 2,
			});

			this._maximizeBox = new Meta.Rectangle({
				x: monitorGeometry.x,
				y: monitorGeometry.y + (window.is_on_primary_monitor() ? Main.panel.height : 0),
				width: monitorGeometry.width,
				height: monitorGeometry.height - (window.is_on_primary_monitor() ? Main.panel.height : 0),
			});

			this._leftSnapBox = new Meta.Rectangle({
				x: monitorGeometry.x,
				y: monitorGeometry.y + (this._window.is_on_primary_monitor() ? Main.panel.height : 0),
				width: monitorGeometry.width / 2,
				height: monitorGeometry.height - (this._window.is_on_primary_monitor() ? Main.panel.height : 0),
			});

			this._rightSnapBox = new Meta.Rectangle({
				x: monitorGeometry.x + monitorGeometry.width / 2,
				y: monitorGeometry.y + (this._window.is_on_primary_monitor() ? Main.panel.height : 0),
				width: monitorGeometry.width / 2,
				height: monitorGeometry.height - (this._window.is_on_primary_monitor() ? Main.panel.height : 0),
			});

			this._direction = Clutter.Orientation.VERTICAL;
			this._adjustment.value = currentProgress;
			this._valueChanged();
			this.opacity = 0;
			this.easeOpacity(255);
			this.visible = true;
			return true;
		}

		finish(duration: number, state: GestureMaxUnMaxState | GestureTileState): void {

			const callback = () => {
				if (!this.visible)
					return;

				this.easeOpacity(0, () => this.visible = false);
				if (this._window) {
					// maximize-unmaximize
					if (this._direction === Clutter.Orientation.VERTICAL) {
						if (state === GestureMaxUnMaxState.MAXIMIZE) {
							this._window.maximize(Meta.MaximizeFlags.BOTH);
						} else {
							this._window.unmaximize(Meta.MaximizeFlags.BOTH);
						}
					}
					// snap-left,normal,snap-right
					else {
						if (state !== GestureTileState.NORMAL) {
							const currentTime = Clutter.get_current_event_time();
							const keys = [Clutter.KEY_Super_L, (state === GestureTileState.LEFT_TILE ? Clutter.KEY_Left : Clutter.KEY_Right)];
							this._window.raise();
							keys.forEach(key => this._virtualDevice.notify_keyval(currentTime, key, Clutter.KeyState.PRESSED));
							keys.reverse().forEach(key => this._virtualDevice.notify_keyval(currentTime, key, Clutter.KeyState.RELEASED));
						}
					}
				}

				this._window = undefined;
				this._normalBox = undefined;
				this._maximizeBox = undefined;
				this._leftSnapBox = undefined;
				this._rightSnapBox = undefined;
				this._direction = Clutter.Orientation.VERTICAL;
			};

			easeActor(this._adjustment, state, {
				duration: duration,
				mode: Clutter.AnimationMode.EASE_OUT_CIRC,
				onStopped: callback,
			});
		}

		_valueChanged(): void {
			let progress = this._adjustment.value;
			// log(`progress: ${progress}`);
			let startBox, endBox;

			if (this._direction === Clutter.Orientation.VERTICAL) {
				startBox = this._normalBox;
				endBox = this._maximizeBox;
			}
			else {
				startBox = this._normalBox;
				if (progress >= GestureTileState.NORMAL) {
					endBox = this._leftSnapBox;
				} else {
					endBox = this._rightSnapBox;
					progress = -progress;
				}
			}

			if (!startBox || !endBox) {
				return;
			}

			const [x, y] = [
				Utils.lerp(startBox.x, endBox.x, progress),
				Utils.lerp(startBox.y, endBox.y, progress),
			];

			const [width, height] = [
				Utils.lerp(startBox.width, endBox.width, progress),
				Utils.lerp(startBox.height, endBox.height, progress),
			];

			this.set_position(x, y);
			this.set_size(width, height);
			// this.opacity = Math.round(25 + 230 * progress);
			// log(`value changed: ${this.get_position()}, ${this.get_size()}`);
		}

		_onDestroy(): void {
			this._adjustment.run_dispose();
		}

		switchToSnapping(): void {
			this._adjustment.remove_transition('value');
			this._adjustment.value = 0;
			let toValue = -0.05;
			if (this._maximizeBox && this._normalBox) {
				toValue = -12 / Math.max(12, this._maximizeBox.width - this._normalBox.width);
			}
			easeActor(this._adjustment, toValue, {
				duration: 100,
				repeatCount: 1,
				autoReverse: true,
				mode: Clutter.AnimationMode.EASE_IN_OUT_BACK,
				onStopped: () => {
					this._direction = Clutter.Orientation.HORIZONTAL;
				},
			});
		}

		easeOpacity(value: number, callback?: () => void) {
			easeActor(this, undefined, {
				opacity: value,
				duration: 150,
				mode: Clutter.AnimationMode.EASE_OUT_QUAD,
				onStopped: () => {
					if (callback)
						callback();
				},
			});
		}

		get adjustment(): St.Adjustment {
			return this._adjustment;
		}
	},
);

export class SnapWindowExtension implements ISubExtension {
	private _swipeTracker: typeof SwipeTracker.prototype;
	private _connectors: number[] = [];
	private _tilePreview: typeof TilePreview.prototype;
	private _touchpadSwipeGesture: typeof TouchpadSwipeGesture.prototype;
	private _directionChangeId = 0;
	private _toggledDirection = false;
	private _allowChangeDirection = false;

	constructor() {
		this._swipeTracker = createSwipeTracker(
			global.stage,
			(ExtSettings.DEFAULT_OVERVIEW_GESTURE ? [4] : [3]),
			Shell.ActionMode.NORMAL,
			Clutter.Orientation.VERTICAL,
		);
		this._swipeTracker.allowLongSwipes = true;
		this._touchpadSwipeGesture = this._swipeTracker._touchpadGesture;
		this._tilePreview = new TilePreview();
		Main.layoutManager.uiGroup.add_child(this._tilePreview);
	}

	apply(): void {
		this._swipeTracker.orientation = Clutter.Orientation.VERTICAL;
		this._connectors.push(this._swipeTracker.connect('begin', this._gestureBegin.bind(this)));
		this._connectors.push(this._swipeTracker.connect('update', this._gestureUpdate.bind(this)));
		this._connectors.push(this._swipeTracker.connect('end', this._gestureEnd.bind(this)));
	}

	destroy(): void {
		if (this._directionChangeId) {
			GLib.source_remove(this._directionChangeId);
			this._directionChangeId = 0;
		}

		this._connectors.forEach(connector => this._swipeTracker.disconnect(connector));
		Main.layoutManager.uiGroup.remove_child(this._tilePreview);
		this._swipeTracker.destroy();
		this._tilePreview.destroy();
	}

	_gestureBegin(tracker: typeof SwipeTracker.prototype): void {
		if (this._directionChangeId) {
			GLib.source_remove(this._directionChangeId);
			this._directionChangeId = 0;
		}
		const window = global.display.get_focus_window();
		if (!window || window.is_fullscreen() || !window.can_maximize()) {
			return;
		}

		const currentMonitor = window.get_monitor();
		const monitorGeo = global.display.get_monitor_geometry(currentMonitor);

		const progress = window.get_maximized() === Meta.MaximizeFlags.BOTH ? 1 : 0;
		this._toggledDirection = false;
		this._allowChangeDirection = progress === 0;

		const snapPoints = progress === 1 ?
			[GestureMaxUnMaxState.UNMAXIMIZE, GestureMaxUnMaxState.MAXIMIZE] :
			[GestureTileState.RIGHT_TILE, GestureTileState.NORMAL, GestureTileState.LEFT_TILE];

		if (this._tilePreview.open(window, progress ? GestureMaxUnMaxState.MAXIMIZE : GestureMaxUnMaxState.UNMAXIMIZE)) {
			tracker.confirmSwipe(
				monitorGeo.height,
				snapPoints,
				progress,
				progress);
		}
	}

	_gestureUpdate(_tracker: never, progress: number): void {
		// log(`progress: ${progress}, toggled: ${this._toggledDirection}`);
		if (this._toggledDirection) {
			this._tilePreview.adjustment.value = progress;
			return;
		}

		if (progress >= GestureMaxUnMaxState.UNMAXIMIZE) {
			if (this._directionChangeId) {
				GLib.source_remove(this._directionChangeId);
				this._directionChangeId = 0;
			}
			this._tilePreview.adjustment.value = progress;
		}
		// switch to horizontal
		else if (this._allowChangeDirection && progress <= 0.05) {
			if (!this._directionChangeId) {
				this._directionChangeId = GLib.timeout_add(
					GLib.PRIORITY_DEFAULT,
					150,
					() => {
						this._toggledDirection = true;
						this._touchpadSwipeGesture.switchDirectionTo(Clutter.Orientation.HORIZONTAL);
						this._swipeTracker._progress = GestureTileState.NORMAL;
						this._swipeTracker._history.reset();
						this._tilePreview.switchToSnapping();

						this._directionChangeId = 0;
						return GLib.SOURCE_REMOVE;
					},
				);
			}
		}
	}

	_gestureEnd(_tracker: never, duration: number, progress: number): void {
		if (this._directionChangeId) {
			GLib.source_remove(this._directionChangeId);
			this._directionChangeId = 0;
		}
		if (!this._toggledDirection) {
			progress = Math.clamp(progress, GestureMaxUnMaxState.UNMAXIMIZE, GestureMaxUnMaxState.MAXIMIZE);
		}

		this._tilePreview.finish(duration, progress);
	}
}