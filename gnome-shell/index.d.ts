import Clutter from '@gi-types/clutter';
import Gio from '@gi-types/gio2';
import GObject from '@gi-types/gobject2';
import Meta from '@gi-types/meta';
import Shell from '@gi-types/shell';
import St from '@gi-types/st';

declare const global: import('@gi-types/shell').Global;
declare interface ExtensionUtilsMeta {
	getSettings(schema?: string): Gio.Settings;
	getCurrentExtension(): {
		metadata: ExtensionMeta,
		dir: Gio.FilePrototype,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		imports: any,
	};
	initTranslations(domain?: string): void;
}

declare namespace __shell_private_types {
	declare class TouchpadGesture extends GObject.Object {
		destroy(): void;
		_handleEvent(actor: Clutter.Actor | undefined, event: CustomEventType): boolean;
	}

	declare interface IMonitorState {
		x: number,
		y: number,
		width: number,
		height: number,
		geometry_scale: number,
		index: number,
		inFullscreen: () => boolean,
	}
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
			const actionMode: Shell.ActionMode;
			function notify(message: string): void;
			function activateWindow(window: Meta.Window, time?: number, workspaceNum?: number): void;

			const panel: {
				addToStatusArea(role: string, indicator: Clutter.Actor, position?: number, box?: string): void,
				toggleCalendar(): void,
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
				_gestureBegin(tracker: {
					confirmSwipe: typeof swipeTracker.SwipeTracker.prototype.confirmSwipe;
				}): void;
				_gestureUpdate(tracker: swipeTracker.SwipeTracker, progress: number);
				_gestureEnd(tracker: swipeTracker.SwipeTracker, duration: number, endProgress: number);

				_swipeTracker: swipeTracker.SwipeTracker;
			};

			const layoutManager: GObject.Object & {
				uiGroup: St.Widget,
				panelBox: St.BoxLayout,
				monitors: __shell_private_types.IMonitorState[],
				primaryMonitor: __shell_private_types.IMonitorState,
				currentMonitor: __shell_private_types.IMonitorState,
				getWorkAreaForMonitor: (index: number) => Meta.Rectangle,

				connect(id: 'monitors-changed', callback: () => void);
			};

			const wm: {
				skipNextEffect(actor: Meta.WindowActor): void;
				_workspaceAnimation: workspaceAnimation.WorkspaceAnimationController;
			};

			const osdWindowManager: {
				hideAll(): void;
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
				};

				_toggleAppsPage(): void

				_workspacesDisplay: {
					_swipeTracker: swipeTracker.SwipeTracker
				};

				_appDisplay: {
					_swipeTracker: swipeTracker.SwipeTracker
				};

				_searchController: {
					searchActive: boolean
				};
			}
		}

		namespace swipeTracker {
			declare class SwipeTracker extends GObject.Object {
				orientation: Clutter.Orientation;
				enabled: boolean;
				allowLongSwipes: boolean;
				confirmSwipe(distance: number, snapPoints: number[], currentProgress: number, cancelProgress: number): void;
				destroy(): void;

				_touchGesture?: Clutter.GestureAction;
				_touchpadGesture?: __shell_private_types.TouchpadGesture;
				// custom
				__oldTouchpadGesture?: __shell_private_types.TouchpadGesture;
				//
				_allowedModes: Shell.ActionMode;

				_progress: number;
				_beginGesture(): void;
				_updateGesture(): void;
				_endTouchpadGesture(): void;
				_history: {
					reset(): void;
				};
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

		namespace workspaceAnimation {
			declare class WorkspaceAnimationController {
				_swipeTracker: swipeTracker.SwipeTracker;
				_switchWorkspaceBegin(tracker: {
					orientation: Clutter.Orientation,
					confirmSwipe: typeof swipeTracker.SwipeTracker.prototype.confirmSwipe
				}, monitor: number);

				_switchWorkspaceUpdate(tracker: swipeTracker.SwipeTracker, progress: number);
				_switchWorkspaceEnd(tracker: swipeTracker.SwipeTracker, duration: number, progress: number);

				movingWindow: Meta.Window | undefined;
			}
		}

		namespace layout {
			declare class MonitorConstraint extends Clutter.Constraint {
				constructor(params: Partial<{ primary: boolean, index: number }>);
			}
		}
	}
}

declare namespace imports {
	namespace misc {
		namespace util {
			function spawn(argv: string[]): void;
			function lerp(start: number, end: number, progress: number): number;
		}
	}

	namespace ui {
		namespace altTab {
			declare class WindowSwitcherPopup extends St.Widget {
				_items: St.Widget & {
					window: Meta.Window
				}[];

				_switcherList: St.Widget & {
					_scrollView: {
						hscroll: {
							adjustment: St.Adjustment
						}
					}
				};
				
				_select(n: number): void;
				_resetNoModsTimeout(): void;
				_popModal(): void;

				_noModsTimeoutId: number;
				_initialDelayTimeoutId: number;
				_selectedIndex: number;

				show(backward: boolean, binding: string, mask: number);
			}
		}
	}
}

// types
export type CustomEventType = Pick<
	import('@gi-types/clutter').Event,
	'type' | 'get_gesture_phase' |
	'get_touchpad_gesture_finger_count' | 'get_time' |
	'get_coords' | 'get_gesture_motion_delta_unaccelerated' |
	'get_gesture_pinch_scale' | 'get_gesture_pinch_angle_delta'
>;
