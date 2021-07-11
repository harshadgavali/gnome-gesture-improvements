import GObject from '@gi-types/gobject';
import St from '@gi-types/st';

import { imports } from 'gnome-shell';

const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;

export const Indicator = GObject.registerClass(
	class Indicator extends PanelMenu.Button {
		constructor(gettext: (msg: string) => string) {
			const _ = gettext;
			super(0.0, _('My Shiny Indicator'));

			this.add_child(new St.Icon({
				icon_name: 'face-smile-symbolic',
				style_class: 'system-status-icon',
			}));

			const item = new PopupMenu.PopupMenuItem(_('Show Notification'));
			item.connect('activate', () => {
				Main.notify(_('Whatʼs up, folks?'));
			});
			this.menu.addMenuItem(item);
		}
	}
);