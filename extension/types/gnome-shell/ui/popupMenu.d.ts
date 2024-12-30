declare module "resource:///org/gnome/shell/ui/popupMenu.js" {
	import St from 'gi://St';

	class PopupMenuItem extends St.BoxLayout {
		constructor(text: string);
		addMenuItem(subMenu: PopupMenuItem): void;
	}
}