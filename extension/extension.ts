import GLib from '@gi-types/glib2';

import * as Constants from './constants';
import { GestureExtension } from './src/gestures';
import { AltTabGestureExtension } from './src/altTab';
import { OverviewRoundTripGestureExtension } from './src/overviewRoundTrip';
import { SnapWindowExtension } from './src/snapWindow';
import * as DBusUtils from './src/utils/dbus';
import { imports } from 'gnome-shell';
import { AllSettingsKeys, GioSettings } from './common/prefs';
import { AltTabConstants, ExtSettings, TouchpadConstants } from './constants';

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
		if (this.settings?.get_boolean('enable-alttab-gesture'))
			this._extensions.push(new AltTabGestureExtension());

		this._extensions.push(
			new OverviewRoundTripGestureExtension(),
			new GestureExtension(),
		);

		if (this.settings?.get_boolean('enable-window-manipulation-gesture'))
			this._extensions.push(new SnapWindowExtension());

		this._extensions.forEach(extension => extension.apply());
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
			ExtSettings.ENABLE_SHOW_DESKTOP = this.settings.get_boolean('enable-show-desktop');
			ExtSettings.ENABLE_MOVE_WINDOW_TO_WORKSPACE = this.settings.get_boolean('enable-move-window-to-workspace');

			ExtSettings.ANIMATE_PANEL = this.settings.get_enum('animate-panel');

			TouchpadConstants.SWIPE_MULTIPLIER = Constants.TouchpadConstants.DEFAULT_SWIPE_MULTIPLIER * this.settings.get_double('touchpad-speed-scale');
			AltTabConstants.DELAY_DURATION = this.settings.get_int('alttab-delay');
		}
	}
}

export function init(): IExtension {
	return new Extension();
}
