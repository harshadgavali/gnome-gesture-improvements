import Clutter from 'gi://Clutter';
import GLib from 'gi://GLib';

const DELAY_BETWEEN_KEY_PRESS = 10; // ms
const timeoutIds = new Set<number>();

class VirtualKeyboard {
	private _virtualDevice: Clutter.VirtualInputDevice;

	constructor() {
		const seat = Clutter.get_default_backend().get_default_seat();
		this._virtualDevice = seat.create_virtual_device(Clutter.InputDeviceType.KEYBOARD_DEVICE);
	}

	sendKeys(keys: number[]) {
		// log(`sending keys: ${keys}`);

		// keyEvents are stored in revere order so first event can be just popped
		const keyEvents: [number, Clutter.KeyState][] = [];
		keys.forEach(key => keyEvents.push([key, Clutter.KeyState.RELEASED]));
		keys.reverse().forEach(key => keyEvents.push([key, Clutter.KeyState.PRESSED]));

		let timeoutId = GLib.timeout_add(
			GLib.PRIORITY_DEFAULT,
			DELAY_BETWEEN_KEY_PRESS,
			() => {
				const keyEvent = keyEvents.pop();
				if (keyEvent !== undefined)
					this._sendKey(...keyEvent);
				
				if (keyEvents.length === 0) {
					timeoutIds.delete(timeoutId);
					timeoutId = 0;
					return GLib.SOURCE_REMOVE;
				}

				return GLib.SOURCE_CONTINUE;
			},
		);

		if (timeoutId)
			timeoutIds.add(timeoutId);
	}

	private _sendKey(keyval: number, keyState: Clutter.KeyState) {
		this._virtualDevice.notify_keyval(
			Clutter.get_current_event_time() * 1000,
			keyval,
			keyState,
		);
	}
}

export type IVirtualKeyboard = VirtualKeyboard;

let _keyboard: VirtualKeyboard | undefined;
export function getVirtualKeyboard() {
	_keyboard = _keyboard ?? new VirtualKeyboard();
	return _keyboard;
}

export function extensionCleanup() {
	timeoutIds.forEach(id => GLib.Source.remove(id));
	timeoutIds.clear();
	_keyboard = undefined;
}