import Clutter from '@gi-types/clutter8';
import Shell from '@gi-types/shell0';
import { imports } from 'gnome-shell';
import { ExtSettings } from '../constants';
import { TouchpadSwipeGesture } from './swipeTracker';
import Gio from '@gi-types/gio2';

const Main = imports.ui.main;
const Volume = imports.ui.status.volume;


export class VolumeUpDownGesture implements ISubExtension {
	private _connectHandlers: number[];
	private _touchpadSwipeTracker: typeof TouchpadSwipeGesture.prototype;
	private readonly _volumeControl;
	private _maxVolume: number;
	private _volumeMenu;
	private _oldPercentage: number;
	private _streamSlider;

	constructor() {
		this._volumeControl = Volume.getMixerControl();
		this._streamSlider = new Volume.StreamSlider(this._volumeControl);
		this._connectHandlers = [];
		this._maxVolume = this._volumeControl.get_vol_max_norm() * this._streamSlider.getMaxLevel();
		this._volumeMenu = Main.panel.statusArea.aggregateMenu._volume._volumeMenu;
		this._oldPercentage = -1;

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
			!(this._touchpadSwipeTracker.hadHoldGesture())
		);
	}

	apply(): void {
		this._connectHandlers.push(this._touchpadSwipeTracker.connect('update', this._gestureBegin.bind(this)));
		this._connectHandlers.push(this._touchpadSwipeTracker.connect('update', this._gestureUpdate.bind(this)));
		this._connectHandlers.push(this._touchpadSwipeTracker.connect('update', this._gestureEnd.bind(this)));
	}

	destroy(): void {
		this._connectHandlers.forEach(handle => this._touchpadSwipeTracker.disconnect(handle));
		this._connectHandlers = [];
		this._touchpadSwipeTracker.destroy();
	}

	_gestureBegin(): void {
		this._maxVolume = this._volumeControl.get_vol_max_norm() * this._streamSlider.getMaxLevel();
	}

	_gestureUpdate(_gesture: never, _time: never, delta: number, distance: number): void {
		this._volumeControl.get_default_sink().volume = Math.clamp(this._volumeControl.get_default_sink().volume - Math.round((delta / distance) * this._maxVolume), 0, this._maxVolume);
	}

	_gestureEnd(): void {
		this._volumeControl.get_default_sink().push_volume();
		this._showVolumeOsd(Math.round((this._volumeControl.get_default_sink().volume / this._maxVolume) * 100));
	}

	_showVolumeOsd(currentPercentage: number): void {
		if (this._oldPercentage <= 0 || this._oldPercentage !== currentPercentage) {
			const gicon = new Gio.ThemedIcon({name: this._volumeMenu.getIcon()});
			// const name = (this._volumeControl.lookup_output_id(this._volumeControl.get_default_source().id).description);
			Main.osdWindowManager.show(-1, gicon, null, currentPercentage / 100);
			this._oldPercentage = currentPercentage;
		}
	}
}
