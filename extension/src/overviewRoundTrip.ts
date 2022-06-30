import Clutter from '@gi-types/clutter';
import Shell from '@gi-types/shell';
import { global, imports } from 'gnome-shell';
import { OverviewNavigationState } from '../common/settings';
import { ExtSettings, OverviewControlsState } from '../constants';
import { createSwipeTracker } from './swipeTracker';

const Main = imports.ui.main;
const { SwipeTracker } = imports.ui.swipeTracker;

// declare enum
enum ExtensionState {
	// DISABLED = 0,
	DEFAULT = 1,
	CUSTOM = 2,
}

export class OverviewRoundTripGestureExtension implements ISubExtension {
	private _overviewControls: imports.ui.overviewControls.OverviewControlsManager;
	private _stateAdjustment: imports.ui.overviewControls.OverviewAdjustment;
	private _oldGetStateTransitionParams: typeof imports.ui.overviewControls.OverviewAdjustment.prototype.getStateTransitionParams;
	private _swipeTracker?: typeof SwipeTracker.prototype;
	private _progress = 0;
	private _extensionState = ExtensionState.DEFAULT;
	private _connectors: number[];
	private _shownEventId = 0;
	private _hiddenEventId = 0;
	private _navigationStates: OverviewNavigationState;

	constructor(navigationStates: OverviewNavigationState) {
		this._navigationStates = navigationStates;
		this._overviewControls = Main.overview._overview._controls;
		this._stateAdjustment = this._overviewControls._stateAdjustment;
		this._oldGetStateTransitionParams = this._overviewControls._stateAdjustment.getStateTransitionParams;
		this._progress = 0;
		this._connectors = [];
	}

	_getStateTransitionParams(): typeof imports.ui.overviewControls.OverviewAdjustment.prototype.getStateTransitionParams.prototype {
		if (this._extensionState <= ExtensionState.DEFAULT) {
			return this._oldGetStateTransitionParams.call(this._stateAdjustment);
		}
		else if (this._extensionState === ExtensionState.CUSTOM) {
			const currentState = this._stateAdjustment.value;
			const initialState = OverviewControlsState.HIDDEN;
			const finalState = OverviewControlsState.APP_GRID;

			const length = Math.abs(finalState - initialState);
			const progress = Math.abs((currentState - initialState) / length);

			return {
				transitioning: true,
				currentState,
				initialState,
				finalState,
				progress,
			};
		}
	}

	apply(): void {
		Main.overview._swipeTracker.enabled = false;

		this._swipeTracker = createSwipeTracker(
			global.stage,
			(ExtSettings.DEFAULT_OVERVIEW_GESTURE ? [3] : [4]),
			Shell.ActionMode.NORMAL | Shell.ActionMode.OVERVIEW,
			Clutter.Orientation.VERTICAL,
			ExtSettings.DEFAULT_OVERVIEW_GESTURE_DIRECTION,
		);

		this._swipeTracker.orientation = Clutter.Orientation.VERTICAL;
		this._connectors.push(this._swipeTracker.connect('begin', this._gestureBegin.bind(this)));
		this._connectors.push(this._swipeTracker.connect('update', this._gestureUpdate.bind(this)));
		this._connectors.push(this._swipeTracker.connect('end', this._gestureEnd.bind(this)));

		// override 'getStateTransitionParams' function
		this._stateAdjustment.getStateTransitionParams = this._getStateTransitionParams.bind(this);

		this._extensionState = ExtensionState.DEFAULT;
		this._progress = 0;

		// reset extension state to default, when overview is shown and hidden (not showing/hidding event)
		this._shownEventId = Main.overview.connect('shown', () => this._extensionState = ExtensionState.DEFAULT);
		this._hiddenEventId = Main.overview.connect('hidden', () => this._extensionState = ExtensionState.DEFAULT);

	}

	destroy(): void {
		if (this._swipeTracker) {
			this._connectors.forEach(connector => this._swipeTracker?.disconnect(connector));
			this._swipeTracker.destroy();
			this._swipeTracker = undefined;
		}
		this._connectors = [];

		Main.overview._swipeTracker.enabled = true;
		this._stateAdjustment.getStateTransitionParams = this._oldGetStateTransitionParams.bind(this._stateAdjustment);
		Main.overview.disconnect(this._shownEventId);
		Main.overview.disconnect(this._hiddenEventId);
	}

	_gestureBegin(tracker: typeof SwipeTracker.prototype): void {
		const _tracker = {
			confirmSwipe: (distance: number, _snapPoints: number[], currentProgress: number, cancelProgress: number) => {
				tracker.confirmSwipe(
					distance,
					this._getGestureSnapPoints(),
					currentProgress,
					cancelProgress,
				);
			},
		};

		Main.overview._gestureBegin(_tracker);
		this._progress = this._stateAdjustment.value;
		this._extensionState = ExtensionState.DEFAULT;
	}

	_gestureUpdate(tracker: typeof SwipeTracker.prototype, progress: number): void {
		if (progress < OverviewControlsState.HIDDEN ||
			progress > OverviewControlsState.APP_GRID) {
			this._extensionState = ExtensionState.CUSTOM;
		}
		else {
			this._extensionState = ExtensionState.DEFAULT;
		}

		this._progress = progress;
		// log(`update: progress=${progress}, overview progress=${this._getOverviewProgressValue(progress)}`);
		Main.overview._gestureUpdate(tracker, this._getOverviewProgressValue(progress));
	}

	_gestureEnd(tracker: typeof SwipeTracker.prototype, duration: number, endProgress: number): void {
		if (this._progress < OverviewControlsState.HIDDEN) {
			this._extensionState = ExtensionState.CUSTOM;
			endProgress = endProgress >= OverviewControlsState.HIDDEN ?
				OverviewControlsState.HIDDEN :
				OverviewControlsState.APP_GRID;
		}
		else if (this._progress > OverviewControlsState.APP_GRID) {
			this._extensionState = ExtensionState.CUSTOM;
			endProgress = endProgress <= OverviewControlsState.APP_GRID ?
				OverviewControlsState.APP_GRID :
				OverviewControlsState.HIDDEN;
		}
		else {
			this._extensionState = ExtensionState.DEFAULT;
			endProgress = Math.clamp(
				endProgress,
				OverviewControlsState.HIDDEN,
				OverviewControlsState.APP_GRID,
			);
		}

		// log(`end: progress=${this._progress}, endProgress=${endProgress}, overview progress=${this._getOverviewProgressValue(endProgress)}`)
		Main.overview._gestureEnd(tracker, duration, endProgress);
	}

	_getOverviewProgressValue(progress: number): number {
		if (progress < OverviewControlsState.HIDDEN) {
			return Math.min(
				OverviewControlsState.APP_GRID,
				2 * Math.abs(OverviewControlsState.HIDDEN - progress),
			);
		}
		else if (progress > OverviewControlsState.APP_GRID) {
			return Math.min(
				OverviewControlsState.APP_GRID,
				2 * Math.abs(OverviewControlsState.HIDDEN_N - progress),
			);
		}

		return progress;
	}

	private _getGestureSnapPoints(): number[] {
		switch (this._navigationStates) {
			case OverviewNavigationState.CYCLIC:
				return [
					OverviewControlsState.APP_GRID_P,
					OverviewControlsState.HIDDEN,
					OverviewControlsState.WINDOW_PICKER,
					OverviewControlsState.APP_GRID,
					OverviewControlsState.HIDDEN_N,
				];
			case OverviewNavigationState.GNOME:
				return [
					OverviewControlsState.HIDDEN,
					OverviewControlsState.WINDOW_PICKER,
					OverviewControlsState.APP_GRID,
				];
			case OverviewNavigationState.WINDOW_PICKER_ONLY:
				return [
					OverviewControlsState.HIDDEN,
					OverviewControlsState.WINDOW_PICKER,
				];
		}
	}
}