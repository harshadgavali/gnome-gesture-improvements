/* eslint-disable @typescript-eslint/no-explicit-any */

declare function log(message: any): void;
declare function logError(err: Error, message?: string): void;
declare interface IExtension {
	enable(): void,
	disable(): void;
}

declare interface ISubExtension {
	apply?(): void,
	destroy(): void;
}

// types
declare type KeysOfType<T, U> = { [P in keyof T]: T[P] extends U ? P : never; }[keyof T];

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
declare type KeysThatStartsWith<K extends string, U extends string> = K extends `${U}${infer _R}` ? K : never;

// gjs constants 
// declare const TextDecoder = import('util').TextDecoder;

declare const global: import('gi://Shell').Global;