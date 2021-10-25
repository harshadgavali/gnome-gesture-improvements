import Gio from '@gi-types/gio';
import Gtk from '@gi-types/gtk';
import GObject from '@gi-types/gobject';
import { CanEnableMinimizeGesture } from './utils/prefsUtils';

type BooleanSettingsKeys =
	'default-session-workspace' |
	'default-overview' |
	'allow-minimize-window' |
	'follow-natural-scroll' |
	'enable-alttab-gesture' |
	'enable-window-manipulation-gesture';

type IntegerSettingsKeys =
	'alttab-delay'
	;
type DoubleSettingsKeys =
	'touchpad-speed-scale'
	;

type AllSettingsKeys =
	BooleanSettingsKeys |
	IntegerSettingsKeys |
	DoubleSettingsKeys
	;

type AllUIObjectKeys =
	AllSettingsKeys |
	'touchpadspeed_speed_display_value' |
	'allow-minimize-window_box-row' |
	'alttab-delay_box-row'
	;

type FilterGetterFunctionsKeys<T> = T extends `get_${infer _R}` ? T : never;
type GetterFunctionsKeys<T extends GObject.Object> = FilterGetterFunctionsKeys<keyof T>;

export type GioSettings = Omit<Gio.Settings, GetterFunctionsKeys<Gio.Settings>> & {
	get_boolean(key: BooleanSettingsKeys): boolean;
	get_int(key: IntegerSettingsKeys): number;
	get_double(key: DoubleSettingsKeys): number;
}

type GtkBuilder = Omit<Gtk.Builder, 'get_object'> & {
	get_object<T = GObject.Object>(name: AllUIObjectKeys): T;
}

/**
 * Bind value of settings to {@link Gtk.SpinButton}
 * @param key key of settings and id of {@link Gtk.SpinButton} object in builder
 */
function bind_int_value(key: IntegerSettingsKeys, settings: GioSettings, builder: GtkBuilder) {
	const button = builder.get_object<Gtk.SpinButton>(key);
	settings.bind(key, button, 'value', Gio.SettingsBindFlags.DEFAULT);
}

/**
 * Bind value of settings to {@link Gtk.Swich}
 * @param key key of settings and id of {@link Gtk.Switch} object in builder
 */
function bind_boolean_value(key: BooleanSettingsKeys, settings: GioSettings, builder: GtkBuilder, flags = Gio.SettingsBindFlags.DEFAULT) {
	const button = builder.get_object<Gtk.Switch>(key);
	settings.bind(key, button, 'active', flags);
}

/**
 * Display value of `key` in log scale.
 * @param key key of settings and id of {@link Gtk.Scale} object in builder
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

function addToggleToDisableAltTabGesture(key: BooleanSettingsKeys, settings: GioSettings, builder: GtkBuilder) {
	bind_boolean_value(key, settings, builder);

	const button = builder.get_object<Gtk.Switch>(key);
	const delayButtonRow = builder.get_object<Gtk.ListBoxRow>('alttab-delay_box-row');
	button.bind_property('active', delayButtonRow, 'sensitive', GObject.BindingFlags.SYNC_CREATE);
}

function addToggleToDisableWindowManipulationGesture(key: BooleanSettingsKeys, settings: GioSettings, builder: GtkBuilder) {
	const button = builder.get_object<Gtk.Switch>(key);
	const minimizeButtonRow = builder.get_object<Gtk.ListBoxRow>('allow-minimize-window_box-row');
	button.bind_property('active', minimizeButtonRow, 'sensitive', GObject.BindingFlags.SYNC_CREATE);
	bind_boolean_value(key, settings, builder);
}

function addToggleToDisableGestures(settings: GioSettings, builder: GtkBuilder) {
	addToggleToDisableAltTabGesture('enable-alttab-gesture', settings, builder);
	addToggleToDisableWindowManipulationGesture('enable-window-manipulation-gesture', settings, builder);
}

export function getPrefsWidget<T = GObject.Object>(settings: Gio.Settings, uiPath: string): T {
	const builder = new Gtk.Builder();
	builder.add_from_file(uiPath);

	display_in_log_scale('touchpad-speed-scale', 'touchpadspeed_speed_display_value', settings, builder);

	bind_int_value('alttab-delay', settings, builder);

	bind_boolean_value('default-session-workspace', settings, builder, Gio.SettingsBindFlags.INVERT_BOOLEAN);
	bind_boolean_value('default-overview', settings, builder, Gio.SettingsBindFlags.INVERT_BOOLEAN);
	bind_boolean_value('follow-natural-scroll', settings, builder);

	showEnableMinimizeButton('allow-minimize-window', 'allow-minimize-window_box-row', settings, builder);

	addToggleToDisableGestures(settings, builder);

	return builder.get_object<T>('main_prefs');
}