import Adw from 'gi://Adw';
import { ExtensionPreferences } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';
import { buildPrefsWidget } from './common/prefs.js';

export default class GnomeGestureImprovementsPreferences extends ExtensionPreferences {
	override fillPreferencesWindow(prefsWindow: Adw.PreferencesWindow) {
		const UIDirPath = this.metadata.dir.get_child('ui').get_path() ?? '';
		const settings = this.getSettings();
		buildPrefsWidget(prefsWindow, settings, UIDirPath);
	}
}