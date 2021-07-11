/* eslint-disable @typescript-eslint/no-explicit-any */
export const z = 9;

// /* eslint-disable @typescript-eslint/no-explicit-any */

import Clutter from '@gi-types/clutter';
import St from '@gi-types/st';
import Gio from '@gi-types/gio';

declare interface ExtensionMeta {
	uuid: string,
	'settings-schema': string,
	'gettext-domain': string
}

declare interface ExtensionUtilsMeta {
	getSettings(schema?: string): Gio.Settings;
	getCurrentExtension(): {
		metadata: ExtensionMeta,
		dir: Gio.FilePrototype,
		imports: any,
	};
	initTranslations(domain?: string): void;
}

declare namespace imports {
	namespace gettext {
		function domain(name: string): { gettext(message: string): string; };
	}

	namespace misc {
		declare const extensionUtils: ExtensionUtilsMeta;
	}
	namespace ui {
		namespace main {
			function notify(message: string): void;

			const panel: {
				addToStatusArea(role: string, indicator: Clutter.Actor, position?: number, box?: string): void,
			} & Clutter.Actor;

			const overview: {
				dash: {
					showAppsButton: St.Button
				};
				searchEntry: St.Entry,
				shouldToggleByCornerOrButton(): boolean,
				visible: boolean,
				show(): void,
				hide(): void,
				showApps(): void,
				connect(signal: 'showing' | 'hiding' | 'hidden' | 'shown', callback: () => void): number,
				disconnect(id: number): void,
				_overview: {
					_controls: overviewControls.OverviewControlsManager
				} & St.Widget
			};
		}

		namespace overviewControls {
			declare enum ControlsState {
				HIDDEN,
				WINDOW_PICKER,
				APP_GRID
			}

			declare class OverviewAdjustment extends St.Adjustment {
				getStateTransitionParams(): {
					initialState: ControlsState,
					finalState: ControlsState
					currentState: number,
					progress: number
				}
			}

			declare class OverviewControlsManager extends St.Widget {
				_stateAdjustment: OverviewAdjustment;
				layoutManager: Clutter.BoxLayout & {
					_searchEntry: St.Bin
				}
				_toggleAppsPage(): void
			}
		}


		namespace panelMenu {
			declare class Button extends St.Widget {
				constructor(menuAlignment: number, nameText?: string, dontCreateMenu?: boolean);
				container: St.Bin;
				menu: popupMenu.PopupMenuItem;
			}
		}

		namespace popupMenu {
			declare class PopupMenuItem extends St.BoxLayout {
				constructor(text: string);
				addMenuItem(subMenu: PopupMenuItem);
			}
		}
	}
}

// needs to declare this global every file wherever it's used, since it clashes with default global
declare const global: import('@gi-types/shell').Global;
// declare function log(message: any): void;
// declare function _(str: string): string;