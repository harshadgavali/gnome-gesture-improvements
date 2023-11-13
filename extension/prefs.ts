// import Gtk from '@gi-types/gtk4';
import Adw from '@gi-types/adw1';
import Gio from '@gi-types/gio2';

// import { imports } from 'gnome-shell';
import { buildPrefsWidget } from './common/prefs';

import { ExtensionPreferences } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

interface TracksSettings {
  /**
   * The settings object backing the settings window.
   */
  _settings?: Gio.Settings;
}

// const ExtensionUtils = imports.misc.extensionUtils;
// const ExtMe = ExtensionUtils.getCurrentExtension();

export default class GNOMEGestureImprovementsPreferences extends ExtensionPreferences {
	override fillPreferencesWindow(prefsWindow: Adw.PreferencesWindow & TracksSettings) {
		const UIDirPath = this.metadata.dir.get_child('ui').get_path() ?? '';
		const settings = this.getSettings();
		buildPrefsWidget(prefsWindow, settings, UIDirPath);
	}
}