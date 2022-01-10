import { EventType, Event } from '@gi-types/clutter8';

export const ClutterEventType = { TOUCHPAD_HOLD: 1234, ...EventType };

export type CustomEventType = Pick<
	Event,
	'type' | 'get_gesture_phase' |
	'get_touchpad_gesture_finger_count' | 'get_time' |
	'get_coords' | 'get_gesture_motion_delta_unaccelerated' |
	'get_gesture_pinch_scale' | 'get_gesture_pinch_angle_delta'
>; 