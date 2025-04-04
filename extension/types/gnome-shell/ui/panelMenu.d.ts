declare module "resource:///org/gnome/shell/ui/panelMenu.js" {
	import St from 'gi://St';
	import {PopupMenuItem} from 'resource:///org/gnome/shell/ui/popupMenu.js';

	class Button extends St.Widget {
		constructor(menuAlignment: number, nameText?: string, dontCreateMenu?: boolean);
		container: St.Bin;
		menu: PopupMenuItem;
	}
}