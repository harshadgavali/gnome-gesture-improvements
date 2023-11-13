export declare interface ISubExtension {
	apply?(): void,
	destroy(): void;
}
export declare interface IExtension {
	enable(): void,
	disable(): void;
}