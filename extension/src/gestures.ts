import GObject from '@gi-types/gobject';
import Shell from '@gi-types/shell';
import { CustomEventType, imports, global, __shell_private_types } from 'gnome-shell';

const Main = imports.ui.main;

import { TouchpadSwipeGesture } from './swipeTracker';
import { OverviewControlsState, ExtSettings } from '../constants';


declare interface ShellSwipeTracker {
	swipeTracker: imports.ui.swipeTracker.SwipeTracker,
	nfingers: number[],
	disableOldGesture: boolean,
	modes: Shell.ActionMode,
	followNaturalScroll: boolean,
	gestureSpeed?: number,
	checkAllowedGesture?: (event: CustomEventType) => boolean
}

export class GestureExtension implements ISubExtension {
	private _stateAdjustment: imports.ui.overviewControls.OverviewAdjustment;
	private _swipeTrackers: ShellSwipeTracker[];

	constructor() {
		this._stateAdjustment = Main.overview._overview._controls._stateAdjustment;
		this._swipeTrackers = [
			{
				swipeTracker: Main.wm._workspaceAnimation._swipeTracker,
				nfingers: (ExtSettings.DEFAULT_SESSION_WORKSPACE_GESTURE ? [3] : [4]),
				disableOldGesture: true,
				followNaturalScroll: true,
				modes: Shell.ActionMode.NORMAL,
				gestureSpeed: 1 / 1.5
			},
			{
				swipeTracker: Main.overview._overview._controls._workspacesDisplay._swipeTracker,
				nfingers: [3, 4],
				disableOldGesture: true,
				followNaturalScroll: true,
				modes: Shell.ActionMode.OVERVIEW,
				gestureSpeed: 1 / 1.5,
				checkAllowedGesture: (event: CustomEventType) => {
					if (Main.overview._overview._controls._searchController.searchActive) {
						return false;
					}
					if (event.get_touchpad_gesture_finger_count() === 4) {
						return true;
					} else {
						return this._stateAdjustment.value === OverviewControlsState.WINDOW_PICKER;
					}
				}
			},
			{
				swipeTracker: Main.overview._overview._controls._appDisplay._swipeTracker,
				nfingers: [3],
				disableOldGesture: true,
				followNaturalScroll: true,
				modes: Shell.ActionMode.OVERVIEW,
				checkAllowedGesture: () => {
					if (Main.overview._overview._controls._searchController.searchActive) {
						return false;
					}
					return this._stateAdjustment.value === OverviewControlsState.APP_GRID;
				}
			}
		];
	}

	apply(): void {
		this._swipeTrackers.forEach(entry => {
			const {
				swipeTracker,
				nfingers,
				disableOldGesture,
				followNaturalScroll,
				modes,
				checkAllowedGesture
			} = entry;
			const gestureSpeed = entry.gestureSpeed ?? 1;
			const touchpadGesture = new TouchpadSwipeGesture(
				nfingers,
				modes,
				swipeTracker.orientation,
				followNaturalScroll,
				checkAllowedGesture,
				gestureSpeed);

			this._attachGestureToTracker(swipeTracker, touchpadGesture, disableOldGesture);
		});
	}

	destroy(): void {
		this._swipeTrackers.reverse().forEach(entry => {
			const { swipeTracker, disableOldGesture } = entry;
			swipeTracker._touchpadGesture?.destroy();
			swipeTracker._touchpadGesture = swipeTracker.__oldTouchpadGesture;
			swipeTracker.__oldTouchpadGesture = undefined;
			if (swipeTracker._touchpadGesture && disableOldGesture) {
				swipeTracker._touchpadGesture._stageCaptureEvent =
					global.stage.connect(
						'captured-event::touchpad',
						swipeTracker._touchpadGesture._handleEvent.bind(swipeTracker._touchpadGesture)
					);
			}
		});
	}

	_attachGestureToTracker(
		swipeTracker: imports.ui.swipeTracker.SwipeTracker,
		touchpadSwipeGesture: typeof TouchpadSwipeGesture.prototype | __shell_private_types.TouchpadGesture,
		disablePrevious: boolean): void {
		if (swipeTracker._touchpadGesture) {
			if (disablePrevious && swipeTracker._touchpadGesture._stageCaptureEvent) {
				global.stage.disconnect(swipeTracker._touchpadGesture._stageCaptureEvent);
				swipeTracker._touchpadGesture._stageCaptureEvent = 0;
			}
			swipeTracker.__oldTouchpadGesture = swipeTracker._touchpadGesture;
		}

		swipeTracker._touchpadGesture = touchpadSwipeGesture as __shell_private_types.TouchpadGesture;
		swipeTracker._touchpadGesture.connect('begin', swipeTracker._beginGesture.bind(swipeTracker));
		swipeTracker._touchpadGesture.connect('update', swipeTracker._updateGesture.bind(swipeTracker));
		swipeTracker._touchpadGesture.connect('end', swipeTracker._endTouchpadGesture.bind(swipeTracker));
		swipeTracker.bind_property('enabled', swipeTracker._touchpadGesture, 'enabled', 0);
		swipeTracker.bind_property('orientation', swipeTracker._touchpadGesture, 'orientation',
			GObject.BindingFlags.SYNC_CREATE);
	}
}