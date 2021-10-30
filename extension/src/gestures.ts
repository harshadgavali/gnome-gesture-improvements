import GObject from '@gi-types/gobject2';
import Shell from '@gi-types/shell0';
import Meta from '@gi-types/meta8';
import Clutter from '@gi-types/clutter8';
import St from '@gi-types/st1';
import { imports, global, __shell_private_types } from 'gnome-shell';

const Main = imports.ui.main;

import { createSwipeTracker, TouchpadSwipeGesture } from './swipeTracker';
import { OverviewControlsState, ExtSettings } from '../constants';
import { CustomEventType } from '../common/utils/clutter';
import { easeActor } from './utils/environment';
import { DummyCyclicPanel } from './holdGestures/animatePanel';
import { AnimatePanel } from '../common/prefs';

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

// declare enum
enum ExtensionState {
	DEFAULT = 0,
	SWITCH_WORKSPACE = AnimatePanel.SWITCH_WORKSPACE,
	MOVE_WINDOW = AnimatePanel.MOVE_WINDOW,
	/** flag: whether to animate panel */
	ANIMATE_PANEL = 4,
	/** flag: whether update/end signal was received from tracker */
	UPDATE_RECEIVED = 8,
}

class WorkspaceAnimationModifier extends SwipeTrackerEndPointsModifer {
	private _workspaceAnimation: imports.ui.workspaceAnimation.WorkspaceAnimationController;
	protected _swipeTracker: SwipeTrackerT;
	private _window?: Meta.Window;
	private _highlight?: St.Widget;

	private GESTURE_DELAY = 75;
	private _workspaceChangedId = 0;
	private _extensionState = ExtensionState.DEFAULT;
	private _dummyCyclicPanel?: typeof DummyCyclicPanel.prototype;

	constructor(wm: typeof imports.ui.main.wm) {
		super();
		this._workspaceAnimation = wm._workspaceAnimation;
		this._swipeTracker = createSwipeTracker(
			global.stage,
			(ExtSettings.DEFAULT_SESSION_WORKSPACE_GESTURE ? [3] : [4]),
			Shell.ActionMode.NORMAL,
			Clutter.Orientation.HORIZONTAL,
			ExtSettings.FOLLOW_NATURAL_SCROLL,
			1,
			{ allowTouch: false },
		);

		this._swipeTracker.allowLongSwipes = false;

		if (ExtSettings.ANIMATE_PANEL !== AnimatePanel.NONE)
			this._dummyCyclicPanel = new DummyCyclicPanel();
	}

	apply(): void {
		if (this._workspaceAnimation._swipeTracker._touchpadGesture) {
			global.stage.disconnect(this._workspaceAnimation._swipeTracker._touchpadGesture._stageCaptureEvent);
			this._workspaceAnimation._swipeTracker._touchpadGesture._stageCaptureEvent = 0;
		}
		super.apply();
	}

	private _getWindowToMove(monitor: number) {
		const window = global.display.get_focus_window() as Meta.Window | null;
		if (ExtSettings.ENABLE_MOVE_WINDOW_TO_WORKSPACE &&
			this._swipeTracker._touchpadGesture?.hadHoldGesture &&
			window &&
			window.get_monitor() === monitor &&
			!window.is_always_on_all_workspaces() &&
			(!Meta.prefs_get_workspaces_only_on_primary() || monitor === Main.layoutManager.primaryMonitor.index)
		)
			return window;
		return undefined;
	}

	protected _gestureBegin(tracker: SwipeTrackerT, monitor: number): void {
		this.reset();
		this._highlight?.destroy();
		this._extensionState = ExtensionState.DEFAULT;

		this._window = this._getWindowToMove(monitor);
		this._workspaceAnimation.movingWindow = this._window;
		if (this._window) {
			this._swipeTracker.allowLongSwipes = true;
			this._extensionState = ExtensionState.MOVE_WINDOW;
			this._highlight = this._getWindowHighlight();
			this._animateHighLight(() => {
				if (this._swipeTracker._touchpadGesture?.followNaturalScroll !== undefined)
					this._swipeTracker._touchpadGesture.followNaturalScroll = false;

				super._modifySnapPoints(tracker, (shallowTracker) => {
					this._workspaceAnimation._switchWorkspaceBegin(shallowTracker, monitor as never);
					tracker.orientation = shallowTracker.orientation;
				});
			});
		}
		else {
			this._swipeTracker.allowLongSwipes = false;
			this._extensionState = ExtensionState.SWITCH_WORKSPACE;
			if (this._swipeTracker._touchpadGesture?.followNaturalScroll !== undefined)
				this._swipeTracker._touchpadGesture.followNaturalScroll = ExtSettings.FOLLOW_NATURAL_SCROLL;

			super._modifySnapPoints(tracker, (shallowTracker) => {
				this._workspaceAnimation._switchWorkspaceBegin(shallowTracker, monitor as never);
				tracker.orientation = shallowTracker.orientation;
			});
		}

		if (ExtSettings.ANIMATE_PANEL & this._extensionState) {
			this._extensionState |= ExtensionState.ANIMATE_PANEL;
			this._dummyCyclicPanel?.beginGesture();
		}
	}

	protected _gestureUpdate(tracker: SwipeTrackerT, progress: number): void {
		if (this._extensionState === ExtensionState.DEFAULT)
			return;
		this._extensionState |= ExtensionState.UPDATE_RECEIVED;
		if (progress < this._firstVal) {
			progress = this._firstVal - (this._firstVal - progress) * 0.05;
		}
		else if (progress > this._lastVal) {
			progress = this._lastVal + (progress - this._lastVal) * 0.05;
		}
		this._workspaceAnimation._switchWorkspaceUpdate(tracker, progress);

		if (this._extensionState & ExtensionState.ANIMATE_PANEL)
			this._dummyCyclicPanel?.updateGesture(progress);
	}

	protected _gestureEnd(tracker: SwipeTrackerT, duration: number, endProgress: number): void {
		if (this._extensionState === ExtensionState.DEFAULT)
			return;
		this._extensionState |= ExtensionState.UPDATE_RECEIVED;
		endProgress = Math.clamp(endProgress, this._firstVal, this._lastVal);

		this._workspaceAnimation._switchWorkspaceEnd(tracker, duration, endProgress);

		if (this._highlight) {
			easeActor(this._highlight, {
				opacity: 0,
				mode: Clutter.AnimationMode.EASE_OUT_QUAD,
				duration: duration,
				onStopped: () => {
					this._highlight?.destroy();
					this._highlight = undefined;
				},
			});
		}

		const workspace = global.workspaceManager.get_workspace_by_index(endProgress) as Meta.Workspace;
		if (!workspace.active && this._window) {
			this._workspaceChangedId = global.workspaceManager.connect('active-workspace-changed', () => {
				if (workspace.active && this._window) {
					this._window.change_workspace(workspace);
					workspace.activate_with_focus(this._window, global.get_current_time());
					this._window = undefined;
				}

				global.workspaceManager.disconnect(this._workspaceChangedId);
				this._workspaceChangedId = 0;
			});
		}

		if (this._extensionState & ExtensionState.ANIMATE_PANEL)
			this._dummyCyclicPanel?.endGesture(endProgress, duration);
	}

	private _getWindowHighlight() {
		if (this._window === undefined)
			return undefined;

		const rect = this._window.get_frame_rect();

		const highlight = new St.Widget({
			style_class: 'cycler-highlight',
			x: rect.x,
			y: rect.y,
			width: rect.width,
			height: rect.height,
			style: 'border-radius: 6px;',
			opacity: 0,
			visible: true,
		});
		Main.layoutManager.uiGroup.add_child(highlight);
		return highlight;
	}

	private _easeActor<T extends Clutter.Actor>(actor: T, props: { [P in KeysOfType<T, number>]?: number }): void {
		easeActor(actor, {
			...props,
			duration: this.GESTURE_DELAY,
			mode: Clutter.AnimationMode.EASE_OUT_QUAD,
			autoReverse: true,
			repeatCount: 1,
		});
	}

	private _animateHighLight(callback: () => void) {
		if (this._highlight === undefined || this._window === undefined) {
			callback();
			return;
		}

		const windowActor = this._window.get_compositor_private() as Meta.WindowActor;

		[windowActor, this._highlight].forEach(actor => {
			actor.set_pivot_point(0.5, 0.5);
			this._easeActor(actor, { scale_x: 0.95 });
			this._easeActor(actor, { scale_y: 0.95 });
		});

		easeActor(this._highlight, {
			opacity: 200,
			mode: Clutter.AnimationMode.EASE_OUT_QUAD,
			duration: 2 * this.GESTURE_DELAY,
			onStopped: () => {
				callback();
				this._animateHighLightWaitForGestureUpdate(windowActor);
			},
		});
	}

	private _animateHighLightWaitForGestureUpdate(actor: Meta.WindowActor) {
		if (!this._highlight) {
			actor.set_pivot_point(0, 0);
			return;
		}
		easeActor(this._highlight, {
			opacity: 255,
			mode: Clutter.AnimationMode.EASE_OUT_QUAD,
			duration: 2 * this.GESTURE_DELAY,
			onStopped: () => {
				log('animate highlight complete');
				actor.set_pivot_point(0, 0);
				this._highlight?.set_pivot_point(0, 0);
				// no update received on highlight showing
				if ((this._extensionState & ExtensionState.UPDATE_RECEIVED) === 0)
					this.reset();
			},
		});
	}

	private reset() {
		this._highlight?.destroy();
		this._highlight = undefined;

		const active_workspace = global.workspace_manager.get_active_workspace_index();

		if ((this._extensionState & ExtensionState.SWITCH_WORKSPACE) || (this._extensionState & ExtensionState.MOVE_WINDOW))
			this._workspaceAnimation._switchWorkspaceEnd(this._swipeTracker, 0, active_workspace);

		if (this._extensionState & ExtensionState.ANIMATE_PANEL)
			this._dummyCyclicPanel?.endGesture(global.workspace_manager.get_active_workspace_index(), 0);

		this._extensionState = ExtensionState.DEFAULT;
		this._window = undefined;
		this._workspaceAnimation.movingWindow = undefined;
	}

	destroy(): void {
		this._dummyCyclicPanel?.destroy();
		this._swipeTracker.destroy();

		if (this._workspaceChangedId)
			global.workspaceManager.disconnect(this._workspaceChangedId);

		const swipeTracker = this._workspaceAnimation._swipeTracker;
		if (swipeTracker._touchpadGesture) {
			swipeTracker._touchpadGesture._stageCaptureEvent = global.stage.connect(
				'captured-event::touchpad',
				swipeTracker._touchpadGesture._handleEvent.bind(
					swipeTracker._touchpadGesture,
				),
			);
		}

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
				followNaturalScroll: ExtSettings.FOLLOW_NATURAL_SCROLL,
				modes: Shell.ActionMode.OVERVIEW,
				gestureSpeed: 1,
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
				followNaturalScroll: ExtSettings.FOLLOW_NATURAL_SCROLL,
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
				gestureSpeed,
			);

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
		disablePrevious: boolean,
	): void {
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
		swipeTracker.bind_property(
			'orientation',
			swipeTracker._touchpadGesture,
			'orientation',
			GObject.BindingFlags.SYNC_CREATE,
		);
	}
}