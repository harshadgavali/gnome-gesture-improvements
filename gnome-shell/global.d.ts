/* eslint-disable @typescript-eslint/no-explicit-any */

declare function log(message: any): void;
declare interface IExtension {
	enable(): void,
	disable(): void;
}

declare interface ISubExtension {
	apply(): void,
	destroy(): void;
}

declare interface Math {
	clamp(num: number, min: number, max: number): number;
}