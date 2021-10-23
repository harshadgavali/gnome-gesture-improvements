import Gio from '@gi-types/gio';
import Gtk from '@gi-types/gtk';
import GObject from '@gi-types/gobject';
import { CanEnableMinimizeGesture } from './utils/prefs';

/**
 * Bind value of settings to {@link Gtk.SpinButton}
 * @param key key of settings and id of {@link Gtk.SpinButton} object in builder
 */
function bind_int_value(key: string, settings: Gio.Settings, builder: Gtk.Builder) {
	const button: Gtk.SpinButton = builder.get_object(key);
	button.set_value(settings.get_int(key));
	settings.bind(key, button, 'value', Gio.SettingsBindFlags.DEFAULT);
}

/**
 * Bind value of settings to {@link Gtk.Swich}
 * @param key key of settings and id of {@link Gtk.Switch} object in builder
 */
function bind_boolean_value(key: string, settings: Gio.Settings, builder: Gtk.Builder) {
	const button: Gtk.Switch = builder.get_object(key);
	button.set_active(settings.get_boolean(key));
	settings.bind(key, button, 'active', Gio.SettingsBindFlags.DEFAULT);
}

/**
 * Display value of `key` in log scale.
 * @param key key of settings and id of {@link Gtk.Scale} object in builder
 */
function display_in_log_scale(key: string, label_key: string, settings: Gio.Settings, builder: Gtk.Builder) {
	const scale: Gtk.Scale = builder.get_object(key);
	const label: Gtk.Label = builder.get_object(label_key);

	// display value in log scale
	scale.connect('value-changed', () => {
		const labelValue = Math.exp(scale.adjustment.value / Math.LOG2E).toFixed(2);
		label.set_text(labelValue);
		settings.set_double(key, parseFloat(labelValue));
	});

	const initialValue = Math.log2(settings.get_double(key));
	scale.set_value(initialValue);
}

/** Show button to enable minimize gesture, returns whether button was shown */
function showEnableMinimizeButton(key: string, settings: Gio.Settings, builder: Gtk.Builder) {
	const row = builder.get_object<Gtk.ListBoxRow>(`${key}_box-row`);
	row.visible = settings.get_boolean(key) || CanEnableMinimizeGesture();
	if (row.visible)
		bind_boolean_value(key, settings, builder);
	return row.visible;
}

export function getPrefsWidget<T = GObject.Object>(settings: Gio.Settings, uiPath: string): T {
	const builder = new Gtk.Builder();
	builder.add_from_file(uiPath);

	display_in_log_scale('touchpad-speed-scale', 'touchpadspeed_speed_display_value', settings, builder);

	bind_int_value('alttab-delay', settings, builder);

	bind_boolean_value('default-session-workspace', settings, builder);
	bind_boolean_value('default-overview', settings, builder);
	bind_boolean_value('follow-natural-scroll', settings, builder);

	showEnableMinimizeButton('allow-minimize-window', settings, builder);

	return builder.get_object<T>('main_prefs');
}