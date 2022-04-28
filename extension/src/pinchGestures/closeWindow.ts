import Clutter from '@gi-types/clutter';
import Meta from '@gi-types/meta';
import Shell from '@gi-types/shell';
import St from '@gi-types/st';

import { global, imports } from 'gnome-shell';

import { PinchGestureType } from '../../common/settings';
import { TouchpadPinchGesture } from '../trackers/pinchTracker';
import { easeActor } from '../utils/environment';
import { getVirtualKeyboard, IVirtualKeyboard } from '../utils/keyboard';

const Main = imports.ui.main;
const Util = imports.misc.util;

const START_OPACITY = 0;

enum CloseWindowGestureState {
	PINCH_IN = -1,
	DEFAULT = 0,
}

declare type Type_TouchpadPinchGesture = typeof TouchpadPinchGesture.prototype;

export class CloseWindowExtension implements ISubExtension {
	private _closeType: PinchGestureType.CLOSE_DOCUMENT | PinchGestureType.CLOSE_WINDOW;
	private _keyboard: IVirtualKeyboard;
	private _pinchTracker: Type_TouchpadPinchGesture;
	private _preview: St.Widget;
	private _focusWindow?: Meta.Window | null;

	constructor(nfingers: number[], closeType: PinchGestureType.CLOSE_DOCUMENT | PinchGestureType.CLOSE_WINDOW) {
		this._closeType = closeType;
		this._keyboard = getVirtualKeyboard();

		this._preview = new St.Widget({
			reactive: false,
			style_class: 'gie-close-window-preview',
			visible: false,
			opacity: START_OPACITY,
		});
		this._preview.set_pivot_point(0.5, 0.5);
		Main.layoutManager.uiGroup.add_child(this._preview);

		this._pinchTracker = new TouchpadPinchGesture({
			nfingers: nfingers,
			allowedModes: Shell.ActionMode.NORMAL,
			pinchSpeed: 0.25,
		});
		this._pinchTracker.connect('begin', this.gestureBegin.bind(this));
		this._pinchTracker.connect('update', this.gestureUpdate.bind(this));
		this._pinchTracker.connect('end', this.gestureEnd.bind(this));
	}

	destroy(): void {
		this._pinchTracker.destroy();
		this._preview.destroy();
	}

	gestureBegin(tracker: Type_TouchpadPinchGesture) {
		this._focusWindow = global.display.get_focus_window() as Meta.Window | null;
		if (!this._focusWindow)	return;

		tracker.confirmPinch(0, [CloseWindowGestureState.PINCH_IN, CloseWindowGestureState.DEFAULT], CloseWindowGestureState.DEFAULT);

		const frame = this._focusWindow.get_frame_rect();
		this._preview.set_position(frame.x, frame.y);
		this._preview.set_size(frame.width, frame.height);
		this._preview.show();
	}

	gestureUpdate(_tracker: unknown, progress: number): void {
		progress = progress - CloseWindowGestureState.PINCH_IN;
		this._preview.set_scale(progress, progress);
		this._preview.opacity = Util.lerp(START_OPACITY, 255, progress);
	}

	gestureEnd(_tracker: unknown, duration: number, progress: CloseWindowGestureState) {
		switch (progress) {
			case CloseWindowGestureState.DEFAULT:
				this._animatePreview(false, duration);
				break;
			case CloseWindowGestureState.PINCH_IN:
				this._animatePreview(true, duration, this._invokeGestureCompleteAction.bind(this));
		}
	}

	private _invokeGestureCompleteAction() {
		switch (this._closeType) {
			case PinchGestureType.CLOSE_WINDOW:
				this._focusWindow?.delete(Clutter.get_current_event_time());
				break;
			case PinchGestureType.CLOSE_DOCUMENT:
				this._keyboard.sendKeys([Clutter.KEY_Control_L, Clutter.KEY_w]);
		}
	}

	private _animatePreview(gestureCompleted: boolean, duration: number, callback?: () => void) {
		easeActor(this._preview,  {
			opacity: gestureCompleted ? 255 : 0,
			scaleX: gestureCompleted ? 0 : 1,
			scaleY: gestureCompleted ? 0 : 1,
			duration,
			mode: Clutter.AnimationMode.EASE_OUT_QUAD,
			onStopped: () => {
				if (callback)
					callback();
				this._gestureAnimationDone();
			},
		});
	}

	private _gestureAnimationDone() {
		this._preview.hide();
		this._preview.opacity = START_OPACITY;
		this._preview.set_scale(1, 1);
	}
}