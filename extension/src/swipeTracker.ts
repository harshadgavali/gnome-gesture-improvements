import Clutter from '@gi-types/clutter';
import GObject from '@gi-types/gobject2';
import Meta from '@gi-types/meta';
import Shell from '@gi-types/shell';
import { CustomEventType, global, imports } from 'gnome-shell';
import { registerClass } from '../common/utils/gobject';
import { TouchpadConstants } from '../constants';
import * as DBusUtils from './utils/dbus';

const Main = imports.ui.main;
const { SwipeTracker } = imports.ui.swipeTracker;

// define enum
enum TouchpadState {
	NONE = 0,
	PENDING = 1,
	HANDLING = 2,
	IGNORED = 3,
}

export const TouchpadSwipeGesture = registerClass({
	Properties: {
		'enabled': GObject.ParamSpec.boolean(
			'enabled',
			'enabled',
			'enabled',
			GObject.ParamFlags.READWRITE,
			true,
		),
		'orientation': GObject.ParamSpec.enum(
			'orientation',
			'orientation',
			'orientation',
			GObject.ParamFlags.READWRITE,
			Clutter.Orientation,
			Clutter.Orientation.HORIZONTAL,
		),
	},
	Signals: {
		'begin': { param_types: [GObject.TYPE_UINT, GObject.TYPE_DOUBLE, GObject.TYPE_DOUBLE] },
		'update': { param_types: [GObject.TYPE_UINT, GObject.TYPE_DOUBLE, GObject.TYPE_DOUBLE] },
		'end': { param_types: [GObject.TYPE_UINT, GObject.TYPE_DOUBLE] },
	},
}, class TouchpadSwipeGesture extends GObject.Object {
	private _nfingers: number[];
	private _allowedModes: Shell.ActionMode;
	orientation: Clutter.Orientation;
	private _checkAllowedGesture?: (event: CustomEventType) => boolean;
	private _cumulativeX = 0;
	private _cumulativeY = 0;
	private _followNaturalScroll: boolean;
	_stageCaptureEvent = 0;
	SWIPE_MULTIPLIER: number;
	TOUCHPAD_BASE_HEIGHT = TouchpadConstants.TOUCHPAD_BASE_HEIGHT;
	TOUCHPAD_BASE_WIDTH = TouchpadConstants.TOUCHPAD_BASE_WIDTH;
	DRAG_THRESHOLD_DISTANCE = TouchpadConstants.DRAG_THRESHOLD_DISTANCE;
	enabled = true;

	private _state = TouchpadState.NONE;
	private _toggledDirection = false;
	private _swipeGestureBeginTime = 0;
	private _holdGestureBeginTime = 0;
	private _holdGestureCancelTime = 0;

	constructor(
		nfingers: number[],
		allowedModes: Shell.ActionMode,
		orientation: Clutter.Orientation,
		followNaturalScroll = true,
		checkAllowedGesture?: (event: CustomEventType) => boolean,
		gestureSpeed = 1.0,
	) {
		super();
		this._nfingers = nfingers;
		this._allowedModes = allowedModes;
		this.orientation = orientation;
		this._checkAllowedGesture = checkAllowedGesture;
		this._followNaturalScroll = followNaturalScroll;
		if (Meta.is_wayland_compositor()) {
			this._stageCaptureEvent = global.stage.connect('captured-event::touchpad', this._handleEvent.bind(this));
		} else {
			DBusUtils.subscribe(this._handleEvent.bind(this));
		}

		this.SWIPE_MULTIPLIER = TouchpadConstants.SWIPE_MULTIPLIER * (typeof (gestureSpeed) !== 'number' ? 1.0 : gestureSpeed);
	}

	private _resetState() {
		this._state = TouchpadState.NONE;
		this._toggledDirection = false;

		this._swipeGestureBeginTime = 0;
		this._holdGestureBeginTime = 0;
		this._holdGestureCancelTime = 0;
	}

	private _handleHoldEvent(event: CustomEventType) {
		switch (event.get_gesture_phase()) {
			case Clutter.TouchpadGesturePhase.BEGIN:
				this._holdGestureCancelTime = 0;
				this._holdGestureBeginTime = event.get_time();
				break;
			case Clutter.TouchpadGesturePhase.CANCEL:
				this._holdGestureCancelTime = event.get_time();
				break;
			case Clutter.TouchpadGesturePhase.END:
				this._holdGestureBeginTime = 0;
				this._holdGestureCancelTime = 0;
		}
	}

	_handleEvent(_actor: undefined | Clutter.Actor, event: CustomEventType): boolean {
		if (event.type() === Clutter.EventType.TOUCHPAD_HOLD) {
			this._handleHoldEvent(event);
			return Clutter.EVENT_PROPAGATE;
		}

		if (event.type() !== Clutter.EventType.TOUCHPAD_SWIPE)
			return Clutter.EVENT_PROPAGATE;

		const gesturePhase = event.get_gesture_phase();
		if (gesturePhase === Clutter.TouchpadGesturePhase.BEGIN) {
			this._swipeGestureBeginTime = event.get_time();
			this._state = TouchpadState.NONE;
			this._toggledDirection = false;
		}

		if (this._state === TouchpadState.IGNORED)
			return Clutter.EVENT_PROPAGATE;

		if (!this.enabled)
			return Clutter.EVENT_PROPAGATE;

		if ((this._allowedModes !== Shell.ActionMode.ALL) && ((this._allowedModes & Main.actionMode) === 0)) {
			this._state = TouchpadState.IGNORED;
			return Clutter.EVENT_PROPAGATE;
		}

		if (!this._nfingers.includes(event.get_touchpad_gesture_finger_count())) {
			this._state = TouchpadState.IGNORED;
			return Clutter.EVENT_PROPAGATE;
		}

		if (gesturePhase === Clutter.TouchpadGesturePhase.BEGIN && this._checkAllowedGesture !== undefined) {
			try {
				if (this._checkAllowedGesture(event) !== true) {
					this._state = TouchpadState.IGNORED;
					return Clutter.EVENT_PROPAGATE;
				}
			}
			catch (ex) {
				this._state = TouchpadState.IGNORED;
				return Clutter.EVENT_PROPAGATE;
			}
		}

		const time = event.get_time();

		const [x, y] = event.get_coords();
		const [dx, dy] = event.get_gesture_motion_delta_unaccelerated() as [number, number];

		if (this._state === TouchpadState.NONE) {
			if (dx === 0 && dy === 0)
				return Clutter.EVENT_PROPAGATE;

			this._cumulativeX = 0;
			this._cumulativeY = 0;
			this._state = TouchpadState.PENDING;
		}

		if (this._state === TouchpadState.PENDING) {
			this._cumulativeX += dx * this.SWIPE_MULTIPLIER;
			this._cumulativeY += dy * this.SWIPE_MULTIPLIER;

			const cdx = this._cumulativeX;
			const cdy = this._cumulativeY;
			const distance = Math.sqrt(cdx * cdx + cdy * cdy);

			if (distance >= this.DRAG_THRESHOLD_DISTANCE) {
				const gestureOrientation = Math.abs(cdx) > Math.abs(cdy)
					? Clutter.Orientation.HORIZONTAL
					: Clutter.Orientation.VERTICAL;

				this._cumulativeX = 0;
				this._cumulativeY = 0;

				if (gestureOrientation === this.orientation) {
					this._state = TouchpadState.HANDLING;
					this.emit('begin', time, x, y);
				} else {
					this._state = TouchpadState.IGNORED;
					return Clutter.EVENT_PROPAGATE;
				}
			} else {
				return Clutter.EVENT_PROPAGATE;
			}
		}

		const vertical = this.orientation === Clutter.Orientation.VERTICAL;
		let delta = ((vertical !== this._toggledDirection) ? dy : dx) * this.SWIPE_MULTIPLIER;
		const distance = vertical ? this.TOUCHPAD_BASE_HEIGHT : this.TOUCHPAD_BASE_WIDTH;

		switch (gesturePhase) {
			case Clutter.TouchpadGesturePhase.BEGIN:
			case Clutter.TouchpadGesturePhase.UPDATE:
				if (this._followNaturalScroll)
					delta = -delta;

				this.emit('update', time, delta, distance);
				break;

			case Clutter.TouchpadGesturePhase.END:
			case Clutter.TouchpadGesturePhase.CANCEL:
				this.emit('end', time, distance);
				this._resetState();
				break;
		}

		return this._state === TouchpadState.HANDLING
			? Clutter.EVENT_STOP
			: Clutter.EVENT_PROPAGATE;
	}

	isItHoldAndSwipeGesture() {
		if (this._holdGestureCancelTime === 0)
			return false;
		
		return (
			(this._holdGestureCancelTime - this._holdGestureBeginTime >= TouchpadConstants.HOLD_SWIPE_DELAY_DURATION) &&	// ms
			(this._swipeGestureBeginTime - this._holdGestureCancelTime <= Math.max(100, TouchpadConstants.HOLD_SWIPE_DELAY_DURATION))		// ms
		);
	}

	switchDirectionTo(direction: Clutter.Orientation): void {
		if (this._state !== TouchpadState.HANDLING) {
			return;
		}

		this._toggledDirection = direction !== this.orientation;
	}

	destroy() {
		if (this._stageCaptureEvent) {
			global.stage.disconnect(this._stageCaptureEvent);
			this._stageCaptureEvent = 0;
		}
	}
});

declare type _SwipeTrackerOptionalParams = {
	allowTouch?: boolean,
	allowDrag?: boolean,
	allowScroll?: boolean,
}

export function createSwipeTracker(
	actor: Clutter.Actor,
	nfingers: number[],
	allowedModes: Shell.ActionMode,
	orientation: Clutter.Orientation,
	followNaturalScroll = true,
	gestureSpeed = 1,
	params?: _SwipeTrackerOptionalParams,
): typeof SwipeTracker.prototype {

	params = params ?? {};
	params.allowDrag = params.allowDrag ?? false;
	params.allowScroll = params.allowScroll ?? false;
	const allowTouch = params.allowTouch ?? true;
	delete params.allowTouch;

	// create swipeTracker
	const swipeTracker = new SwipeTracker(
		actor,
		orientation,
		allowedModes,
		params,
	);

	// remove touch gestures
	if (!allowTouch && swipeTracker._touchGesture) {
		global.stage.remove_action(swipeTracker._touchGesture);
		delete swipeTracker._touchGesture;
	}

	// remove old touchpad gesture from swipeTracker
	if (swipeTracker._touchpadGesture) {
		swipeTracker._touchpadGesture.destroy();
		swipeTracker._touchpadGesture = undefined;
	}

	// add touchpadBindings to tracker
	swipeTracker._touchpadGesture = new TouchpadSwipeGesture(
		nfingers,
		swipeTracker._allowedModes,
		swipeTracker.orientation,
		followNaturalScroll,
		undefined,
		gestureSpeed,
	);
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
	return swipeTracker;
}