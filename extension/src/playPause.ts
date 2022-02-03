import Clutter from '@gi-types/clutter8';
import Shell from '@gi-types/shell0';
import { ExtSettings } from '../constants';
import { TouchpadSwipeGesture } from './swipeTracker';
import { VirtualKeyboard } from './utils/keyboard';


export class PlayPauseHoldGesture implements ISubExtension {
	private _connectHandlers: number[];
	private _touchpadSwipeTracker: typeof TouchpadSwipeGesture.prototype;
	private _keyboard: VirtualKeyboard;

	constructor() {
		this._keyboard = new VirtualKeyboard();
		this._connectHandlers = [];

		this._touchpadSwipeTracker = new TouchpadSwipeGesture(
			(ExtSettings.DEFAULT_SESSION_WORKSPACE_GESTURE ? [3] : [4]),
			Shell.ActionMode.ALL,
			Clutter.Orientation.VERTICAL,
			false,
			this._checkAllowedGesture.bind(this),
		);
	}

	_checkAllowedGesture(): boolean {
		return (
			this._touchpadSwipeTracker.hadHoldGesture()
		);
	}

	apply(): void {
		this._connectHandlers.push(this._touchpadSwipeTracker.connect('update', this._gestureEnd.bind(this)));
	}

	destroy(): void {
		this._connectHandlers.forEach(handle => this._touchpadSwipeTracker.disconnect(handle));
		this._connectHandlers = [];
		this._touchpadSwipeTracker.destroy();
	}

	_gestureEnd(): void {
		this._keyboard.sendKeys(Clutter.KEY_AudioPlay);
	}
}
