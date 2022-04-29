import Gtk from '@gi-types/gtk4';
import Gio from '@gi-types/gio2';
import GLib from '@gi-types/glib2';
import GObject from '@gi-types/gobject2';
import Adw from '@gi-types/adw1';
import { ForwardBackKeyBinds, GioSettings } from './settings';
import { registerClass } from './utils/gobject';
import { printStack } from './utils/logging';

/** return icon image for give app */
function getAppIconImage(app: Gio.AppInfoPrototype) {
	const iconName =  app.get_icon()?.to_string() ?? 'icon-missing';
	return new Gtk.Image({
		gicon: Gio.icon_new_for_string(iconName),
		iconSize: Gtk.IconSize.LARGE,
	});
}

/** Returns marked escaped text or empty string if text is nullable */
function markup_escape_text(text?: string | null) {
	text = text ?? '';
	try {
		return GLib.markup_escape_text(text, -1);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (e: any) {
		// TODO: see what exactly is error and fix it
		// probably errors in different language or app name
		printStack(`Error: '${e?.message ?? e}' while escaping app name for app(${text}))`);
		return text;
	}
}

/** Dialog window used for selecting application from given list of apps
 *  Emits `app-selected` signal with application id
 */
const AppChooserDialog = registerClass(
	{
		Properties: {},
		Signals: { 'app-selected': { param_types: [GObject.TYPE_STRING] } },
	},
	class GIE_AppChooserDialog extends Adw.PreferencesWindow {
		private _group: Adw.PreferencesGroup;

		/**
		 * @param apps list of apps to display in dialog
		 * @param parent parent window, dialog will be transient for parent
		 */
		constructor(apps: Gio.AppInfoPrototype[], parent: Adw.Window) {
			super({
				modal: true,
				transientFor: parent,
				destroyWithParent: false,
				title: 'Select application',
			});

			this.set_default_size(
				0.7 * parent.defaultWidth,
				0.7 * parent.defaultHeight,
			);

			this._group = new Adw.PreferencesGroup();
			const page = new Adw.PreferencesPage();
			page.add(this._group);
			this.add(page);

			apps.forEach(app => this._addAppRow(app));
		}

		/** for given app add row to selectable list */
		private _addAppRow(app: Gio.AppInfoPrototype) {
			const row = new Adw.ActionRow({
				title: markup_escape_text(app.get_display_name()),
				subtitle: markup_escape_text(app.get_description()),
				activatable: true,
			});
			row.add_prefix(getAppIconImage(app));
			this._group.add(row);

			row.connect('activated', () => {
				this.emit('app-selected', app.get_id());
				this.close();
			});
		}
	},
);

/** type definition for gesture setting(keybind and reverse flag) for app */
declare type AppGestureSettings = [ForwardBackKeyBinds, boolean];

/**
 * Class to create row for application in list to display gesture settings of app
 * Emits 'value-updated' when any of settings changes
 * Emits 'remove-request' when remove button is clicked
 */
const AppGestureSettingsRow = registerClass(
	{
		Properties: {},
		Signals: {
			'value-updated': { param_types: [GObject.TYPE_UINT, GObject.TYPE_BOOLEAN] },
			'remove-request': {},
		},
	},
	class GIE_AppGestureSettingsRow extends Adw.ExpanderRow {
		private _keyBindCombo: Adw.ComboRow;
		private _reverseButton: Gtk.Switch;

		/**
		 * @param appGestureSettings value of current settings for app
		 * @param model list of choices of keybings for setting
		 */
		constructor(app: Gio.AppInfoPrototype, appGestureSettings: AppGestureSettings, model: Gio.ListModel) {
			super({ title: markup_escape_text(app.get_display_name())});
			this.add_prefix(getAppIconImage(app));

			const [keyBind, reverse] = appGestureSettings;

			// keybinding combo row
			this._keyBindCombo = new Adw.ComboRow({
				title: 'Keybinding',
				subtitle: 'Keyboard shortcut to emit after gesture is completed',
				model,
			});
			this._keyBindCombo.set_selected(keyBind);
			this.add_row(this._keyBindCombo);

			// reverse switch row
			this._reverseButton = new Gtk.Switch({
				active: reverse,
				valign: Gtk.Align.CENTER,
			});
			let actionRow = new Adw.ActionRow({ title: 'Reverse gesture direction' });
			actionRow.add_suffix(this._reverseButton);
			this.add_row(actionRow);

			// remove setting row
			const removeButton = new Gtk.Button({
				label: 'Remove...',
				valign: Gtk.Align.CENTER,
				halign: Gtk.Align.END,
				cssClasses: ['raised'],
			});
			actionRow = new Adw.ActionRow();
			actionRow.add_suffix(removeButton);
			this.add_row(actionRow);

			// remove request signal emitted when remove button is clicked
			removeButton.connect('clicked', () => this.emit('remove-request'));
			this._keyBindCombo.connect('notify::selected', this._onValueUpdated.bind(this));
			this._reverseButton.connect('notify::active', this._onValueUpdated.bind(this));

		}

		/** function called internally whenever some setting is changed, emits external signal */
		private _onValueUpdated() {
			this.emit('value-updated', this._keyBindCombo.selected, this._reverseButton.active);
		}
	},
);

/**
 * Class to display list of applications and their gesture settings
 */
const AppKeybindingGesturePrefsGroup = registerClass(
	class GIE_AppKeybindingGesturePrefsGroup extends Adw.PreferencesGroup {
		private _settings: GioSettings;
		private _prefsWindow: Adw.PreferencesWindow;
		private _appRows: Map<string, typeof AppGestureSettingsRow.prototype>;
		private _cachedSettings: Record<string, AppGestureSettings>;
		private _addAppButtonRow: Adw.PreferencesRow;
		private _appGestureModel: Gtk.StringList<GObject.Object>;

		/**
		 * @param prefsWindow parent preferences window
		 * @param settings extension settings object
		 */
		constructor(prefsWindow: Adw.PreferencesWindow, settings: GioSettings) {
			super({
				title: 'Enable application specific gestures',
				description: 'Hold and then swipe to activate the gesture',
			});

			this._prefsWindow = prefsWindow;
			this._settings = settings;
			this._appRows = new Map();

			this._cachedSettings = this._settings.get_value('forward-back-application-keyboard-shortcuts').deepUnpack();
			this._appGestureModel = this._getAppGestureModelForComboBox();

			// build ui widgets
			this.add(
				new Adw.PreferencesRow({
					child: new Gtk.Label({
						label: 'Applications not listed here will have default settings',
						halign: Gtk.Align.CENTER,
						hexpand: true,
					}),
					cssClasses: ['custom-information-label-row', 'custom-smaller-card'],
				}),
			);

			this._addAppButtonRow = this._buildAddAppButtonRow();
			this.add(this._addAppButtonRow);

			Object.keys(this._cachedSettings).sort().reverse().forEach(appId => this._addAppGestureRow(appId));

			// bind switch to setting value
			const toggleSwitch = new Gtk.Switch({ valign: Gtk.Align.CENTER });
			this._settings.bind('enable-forward-back-gesture', toggleSwitch, 'active', Gio.SettingsBindFlags.DEFAULT);
			this.set_header_suffix(toggleSwitch);
		}

		/**
		 * Handler function, called when add button is clicked
		 * Displays dialog to select application to add
		 */
		private _onAddAppButtonClicked() {
			// find list of new apps that can be selected
			const allApps = Gio.app_info_get_all();
			const selectableApps = allApps
				.filter(app => {
					const appId = app.get_id();
					return app.should_show() && appId && !this._appRows.has(appId);
				})
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				.sort((a, b) => a.get_id()!.localeCompare(b.get_id()!));

			const appChooserDialog = new AppChooserDialog(selectableApps, this._prefsWindow);
			appChooserDialog.connect('app-selected', (_source, appId) => this._addAppGestureRow(appId));
			appChooserDialog.present();
		}

		/**
		 * @returns row for add app button
		 */
		private _buildAddAppButtonRow() {
			const addButton = new Gtk.Button({
				iconName: 'list-add-symbolic',
				cssName: 'card',
				cssClasses: ['custom-smaller-card'],
			});

			const addButtonRow = new Adw.PreferencesRow({ child: addButton });
			addButton.connect('clicked', this._onAddAppButtonClicked.bind(this));

			return addButtonRow;
		}

		/**
		 * Adds application specific gesture settings row for given app id
		 * Does nothing if app doesn't exist
		 */
		private _addAppGestureRow(appId: string) {
			const app = Gio.DesktopAppInfo.new(appId);
			if (!app) return;

			const appRow = new AppGestureSettingsRow(
				app,
				this._getAppGestureSetting(appId),	// this function updates extension settings
				this._appGestureModel,
			);
			this._appRows.set(appId, appRow);
			this.add(appRow);

			// callbacks for setting updates and remove request
			appRow.connect('remove-request', () => this._requestRemoveAppGestureRow(appId));
			appRow.connect('value-updated', (_source, keyBind, reverse) => {
				this._setAppGestureSetting(appId, [keyBind, reverse]);
			});

			// re-add add-appbutton at the end
			this.remove(this._addAppButtonRow);
			this.add(this._addAppButtonRow);
		}

		/**
		 * Removes application specific gesture settings row for given app
		 * Does nothing if row for app was not added
		 * Updates extension settings
		 */
		private _removeAppGestureRow(appId: string) {
			const appRow = this._appRows.get(appId);
			if (!appRow) return;

			this.remove(appRow);
			this._appRows.delete(appId);
			delete this._cachedSettings[appId];
			this._updateExtensionSettings();
		}

		/**
		 * Signal handler called when removal of app gesture settings is requested
		 * Displays confirmation dialog and removes app row if confirmed
		 */
		private _requestRemoveAppGestureRow(appId: string) {
			const app = Gio.DesktopAppInfo.new(appId);

			const dialog = new Gtk.MessageDialog({
				transient_for: this._prefsWindow,
				modal: true,
				text: `Remove gesture setting for ${app.get_display_name()}?`,
			});

			dialog.add_button('Cancel', Gtk.ResponseType.CANCEL);
			dialog
				.add_button('Remove', Gtk.ResponseType.ACCEPT)
				.get_style_context()
				.add_class('destructive-action');

			dialog.connect('response', (_dlg, response) => {
				if (response === Gtk.ResponseType.ACCEPT) {
					this._removeAppGestureRow(appId);
				}
				dialog.destroy();
			});

			dialog.present();
		}

		/**
		 * Returns application specific gesture setting
		 * if setting is not set, returns default value and saves extension settings
		*/
		private _getAppGestureSetting(appId: string): AppGestureSettings {
			let val = this._cachedSettings[appId];

			if (!val) {
				// this is case when new app was selected for gesture
				val = [ForwardBackKeyBinds.Default, false];
				this._setAppGestureSetting(appId, val);
			}

			return val;
		}

		/** Saves application specific gesture setting into extension settings */
		private _setAppGestureSetting(appId: string, appGestureSettings: AppGestureSettings) {
			this._cachedSettings[appId] = appGestureSettings;
			this._updateExtensionSettings();
		}

		/** Updates extension settings */
		private _updateExtensionSettings() {
			const glibVariant = new GLib.Variant('a{s(ib)}', this._cachedSettings);
			this._settings.set_value('forward-back-application-keyboard-shortcuts', glibVariant);
		}

		/** Returns model which contains all possible choices for keybinding setting for app-gesture */
		private _getAppGestureModelForComboBox() {
			const appGestureModel = new Gtk.StringList();
			Object.values(ForwardBackKeyBinds).forEach(val => {
				if (typeof val !== 'number') return;
				appGestureModel.append(ForwardBackKeyBinds[val]);
			});

			return appGestureModel;
		}
	},
);

/**
 * @returns preference page for application gestures
 */
export function getAppKeybindingGesturePrefsPage(prefsWindow: Adw.PreferencesWindow, settings: GioSettings) {
	const page = new Adw.PreferencesPage({
		title: 'App Gestures',
		iconName: 'org.gnome.Settings-applications-symbolic',
	});

	page.add(new AppKeybindingGesturePrefsGroup(prefsWindow, settings));
	return page;
}