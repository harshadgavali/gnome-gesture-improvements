/* eslint-disable @typescript-eslint/no-explicit-any */

import { Actor, AnimationMode } from '@gi-types/clutter';
import { Adjustment } from '@gi-types/st';

declare interface EaseParamsType {
	duration: number,
	mode: AnimationMode,
	repeatCount?: number,
	autoReverse?: boolean,
	onStopped?: (isFinished?: boolean) => void,
	[key: string]: any
}

export function easeClutterActor(actor: Actor, params: EaseParamsType): void {
	(actor as any).ease(params);
}

export function easeAdjustment(actor: Adjustment, value: number, params: EaseParamsType): void {
	(actor as any).ease(value, params);
}