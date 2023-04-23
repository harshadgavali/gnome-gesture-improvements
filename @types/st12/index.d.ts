/**
 * St 12
 *
 * Generated from 12.0
 */

import * as Atk from "@gi-types/atk1";
import * as Gio from "@gi-types/gio2";
import * as GObject from "@gi-types/gobject2";
import * as Clutter from "@gi-types/clutter12";
import * as Cogl from "@gi-types/cogl12";
import * as Cally from "@gi-types/cally12";
import * as GLib from "@gi-types/glib2";
import * as cairo from "@gi-types/cairo1";
import * as GdkPixbuf from "@gi-types/gdkpixbuf2";
import * as Pango from "@gi-types/pango1";
import * as Json from "@gi-types/json1";

export function describe_actor(actor: Clutter.Actor): string;
export function icon_theme_error_quark(): GLib.Quark;
export type ClipboardCallbackFunc = (clipboard: Clipboard, text: string) => void;
export type ClipboardContentCallbackFunc = (clipboard: Clipboard, bytes: GLib.Bytes | Uint8Array) => void;
export type EntryCursorFunc = (entry: Entry, use_ibeam: boolean, data?: any | null) => void;

export namespace Align {
    export const $gtype: GObject.GType<Align>;
}

export enum Align {
    START = 0,
    MIDDLE = 1,
    END = 2,
}

export namespace BackgroundSize {
    export const $gtype: GObject.GType<BackgroundSize>;
}

export enum BackgroundSize {
    AUTO = 0,
    CONTAIN = 1,
    COVER = 2,
    FIXED = 3,
}

export namespace ClipboardType {
    export const $gtype: GObject.GType<ClipboardType>;
}

export enum ClipboardType {
    PRIMARY = 0,
    CLIPBOARD = 1,
}

export namespace Corner {
    export const $gtype: GObject.GType<Corner>;
}

export enum Corner {
    TOPLEFT = 0,
    TOPRIGHT = 1,
    BOTTOMRIGHT = 2,
    BOTTOMLEFT = 3,
}

export namespace DirectionType {
    export const $gtype: GObject.GType<DirectionType>;
}

export enum DirectionType {
    TAB_FORWARD = 0,
    TAB_BACKWARD = 1,
    UP = 2,
    DOWN = 3,
    LEFT = 4,
    RIGHT = 5,
}

export namespace GradientType {
    export const $gtype: GObject.GType<GradientType>;
}

export enum GradientType {
    NONE = 0,
    VERTICAL = 1,
    HORIZONTAL = 2,
    RADIAL = 3,
}

export namespace IconStyle {
    export const $gtype: GObject.GType<IconStyle>;
}

export enum IconStyle {
    REQUESTED = 0,
    REGULAR = 1,
    SYMBOLIC = 2,
}

export class IconThemeError extends GLib.Error {
    static $gtype: GObject.GType<IconThemeError>;

    constructor(options: { message: string; code: number });
    constructor(copy: IconThemeError);

    // Fields
    static NOT_FOUND: number;
    static FAILED: number;

    // Members
    static quark(): GLib.Quark;
}

export namespace PolicyType {
    export const $gtype: GObject.GType<PolicyType>;
}

export enum PolicyType {
    ALWAYS = 0,
    AUTOMATIC = 1,
    NEVER = 2,
    EXTERNAL = 3,
}

export namespace Side {
    export const $gtype: GObject.GType<Side>;
}

export enum Side {
    TOP = 0,
    RIGHT = 1,
    BOTTOM = 2,
    LEFT = 3,
}

export namespace TextAlign {
    export const $gtype: GObject.GType<TextAlign>;
}

export enum TextAlign {
    LEFT = 0,
    CENTER = 1,
    RIGHT = 2,
    JUSTIFY = 3,
}

export namespace TextureCachePolicy {
    export const $gtype: GObject.GType<TextureCachePolicy>;
}

export enum TextureCachePolicy {
    NONE = 0,
    FOREVER = 1,
}

export namespace ButtonMask {
    export const $gtype: GObject.GType<ButtonMask>;
}

export enum ButtonMask {
    ONE = 1,
    TWO = 2,
    THREE = 4,
}

export namespace IconLookupFlags {
    export const $gtype: GObject.GType<IconLookupFlags>;
}

export enum IconLookupFlags {
    NO_SVG = 1,
    FORCE_SVG = 2,
    GENERIC_FALLBACK = 4,
    FORCE_SIZE = 8,
    FORCE_REGULAR = 16,
    FORCE_SYMBOLIC = 32,
    DIR_LTR = 64,
    DIR_RTL = 128,
}

export namespace TextDecoration {
    export const $gtype: GObject.GType<TextDecoration>;
}

export enum TextDecoration {
    UNDERLINE = 1,
    OVERLINE = 2,
    LINE_THROUGH = 4,
    BLINK = 8,
}
export module Adjustment {
    export interface ConstructorProperties extends GObject.Object.ConstructorProperties {
        [key: string]: any;
        actor: Clutter.Actor;
        lower: number;
        page_increment: number;
        pageIncrement: number;
        page_size: number;
        pageSize: number;
        step_increment: number;
        stepIncrement: number;
        upper: number;
        value: number;
    }
}
export class Adjustment extends GObject.Object implements Clutter.Animatable {
    static $gtype: GObject.GType<Adjustment>;

    constructor(properties?: Partial<Adjustment.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<Adjustment.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get actor(): Clutter.Actor;
    set actor(val: Clutter.Actor);
    get lower(): number;
    set lower(val: number);
    get page_increment(): number;
    set page_increment(val: number);
    get pageIncrement(): number;
    set pageIncrement(val: number);
    get page_size(): number;
    set page_size(val: number);
    get pageSize(): number;
    set pageSize(val: number);
    get step_increment(): number;
    set step_increment(val: number);
    get stepIncrement(): number;
    set stepIncrement(val: number);
    get upper(): number;
    set upper(val: number);
    get value(): number;
    set value(val: number);

    // Signals

    connect(id: string, callback: (...args: any[]) => any): number;
    connect_after(id: string, callback: (...args: any[]) => any): number;
    emit(id: string, ...args: any[]): void;
    connect(signal: "changed", callback: (_source: this) => void): number;
    connect_after(signal: "changed", callback: (_source: this) => void): number;
    emit(signal: "changed"): void;

    // Constructors

    static ["new"](
        actor: Clutter.Actor | null,
        value: number,
        lower: number,
        upper: number,
        step_increment: number,
        page_increment: number,
        page_size: number
    ): Adjustment;

    // Members

    add_transition(name: string, transition: Clutter.Transition): void;
    adjust_for_scroll_event(delta: number): void;
    clamp_page(lower: number, upper: number): void;
    get_transition(name: string): Clutter.Transition | null;
    get_value(): number;
    get_values(): [number | null, number | null, number | null, number | null, number | null, number | null];
    remove_transition(name: string): void;
    set_value(value: number): void;
    set_values(
        value: number,
        lower: number,
        upper: number,
        step_increment: number,
        page_increment: number,
        page_size: number
    ): void;
    vfunc_changed(): void;

    // Implemented Members

    find_property(property_name: string): GObject.ParamSpec;
    get_actor(): Clutter.Actor;
    get_initial_state(property_name: string, value: GObject.Value | any): void;
    interpolate_value(property_name: string, interval: Clutter.Interval, progress: number): [boolean, unknown];
    set_final_state(property_name: string, value: GObject.Value | any): void;
    vfunc_find_property(property_name: string): GObject.ParamSpec;
    vfunc_get_actor(): Clutter.Actor;
    vfunc_get_initial_state(property_name: string, value: GObject.Value | any): void;
    vfunc_interpolate_value(property_name: string, interval: Clutter.Interval, progress: number): [boolean, unknown];
    vfunc_set_final_state(property_name: string, value: GObject.Value | any): void;
}
export module Bin {
    export interface ConstructorProperties extends Widget.ConstructorProperties {
        [key: string]: any;
        child: Clutter.Actor;
    }
}
export class Bin
    extends Widget
    implements Atk.ImplementorIface, Clutter.Animatable, Clutter.Container, Clutter.Scriptable
{
    static $gtype: GObject.GType<Bin>;

    constructor(properties?: Partial<Bin.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<Bin.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get child(): Clutter.Actor;
    set child(val: Clutter.Actor);

    // Constructors

    static ["new"](): Bin;

    // Members

    get_child(): Clutter.Actor | null;
    set_child(child?: Clutter.Actor | null): void;
}
export module BorderImage {
    export interface ConstructorProperties extends GObject.Object.ConstructorProperties {
        [key: string]: any;
    }
}
export class BorderImage extends GObject.Object {
    static $gtype: GObject.GType<BorderImage>;

    constructor(properties?: Partial<BorderImage.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<BorderImage.ConstructorProperties>, ...args: any[]): void;

    // Constructors

    static ["new"](
        file: Gio.File,
        border_top: number,
        border_right: number,
        border_bottom: number,
        border_left: number,
        scale_factor: number
    ): BorderImage;

    // Members

    equal(other: BorderImage): boolean;
    get_borders(border_top: number, border_right: number, border_bottom: number, border_left: number): void;
    get_file(): Gio.File;
}
export module BoxLayout {
    export interface ConstructorProperties extends Viewport.ConstructorProperties {
        [key: string]: any;
        pack_start: boolean;
        packStart: boolean;
        vertical: boolean;
    }
}
export class BoxLayout
    extends Viewport
    implements Atk.ImplementorIface, Clutter.Animatable, Clutter.Container, Clutter.Scriptable, Scrollable
{
    static $gtype: GObject.GType<BoxLayout>;

    constructor(properties?: Partial<BoxLayout.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<BoxLayout.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get pack_start(): boolean;
    set pack_start(val: boolean);
    get packStart(): boolean;
    set packStart(val: boolean);
    get vertical(): boolean;
    set vertical(val: boolean);

    // Implemented Properties

    get hadjustment(): Adjustment;
    set hadjustment(val: Adjustment);
    get vadjustment(): Adjustment;
    set vadjustment(val: Adjustment);

    // Constructors

    static ["new"](): BoxLayout;

    // Members

    get_pack_start(): boolean;
    get_vertical(): boolean;
    set_pack_start(pack_start: boolean): void;
    set_vertical(vertical: boolean): void;

    // Implemented Members

    get_adjustments(hadjustment: Adjustment, vadjustment: Adjustment): void;
    set_adjustments(hadjustment: Adjustment, vadjustment: Adjustment): void;
    vfunc_get_adjustments(hadjustment: Adjustment, vadjustment: Adjustment): void;
    vfunc_set_adjustments(hadjustment: Adjustment, vadjustment: Adjustment): void;
}
export module Button {
    export interface ConstructorProperties extends Bin.ConstructorProperties {
        [key: string]: any;
        button_mask: ButtonMask;
        buttonMask: ButtonMask;
        checked: boolean;
        icon_name: string;
        iconName: string;
        label: string;
        pressed: boolean;
        toggle_mode: boolean;
        toggleMode: boolean;
    }
}
export class Button
    extends Bin
    implements Atk.ImplementorIface, Clutter.Animatable, Clutter.Container, Clutter.Scriptable
{
    static $gtype: GObject.GType<Button>;

    constructor(properties?: Partial<Button.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<Button.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get button_mask(): ButtonMask;
    set button_mask(val: ButtonMask);
    get buttonMask(): ButtonMask;
    set buttonMask(val: ButtonMask);
    get checked(): boolean;
    set checked(val: boolean);
    get icon_name(): string;
    set icon_name(val: string);
    get iconName(): string;
    set iconName(val: string);
    get label(): string;
    set label(val: string);
    get pressed(): boolean;
    get toggle_mode(): boolean;
    set toggle_mode(val: boolean);
    get toggleMode(): boolean;
    set toggleMode(val: boolean);

    // Signals

    connect(id: string, callback: (...args: any[]) => any): number;
    connect_after(id: string, callback: (...args: any[]) => any): number;
    emit(id: string, ...args: any[]): void;
    connect(signal: "clicked", callback: (_source: this, clicked_button: number) => void): number;
    connect_after(signal: "clicked", callback: (_source: this, clicked_button: number) => void): number;
    emit(signal: "clicked", clicked_button: number): void;

    // Constructors

    static ["new"](): Button;
    static new_with_label(text: string): Button;

    // Members

    fake_release(): void;
    get_button_mask(): ButtonMask;
    get_checked(): boolean;
    get_icon_name(): string | null;
    get_label(): string;
    get_toggle_mode(): boolean;
    set_button_mask(mask: ButtonMask): void;
    set_checked(checked: boolean): void;
    set_icon_name(icon_name: string): void;
    set_label(text?: string | null): void;
    set_toggle_mode(toggle: boolean): void;
    vfunc_clicked(clicked_button: number): void;
    vfunc_transition(): void;
}
export module Clipboard {
    export interface ConstructorProperties extends GObject.Object.ConstructorProperties {
        [key: string]: any;
    }
}
export class Clipboard extends GObject.Object {
    static $gtype: GObject.GType<Clipboard>;

    constructor(properties?: Partial<Clipboard.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<Clipboard.ConstructorProperties>, ...args: any[]): void;

    // Members

    get_content(type: ClipboardType, mimetype: string, callback: ClipboardContentCallbackFunc): void;
    get_mimetypes(type: ClipboardType): string[];
    get_text(type: ClipboardType, callback: ClipboardCallbackFunc): void;
    set_content(type: ClipboardType, mimetype: string, bytes: GLib.Bytes | Uint8Array): void;
    set_text(type: ClipboardType, text: string): void;
    static get_default(): Clipboard;
}
export module DrawingArea {
    export interface ConstructorProperties extends Widget.ConstructorProperties {
        [key: string]: any;
    }
}
export class DrawingArea
    extends Widget
    implements Atk.ImplementorIface, Clutter.Animatable, Clutter.Container, Clutter.Scriptable
{
    static $gtype: GObject.GType<DrawingArea>;

    constructor(properties?: Partial<DrawingArea.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<DrawingArea.ConstructorProperties>, ...args: any[]): void;

    // Signals

    connect(id: string, callback: (...args: any[]) => any): number;
    connect_after(id: string, callback: (...args: any[]) => any): number;
    emit(id: string, ...args: any[]): void;
    connect(signal: "repaint", callback: (_source: this) => void): number;
    connect_after(signal: "repaint", callback: (_source: this) => void): number;
    emit(signal: "repaint"): void;

    // Members

    get_context(): cairo.Context;
    get_surface_size(): [number | null, number | null];
    queue_repaint(): void;
    vfunc_repaint(): void;
}
export module Entry {
    export interface ConstructorProperties extends Widget.ConstructorProperties {
        [key: string]: any;
        clutter_text: Clutter.Text;
        clutterText: Clutter.Text;
        hint_actor: Clutter.Actor;
        hintActor: Clutter.Actor;
        hint_text: string;
        hintText: string;
        input_hints: Clutter.InputContentHintFlags;
        inputHints: Clutter.InputContentHintFlags;
        input_purpose: Clutter.InputContentPurpose;
        inputPurpose: Clutter.InputContentPurpose;
        primary_icon: Clutter.Actor;
        primaryIcon: Clutter.Actor;
        secondary_icon: Clutter.Actor;
        secondaryIcon: Clutter.Actor;
        text: string;
    }
}
export class Entry
    extends Widget
    implements Atk.ImplementorIface, Clutter.Animatable, Clutter.Container, Clutter.Scriptable
{
    static $gtype: GObject.GType<Entry>;

    constructor(properties?: Partial<Entry.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<Entry.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get clutter_text(): Clutter.Text;
    get clutterText(): Clutter.Text;
    get hint_actor(): Clutter.Actor;
    set hint_actor(val: Clutter.Actor);
    get hintActor(): Clutter.Actor;
    set hintActor(val: Clutter.Actor);
    get hint_text(): string;
    set hint_text(val: string);
    get hintText(): string;
    set hintText(val: string);
    get input_hints(): Clutter.InputContentHintFlags;
    set input_hints(val: Clutter.InputContentHintFlags);
    get inputHints(): Clutter.InputContentHintFlags;
    set inputHints(val: Clutter.InputContentHintFlags);
    get input_purpose(): Clutter.InputContentPurpose;
    set input_purpose(val: Clutter.InputContentPurpose);
    get inputPurpose(): Clutter.InputContentPurpose;
    set inputPurpose(val: Clutter.InputContentPurpose);
    get primary_icon(): Clutter.Actor;
    set primary_icon(val: Clutter.Actor);
    get primaryIcon(): Clutter.Actor;
    set primaryIcon(val: Clutter.Actor);
    get secondary_icon(): Clutter.Actor;
    set secondary_icon(val: Clutter.Actor);
    get secondaryIcon(): Clutter.Actor;
    set secondaryIcon(val: Clutter.Actor);
    get text(): string;
    set text(val: string);

    // Signals

    connect(id: string, callback: (...args: any[]) => any): number;
    connect_after(id: string, callback: (...args: any[]) => any): number;
    emit(id: string, ...args: any[]): void;
    connect(signal: "primary-icon-clicked", callback: (_source: this) => void): number;
    connect_after(signal: "primary-icon-clicked", callback: (_source: this) => void): number;
    emit(signal: "primary-icon-clicked"): void;
    connect(signal: "secondary-icon-clicked", callback: (_source: this) => void): number;
    connect_after(signal: "secondary-icon-clicked", callback: (_source: this) => void): number;
    emit(signal: "secondary-icon-clicked"): void;

    // Constructors

    static ["new"](text?: string | null): Entry;
    // Conflicted with Clutter.Actor.new
    static ["new"](...args: never[]): any;

    // Members

    get_clutter_text(): Clutter.Actor;
    get_hint_actor(): Clutter.Actor | null;
    get_hint_text(): string | null;
    get_input_hints(): Clutter.InputContentHintFlags;
    get_input_purpose(): Clutter.InputContentPurpose;
    get_primary_icon(): Clutter.Actor | null;
    get_secondary_icon(): Clutter.Actor | null;
    get_text(): string;
    set_hint_actor(hint_actor?: Clutter.Actor | null): void;
    set_hint_text(text?: string | null): void;
    set_input_hints(hints: Clutter.InputContentHintFlags): void;
    set_input_purpose(purpose: Clutter.InputContentPurpose): void;
    set_primary_icon(icon?: Clutter.Actor | null): void;
    set_secondary_icon(icon?: Clutter.Actor | null): void;
    set_text(text?: string | null): void;
    vfunc_primary_icon_clicked(): void;
    vfunc_secondary_icon_clicked(): void;
}
export module FocusManager {
    export interface ConstructorProperties extends GObject.Object.ConstructorProperties {
        [key: string]: any;
    }
}
export class FocusManager extends GObject.Object {
    static $gtype: GObject.GType<FocusManager>;

    constructor(properties?: Partial<FocusManager.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<FocusManager.ConstructorProperties>, ...args: any[]): void;

    // Members

    add_group(root: Widget): void;
    get_group(widget: Widget): Widget;
    navigate_from_event(event: Clutter.Event): boolean;
    remove_group(root: Widget): void;
    static get_for_stage(stage: Clutter.Stage): FocusManager;
}
export module GenericAccessible {
    export interface ConstructorProperties extends WidgetAccessible.ConstructorProperties {
        [key: string]: any;
    }
}
export class GenericAccessible extends WidgetAccessible implements Atk.Action, Atk.Component, Atk.Value {
    static $gtype: GObject.GType<GenericAccessible>;

    constructor(properties?: Partial<GenericAccessible.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<GenericAccessible.ConstructorProperties>, ...args: any[]): void;

    // Signals

    connect(id: string, callback: (...args: any[]) => any): number;
    connect_after(id: string, callback: (...args: any[]) => any): number;
    emit(id: string, ...args: any[]): void;
    connect(signal: "get-current-value", callback: (_source: this) => number): number;
    connect_after(signal: "get-current-value", callback: (_source: this) => number): number;
    emit(signal: "get-current-value"): void;
    connect(signal: "get-maximum-value", callback: (_source: this) => number): number;
    connect_after(signal: "get-maximum-value", callback: (_source: this) => number): number;
    emit(signal: "get-maximum-value"): void;
    connect(signal: "get-minimum-increment", callback: (_source: this) => number): number;
    connect_after(signal: "get-minimum-increment", callback: (_source: this) => number): number;
    emit(signal: "get-minimum-increment"): void;
    connect(signal: "get-minimum-value", callback: (_source: this) => number): number;
    connect_after(signal: "get-minimum-value", callback: (_source: this) => number): number;
    emit(signal: "get-minimum-value"): void;
    connect(signal: "set-current-value", callback: (_source: this, new_value: number) => void): number;
    connect_after(signal: "set-current-value", callback: (_source: this, new_value: number) => void): number;
    emit(signal: "set-current-value", new_value: number): void;

    // Constructors

    static new_for_actor(actor: Clutter.Actor): GenericAccessible;

    // Implemented Members

    get_current_value(): unknown;
    get_increment(): number;
    get_maximum_value(): unknown;
    get_minimum_increment(): unknown;
    get_minimum_value(): unknown;
    get_range(): Atk.Range | null;
    get_sub_ranges(): Atk.Range[];
    get_value_and_text(): [number, string | null];
    set_current_value(value: GObject.Value | any): boolean;
    set_value(new_value: number): void;
    vfunc_get_current_value(): unknown;
    vfunc_get_increment(): number;
    vfunc_get_maximum_value(): unknown;
    vfunc_get_minimum_increment(): unknown;
    vfunc_get_minimum_value(): unknown;
    vfunc_get_range(): Atk.Range | null;
    vfunc_get_sub_ranges(): Atk.Range[];
    vfunc_get_value_and_text(): [number, string | null];
    vfunc_set_current_value(value: GObject.Value | any): boolean;
    vfunc_set_value(new_value: number): void;
}
export module Icon {
    export interface ConstructorProperties extends Widget.ConstructorProperties {
        [key: string]: any;
        fallback_gicon: Gio.Icon;
        fallbackGicon: Gio.Icon;
        fallback_icon_name: string;
        fallbackIconName: string;
        gicon: Gio.Icon;
        icon_name: string;
        iconName: string;
        icon_size: number;
        iconSize: number;
    }
}
export class Icon
    extends Widget
    implements Atk.ImplementorIface, Clutter.Animatable, Clutter.Container, Clutter.Scriptable
{
    static $gtype: GObject.GType<Icon>;

    constructor(properties?: Partial<Icon.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<Icon.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get fallback_gicon(): Gio.Icon;
    set fallback_gicon(val: Gio.Icon);
    get fallbackGicon(): Gio.Icon;
    set fallbackGicon(val: Gio.Icon);
    get fallback_icon_name(): string;
    set fallback_icon_name(val: string);
    get fallbackIconName(): string;
    set fallbackIconName(val: string);
    get gicon(): Gio.Icon;
    set gicon(val: Gio.Icon);
    get icon_name(): string;
    set icon_name(val: string);
    get iconName(): string;
    set iconName(val: string);
    get icon_size(): number;
    set icon_size(val: number);
    get iconSize(): number;
    set iconSize(val: number);

    // Constructors

    static ["new"](): Icon;

    // Members

    get_fallback_gicon(): Gio.Icon;
    get_fallback_icon_name(): string;
    get_gicon(): Gio.Icon | null;
    get_icon_name(): string | null;
    get_icon_size(): number;
    set_fallback_gicon(fallback_gicon?: Gio.Icon | null): void;
    set_fallback_icon_name(fallback_icon_name?: string | null): void;
    set_gicon(gicon?: Gio.Icon | null): void;
    set_icon_name(icon_name?: string | null): void;
    set_icon_size(size: number): void;
}
export module IconInfo {
    export interface ConstructorProperties extends GObject.Object.ConstructorProperties {
        [key: string]: any;
    }
}
export class IconInfo extends GObject.Object {
    static $gtype: GObject.GType<IconInfo>;

    constructor(properties?: Partial<IconInfo.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<IconInfo.ConstructorProperties>, ...args: any[]): void;

    // Constructors

    static new_for_pixbuf(icon_theme: IconTheme, pixbuf: GdkPixbuf.Pixbuf): IconInfo;

    // Members

    get_base_scale(): number;
    get_base_size(): number;
    get_filename(): string | null;
    is_symbolic(): boolean;
    load_icon(): GdkPixbuf.Pixbuf;
    load_icon_async(cancellable?: Gio.Cancellable | null, callback?: Gio.AsyncReadyCallback<this> | null): void;
    load_icon_finish(res: Gio.AsyncResult): GdkPixbuf.Pixbuf;
    load_symbolic(colors: IconColors): [GdkPixbuf.Pixbuf, boolean | null];
    load_symbolic_async(
        colors: IconColors,
        cancellable?: Gio.Cancellable | null,
        callback?: Gio.AsyncReadyCallback<this> | null
    ): void;
    load_symbolic_finish(res: Gio.AsyncResult): [GdkPixbuf.Pixbuf, boolean | null];
}
export module IconTheme {
    export interface ConstructorProperties extends GObject.Object.ConstructorProperties {
        [key: string]: any;
    }
}
export class IconTheme extends GObject.Object {
    static $gtype: GObject.GType<IconTheme>;

    constructor(properties?: Partial<IconTheme.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<IconTheme.ConstructorProperties>, ...args: any[]): void;

    // Signals

    connect(id: string, callback: (...args: any[]) => any): number;
    connect_after(id: string, callback: (...args: any[]) => any): number;
    emit(id: string, ...args: any[]): void;
    connect(signal: "changed", callback: (_source: this) => void): number;
    connect_after(signal: "changed", callback: (_source: this) => void): number;
    emit(signal: "changed"): void;

    // Constructors

    static ["new"](): IconTheme;

    // Members

    add_resource_path(path: string): void;
    append_search_path(path: string): void;
    choose_icon(icon_names: string[], size: number, flags: IconLookupFlags): IconInfo | null;
    choose_icon_for_scale(icon_names: string[], size: number, scale: number, flags: IconLookupFlags): IconInfo | null;
    get_icon_sizes(icon_name: string): number[];
    get_search_path(): string[] | null;
    has_icon(icon_name: string): boolean;
    list_contexts(): string[];
    list_icons(context?: string | null): string[];
    load_icon(icon_name: string, size: number, flags: IconLookupFlags): GdkPixbuf.Pixbuf | null;
    load_icon_for_scale(
        icon_name: string,
        size: number,
        scale: number,
        flags: IconLookupFlags
    ): GdkPixbuf.Pixbuf | null;
    lookup_by_gicon(icon: Gio.Icon, size: number, flags: IconLookupFlags): IconInfo | null;
    lookup_by_gicon_for_scale(icon: Gio.Icon, size: number, scale: number, flags: IconLookupFlags): IconInfo | null;
    lookup_icon(icon_name: string, size: number, flags: IconLookupFlags): IconInfo | null;
    lookup_icon_for_scale(icon_name: string, size: number, scale: number, flags: IconLookupFlags): IconInfo | null;
    prepend_search_path(path: string): void;
    rescan_if_needed(): boolean;
    set_search_path(path: string[]): void;
}
export module ImageContent {
    export interface ConstructorProperties extends Clutter.Image.ConstructorProperties {
        [key: string]: any;
        preferred_height: number;
        preferredHeight: number;
        preferred_width: number;
        preferredWidth: number;
    }
}
export class ImageContent extends Clutter.Image implements Clutter.Content, Gio.Icon, Gio.LoadableIcon {
    static $gtype: GObject.GType<ImageContent>;

    constructor(properties?: Partial<ImageContent.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<ImageContent.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get preferred_height(): number;
    get preferredHeight(): number;
    get preferred_width(): number;
    get preferredWidth(): number;

    // Members

    static new_with_preferred_size(width: number, height: number): Clutter.Content;

    // Implemented Members

    get_preferred_size(): [boolean, number | null, number | null];
    invalidate(): void;
    invalidate_size(): void;
    vfunc_attached(actor: Clutter.Actor): void;
    vfunc_detached(actor: Clutter.Actor): void;
    vfunc_get_preferred_size(): [boolean, number | null, number | null];
    vfunc_invalidate(): void;
    vfunc_invalidate_size(): void;
    vfunc_paint_content(actor: Clutter.Actor, node: Clutter.PaintNode, paint_context: Clutter.PaintContext): void;
    equal(icon2?: Gio.Icon | null): boolean;
    hash(): number;
    serialize(): GLib.Variant | null;
    to_string(): string | null;
    vfunc_equal(icon2?: Gio.Icon | null): boolean;
    vfunc_hash(): number;
    vfunc_serialize(): GLib.Variant | null;
    vfunc_to_tokens(): [boolean, string[], number];
    load(size: number, cancellable?: Gio.Cancellable | null): [Gio.InputStream, string | null];
    load_async(
        size: number,
        cancellable?: Gio.Cancellable | null,
        callback?: Gio.AsyncReadyCallback<this> | null
    ): void;
    load_finish(res: Gio.AsyncResult): [Gio.InputStream, string | null];
    vfunc_load(size: number, cancellable?: Gio.Cancellable | null): [Gio.InputStream, string | null];
    vfunc_load_async(
        size: number,
        cancellable?: Gio.Cancellable | null,
        callback?: Gio.AsyncReadyCallback<this> | null
    ): void;
    vfunc_load_finish(res: Gio.AsyncResult): [Gio.InputStream, string | null];
}
export module Label {
    export interface ConstructorProperties extends Widget.ConstructorProperties {
        [key: string]: any;
        clutter_text: Clutter.Text;
        clutterText: Clutter.Text;
        text: string;
    }
}
export class Label
    extends Widget
    implements Atk.ImplementorIface, Clutter.Animatable, Clutter.Container, Clutter.Scriptable
{
    static $gtype: GObject.GType<Label>;

    constructor(properties?: Partial<Label.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<Label.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get clutter_text(): Clutter.Text;
    get clutterText(): Clutter.Text;
    get text(): string;
    set text(val: string);

    // Constructors

    static ["new"](text?: string | null): Label;
    // Conflicted with Clutter.Actor.new
    static ["new"](...args: never[]): any;

    // Members

    get_clutter_text(): Clutter.Actor;
    get_text(): string;
    set_text(text?: string | null): void;
}
export module PasswordEntry {
    export interface ConstructorProperties extends Entry.ConstructorProperties {
        [key: string]: any;
        password_visible: boolean;
        passwordVisible: boolean;
        show_peek_icon: boolean;
        showPeekIcon: boolean;
    }
}
export class PasswordEntry
    extends Entry
    implements Atk.ImplementorIface, Clutter.Animatable, Clutter.Container, Clutter.Scriptable
{
    static $gtype: GObject.GType<PasswordEntry>;

    constructor(properties?: Partial<PasswordEntry.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<PasswordEntry.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get password_visible(): boolean;
    set password_visible(val: boolean);
    get passwordVisible(): boolean;
    set passwordVisible(val: boolean);
    get show_peek_icon(): boolean;
    set show_peek_icon(val: boolean);
    get showPeekIcon(): boolean;
    set showPeekIcon(val: boolean);

    // Constructors

    static ["new"](): PasswordEntry;

    // Members

    get_password_visible(): boolean;
    get_show_peek_icon(): boolean;
    set_password_visible(value: boolean): void;
    set_show_peek_icon(value: boolean): void;
}
export module ScrollBar {
    export interface ConstructorProperties extends Widget.ConstructorProperties {
        [key: string]: any;
        adjustment: Adjustment;
        vertical: boolean;
    }
}
export class ScrollBar
    extends Widget
    implements Atk.ImplementorIface, Clutter.Animatable, Clutter.Container, Clutter.Scriptable
{
    static $gtype: GObject.GType<ScrollBar>;

    constructor(properties?: Partial<ScrollBar.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<ScrollBar.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get adjustment(): Adjustment;
    set adjustment(val: Adjustment);
    get vertical(): boolean;
    set vertical(val: boolean);

    // Signals

    connect(id: string, callback: (...args: any[]) => any): number;
    connect_after(id: string, callback: (...args: any[]) => any): number;
    emit(id: string, ...args: any[]): void;
    connect(signal: "scroll-start", callback: (_source: this) => void): number;
    connect_after(signal: "scroll-start", callback: (_source: this) => void): number;
    emit(signal: "scroll-start"): void;
    connect(signal: "scroll-stop", callback: (_source: this) => void): number;
    connect_after(signal: "scroll-stop", callback: (_source: this) => void): number;
    emit(signal: "scroll-stop"): void;

    // Constructors

    static ["new"](adjustment: Adjustment): ScrollBar;
    // Conflicted with Clutter.Actor.new
    static ["new"](...args: never[]): any;

    // Members

    get_adjustment(): Adjustment;
    set_adjustment(adjustment: Adjustment): void;
    vfunc_scroll_start(): void;
    vfunc_scroll_stop(): void;
}
export module ScrollView {
    export interface ConstructorProperties extends Bin.ConstructorProperties {
        [key: string]: any;
        enable_mouse_scrolling: boolean;
        enableMouseScrolling: boolean;
        hscroll: ScrollBar;
        hscrollbar_policy: PolicyType;
        hscrollbarPolicy: PolicyType;
        hscrollbar_visible: boolean;
        hscrollbarVisible: boolean;
        overlay_scrollbars: boolean;
        overlayScrollbars: boolean;
        vscroll: ScrollBar;
        vscrollbar_policy: PolicyType;
        vscrollbarPolicy: PolicyType;
        vscrollbar_visible: boolean;
        vscrollbarVisible: boolean;
    }
}
export class ScrollView
    extends Bin
    implements Atk.ImplementorIface, Clutter.Animatable, Clutter.Container, Clutter.Scriptable
{
    static $gtype: GObject.GType<ScrollView>;

    constructor(properties?: Partial<ScrollView.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<ScrollView.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get enable_mouse_scrolling(): boolean;
    set enable_mouse_scrolling(val: boolean);
    get enableMouseScrolling(): boolean;
    set enableMouseScrolling(val: boolean);
    get hscroll(): ScrollBar;
    get hscrollbar_policy(): PolicyType;
    set hscrollbar_policy(val: PolicyType);
    get hscrollbarPolicy(): PolicyType;
    set hscrollbarPolicy(val: PolicyType);
    get hscrollbar_visible(): boolean;
    get hscrollbarVisible(): boolean;
    get overlay_scrollbars(): boolean;
    set overlay_scrollbars(val: boolean);
    get overlayScrollbars(): boolean;
    set overlayScrollbars(val: boolean);
    get vscroll(): ScrollBar;
    get vscrollbar_policy(): PolicyType;
    set vscrollbar_policy(val: PolicyType);
    get vscrollbarPolicy(): PolicyType;
    set vscrollbarPolicy(val: PolicyType);
    get vscrollbar_visible(): boolean;
    get vscrollbarVisible(): boolean;

    // Constructors

    static ["new"](): ScrollView;

    // Members

    get_column_size(): number;
    get_hscroll_bar(): Clutter.Actor;
    get_mouse_scrolling(): boolean;
    get_overlay_scrollbars(): boolean;
    get_row_size(): number;
    get_vscroll_bar(): Clutter.Actor;
    set_column_size(column_size: number): void;
    set_mouse_scrolling(enabled: boolean): void;
    set_overlay_scrollbars(enabled: boolean): void;
    set_policy(hscroll: PolicyType, vscroll: PolicyType): void;
    set_row_size(row_size: number): void;
    update_fade_effect(fade_margins: Clutter.Margin): void;
}
export module ScrollViewFade {
    export interface ConstructorProperties extends Clutter.ShaderEffect.ConstructorProperties {
        [key: string]: any;
        extend_fade_area: boolean;
        extendFadeArea: boolean;
        fade_edges: boolean;
        fadeEdges: boolean;
        fade_margins: Clutter.Margin;
        fadeMargins: Clutter.Margin;
    }
}
export class ScrollViewFade extends Clutter.ShaderEffect {
    static $gtype: GObject.GType<ScrollViewFade>;

    constructor(properties?: Partial<ScrollViewFade.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<ScrollViewFade.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get extend_fade_area(): boolean;
    set extend_fade_area(val: boolean);
    get extendFadeArea(): boolean;
    set extendFadeArea(val: boolean);
    get fade_edges(): boolean;
    set fade_edges(val: boolean);
    get fadeEdges(): boolean;
    set fadeEdges(val: boolean);
    get fade_margins(): Clutter.Margin;
    set fade_margins(val: Clutter.Margin);
    get fadeMargins(): Clutter.Margin;
    set fadeMargins(val: Clutter.Margin);

    // Constructors

    static ["new"](): ScrollViewFade;
}
export module Settings {
    export interface ConstructorProperties extends GObject.Object.ConstructorProperties {
        [key: string]: any;
        disable_show_password: boolean;
        disableShowPassword: boolean;
        drag_threshold: number;
        dragThreshold: number;
        enable_animations: boolean;
        enableAnimations: boolean;
        font_name: string;
        fontName: string;
        gtk_icon_theme: string;
        gtkIconTheme: string;
        high_contrast: boolean;
        highContrast: boolean;
        magnifier_active: boolean;
        magnifierActive: boolean;
        primary_paste: boolean;
        primaryPaste: boolean;
        slow_down_factor: number;
        slowDownFactor: number;
    }
}
export class Settings extends GObject.Object {
    static $gtype: GObject.GType<Settings>;

    constructor(properties?: Partial<Settings.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<Settings.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get disable_show_password(): boolean;
    get disableShowPassword(): boolean;
    get drag_threshold(): number;
    get dragThreshold(): number;
    get enable_animations(): boolean;
    get enableAnimations(): boolean;
    get font_name(): string;
    get fontName(): string;
    get gtk_icon_theme(): string;
    get gtkIconTheme(): string;
    get high_contrast(): boolean;
    get highContrast(): boolean;
    get magnifier_active(): boolean;
    get magnifierActive(): boolean;
    get primary_paste(): boolean;
    get primaryPaste(): boolean;
    get slow_down_factor(): number;
    set slow_down_factor(val: number);
    get slowDownFactor(): number;
    set slowDownFactor(val: number);

    // Members

    inhibit_animations(): void;
    uninhibit_animations(): void;
    static get(): Settings;
}
export module TextureCache {
    export interface ConstructorProperties extends GObject.Object.ConstructorProperties {
        [key: string]: any;
    }
}
export class TextureCache extends GObject.Object {
    static $gtype: GObject.GType<TextureCache>;

    constructor(properties?: Partial<TextureCache.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<TextureCache.ConstructorProperties>, ...args: any[]): void;

    // Signals

    connect(id: string, callback: (...args: any[]) => any): number;
    connect_after(id: string, callback: (...args: any[]) => any): number;
    emit(id: string, ...args: any[]): void;
    connect(signal: "icon-theme-changed", callback: (_source: this) => void): number;
    connect_after(signal: "icon-theme-changed", callback: (_source: this) => void): number;
    emit(signal: "icon-theme-changed"): void;
    connect(signal: "texture-file-changed", callback: (_source: this, file: Gio.File) => void): number;
    connect_after(signal: "texture-file-changed", callback: (_source: this, file: Gio.File) => void): number;
    emit(signal: "texture-file-changed", file: Gio.File): void;

    // Members

    bind_cairo_surface_property(object: GObject.Object, property_name: string): Gio.Icon;
    load_cairo_surface_to_gicon(surface: cairo.Surface): Gio.Icon;
    load_file_async(
        file: Gio.File,
        available_width: number,
        available_height: number,
        paint_scale: number,
        resource_scale: number
    ): Clutter.Actor;
    load_file_to_cairo_surface(file: Gio.File, paint_scale: number, resource_scale: number): cairo.Surface;
    load_gicon(
        theme_node: ThemeNode | null,
        icon: Gio.Icon,
        size: number,
        paint_scale: number,
        resource_scale: number
    ): Clutter.Actor | null;
    load_sliced_image(
        file: Gio.File,
        grid_width: number,
        grid_height: number,
        paint_scale: number,
        resource_scale: number,
        load_callback?: GLib.Func | null
    ): Clutter.Actor;
    rescan_icon_theme(): boolean;
    static get_default(): TextureCache;
}
export module Theme {
    export interface ConstructorProperties extends GObject.Object.ConstructorProperties {
        [key: string]: any;
        application_stylesheet: Gio.File;
        applicationStylesheet: Gio.File;
        default_stylesheet: Gio.File;
        defaultStylesheet: Gio.File;
        theme_stylesheet: Gio.File;
        themeStylesheet: Gio.File;
    }
}
export class Theme extends GObject.Object {
    static $gtype: GObject.GType<Theme>;

    constructor(properties?: Partial<Theme.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<Theme.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get application_stylesheet(): Gio.File;
    get applicationStylesheet(): Gio.File;
    get default_stylesheet(): Gio.File;
    get defaultStylesheet(): Gio.File;
    get theme_stylesheet(): Gio.File;
    get themeStylesheet(): Gio.File;

    // Signals

    connect(id: string, callback: (...args: any[]) => any): number;
    connect_after(id: string, callback: (...args: any[]) => any): number;
    emit(id: string, ...args: any[]): void;
    connect(signal: "custom-stylesheets-changed", callback: (_source: this) => void): number;
    connect_after(signal: "custom-stylesheets-changed", callback: (_source: this) => void): number;
    emit(signal: "custom-stylesheets-changed"): void;

    // Constructors

    static ["new"](application_stylesheet: Gio.File, theme_stylesheet: Gio.File, default_stylesheet: Gio.File): Theme;

    // Members

    get_custom_stylesheets(): Gio.File[];
    load_stylesheet(file: Gio.File): boolean;
    unload_stylesheet(file: Gio.File): void;
}
export module ThemeContext {
    export interface ConstructorProperties extends GObject.Object.ConstructorProperties {
        [key: string]: any;
        scale_factor: number;
        scaleFactor: number;
    }
}
export class ThemeContext extends GObject.Object {
    static $gtype: GObject.GType<ThemeContext>;

    constructor(properties?: Partial<ThemeContext.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<ThemeContext.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get scale_factor(): number;
    set scale_factor(val: number);
    get scaleFactor(): number;
    set scaleFactor(val: number);

    // Signals

    connect(id: string, callback: (...args: any[]) => any): number;
    connect_after(id: string, callback: (...args: any[]) => any): number;
    emit(id: string, ...args: any[]): void;
    connect(signal: "changed", callback: (_source: this) => void): number;
    connect_after(signal: "changed", callback: (_source: this) => void): number;
    emit(signal: "changed"): void;

    // Constructors

    static ["new"](): ThemeContext;

    // Members

    get_font(): Pango.FontDescription;
    get_root_node(): ThemeNode;
    get_scale_factor(): number;
    get_theme(): Theme;
    intern_node(node: ThemeNode): ThemeNode;
    set_font(font: Pango.FontDescription): void;
    set_theme(theme: Theme): void;
    static get_for_stage(stage: Clutter.Stage): ThemeContext;
}
export module ThemeNode {
    export interface ConstructorProperties extends GObject.Object.ConstructorProperties {
        [key: string]: any;
    }
}
export class ThemeNode extends GObject.Object {
    static $gtype: GObject.GType<ThemeNode>;

    constructor(properties?: Partial<ThemeNode.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<ThemeNode.ConstructorProperties>, ...args: any[]): void;

    // Constructors

    static ["new"](
        context: ThemeContext,
        parent_node: ThemeNode | null,
        theme: Theme | null,
        element_type: GObject.GType,
        element_id: string | null,
        element_class: string | null,
        pseudo_class: string | null,
        inline_style: string
    ): ThemeNode;

    // Members

    adjust_for_height(for_height: number): number;
    adjust_for_width(for_width: number): number;
    adjust_preferred_height(min_height_p: number | null, natural_height_p: number): [number | null, number];
    adjust_preferred_width(min_width_p: number | null, natural_width_p: number): [number | null, number];
    equal(node_b: ThemeNode): boolean;
    geometry_equal(other: ThemeNode): boolean;
    get_background_color(): Clutter.Color;
    get_background_gradient(): [GradientType, Clutter.Color, Clutter.Color];
    get_background_image(): Gio.File;
    get_background_image_shadow(): Shadow | null;
    get_background_paint_box(allocation: Clutter.ActorBox): Clutter.ActorBox;
    get_border_color(side: Side): Clutter.Color;
    get_border_image(): BorderImage;
    get_border_radius(corner: Corner): number;
    get_border_width(side: Side): number;
    get_box_shadow(): Shadow | null;
    get_color(property_name: string): Clutter.Color;
    get_content_box(allocation: Clutter.ActorBox): Clutter.ActorBox;
    get_double(property_name: string): number;
    get_element_classes(): string[];
    get_element_id(): string;
    get_element_type(): GObject.GType;
    get_font(): Pango.FontDescription;
    get_font_features(): string;
    get_foreground_color(): Clutter.Color;
    get_height(): number;
    get_horizontal_padding(): number;
    get_icon_colors(): IconColors;
    get_icon_style(): IconStyle;
    get_length(property_name: string): number;
    get_letter_spacing(): number;
    get_margin(side: Side): number;
    get_max_height(): number;
    get_max_width(): number;
    get_min_height(): number;
    get_min_width(): number;
    get_outline_color(): Clutter.Color;
    get_outline_width(): number;
    get_padding(side: Side): number;
    get_paint_box(allocation: Clutter.ActorBox): Clutter.ActorBox;
    get_parent(): ThemeNode | null;
    get_pseudo_classes(): string[];
    get_shadow(property_name: string): Shadow | null;
    get_text_align(): TextAlign;
    get_text_decoration(): TextDecoration;
    get_text_shadow(): Shadow | null;
    get_theme(): Theme;
    get_transition_duration(): number;
    get_url(property_name: string): Gio.File | null;
    get_vertical_padding(): number;
    get_width(): number;
    hash(): number;
    invalidate_background_image(): void;
    invalidate_border_image(): void;
    lookup_color(property_name: string, inherit: boolean): [boolean, Clutter.Color];
    lookup_double(property_name: string, inherit: boolean): [boolean, number];
    lookup_length(property_name: string, inherit: boolean): [boolean, number];
    lookup_shadow(property_name: string, inherit: boolean): [boolean, Shadow];
    lookup_time(property_name: string, inherit: boolean): [boolean, number];
    lookup_url(property_name: string, inherit: boolean): [boolean, Gio.File];
    paint_equal(other?: ThemeNode | null): boolean;
    to_string(): string;
}
export module Viewport {
    export interface ConstructorProperties extends Widget.ConstructorProperties {
        [key: string]: any;
        clip_to_view: boolean;
        clipToView: boolean;
    }
}
export class Viewport
    extends Widget
    implements Atk.ImplementorIface, Clutter.Animatable, Clutter.Container, Clutter.Scriptable, Scrollable
{
    static $gtype: GObject.GType<Viewport>;

    constructor(properties?: Partial<Viewport.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<Viewport.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get clip_to_view(): boolean;
    set clip_to_view(val: boolean);
    get clipToView(): boolean;
    set clipToView(val: boolean);

    // Implemented Properties

    get hadjustment(): Adjustment;
    set hadjustment(val: Adjustment);
    get vadjustment(): Adjustment;
    set vadjustment(val: Adjustment);

    // Implemented Members

    get_adjustments(hadjustment: Adjustment, vadjustment: Adjustment): void;
    set_adjustments(hadjustment: Adjustment, vadjustment: Adjustment): void;
    vfunc_get_adjustments(hadjustment: Adjustment, vadjustment: Adjustment): void;
    vfunc_set_adjustments(hadjustment: Adjustment, vadjustment: Adjustment): void;
}
export module Widget {
    export interface ConstructorProperties extends Clutter.Actor.ConstructorProperties {
        [key: string]: any;
        accessible_name: string;
        accessibleName: string;
        accessible_role: Atk.Role;
        accessibleRole: Atk.Role;
        can_focus: boolean;
        canFocus: boolean;
        hover: boolean;
        label_actor: Clutter.Actor;
        labelActor: Clutter.Actor;
        pseudo_class: string;
        pseudoClass: string;
        style: string;
        style_class: string;
        styleClass: string;
        track_hover: boolean;
        trackHover: boolean;
    }
}
export class Widget
    extends Clutter.Actor
    implements Atk.ImplementorIface, Clutter.Animatable, Clutter.Container, Clutter.Scriptable
{
    static $gtype: GObject.GType<Widget>;

    constructor(properties?: Partial<Widget.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<Widget.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get accessible_name(): string;
    set accessible_name(val: string);
    get accessibleName(): string;
    set accessibleName(val: string);
    get accessible_role(): Atk.Role;
    set accessible_role(val: Atk.Role);
    get accessibleRole(): Atk.Role;
    set accessibleRole(val: Atk.Role);
    get can_focus(): boolean;
    set can_focus(val: boolean);
    get canFocus(): boolean;
    set canFocus(val: boolean);
    get hover(): boolean;
    set hover(val: boolean);
    get label_actor(): Clutter.Actor;
    set label_actor(val: Clutter.Actor);
    get labelActor(): Clutter.Actor;
    set labelActor(val: Clutter.Actor);
    get pseudo_class(): string;
    set pseudo_class(val: string);
    get pseudoClass(): string;
    set pseudoClass(val: string);
    get style(): string;
    set style(val: string);
    get style_class(): string;
    set style_class(val: string);
    get styleClass(): string;
    set styleClass(val: string);
    get track_hover(): boolean;
    set track_hover(val: boolean);
    get trackHover(): boolean;
    set trackHover(val: boolean);

    // Signals

    connect(id: string, callback: (...args: any[]) => any): number;
    connect_after(id: string, callback: (...args: any[]) => any): number;
    emit(id: string, ...args: any[]): void;
    connect(signal: "popup-menu", callback: (_source: this) => void): number;
    connect_after(signal: "popup-menu", callback: (_source: this) => void): number;
    emit(signal: "popup-menu"): void;
    connect(signal: "style-changed", callback: (_source: this) => void): number;
    connect_after(signal: "style-changed", callback: (_source: this) => void): number;
    emit(signal: "style-changed"): void;

    // Members

    add_accessible_state(state: Atk.StateType): void;
    add_style_class_name(style_class: string): void;
    add_style_pseudo_class(pseudo_class: string): void;
    ensure_style(): void;
    get_accessible_name(): string;
    get_accessible_role(): Atk.Role;
    get_can_focus(): boolean;
    get_focus_chain(): Clutter.Actor[];
    get_hover(): boolean;
    get_label_actor(): Clutter.Actor;
    get_style(): string | null;
    get_style_class_name(): string;
    get_style_pseudo_class(): string;
    get_theme_node(): ThemeNode;
    get_track_hover(): boolean;
    has_style_class_name(style_class: string): boolean;
    has_style_pseudo_class(pseudo_class: string): boolean;
    navigate_focus(from: Clutter.Actor | null, direction: DirectionType, wrap_around: boolean): boolean;
    paint_background(paint_context: Clutter.PaintContext): void;
    peek_theme_node(): ThemeNode;
    popup_menu(): void;
    remove_accessible_state(state: Atk.StateType): void;
    remove_style_class_name(style_class: string): void;
    remove_style_pseudo_class(pseudo_class: string): void;
    set_accessible(accessible: Atk.Object): void;
    set_accessible_name(name?: string | null): void;
    set_accessible_role(role: Atk.Role): void;
    set_can_focus(can_focus: boolean): void;
    set_hover(hover: boolean): void;
    set_label_actor(label: Clutter.Actor): void;
    set_style(style?: string | null): void;
    set_style_class_name(style_class_list?: string | null): void;
    set_style_pseudo_class(pseudo_class_list?: string | null): void;
    set_track_hover(track_hover: boolean): void;
    style_changed(): void;
    sync_hover(): void;
    vfunc_get_focus_chain(): Clutter.Actor[];
    vfunc_navigate_focus(from: Clutter.Actor | null, direction: DirectionType): boolean;
    vfunc_popup_menu(): void;
    vfunc_style_changed(): void;

    // Implemented Members

    find_property(property_name: string): GObject.ParamSpec;
    get_actor(): Clutter.Actor;
    get_initial_state(property_name: string, value: GObject.Value | any): void;
    interpolate_value(property_name: string, interval: Clutter.Interval, progress: number): [boolean, unknown];
    set_final_state(property_name: string, value: GObject.Value | any): void;
    vfunc_find_property(property_name: string): GObject.ParamSpec;
    vfunc_get_actor(): Clutter.Actor;
    vfunc_get_initial_state(property_name: string, value: GObject.Value | any): void;
    vfunc_interpolate_value(property_name: string, interval: Clutter.Interval, progress: number): [boolean, unknown];
    vfunc_set_final_state(property_name: string, value: GObject.Value | any): void;
    add_actor(actor: Clutter.Actor): void;
    child_get_property(child: Clutter.Actor, property: string, value: GObject.Value | any): void;
    child_notify(child: Clutter.Actor, pspec: GObject.ParamSpec): void;
    child_set_property(child: Clutter.Actor, property: string, value: GObject.Value | any): void;
    create_child_meta(actor: Clutter.Actor): void;
    destroy_child_meta(actor: Clutter.Actor): void;
    find_child_by_name(child_name: string): Clutter.Actor;
    get_child_meta(actor: Clutter.Actor): Clutter.ChildMeta;
    remove_actor(actor: Clutter.Actor): void;
    vfunc_actor_added(actor: Clutter.Actor): void;
    vfunc_actor_removed(actor: Clutter.Actor): void;
    vfunc_add(actor: Clutter.Actor): void;
    vfunc_child_notify(child: Clutter.Actor, pspec: GObject.ParamSpec): void;
    vfunc_create_child_meta(actor: Clutter.Actor): void;
    vfunc_destroy_child_meta(actor: Clutter.Actor): void;
    vfunc_get_child_meta(actor: Clutter.Actor): Clutter.ChildMeta;
    vfunc_remove(actor: Clutter.Actor): void;
    get_id(): string;
    parse_custom_node(script: Clutter.Script, value: GObject.Value | any, name: string, node: Json.Node): boolean;
    set_custom_property(script: Clutter.Script, name: string, value: GObject.Value | any): void;
    set_id(id_: string): void;
    vfunc_get_id(): string;
    vfunc_parse_custom_node(script: Clutter.Script, value: GObject.Value | any, name: string, node: Json.Node): boolean;
    vfunc_set_custom_property(script: Clutter.Script, name: string, value: GObject.Value | any): void;
    vfunc_set_id(id_: string): void;
}
export module WidgetAccessible {
    export interface ConstructorProperties extends Cally.Actor.ConstructorProperties {
        [key: string]: any;
    }
}
export class WidgetAccessible extends Cally.Actor implements Atk.Action, Atk.Component {
    static $gtype: GObject.GType<WidgetAccessible>;

    constructor(properties?: Partial<WidgetAccessible.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<WidgetAccessible.ConstructorProperties>, ...args: any[]): void;

    // Implemented Members

    do_action(i: number): boolean;
    get_description(i: number): string | null;
    // Conflicted with Atk.Object.get_description
    get_description(...args: never[]): any;
    get_keybinding(i: number): string | null;
    get_localized_name(i: number): string | null;
    get_n_actions(): number;
    get_name(i: number): string | null;
    // Conflicted with Atk.Object.get_name
    get_name(...args: never[]): any;
    set_description(i: number, desc: string): boolean;
    // Conflicted with Atk.Object.set_description
    set_description(...args: never[]): any;
    vfunc_do_action(i: number): boolean;
    vfunc_get_description(i: number): string | null;
    // Conflicted with Atk.Object.vfunc_get_description
    vfunc_get_description(...args: never[]): any;
    vfunc_get_keybinding(i: number): string | null;
    vfunc_get_localized_name(i: number): string | null;
    vfunc_get_n_actions(): number;
    vfunc_get_name(i: number): string | null;
    // Conflicted with Atk.Object.vfunc_get_name
    vfunc_get_name(...args: never[]): any;
    vfunc_set_description(i: number, desc: string): boolean;
    // Conflicted with Atk.Object.vfunc_set_description
    vfunc_set_description(...args: never[]): any;
    contains(x: number, y: number, coord_type: Atk.CoordType): boolean;
    get_alpha(): number;
    get_extents(coord_type: Atk.CoordType): [number | null, number | null, number | null, number | null];
    get_layer(): Atk.Layer;
    get_mdi_zorder(): number;
    get_position(coord_type: Atk.CoordType): [number | null, number | null];
    get_size(): [number | null, number | null];
    grab_focus(): boolean;
    ref_accessible_at_point(x: number, y: number, coord_type: Atk.CoordType): Atk.Object | null;
    remove_focus_handler(handler_id: number): void;
    scroll_to(type: Atk.ScrollType): boolean;
    scroll_to_point(coords: Atk.CoordType, x: number, y: number): boolean;
    set_extents(x: number, y: number, width: number, height: number, coord_type: Atk.CoordType): boolean;
    set_position(x: number, y: number, coord_type: Atk.CoordType): boolean;
    set_size(width: number, height: number): boolean;
    vfunc_bounds_changed(bounds: Atk.Rectangle): void;
    vfunc_contains(x: number, y: number, coord_type: Atk.CoordType): boolean;
    vfunc_get_alpha(): number;
    vfunc_get_extents(coord_type: Atk.CoordType): [number | null, number | null, number | null, number | null];
    vfunc_get_layer(): Atk.Layer;
    vfunc_get_mdi_zorder(): number;
    vfunc_get_position(coord_type: Atk.CoordType): [number | null, number | null];
    vfunc_get_size(): [number | null, number | null];
    vfunc_grab_focus(): boolean;
    vfunc_ref_accessible_at_point(x: number, y: number, coord_type: Atk.CoordType): Atk.Object | null;
    vfunc_remove_focus_handler(handler_id: number): void;
    vfunc_scroll_to(type: Atk.ScrollType): boolean;
    vfunc_scroll_to_point(coords: Atk.CoordType, x: number, y: number): boolean;
    vfunc_set_extents(x: number, y: number, width: number, height: number, coord_type: Atk.CoordType): boolean;
    vfunc_set_position(x: number, y: number, coord_type: Atk.CoordType): boolean;
    vfunc_set_size(width: number, height: number): boolean;
}

export class BoxLayoutPrivate {
    static $gtype: GObject.GType<BoxLayoutPrivate>;

    constructor(copy: BoxLayoutPrivate);
}

export class FocusManagerPrivate {
    static $gtype: GObject.GType<FocusManagerPrivate>;

    constructor(copy: FocusManagerPrivate);
}

export class GenericAccessiblePrivate {
    static $gtype: GObject.GType<GenericAccessiblePrivate>;

    constructor(copy: GenericAccessiblePrivate);
}

export class IconColors {
    static $gtype: GObject.GType<IconColors>;

    constructor();
    constructor(
        properties?: Partial<{
            ref_count?: number;
        }>
    );
    constructor(copy: IconColors);

    // Fields
    ref_count: number;

    // Constructors
    static ["new"](): IconColors;

    // Members
    copy(): IconColors;
    equal(other: IconColors): boolean;
    ref(): IconColors;
    unref(): void;
}

export class IconPrivate {
    static $gtype: GObject.GType<IconPrivate>;

    constructor(copy: IconPrivate);
}

export class LabelPrivate {
    static $gtype: GObject.GType<LabelPrivate>;

    constructor(copy: LabelPrivate);
}

export class ScrollViewPrivate {
    static $gtype: GObject.GType<ScrollViewPrivate>;

    constructor(copy: ScrollViewPrivate);
}

export class Shadow {
    static $gtype: GObject.GType<Shadow>;

    constructor(color: Clutter.Color, xoffset: number, yoffset: number, blur: number, spread: number, inset: boolean);
    constructor(
        properties?: Partial<{
            xoffset?: number;
            yoffset?: number;
            blur?: number;
            spread?: number;
            inset?: boolean;
            ref_count?: number;
        }>
    );
    constructor(copy: Shadow);

    // Fields
    xoffset: number;
    yoffset: number;
    blur: number;
    spread: number;
    inset: boolean;
    ref_count: number;

    // Constructors
    static ["new"](
        color: Clutter.Color,
        xoffset: number,
        yoffset: number,
        blur: number,
        spread: number,
        inset: boolean
    ): Shadow;

    // Members
    equal(other: Shadow): boolean;
    get_box(actor_box: Clutter.ActorBox, shadow_box: Clutter.ActorBox): void;
    ref(): Shadow;
    unref(): void;
}

export class ShadowHelper {
    static $gtype: GObject.GType<ShadowHelper>;

    constructor(shadow: Shadow);
    constructor(copy: ShadowHelper);

    // Constructors
    static ["new"](shadow: Shadow): ShadowHelper;

    // Members
    copy(): ShadowHelper;
    free(): void;
    paint(framebuffer: Cogl.Framebuffer, actor_box: Clutter.ActorBox, paint_opacity: number): void;
    update(source: Clutter.Actor): void;
}

export class TextureCachePrivate {
    static $gtype: GObject.GType<TextureCachePrivate>;

    constructor(copy: TextureCachePrivate);
}

export class ThemeNodePaintState {
    static $gtype: GObject.GType<ThemeNodePaintState>;

    constructor(
        properties?: Partial<{
            alloc_width?: number;
            alloc_height?: number;
            box_shadow_width?: number;
            box_shadow_height?: number;
            resource_scale?: number;
        }>
    );
    constructor(copy: ThemeNodePaintState);

    // Fields
    alloc_width: number;
    alloc_height: number;
    box_shadow_width: number;
    box_shadow_height: number;
    resource_scale: number;

    // Members
    copy(other: ThemeNodePaintState): void;
    free(): void;
    init(): void;
    invalidate(): void;
    invalidate_for_file(file: Gio.File): boolean;
    set_node(node: ThemeNode): void;
}

export class WidgetAccessiblePrivate {
    static $gtype: GObject.GType<WidgetAccessiblePrivate>;

    constructor(copy: WidgetAccessiblePrivate);
}

export interface ScrollableNamespace {
    $gtype: GObject.GType<Scrollable>;
    prototype: ScrollablePrototype;
}
export type Scrollable = ScrollablePrototype;
export interface ScrollablePrototype extends GObject.Object {
    // Properties
    hadjustment: Adjustment;
    vadjustment: Adjustment;

    // Members

    get_adjustments(hadjustment: Adjustment, vadjustment: Adjustment): void;
    set_adjustments(hadjustment: Adjustment, vadjustment: Adjustment): void;
    vfunc_get_adjustments(hadjustment: Adjustment, vadjustment: Adjustment): void;
    vfunc_set_adjustments(hadjustment: Adjustment, vadjustment: Adjustment): void;
}

export const Scrollable: ScrollableNamespace;
