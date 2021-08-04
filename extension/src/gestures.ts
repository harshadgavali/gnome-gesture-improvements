import GObject from '@gi-types/gobject';
import Shell from '@gi-types/shell';
import Clutter from '@gi-types/clutter';
import { CustomEventType, imports, global, __shell_private_types } from 'gnome-shell';

const Main = imports.ui.main;

import { createSwipeTracker, TouchpadSwipeGesture } from './swipeTracker';
import { OverviewControlsState, ExtSettings } from '../constants';


declare interface ShallowSwipeTrackerT {
	orientation: Clutter.Orientation,
	confirmSwipe(distance: number, snapPoints: number[], currentProgress: number, cancelProgress: number): void;
}

declare type SwipeTrackerT = imports.ui.swipeTracker.SwipeTracker;
declare interface ShellSwipeTracker {
	swipeTracker: SwipeTrackerT,
	nfingers: number[],
	disableOldGesture: boolean,
	modes: Shell.ActionMode,
	followNaturalScroll: boolean,
	gestureSpeed?: number,
	checkAllowedGesture?: (event: CustomEventType) => boolean
}

abstract class SwipeTrackerEndPointsModifer {
	protected _firstVal = 0;
	protected _lastVal = 0;
	protected abstract _swipeTracker: SwipeTrackerT;

	public apply(): void {
		this._swipeTracker.connect('begin', this._gestureBegin.bind(this));
		this._swipeTracker.connect('update', this._gestureUpdate.bind(this));
		this._swipeTracker.connect('end', this._gestureEnd.bind(this));
	}

	protected abstract _gestureBegin(tracker: SwipeTrackerT, monitor: never): void;
	protected abstract _gestureUpdate(tracker: SwipeTrackerT, progress: number): void;
	protected abstract _gestureEnd(tracker: SwipeTrackerT, duration: number, progress: number): void;

	protected _modifySnapPoints(tracker: SwipeTrackerT, callback: (tracker: ShallowSwipeTrackerT) => void) {
		const _tracker: ShallowSwipeTrackerT = {
			orientation: Clutter.Orientation.HORIZONTAL,
			confirmSwipe: (distance, snapPoints, currentProgress, cancelProgress) => {
				this._firstVal = snapPoints[0];
				this._lastVal = snapPoints[snapPoints.length - 1];

				snapPoints.unshift(this._firstVal - 1);
				snapPoints.push(this._lastVal + 1);

				tracker.orientation = _tracker.orientation;
				tracker.confirmSwipe(distance, snapPoints, currentProgress, cancelProgress);
			},
		};
		callback(_tracker);
	}

	public destroy(): void {
		this._swipeTracker.enabled = false;
	}
}

class WorkspaceAnimationModifier extends SwipeTrackerEndPointsModifer {
	private _workspaceAnimation: imports.ui.workspaceAnimation.WorkspaceAnimationController;
	protected _swipeTracker: SwipeTrackerT;

	constructor(wm: typeof imports.ui.main.wm) {
		super();
		this._workspaceAnimation = wm._workspaceAnimation;
		this._swipeTracker = createSwipeTracker(
			global.stage,
			(ExtSettings.DEFAULT_SESSION_WORKSPACE_GESTURE ? [3] : [4]),
			Shell.ActionMode.NORMAL,
			Clutter.Orientation.HORIZONTAL,
			1 / 1.5,
		);
	}

	apply(): void {
		this._workspaceAnimation._swipeTracker.enabled = false;
		super.apply();
	}

	protected _gestureBegin(tracker: SwipeTrackerT, monitor: never): void {
		super._modifySnapPoints(tracker, (shallowTracker) => {
			this._workspaceAnimation._switchWorkspaceBegin(shallowTracker, monitor);
			tracker.orientation = shallowTracker.orientation;
		});
	}

	protected _gestureUpdate(tracker: SwipeTrackerT, progress: number): void {
		if (progress < this._firstVal) {
			progress = this._firstVal - (this._firstVal - progress) * 0.05;
		}
		else if (progress > this._lastVal) {
			progress = this._lastVal + (progress - this._lastVal) * 0.05;
		}
		this._workspaceAnimation._switchWorkspaceUpdate(tracker, progress);
	}

	protected _gestureEnd(tracker: SwipeTrackerT, duration: number, progress: number): void {
		progress = Math.clamp(progress, this._firstVal, this._lastVal);
		this._workspaceAnimation._switchWorkspaceEnd(tracker, duration, progress);
	}

	destroy(): void {
		this._workspaceAnimation._swipeTracker.enabled = true;
		super.destroy();
	}
}

export class GestureExtension implements ISubExtension {
	private _stateAdjustment: imports.ui.overviewControls.OverviewAdjustment;
	private _swipeTrackers: ShellSwipeTracker[];
	private _workspaceAnimationModifier: WorkspaceAnimationModifier;

	constructor() {
		this._stateAdjustment = Main.overview._overview._controls._stateAdjustment;
		this._swipeTrackers = [
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
				},
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
				},
			},
		];

		this._workspaceAnimationModifier = new WorkspaceAnimationModifier(Main.wm);
	}

	apply(): void {
		this._workspaceAnimationModifier.apply();

		this._swipeTrackers.forEach(entry => {
			const {
				swipeTracker,
				nfingers,
				disableOldGesture,
				followNaturalScroll,
				modes,
				checkAllowedGesture,
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
						swipeTracker._touchpadGesture._handleEvent.bind(swipeTracker._touchpadGesture),
					);
			}
		});

		this._workspaceAnimationModifier.destroy();
	}

	_attachGestureToTracker(
		swipeTracker: SwipeTrackerT,
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