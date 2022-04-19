// import Gtk from '@gi-types/gtk4';
import Adw from '@gi-types/adw1';

import { imports } from 'gnome-shell';
import { buildPrefsWidget } from './common/prefs';

const ExtensionUtils = imports.misc.extensionUtils;
const ExtMe = ExtensionUtils.getCurrentExtension();

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function init(): void { }

export function fillPreferencesWindow(prefsWindow: Adw.PreferencesWindow) {
	const UIDirPath = ExtMe.dir.get_child('ui').get_path() ?? '';
	const settings = ExtensionUtils.getSettings();
	buildPrefsWidget(prefsWindow, settings, UIDirPath);
}