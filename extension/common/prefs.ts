import Gio from '@gi-types/gio2';
import GObject from '@gi-types/gobject2';
import Gtk from '@gi-types/gtk4';
import Adw from '@gi-types/adw1';
import { AllUIObjectKeys, BooleanSettingsKeys, DoubleSettingsKeys, EnumSettingsKeys, GioSettings, IntegerSettingsKeys } from './settings';
import { CanEnableMinimizeGesture } from './utils/prefUtils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getAppKeybindingGesturePrefsPage } from './appGestures';

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

/**
 * Bind value of setting to {@link Gtk.Swich}
 * @param key key of setting and id of {@link Gtk.Switch} object in builder
 * @param flags flag used when binding setting's key to switch's {@link Gtk.Switch.active} status
 */
function bind_boolean_value(key: BooleanSettingsKeys, settings: GioSettings, builder: GtkBuilder, flags?: Gio.SettingsBindFlags) {
	const button = builder.get_object<Gtk.Switch>(key);
	settings.bind(key, button, 'active', flags ?? Gio.SettingsBindFlags.DEFAULT);
}

/**
 * Bind value of setting to {@link Adw.ComboRow}
 * @param key key of settings and id of {@link Adw.ComboRow} object in builder
 */
function bind_combo_box(key: EnumSettingsKeys, settings: GioSettings, builder: GtkBuilder) {
	const comboRow = builder.get_object<Adw.ComboRow>(key);
	comboRow.set_selected(settings.get_enum(key));
	comboRow.connect('notify::selected', () => {
		settings.set_enum(key, comboRow.selected);
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
 * @param builder builder object for preference widgets
 * @param settings setting object of extension
 */
function bindPrefsSettings(builder: GtkBuilder, settings: Gio.Settings) {

	display_in_log_scale('touchpad-speed-scale', 'touchpad-speed-scale_display-value', settings, builder);
	display_in_log_scale('touchpad-pinch-speed', 'touchpad-pinch-speed_display-value', settings, builder);

	bind_int_value('alttab-delay', settings, builder);

	bind_boolean_value('default-session-workspace', settings, builder, Gio.SettingsBindFlags.INVERT_BOOLEAN);
	bind_boolean_value('default-overview', settings, builder, Gio.SettingsBindFlags.INVERT_BOOLEAN);
	bind_boolean_value('follow-natural-scroll', settings, builder);
	bind_boolean_value('default-overview-gesture-direction', settings, builder, Gio.SettingsBindFlags.INVERT_BOOLEAN);

	bind_boolean_value('enable-alttab-gesture', settings, builder);
	bind_boolean_value('enable-window-manipulation-gesture', settings, builder);

	showEnableMinimizeButton('allow-minimize-window', 'allow-minimize-window_box-row', settings, builder);

	bind_combo_box('pinch-3-finger-gesture', settings, builder);
	bind_combo_box('pinch-4-finger-gesture', settings, builder);
}

export function buildPrefsWidget(
	prefsWindow: Adw.PreferencesWindow,
	settings: Gio.Settings,
	uiDir: string,
) {
	const builder = new Gtk.Builder() as GtkBuilder;
	builder.add_from_file(`${uiDir}/gestures.ui`);
	builder.add_from_file(`${uiDir}/customizations.ui`);

	// bind to settings
	bindPrefsSettings(builder, settings);

	// pinch gesture page
	prefsWindow.add(builder.get_object<Adw.PreferencesPage>('gestures_page'));

	// application specific gestures
	const app_gesture_page = getAppKeybindingGesturePrefsPage(prefsWindow, settings);
	app_gesture_page.bind_property(
		'sensitive',
		builder.get_object<Gtk.Switch>('enable-alttab-gesture'),
		'active',
		GObject.BindingFlags.INVERT_BOOLEAN | GObject.BindingFlags.BIDIRECTIONAL,
	);
	if (builder.get_object<Gtk.Switch>('enable-alttab-gesture').active) {
		app_gesture_page.set_sensitive(false);
	}

	prefsWindow.add(app_gesture_page);

	// customize page
	prefsWindow.add(builder.get_object<Adw.PreferencesPage>('customizations_page'));
}