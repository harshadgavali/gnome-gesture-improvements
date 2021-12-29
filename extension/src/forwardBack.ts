import Clutter from '@gi-types/clutter8';
import Shell from '@gi-types/shell0';
import { imports } from 'gnome-shell';
import { ExtSettings } from '../constants';
import { TouchpadSwipeGesture } from './swipeTracker';

const Main = imports.ui.main;

export class ForwardBackGestureExtension implements ISubExtension {
	private _connectHandlers: number[];
	private _progress = 0;
	private _touchpadSwipeTracker: typeof TouchpadSwipeGesture.prototype;
	private _virtualDevice: Clutter.VirtualInputDevice;

	constructor() {
		this._connectHandlers = [];

		this._touchpadSwipeTracker = new TouchpadSwipeGesture(
			(ExtSettings.DEFAULT_SESSION_WORKSPACE_GESTURE ? [4] : [3]),
			Shell.ActionMode.ALL,
			Clutter.Orientation.HORIZONTAL,
			false,
			this._checkAllowedGesture.bind(this),
		);

		const seat = Clutter.get_default_backend().get_default_seat();
		this._virtualDevice = seat.create_virtual_device(Clutter.InputDeviceType.KEYBOARD_DEVICE);

	}

	_checkAllowedGesture(): boolean {
		return Main.actionMode === Shell.ActionMode.NORMAL;
	}

	apply(): void {
		this._touchpadSwipeTracker.orientation = Clutter.Orientation.HORIZONTAL;
		this._connectHandlers.push(this._touchpadSwipeTracker.connect('begin', this._gestureBegin.bind(this)));
		this._connectHandlers.push(this._touchpadSwipeTracker.connect('update', this._gestureUpdate.bind(this)));
		this._connectHandlers.push(this._touchpadSwipeTracker.connect('end', this._gestureEnd.bind(this)));
	}

	destroy(): void {
		this._connectHandlers.forEach(handle => this._touchpadSwipeTracker.disconnect(handle));

		this._touchpadSwipeTracker.destroy();
		this._connectHandlers = [];
	}

	_gestureBegin(): void {
		this._progress = 0;
	}

	_gestureUpdate(_gesture: never, _time: never, delta: number, _distance: number): void {
		this._progress += delta;
	}

	_gestureEnd(): void {
		if (this._progress > 0)
			this._sendKeyEvent(Clutter.KEY_Forward);
		else
			this._sendKeyEvent(Clutter.KEY_Back);

		this._reset();
	}

	private _reset() {
		this._progress = 0;
	}

	_sendKeyEvent(...keys: number[]): void {
		const currentTime = Clutter.get_current_event_time();
		keys.forEach(key => this._virtualDevice.notify_keyval(currentTime, key, Clutter.KeyState.PRESSED));
		keys.forEach(key => this._virtualDevice.notify_keyval(currentTime, key, Clutter.KeyState.RELEASED));
	}
}