/* eslint-disable @typescript-eslint/no-explicit-any */

import Clutter from 'gi://Clutter';
import GObject from 'gi://GObject';
import St from 'gi://St';

declare type EaseParamsType<T extends GObject.Object> = {
	duration: number;
	mode: Clutter.AnimationMode;
	repeatCount?: number;
	autoReverse?: boolean;
	onStopped?: (isFinished?: boolean) => void;
} & { [P in KeysOfType<T, number>]?: number };

export function easeActor<T extends Clutter.Actor>(actor: T, params: EaseParamsType<T>): void {
	(actor as any).ease(params);
}

export function easeAdjustment(actor: St.Adjustment, value: number, params: EaseParamsType<St.Adjustment>): void {
	(actor as any).ease(value, params);
}