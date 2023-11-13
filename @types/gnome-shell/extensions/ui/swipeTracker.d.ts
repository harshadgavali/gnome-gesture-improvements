import Clutter from '@gi-types/clutter';
import GObject from '@gi-types/gobject2';
import Shell from '@gi-types/shell';

const global: import('@gi-types/shell').Global;

// types
export type CustomEventType = Pick<
	import('../../../clutter12').Event,
	'type' | 'get_gesture_phase' |
	'get_touchpad_gesture_finger_count' | 'get_time' |
	'get_coords' | 'get_gesture_motion_delta_unaccelerated' |
	'get_gesture_pinch_scale' | 'get_gesture_pinch_angle_delta'
>;

declare namespace __shell_private_types {
	class TouchpadGesture extends GObject.Object {
		destroy(): void;
		_handleEvent(actor: Clutter.Actor | undefined, event: CustomEventType): boolean;
	}

	interface IMonitorState {
		x: number,
		y: number,
		width: number,
		height: number,
		geometry_scale: number,
		index: number,
		inFullscreen: () => boolean,
	}
}

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