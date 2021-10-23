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

// types
declare type KeysOfType<T, U> = { [P in keyof T]: T[P] extends U ? P : never; }[keyof T];