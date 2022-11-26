import Clutter from '@gi-types/clutter';
import Meta from '@gi-types/meta';
import Shell from '@gi-types/shell';
import St from '@gi-types/st';

import { global, imports } from 'gnome-shell';

import { PinchGestureType } from '../../common/settings';
import { WIGET_SHOWING_DURATION } from '../../constants';
import { TouchpadPinchGesture } from '../trackers/pinchTracker';
import { easeActor } from '../utils/environment';
import { getVirtualKeyboard, IVirtualKeyboard } from '../utils/keyboard';

const Main = imports.ui.main;
const Util = imports.misc.util;

const END_OPACITY = 0;
const END_SCALE = 0.5;

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
		// if we are currently in middle of animations, ignore this event
		if (this._focusWindow)
			return;
		
		this._focusWindow = global.display.get_focus_window() as Meta.Window | null;
		if (!this._focusWindow)	return;

		tracker.confirmPinch(0, [CloseWindowGestureState.PINCH_IN, CloseWindowGestureState.DEFAULT], CloseWindowGestureState.DEFAULT);

		const frame = this._focusWindow.get_frame_rect();
		this._preview.set_position(frame.x, frame.y);
		this._preview.set_size(frame.width, frame.height);
		
		// animate showing widget
		this._preview.opacity = 0;
		this._preview.show();
		easeActor(this._preview, {
			opacity: 255,
			mode: Clutter.AnimationMode.EASE_OUT_QUAD,
			duration: WIGET_SHOWING_DURATION,
		});
	}

	gestureUpdate(_tracker: unknown, progress: number): void {
		progress = CloseWindowGestureState.DEFAULT - progress;
		const scale = Util.lerp(1, END_SCALE, progress);
		this._preview.set_scale(scale, scale);
		this._preview.opacity = Util.lerp(255, END_OPACITY, progress);
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
				this._focusWindow?.delete?.(global.get_current_time());
				break;
			case PinchGestureType.CLOSE_DOCUMENT:
				this._keyboard.sendKeys([Clutter.KEY_Control_L, Clutter.KEY_w]);
		}
	}

	private _animatePreview(gestureCompleted: boolean, duration: number, callback?: () => void) {
		easeActor(this._preview,  {
			opacity: gestureCompleted ? END_OPACITY : 255,
			scaleX: gestureCompleted ? END_SCALE : 1,
			scaleY: gestureCompleted ? END_SCALE : 1,
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
		this._preview.opacity = 255;
		this._preview.set_scale(1, 1);

		this._focusWindow = undefined;
	}
}