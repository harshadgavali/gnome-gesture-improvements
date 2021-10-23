import GObject from '@gi-types/gobject';
import Shell from '@gi-types/shell';
import Meta from '@gi-types/meta';
import Clutter from '@gi-types/clutter';
import St from '@gi-types/st';
import { imports, global, __shell_private_types } from 'gnome-shell';

const Main = imports.ui.main;
const { lerp } = imports.misc.util;
const { MonitorConstraint } = imports.ui.layout;

import { createSwipeTracker, TouchpadSwipeGesture } from './swipeTracker';
import { OverviewControlsState, ExtSettings, AnimatePanel } from '../constants';
import { CustomEventType } from './utils/clutter';
import { registerClass } from './utils/gobject';
import { easeActor } from './utils/environment';


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

/**
 * GObject Class to animate top panel in circular animation
 * Without displaying it on any other monitors
 */
const DummyCyclicPanel = registerClass(
	class extends Clutter.Actor {
		panelBox: St.BoxLayout<Clutter.Actor<Clutter.LayoutManager, Clutter.ContentPrototype>>;
		private PADDING_WIDTH;
		private _container: Clutter.Actor<Clutter.BoxLayout, Clutter.ContentPrototype>;

		constructor() {
			super({ visible: false });

			this.PADDING_WIDTH = 100 * Main.layoutManager.primaryMonitor.geometry_scale;

			this.panelBox = Main.layoutManager.panelBox;

			this._container = new Clutter.Actor({ layoutManager: new Clutter.BoxLayout({ orientation: Clutter.Orientation.HORIZONTAL, spacing: this.PADDING_WIDTH }) });
			this.add_child(this._container);

			this._container.add_child(new Clutter.Clone({ source: this.panelBox }));
			this._container.add_child(new Clutter.Clone({ source: this.panelBox }));

			this.add_constraint(new MonitorConstraint({ primary: true }));
			this.set_clip_to_allocation(true);
			Main.layoutManager.uiGroup.add_child(this);
		}

		vfunc_get_preferred_height(for_width: number) {
			return this.panelBox.get_preferred_height(for_width);
		}

		vfunc_get_preferred_width(for_height: number) {
			return this.panelBox.get_preferred_width(for_height);
		}

		beginGesture() {
			// hide main panel
			Main.layoutManager.panelBox.opacity = 0;
			this.visible = true;
			Main.layoutManager.uiGroup.set_child_above_sibling(this, null);
		}

		updateGesture(progress: number) {
			this._container.translation_x = this._getTranslationFor(progress);
		}

		endGesture(endProgress: number, duration: number) {
			// gesture returns accelerated end value, hence need to do this
			const current_workspace = global.workspace_manager.get_active_workspace_index();
			const translation_x = (
				endProgress > current_workspace ||
				(endProgress === current_workspace && this._container.translation_x <= this.min_cyclic_translation / 2)
			) ? this.min_cyclic_translation : 0;

			easeActor(this._container, {
				translation_x,
				duration,
				mode: Clutter.AnimationMode.EASE_OUT_CUBIC,
				onStopped: () => {
					this.visible = false;
					Main.layoutManager.panelBox.opacity = 255;
				},
			});
		}

		private _getTranslationFor(progress: number) {
			const begin = Math.floor(progress);
			const end = Math.ceil(progress);
			progress = begin === end ? 0 : (progress - begin) / (end - begin);

			return lerp(0, this.min_cyclic_translation, progress);
		}

		/** returns maximium negative value because translation is always negative */
		get min_cyclic_translation(): number {
			return -(this.width + this.PADDING_WIDTH);
		}
	},
);

class WorkspaceAnimationModifier extends SwipeTrackerEndPointsModifer {
	private _workspaceAnimation: imports.ui.workspaceAnimation.WorkspaceAnimationController;
	protected _swipeTracker: SwipeTrackerT;
	private _window?: Meta.Window;
	private _highlight?: St.Widget;

	private GESTURE_DELAY = 100;
	private _workspaceChangedId = 0;
	private _animatePanel = false;
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
			1 / 1.5,
			{ allowTouch: false },
		);

		if (ExtSettings.ANIMATE_PANEL !== AnimatePanel.None)
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
		if (this._swipeTracker._touchpadGesture?.hadHoldGesture &&
			window &&
			!window.is_always_on_all_workspaces() &&
			window.get_monitor() === monitor &&
			(!Meta.prefs_get_workspaces_only_on_primary() || monitor === Main.layoutManager.primaryMonitor.index)
		)
			return window;
		return undefined;
	}

	protected _gestureBegin(tracker: SwipeTrackerT, monitor: number): void {
		this._highlight?.destroy();

		let panelAnimation = AnimatePanel.None;

		this._window = this._getWindowToMove(monitor);
		if (this._window) {
			panelAnimation = AnimatePanel.MoveWindow;
			this._workspaceAnimation.movingWindow = this._window;
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
			panelAnimation = AnimatePanel.SwitchWorkspace;
			if (this._swipeTracker._touchpadGesture?.followNaturalScroll !== undefined)
				this._swipeTracker._touchpadGesture.followNaturalScroll = ExtSettings.FOLLOW_NATURAL_SCROLL;

			super._modifySnapPoints(tracker, (shallowTracker) => {
				this._workspaceAnimation._switchWorkspaceBegin(shallowTracker, monitor as never);
				tracker.orientation = shallowTracker.orientation;
			});
		}

		if (ExtSettings.ANIMATE_PANEL & panelAnimation) {
			this._animatePanel = true;
			this._dummyCyclicPanel?.beginGesture();
		} else {
			this._animatePanel = false;
		}
	}

	protected _gestureUpdate(tracker: SwipeTrackerT, progress: number): void {
		if (progress < this._firstVal) {
			progress = this._firstVal - (this._firstVal - progress) * 0.05;
		}
		else if (progress > this._lastVal) {
			progress = this._lastVal + (progress - this._lastVal) * 0.05;
		}
		this._workspaceAnimation._switchWorkspaceUpdate(tracker, progress);

		if (this._animatePanel)
			this._dummyCyclicPanel?.updateGesture(progress);
	}

	protected _gestureEnd(tracker: SwipeTrackerT, duration: number, endProgress: number): void {
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

		if (this._animatePanel)
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
			opacity: 255,
			mode: Clutter.AnimationMode.EASE_OUT_QUAD,
			duration: 2 * this.GESTURE_DELAY,
			onStopped: () => {
				windowActor.set_pivot_point(0, 0);
				this._highlight?.set_pivot_point(0, 0);
				callback();
			},
		});
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