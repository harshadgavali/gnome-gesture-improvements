import { EventType, TouchpadGesturePhase } from '@gi-types/clutter';

export const ClutterEventType = { ...EventType, TOUCHPAD_HOLD: 1234 };

export interface CustomEventType {
	type(): number,
	get_gesture_phase(): TouchpadGesturePhase,
	get_touchpad_gesture_finger_count(): number,
	get_time(): number,
	get_coords(): [number, number],
	get_gesture_motion_delta_unaccelerated(): [number, number],
	get_is_cancelled(): boolean,
}