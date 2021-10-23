import Gtk from '@gi-types/gtk';
import { imports } from 'gnome-shell';
import { getPrefsWidget } from './common/prefs';

const ExtensionUtils = imports.misc.extensionUtils;
const ExtMe = ExtensionUtils.getCurrentExtension();

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function init(): void { }

export function buildPrefsWidget(): Gtk.Widget {
	const UIFilePath = ExtMe.dir.get_child('ui').get_path() + '/prefs.ui';
	const settings = ExtensionUtils.getSettings();
	return getPrefsWidget(settings, UIFilePath);
}