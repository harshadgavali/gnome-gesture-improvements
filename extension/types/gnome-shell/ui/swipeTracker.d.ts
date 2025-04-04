declare module "resource:///org/gnome/shell/ui/swipeTracker.js" {
    import Clutter from 'gi://Clutter';
    import GObject from 'gi://GObject';
    import Shell from 'gi://Shell';
    // import { Orientation } from '../../types/clutter/index.js';

    class TouchpadGesture extends GObject.Object {
        destroy(): void;
        _handleEvent(actor: Clutter.Actor | undefined, event: CustomEventType): boolean;
    }

    class SwipeTracker extends GObject.Object {
        constructor(actor: Clutter.Actor, orientation: Clutter.Orientation, allowedModes: Shell.ActionMode, params?: _SwipeTrackerOptionalParams)
        orientation: Clutter.Orientation;
        enabled: boolean;
        allowLongSwipes: boolean;
        confirmSwipe(distance: number, snapPoints: number[], currentProgress: number, cancelProgress: number): void;
        destroy(): void;

        _touchGesture?: Clutter.GestureAction;
        _touchpadGesture?: TouchpadGesture;
        // custom
        __oldTouchpadGesture?: TouchpadGesture;
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

    export type _SwipeTrackerOptionalParams = {
        allowTouch?: boolean,
        allowDrag?: boolean,
        allowScroll?: boolean,
    }

    // types
    export type CustomEventType = Pick<
    Clutter.Event,
    'type' | 'get_gesture_phase' |
    'get_touchpad_gesture_finger_count' | 'get_time' |
    'get_coords' | 'get_gesture_motion_delta_unaccelerated' |
    'get_gesture_pinch_scale' | 'get_gesture_pinch_angle_delta'
    >;
}