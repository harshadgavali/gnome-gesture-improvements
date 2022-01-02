import Clutter from '@gi-types/clutter8';
import Shell from '@gi-types/shell0';
import { TouchpadPinchGesture } from '../trackers/pinchTracker';
import { VirtualKeyboard } from '../utils/keyboard';

export class CloseWindowExtension implements ISubExtension {
	private _keyboard: VirtualKeyboard;
	private _pinchTracker: typeof TouchpadPinchGesture.prototype;

	constructor(nfingers: number[]) {
		this._keyboard = new VirtualKeyboard();

		this._pinchTracker = new TouchpadPinchGesture({
			nfingers: nfingers,
			allowedModes: Shell.ActionMode.NORMAL,
		});
	}

	apply(): void {
		this._pinchTracker.connect('begin', this.gestureBegin.bind(this));
		this._pinchTracker.connect('end', this.gestureEnd.bind(this));
	}

	destroy(): void {
		this._pinchTracker?.destroy();
	}

	gestureBegin() {
		this._pinchTracker.confirmPinch(0, [0, 1], 0);
	}

	gestureEnd(_duration: number, _progress: number) {
		this._keyboard.sendKeys(Clutter.KEY_Control_L, Clutter.KEY_w);
	}
}