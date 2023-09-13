import Clutter from '@gi-types/clutter';
import Shell from '@gi-types/shell';

import { TouchpadPinchGesture } from '../trackers/pinchTracker';
import { getVirtualKeyboard, IVirtualKeyboard } from '../utils/keyboard';

enum ShowNotificationListGestureState {
	PINCH_IN = -1,
	DEFAULT = 0,
}

declare type Type_TouchpadPinchGesture = typeof TouchpadPinchGesture.prototype;

export class ShowNotificationListExtension implements ISubExtension {
	private _keyboard: IVirtualKeyboard;
	private _pinchTracker: Type_TouchpadPinchGesture;

	constructor(nfingers: number[]) {
		this._keyboard = getVirtualKeyboard();

		this._pinchTracker = new TouchpadPinchGesture({
			nfingers: nfingers,
			allowedModes: Shell.ActionMode.NORMAL,
			pinchSpeed: 0.25,
		});
		this._pinchTracker.connect('begin', this.gestureBegin.bind(this));
		this._pinchTracker.connect('end', this.gestureEnd.bind(this));
	}

	destroy(): void {
		this._pinchTracker.destroy();
	}

	gestureBegin(tracker: Type_TouchpadPinchGesture) {
		tracker.confirmPinch(0, [ShowNotificationListGestureState.PINCH_IN, ShowNotificationListGestureState.DEFAULT], ShowNotificationListGestureState.DEFAULT);
	}

	gestureEnd(_tracker: unknown, _duration: number, progress: ShowNotificationListGestureState) {
		switch (progress) {
			case ShowNotificationListGestureState.DEFAULT:
				break;
			case ShowNotificationListGestureState.PINCH_IN:
				this._invokeGestureCompleteAction();
		}
	}

	private _invokeGestureCompleteAction() {
		this._keyboard.sendKeys([Clutter.KEY_Control_L, Clutter.KEY_m]);
	}
}
