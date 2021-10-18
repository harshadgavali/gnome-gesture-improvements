import GLib from '@gi-types/glib';
import Gio from '@gi-types/gio';

import * as Constants from './constants';
import { GestureExtension } from './src/gestures';
import { AltTabGestureExtension } from './src/altTab';
import { OverviewRoundTripGestureExtension } from './src/overviewRoundTrip';
import { SnapWindowExtension } from './src/snapWindow';
import * as DBusUtils from './src/utils/dbus';
import { imports } from 'gnome-shell';

const ExtensionUtils = imports.misc.extensionUtils;

class Extension {
	private _extensions: ISubExtension[];
	settings?: Gio.Settings;
	private _settingChangedId = 0;
	private _reloadWaitId = 0;
	private _noReloadDelayFor: string[];

	constructor() {
		this._extensions = [];
		this._noReloadDelayFor = [
			'default-session-workspace',
			'default-overview',
			'allow-minimize-window',
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

	reload(_settings: never, key: string) {
		if (this._reloadWaitId !== 0) {
			GLib.source_remove(this._reloadWaitId);
			this._reloadWaitId = 0;
		}

		this._reloadWaitId = GLib.timeout_add(
			GLib.PRIORITY_DEFAULT,
			(this._noReloadDelayFor.includes(key) ? 0 : Constants.RELOAD_DELAY),
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
		this._extensions = [
			new AltTabGestureExtension(),
			new OverviewRoundTripGestureExtension(),
			new GestureExtension(),
			new SnapWindowExtension(),
		];
		this._extensions.forEach(extension => extension.apply());
	}

	_disable() {
		DBusUtils.unsubscribeAll();
		this._extensions.reverse().forEach(extension => extension.destroy());
		this._extensions = [];
	}

	_initializeSettings() {
		if (this.settings) {
			Constants.ExtSettings.DEFAULT_SESSION_WORKSPACE_GESTURE = this.settings.get_boolean('default-session-workspace');
			Constants.ExtSettings.DEFAULT_OVERVIEW_GESTURE = this.settings.get_boolean('default-overview');
			Constants.ExtSettings.ALLOW_MINIMIZE_WINDOW = this.settings.get_boolean('allow-minimize-window');
			Constants.TouchpadConstants.SWIPE_MULTIPLIER = Constants.TouchpadConstants.DEFAULT_SWIPE_MULTIPLIER * this.settings.get_double('touchpad-speed-scale');
			Constants.AltTabConstants.DELAY_DURATION = this.settings.get_int('alttab-delay');
		}
	}
}

export function init(): IExtension {
	return new Extension();
}
