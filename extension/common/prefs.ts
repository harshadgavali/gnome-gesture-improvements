import Gio from '@gi-types/gio2';
import Gtk from '@gi-types/gtk4';
import GObject from '@gi-types/gobject2';
import { CanEnableMinimizeGesture } from './utils/prefUtils';

// define enum
export enum AnimatePanel {
	NONE = 0,
	SWITCH_WORKSPACE = 1,
	MOVE_WINDOW = 2,
	SWITCH_WORKSPACE_AND_MOVE_WINDOW = 3,
}

type BooleanSettingsKeys =
	'default-session-workspace' |
	'default-overview' |
	'allow-minimize-window' |
	'follow-natural-scroll' |
	'enable-alttab-gesture' |
	'enable-window-manipulation-gesture' |
	'enable-move-window-to-workspace' |
	'enable-show-desktop'
	;

type IntegerSettingsKeys =
	'alttab-delay'
	;
type DoubleSettingsKeys =
	'touchpad-speed-scale'
	;

export type AllSettingsKeys =
	BooleanSettingsKeys |
	IntegerSettingsKeys |
	DoubleSettingsKeys |
	'animate-panel'
	;

type AllUIObjectKeys =
	AllSettingsKeys |
	'touchpadspeed_speed_display_value' |
	'allow-minimize-window_box-row' |
	'alttab-delay_box-row' |
	'animate-panel_box-row'
	;

type KeysThatStartsWith<K extends string, U extends string> = K extends `${U}${infer _R}` ? K : never;
export type GioSettings = Omit<Gio.Settings, KeysThatStartsWith<keyof Gio.Settings, 'get_' | 'set_'>> & {
	get_boolean(key: BooleanSettingsKeys): boolean;
	get_int(key: IntegerSettingsKeys): number;
	get_double(key: DoubleSettingsKeys): number;
	set_double(key: DoubleSettingsKeys, value: number): void;
	get_enum(key: 'animate-panel'): AnimatePanel;
	set_enum(key: 'animate-panel', value: AnimatePanel): void;
}

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

function bind_combo_box(key: 'animate-panel', settings: GioSettings, builder: GtkBuilder) {
	const comboBox = builder.get_object<Gtk.ComboBoxText>(key);
	comboBox.set_active_id(settings.get_enum(key).toString());
	comboBox.connect('changed', () => {
		settings.set_enum(key, parseInt(comboBox.active_id));
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

	display_in_log_scale('touchpad-speed-scale', 'touchpadspeed_speed_display_value', settings, builder);

	bind_int_value('alttab-delay', settings, builder);

	bind_boolean_value('default-session-workspace', settings, builder, { flags: Gio.SettingsBindFlags.INVERT_BOOLEAN });
	bind_boolean_value('default-overview', settings, builder, { flags: Gio.SettingsBindFlags.INVERT_BOOLEAN });
	bind_boolean_value('follow-natural-scroll', settings, builder);

	bind_boolean_value('enable-alttab-gesture', settings, builder, { sensitiveRowKeys: ['alttab-delay_box-row'] });
	bind_boolean_value('enable-window-manipulation-gesture', settings, builder, { sensitiveRowKeys: ['allow-minimize-window_box-row'] });

	showEnableMinimizeButton('allow-minimize-window', 'allow-minimize-window_box-row', settings, builder);

	bind_boolean_value('enable-show-desktop', settings, builder);
	bind_boolean_value('enable-move-window-to-workspace', settings, builder, {sensitiveRowKeys: ['animate-panel_box-row']});
	bind_combo_box('animate-panel', settings, builder);

	const main_prefs = builder.get_object<T>('main_prefs');
	const header_bar = builder.get_object<Gtk.HeaderBar>('header_bar');

	main_prefs.connect('realize', () => {
		const window = main_prefs.get_root();

		if (window && window instanceof Gtk.Window)
			window.set_titlebar(header_bar);
	});

	return main_prefs;
}