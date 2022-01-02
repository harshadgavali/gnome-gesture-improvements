import Clutter from '@gi-types/clutter8';

export class VirtualKeyboard {
	private _virtualDevice: Clutter.VirtualInputDevice;
	
	constructor() {
		const seat = Clutter.get_default_backend().get_default_seat();
		this._virtualDevice = seat.create_virtual_device(Clutter.InputDeviceType.KEYBOARD_DEVICE);
	}

	sendKeys(...keys: number[]) {
		const currentTime = Clutter.get_current_event_time();
		keys.forEach(key => this._virtualDevice.notify_keyval(currentTime, key, Clutter.KeyState.PRESSED));
		keys.reverse().forEach(key => this._virtualDevice.notify_keyval(currentTime, key, Clutter.KeyState.RELEASED));
	}
}