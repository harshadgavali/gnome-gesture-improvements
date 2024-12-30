/**
 * @file This file provides {@link registerClass} function similar to {@link GObject.registerClass}
 * Modification provided by {@link registerClass}
 *  - Add `connect(signal_name, ....)` function to prototype returned
 *  - Use parameters of constructor of class , instead of `_init` function of class for new method of prototype returned
 *  - Make `Properties` parameter mandatory @{link https://gitlab.gnome.org/ewlsh/gi.ts/-/issues/6}
 */

/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import GObject from 'gi://GObject';
const OGRegisterClass = GObject.registerClass;

type ConstructorType = new (...args: any[]) => any;

type IFaces<Interfaces extends { $gtype: GObject.GType<any> }[]> = {
	[key in keyof Interfaces]: Interfaces[key] extends { $gtype: GObject.GType<infer I> } ? I : never;
};

type _TupleOf<T, N extends number, R extends T[]> = R['length'] extends N ? R : _TupleOf<T, N, [T, ...R]>;
/** Tuple of Type T, and of length N */
type Tuple<T, N extends number> = _TupleOf<T, N, []>;

type GObjectSignalDefinition<N extends number = 32> = {
	param_types?: Partial<Tuple<GObject.GType, N>>;
	[key: string]: any;
};

/** Get typescript type for {@link GObjectSignalDefinition.param_types} */
type CallBackTypeTuple<T> = T extends any[] ? { [P in keyof T]: T[P] extends GObject.GType<infer R> ? R : never } : [];

export type RegisteredPrototype<
	P extends {},
	Props extends { [key: string]: GObject.ParamSpec },
	Interfaces extends any[],
	Sigs extends { [key: string]: GObjectSignalDefinition }
> = {
	/// This is one of modification done by this file
	connect<K extends keyof Sigs>(
		key: K,
		callback: (
			_source: RegisteredPrototype<P, Props, Interfaces, Sigs>,
			...args: CallBackTypeTuple<Sigs[K]['param_types']>
		) => void,
	): number,
	
} & Properties<P, SnakeToCamel<Props> & SnakeToUnderscore<Props>> & UnionToIntersection<Interfaces[number]> & P;

export type Property<K extends GObject.ParamSpec> = K extends GObject.ParamSpec<infer T> ? T : any;

export type Properties<Prototype extends {}, Properties extends { [key: string]: GObject.ParamSpec }> = Omit<
    {
        [key in keyof Properties | keyof Prototype]: key extends keyof Prototype
            ? never
            : key extends keyof Properties
            ? Property<Properties[key]>
            : never;
    },
    keyof Prototype
>;

type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never;

type SnakeToUnderscoreCase<S extends string> = S extends `${infer T}-${infer U}`
    ? `${T}_${SnakeToUnderscoreCase<U>}`
    : S extends `${infer T}`
    ? `${T}`
    : never;

type SnakeToCamelCase<S extends string> = S extends `${infer T}-${infer U}`
    ? `${Lowercase<T>}${SnakeToPascalCase<U>}`
    : S extends `${infer T}`
    ? `${Lowercase<T>}`
    : SnakeToPascalCase<S>;

type SnakeToPascalCase<S extends string> = string extends S
    ? string
    : S extends `${infer T}-${infer U}`
    ? `${Capitalize<Lowercase<T>>}${SnakeToPascalCase<U>}`
    : S extends `${infer T}`
    ? `${Capitalize<Lowercase<T>>}`
    : never;

type SnakeToCamel<T> = { [P in keyof T as P extends string ? SnakeToCamelCase<P> : P]: T[P] };
type SnakeToUnderscore<T> = { [P in keyof T as P extends string ? SnakeToUnderscoreCase<P> : P]: T[P] };

export type RegisteredClass<
	T extends ConstructorType,
	Props extends { [key: string]: GObject.ParamSpec },
	Interfaces extends { $gtype: GObject.GType<any> }[],
	Sigs extends { [key: string]: GObjectSignalDefinition }
> = T extends { prototype: infer P }
	?
		P extends {}
		?
		{
			$gtype: GObject.GType<RegisteredClass<T, Props, IFaces<Interfaces>, Sigs>>;
			prototype: RegisteredPrototype<P, Props, IFaces<Interfaces>, Sigs>;
			/// use constructor parameter instead of '_init' parameters
			new(...args: ConstructorParameters<T>): RegisteredPrototype<P, Props, IFaces<Interfaces>, Sigs>;
		}
		: never
	: never
	;

export function registerClass<T extends ConstructorType>(klass: T): RegisteredClass<T, {}, [], {}>;
export function registerClass<
	T extends ConstructorType,
	Props extends { [key: string]: GObject.ParamSpec },
	Interfaces extends { $gtype: GObject.GType }[],
	Sigs extends { [key: string]: GObjectSignalDefinition }
>(
	options: {
		GTypeName?: string;
		GTypeFlags?: GObject.TypeFlags;
		/// Make properties mandatory
		Properties: Props;
		Signals?: Sigs;
		Implements?: Interfaces;
		CssName?: string;
		Template?: string;
		Children?: string[];
		InternalChildren?: string[];
	},
	klass: T
): RegisteredClass<T, Props, Interfaces, Sigs>;

export function registerClass(...args: any[]): any {
	if (args.length === 2)
		return OGRegisterClass(args[0], args[1]);
	return OGRegisterClass(args[0]);
}