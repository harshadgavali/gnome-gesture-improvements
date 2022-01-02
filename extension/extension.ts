import GLib from '@gi-types/glib2';
import { imports } from 'gnome-shell';
import { AllSettingsKeys, GioSettings, PinchGestureType, SwipeGestureType } from './common/settings';
import * as Constants from './constants';
import { AltTabConstants, ExtSettings, TouchpadConstants } from './constants';
import { AltTabGestureExtension } from './src/altTab';
import { ForwardBackGestureExtension } from './src/forwardBack';
import { GestureExtension } from './src/gestures';
import { OverviewRoundTripGestureExtension } from './src/overviewRoundTrip';
import { ShowDesktopExtension } from './src/pinchGestures/showDesktop';
import { SnapWindowExtension } from './src/snapWindow';
import * as DBusUtils from './src/utils/dbus';

const ExtensionUtils = imports.misc.extensionUtils;

class Extension {
	private _extensions: ISubExtension[];
	settings?: GioSettings;
	private _settingChangedId = 0;
	private _reloadWaitId = 0;
	private _addReloadDelayFor: AllSettingsKeys[];

	constructor() {
		this._extensions = [];
		this._addReloadDelayFor = [
			'touchpad-speed-scale',
			'alttab-delay',
			'touchpad-pinch-speed',
		];
	}

	enable() {
		this.settings = ExtensionUtils.getSettings();
		this._settingChangedId = this.settings.connect('changed', this.reload.bind(this));
		this._enable();
	}

	disable() {
		if (this.settings) {
			this.settings.disconnect(this._settingChangedId);
		}

		if (this._reloadWaitId !== 0) {
			GLib.source_remove(this._reloadWaitId);
			this._reloadWaitId = 0;
		}

		this._disable();
		DBusUtils.drop_proxy();
	}

	reload(_settings: never, key: AllSettingsKeys) {
		if (this._reloadWaitId !== 0) {
			GLib.source_remove(this._reloadWaitId);
			this._reloadWaitId = 0;
		}

		this._reloadWaitId = GLib.timeout_add(
			GLib.PRIORITY_DEFAULT,
			(this._addReloadDelayFor.includes(key) ? Constants.RELOAD_DELAY : 0),
			() => {
				this._disable();
				this._enable();
				this._reloadWaitId = 0;
				return GLib.SOURCE_REMOVE;
			},
		);
	}

	_enable() {
		this._initializeSettings();
		this._extensions = [];
		if (this.settings === undefined)
			return;

		switch (this.settings.get_enum('swipe-3-finger-horizontal-gesture'))
		{
			case SwipeGestureType.FORWARD_BACK:
				this._extensions.push(new ForwardBackGestureExtension());
				break;
			case SwipeGestureType.SWITCH_WINDOWS:
				this._extensions.push(new AltTabGestureExtension());
				break;
			default:
				break;
		}

		this._extensions.push(
			new OverviewRoundTripGestureExtension(),
			new GestureExtension(),
		);

		if (this.settings.get_boolean('enable-window-manipulation-gesture'))
			this._extensions.push(new SnapWindowExtension());

		// pinch to show desktop
		const showDesktopFingers = [
			this.settings.get_enum('pinch-3-finger-gesture') === PinchGestureType.SHOW_DESKTOP ? 3 : undefined,
			this.settings.get_enum('pinch-4-finger-gesture') === PinchGestureType.SHOW_DESKTOP ? 4 : undefined,
		].filter((f): f is number => typeof f === 'number');

		if (showDesktopFingers.length)
			this._extensions.push(new ShowDesktopExtension(showDesktopFingers));

		this._extensions.forEach(extension => extension.apply?.());
	}

	_disable() {
		DBusUtils.unsubscribeAll();
		this._extensions.reverse().forEach(extension => extension.destroy());
		this._extensions = [];
	}

	_initializeSettings() {
		if (this.settings) {
			ExtSettings.DEFAULT_SESSION_WORKSPACE_GESTURE = this.settings.get_boolean('default-session-workspace');
			ExtSettings.DEFAULT_OVERVIEW_GESTURE = this.settings.get_boolean('default-overview');
			ExtSettings.ALLOW_MINIMIZE_WINDOW = this.settings.get_boolean('allow-minimize-window');
			ExtSettings.FOLLOW_NATURAL_SCROLL = this.settings.get_boolean('follow-natural-scroll');
			ExtSettings.DEFAULT_OVERVIEW_GESTURE_DIRECTION = this.settings.get_boolean('default-overview-gesture-direction');

			TouchpadConstants.SWIPE_MULTIPLIER = Constants.TouchpadConstants.DEFAULT_SWIPE_MULTIPLIER * this.settings.get_double('touchpad-speed-scale');
			TouchpadConstants.PINCH_MULTIPLIER = Constants.TouchpadConstants.DEFAULT_PINCH_MULTIPLIER * this.settings.get_double('touchpad-pinch-speed');
			AltTabConstants.DELAY_DURATION = this.settings.get_int('alttab-delay');
		}
	}
}

export function init(): IExtension {
	return new Extension();
}
