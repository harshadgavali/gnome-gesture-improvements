import Gio from '@gi-types/gio2';
import GObject from '@gi-types/gobject2';
import Gtk from '@gi-types/gtk4';
import { AllUIObjectKeys, BooleanSettingsKeys, DoubleSettingsKeys, EnumSettingsKeys, GioSettings, IntegerSettingsKeys } from './settings';
import { CanEnableMinimizeGesture } from './utils/prefUtils';

type GtkBuilder = Omit<Gtk.Builder, 'get_object'> & {
	get_object<T = GObject.Object>(name: AllUIObjectKeys): T;
}

/**
 * Bind value of setting to {@link Gtk.SpinButton}
 * @param key key of setting and id of {@link Gtk.SpinButton} object in builder
 */
function bind_int_value(key: IntegerSettingsKeys, settings: GioSettings, builder: GtkBuilder) {
	const button = builder.get_object<Gtk.SpinButton>(key);
	settings.bind(key, button, 'value', Gio.SettingsBindFlags.DEFAULT);
}

interface BindBooleanParams {
	/** flag used when binding setting's key to switch's {@link Gtk.Switch.active} status */
	flags?: Gio.SettingsBindFlags,
	/** list of key of {@link Gtk.Box} object in builder, setting's key is binded to {@link Gtk.Box.sensitive} */
	sensitiveRowKeys?: AllUIObjectKeys[],
}

/**
 * Bind value of settings to {@link Gtk.Swich}
 * @param key key of setting and id of {@link Gtk.Switch} object in builder
 */
function bind_boolean_value(key: BooleanSettingsKeys, settings: GioSettings, builder: GtkBuilder, params?: BindBooleanParams) {
	const button = builder.get_object<Gtk.Switch>(key);
	settings.bind(key, button, 'active', params?.flags ?? Gio.SettingsBindFlags.DEFAULT);
	params?.sensitiveRowKeys?.forEach(row_key => {
		const row = builder.get_object<Gtk.ListBoxRow>(row_key);
		button.bind_property('active', row, 'sensitive', GObject.BindingFlags.SYNC_CREATE);
	});
}

function bind_combo_box(key: EnumSettingsKeys, settings: GioSettings, builder: GtkBuilder) {
	const comboBox = builder.get_object<Gtk.ComboBoxText>(key);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const enumKey = key as any;
	comboBox.set_active_id(settings.get_enum(enumKey).toString());

	comboBox.connect('changed', () => {
		settings.set_enum(enumKey, parseInt(comboBox.active_id));
	});
}

/**
 * Display value of `key` in log scale.
 * @param key key of setting and id of {@link Gtk.Scale} object in builder
 */
function display_in_log_scale(key: DoubleSettingsKeys, label_key: AllUIObjectKeys, settings: GioSettings, builder: GtkBuilder) {
	const scale = builder.get_object<Gtk.Scale>(key);
	const label = builder.get_object<Gtk.Label>(label_key);

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
function showEnableMinimizeButton(key: BooleanSettingsKeys, row_key: AllUIObjectKeys, settings: GioSettings, builder: GtkBuilder) {
	const row = builder.get_object<Gtk.ListBoxRow>(row_key);
	row.visible = settings.get_boolean(key) || CanEnableMinimizeGesture();
	if (row.visible)
		bind_boolean_value(key, settings, builder);
	return row.visible;
}

/**
 * Binds preference widgets and settings keys
 * @param settings setting object of extension
 * @param uiPath path of ui file
 * @returns Get preference widget of type {@link T}
 */
export function getPrefsWidget<T extends Gtk.Box = Gtk.Box>(settings: Gio.Settings, uiPath: string): T {
	const builder = new Gtk.Builder();
	builder.add_from_file(uiPath);

	display_in_log_scale('touchpad-speed-scale', 'touchpad-speed_scale_display-value', settings, builder);
	display_in_log_scale('touchpad-pinch-speed', 'touchpad-pinch-speed_display-value', settings, builder);

	bind_int_value('alttab-delay', settings, builder);

	bind_boolean_value('default-session-workspace', settings, builder, { flags: Gio.SettingsBindFlags.INVERT_BOOLEAN });
	bind_boolean_value('default-overview', settings, builder, { flags: Gio.SettingsBindFlags.INVERT_BOOLEAN });
	bind_boolean_value('follow-natural-scroll', settings, builder);

	bind_boolean_value('enable-alttab-gesture', settings, builder, { sensitiveRowKeys: ['alttab-delay_box-row'] });
	bind_boolean_value('enable-window-manipulation-gesture', settings, builder, { sensitiveRowKeys: ['allow-minimize-window_box-row'] });

	showEnableMinimizeButton('allow-minimize-window', 'allow-minimize-window_box-row', settings, builder);

	bind_combo_box('pinch-3-finger-gesture', settings, builder);
	bind_combo_box('pinch-4-finger-gesture', settings, builder);

	const main_prefs = builder.get_object<T>('main_prefs');

	return main_prefs;
}