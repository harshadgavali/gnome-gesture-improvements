/**
 * Adw 1
 *
 * Generated from 1.3.1
 */

import * as Gtk from "@gi-types/gtk4";
import * as GObject from "@gi-types/gobject2";
import * as Gio from "@gi-types/gio2";
import * as GLib from "@gi-types/glib2";
import * as Gdk from "@gi-types/gdk4";
import * as Pango from "@gi-types/pango1";
import * as Gsk from "@gi-types/gsk4";

export const DURATION_INFINITE: number;
export const MAJOR_VERSION: number;
export const MICRO_VERSION: number;
export const MINOR_VERSION: number;
export const VERSION_S: string;
export function easing_ease(self: Easing, value: number): number;
export function get_enable_animations(widget: Gtk.Widget): boolean;
export function get_major_version(): number;
export function get_micro_version(): number;
export function get_minor_version(): number;
export function init(): void;
export function is_initialized(): boolean;
export function lerp(a: number, b: number, t: number): number;
export type AnimationTargetFunc = (value: number) => void;

export namespace AnimationState {
    export const $gtype: GObject.GType<AnimationState>;
}

export enum AnimationState {
    IDLE = 0,
    PAUSED = 1,
    PLAYING = 2,
    FINISHED = 3,
}

export namespace CenteringPolicy {
    export const $gtype: GObject.GType<CenteringPolicy>;
}

export enum CenteringPolicy {
    LOOSE = 0,
    STRICT = 1,
}

export namespace ColorScheme {
    export const $gtype: GObject.GType<ColorScheme>;
}

export enum ColorScheme {
    DEFAULT = 0,
    FORCE_LIGHT = 1,
    PREFER_LIGHT = 2,
    PREFER_DARK = 3,
    FORCE_DARK = 4,
}

export namespace Easing {
    export const $gtype: GObject.GType<Easing>;
}

export enum Easing {
    LINEAR = 0,
    EASE_IN_QUAD = 1,
    EASE_OUT_QUAD = 2,
    EASE_IN_OUT_QUAD = 3,
    EASE_IN_CUBIC = 4,
    EASE_OUT_CUBIC = 5,
    EASE_IN_OUT_CUBIC = 6,
    EASE_IN_QUART = 7,
    EASE_OUT_QUART = 8,
    EASE_IN_OUT_QUART = 9,
    EASE_IN_QUINT = 10,
    EASE_OUT_QUINT = 11,
    EASE_IN_OUT_QUINT = 12,
    EASE_IN_SINE = 13,
    EASE_OUT_SINE = 14,
    EASE_IN_OUT_SINE = 15,
    EASE_IN_EXPO = 16,
    EASE_OUT_EXPO = 17,
    EASE_IN_OUT_EXPO = 18,
    EASE_IN_CIRC = 19,
    EASE_OUT_CIRC = 20,
    EASE_IN_OUT_CIRC = 21,
    EASE_IN_ELASTIC = 22,
    EASE_OUT_ELASTIC = 23,
    EASE_IN_OUT_ELASTIC = 24,
    EASE_IN_BACK = 25,
    EASE_OUT_BACK = 26,
    EASE_IN_OUT_BACK = 27,
    EASE_IN_BOUNCE = 28,
    EASE_OUT_BOUNCE = 29,
    EASE_IN_OUT_BOUNCE = 30,
}

export namespace FlapFoldPolicy {
    export const $gtype: GObject.GType<FlapFoldPolicy>;
}

export enum FlapFoldPolicy {
    NEVER = 0,
    ALWAYS = 1,
    AUTO = 2,
}

export namespace FlapTransitionType {
    export const $gtype: GObject.GType<FlapTransitionType>;
}

export enum FlapTransitionType {
    OVER = 0,
    UNDER = 1,
    SLIDE = 2,
}

export namespace FoldThresholdPolicy {
    export const $gtype: GObject.GType<FoldThresholdPolicy>;
}

export enum FoldThresholdPolicy {
    MINIMUM = 0,
    NATURAL = 1,
}

export namespace LeafletTransitionType {
    export const $gtype: GObject.GType<LeafletTransitionType>;
}

export enum LeafletTransitionType {
    OVER = 0,
    UNDER = 1,
    SLIDE = 2,
}

export namespace NavigationDirection {
    export const $gtype: GObject.GType<NavigationDirection>;
}

export enum NavigationDirection {
    BACK = 0,
    FORWARD = 1,
}

export namespace ResponseAppearance {
    export const $gtype: GObject.GType<ResponseAppearance>;
}

export enum ResponseAppearance {
    DEFAULT = 0,
    SUGGESTED = 1,
    DESTRUCTIVE = 2,
}

export namespace SqueezerTransitionType {
    export const $gtype: GObject.GType<SqueezerTransitionType>;
}

export enum SqueezerTransitionType {
    NONE = 0,
    CROSSFADE = 1,
}

export namespace ToastPriority {
    export const $gtype: GObject.GType<ToastPriority>;
}

export enum ToastPriority {
    NORMAL = 0,
    HIGH = 1,
}

export namespace ViewSwitcherPolicy {
    export const $gtype: GObject.GType<ViewSwitcherPolicy>;
}

export enum ViewSwitcherPolicy {
    NARROW = 0,
    WIDE = 1,
}

export namespace TabViewShortcuts {
    export const $gtype: GObject.GType<TabViewShortcuts>;
}

export enum TabViewShortcuts {
    NONE = 0,
    CONTROL_TAB = 1,
    CONTROL_SHIFT_TAB = 2,
    CONTROL_PAGE_UP = 4,
    CONTROL_PAGE_DOWN = 8,
    CONTROL_HOME = 16,
    CONTROL_END = 32,
    CONTROL_SHIFT_PAGE_UP = 64,
    CONTROL_SHIFT_PAGE_DOWN = 128,
    CONTROL_SHIFT_HOME = 256,
    CONTROL_SHIFT_END = 512,
    ALT_DIGITS = 1024,
    ALT_ZERO = 2048,
    ALL_SHORTCUTS = 4095,
}
export module AboutWindow {
    export interface ConstructorProperties extends Window.ConstructorProperties {
        [key: string]: any;
        application_icon: string;
        applicationIcon: string;
        application_name: string;
        applicationName: string;
        artists: string[];
        comments: string;
        copyright: string;
        debug_info: string;
        debugInfo: string;
        debug_info_filename: string;
        debugInfoFilename: string;
        designers: string[];
        developer_name: string;
        developerName: string;
        developers: string[];
        documenters: string[];
        issue_url: string;
        issueUrl: string;
        license: string;
        license_type: Gtk.License;
        licenseType: Gtk.License;
        release_notes: string;
        releaseNotes: string;
        release_notes_version: string;
        releaseNotesVersion: string;
        support_url: string;
        supportUrl: string;
        translator_credits: string;
        translatorCredits: string;
        version: string;
        website: string;
    }
}
export class AboutWindow
    extends Window
    implements Gtk.Accessible, Gtk.Buildable, Gtk.ConstraintTarget, Gtk.Native, Gtk.Root, Gtk.ShortcutManager
{
    static $gtype: GObject.GType<AboutWindow>;

    constructor(properties?: Partial<AboutWindow.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<AboutWindow.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get application_icon(): string;
    set application_icon(val: string);
    get applicationIcon(): string;
    set applicationIcon(val: string);
    get application_name(): string;
    set application_name(val: string);
    get applicationName(): string;
    set applicationName(val: string);
    get artists(): string[];
    set artists(val: string[]);
    get comments(): string;
    set comments(val: string);
    get copyright(): string;
    set copyright(val: string);
    get debug_info(): string;
    set debug_info(val: string);
    get debugInfo(): string;
    set debugInfo(val: string);
    get debug_info_filename(): string;
    set debug_info_filename(val: string);
    get debugInfoFilename(): string;
    set debugInfoFilename(val: string);
    get designers(): string[];
    set designers(val: string[]);
    get developer_name(): string;
    set developer_name(val: string);
    get developerName(): string;
    set developerName(val: string);
    get developers(): string[];
    set developers(val: string[]);
    get documenters(): string[];
    set documenters(val: string[]);
    get issue_url(): string;
    set issue_url(val: string);
    get issueUrl(): string;
    set issueUrl(val: string);
    get license(): string;
    set license(val: string);
    get license_type(): Gtk.License;
    set license_type(val: Gtk.License);
    get licenseType(): Gtk.License;
    set licenseType(val: Gtk.License);
    get release_notes(): string;
    set release_notes(val: string);
    get releaseNotes(): string;
    set releaseNotes(val: string);
    get release_notes_version(): string;
    set release_notes_version(val: string);
    get releaseNotesVersion(): string;
    set releaseNotesVersion(val: string);
    get support_url(): string;
    set support_url(val: string);
    get supportUrl(): string;
    set supportUrl(val: string);
    get translator_credits(): string;
    set translator_credits(val: string);
    get translatorCredits(): string;
    set translatorCredits(val: string);
    get version(): string;
    set version(val: string);
    get website(): string;
    set website(val: string);

    // Signals

    connect(id: string, callback: (...args: any[]) => any): number;
    connect_after(id: string, callback: (...args: any[]) => any): number;
    emit(id: string, ...args: any[]): void;
    connect(signal: "activate-link", callback: (_source: this, uri: string) => boolean): number;
    connect_after(signal: "activate-link", callback: (_source: this, uri: string) => boolean): number;
    emit(signal: "activate-link", uri: string): void;

    // Constructors

    static ["new"](): AboutWindow;

    // Members

    add_acknowledgement_section(name: string | null, people: string[]): void;
    add_credit_section(name: string | null, people: string[]): void;
    add_legal_section(
        title: string,
        copyright: string | null,
        license_type: Gtk.License,
        license?: string | null
    ): void;
    add_link(title: string, url: string): void;
    get_application_icon(): string;
    get_application_name(): string;
    get_artists(): string[] | null;
    get_comments(): string;
    get_copyright(): string;
    get_debug_info(): string;
    get_debug_info_filename(): string;
    get_designers(): string[] | null;
    get_developer_name(): string;
    get_developers(): string[] | null;
    get_documenters(): string[] | null;
    get_issue_url(): string;
    get_license(): string;
    get_license_type(): Gtk.License;
    get_release_notes(): string;
    get_release_notes_version(): string;
    get_support_url(): string;
    get_translator_credits(): string;
    get_version(): string;
    get_website(): string;
    set_application_icon(application_icon: string): void;
    set_application_name(application_name: string): void;
    set_artists(artists?: string[] | null): void;
    set_comments(comments: string): void;
    set_copyright(copyright: string): void;
    set_debug_info(debug_info: string): void;
    set_debug_info_filename(filename: string): void;
    set_designers(designers?: string[] | null): void;
    set_developer_name(developer_name: string): void;
    set_developers(developers?: string[] | null): void;
    set_documenters(documenters?: string[] | null): void;
    set_issue_url(issue_url: string): void;
    set_license(license: string): void;
    set_license_type(license_type: Gtk.License): void;
    set_release_notes(release_notes: string): void;
    set_release_notes_version(version: string): void;
    set_support_url(support_url: string): void;
    set_translator_credits(translator_credits: string): void;
    set_version(version: string): void;
    set_website(website: string): void;
}
export module ActionRow {
    export interface ConstructorProperties extends PreferencesRow.ConstructorProperties {
        [key: string]: any;
        activatable_widget: Gtk.Widget;
        activatableWidget: Gtk.Widget;
        icon_name: string;
        iconName: string;
        subtitle: string;
        subtitle_lines: number;
        subtitleLines: number;
        subtitle_selectable: boolean;
        subtitleSelectable: boolean;
        title_lines: number;
        titleLines: number;
    }
}
export class ActionRow
    extends PreferencesRow
    implements Gtk.Accessible, Gtk.Actionable, Gtk.Buildable, Gtk.ConstraintTarget
{
    static $gtype: GObject.GType<ActionRow>;

    constructor(properties?: Partial<ActionRow.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<ActionRow.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get activatable_widget(): Gtk.Widget;
    set activatable_widget(val: Gtk.Widget);
    get activatableWidget(): Gtk.Widget;
    set activatableWidget(val: Gtk.Widget);
    get icon_name(): string;
    set icon_name(val: string);
    get iconName(): string;
    set iconName(val: string);
    get subtitle(): string;
    set subtitle(val: string);
    get subtitle_lines(): number;
    set subtitle_lines(val: number);
    get subtitleLines(): number;
    set subtitleLines(val: number);
    get subtitle_selectable(): boolean;
    set subtitle_selectable(val: boolean);
    get subtitleSelectable(): boolean;
    set subtitleSelectable(val: boolean);
    get title_lines(): number;
    set title_lines(val: number);
    get titleLines(): number;
    set titleLines(val: number);

    // Signals

    connect(id: string, callback: (...args: any[]) => any): number;
    connect_after(id: string, callback: (...args: any[]) => any): number;
    emit(id: string, ...args: any[]): void;
    connect(signal: "activated", callback: (_source: this) => void): number;
    connect_after(signal: "activated", callback: (_source: this) => void): number;
    emit(signal: "activated"): void;

    // Constructors

    static ["new"](): ActionRow;

    // Members

    activate(): void;
    // Conflicted with Gtk.Widget.activate
    activate(...args: never[]): any;
    add_prefix(widget: Gtk.Widget): void;
    add_suffix(widget: Gtk.Widget): void;
    get_activatable_widget(): Gtk.Widget | null;
    get_icon_name(): string | null;
    get_subtitle(): string | null;
    get_subtitle_lines(): number;
    get_subtitle_selectable(): boolean;
    get_title_lines(): number;
    remove(widget: Gtk.Widget): void;
    set_activatable_widget(widget?: Gtk.Widget | null): void;
    set_icon_name(icon_name?: string | null): void;
    set_subtitle(subtitle: string): void;
    set_subtitle_lines(subtitle_lines: number): void;
    set_subtitle_selectable(subtitle_selectable: boolean): void;
    set_title_lines(title_lines: number): void;
    vfunc_activate(): void;
}
export module Animation {
    export interface ConstructorProperties extends GObject.Object.ConstructorProperties {
        [key: string]: any;
        follow_enable_animations_setting: boolean;
        followEnableAnimationsSetting: boolean;
        state: AnimationState;
        target: AnimationTarget;
        value: number;
        widget: Gtk.Widget;
    }
}
export abstract class Animation extends GObject.Object {
    static $gtype: GObject.GType<Animation>;

    constructor(properties?: Partial<Animation.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<Animation.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get follow_enable_animations_setting(): boolean;
    set follow_enable_animations_setting(val: boolean);
    get followEnableAnimationsSetting(): boolean;
    set followEnableAnimationsSetting(val: boolean);
    get state(): AnimationState;
    get target(): AnimationTarget;
    set target(val: AnimationTarget);
    get value(): number;
    get widget(): Gtk.Widget;

    // Signals

    connect(id: string, callback: (...args: any[]) => any): number;
    connect_after(id: string, callback: (...args: any[]) => any): number;
    emit(id: string, ...args: any[]): void;
    connect(signal: "done", callback: (_source: this) => void): number;
    connect_after(signal: "done", callback: (_source: this) => void): number;
    emit(signal: "done"): void;

    // Members

    get_follow_enable_animations_setting(): boolean;
    get_state(): AnimationState;
    get_target(): AnimationTarget;
    get_value(): number;
    get_widget(): Gtk.Widget;
    pause(): void;
    play(): void;
    reset(): void;
    resume(): void;
    set_follow_enable_animations_setting(setting: boolean): void;
    set_target(target: AnimationTarget): void;
    skip(): void;
}
export module AnimationTarget {
    export interface ConstructorProperties extends GObject.Object.ConstructorProperties {
        [key: string]: any;
    }
}
export abstract class AnimationTarget extends GObject.Object {
    static $gtype: GObject.GType<AnimationTarget>;

    constructor(properties?: Partial<AnimationTarget.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<AnimationTarget.ConstructorProperties>, ...args: any[]): void;
}
export module Application {
    export interface ConstructorProperties extends Gtk.Application.ConstructorProperties {
        [key: string]: any;
        style_manager: StyleManager;
        styleManager: StyleManager;
    }
}
export class Application extends Gtk.Application implements Gio.ActionGroup, Gio.ActionMap {
    static $gtype: GObject.GType<Application>;

    constructor(properties?: Partial<Application.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<Application.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get style_manager(): StyleManager;
    get styleManager(): StyleManager;

    // Constructors

    static ["new"](application_id: string | null, flags: Gio.ApplicationFlags): Application;

    // Members

    get_style_manager(): StyleManager;
}
export module ApplicationWindow {
    export interface ConstructorProperties extends Gtk.ApplicationWindow.ConstructorProperties {
        [key: string]: any;
        content: Gtk.Widget;
    }
}
export class ApplicationWindow
    extends Gtk.ApplicationWindow
    implements
        Gio.ActionGroup,
        Gio.ActionMap,
        Gtk.Accessible,
        Gtk.Buildable,
        Gtk.ConstraintTarget,
        Gtk.Native,
        Gtk.Root,
        Gtk.ShortcutManager
{
    static $gtype: GObject.GType<ApplicationWindow>;

    constructor(properties?: Partial<ApplicationWindow.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<ApplicationWindow.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get content(): Gtk.Widget;
    set content(val: Gtk.Widget);

    // Constructors

    static ["new"](app: Gtk.Application): ApplicationWindow;
    // Conflicted with Gtk.Window.new
    static ["new"](...args: never[]): any;

    // Members

    get_content(): Gtk.Widget | null;
    set_content(content?: Gtk.Widget | null): void;

    // Implemented Members

    action_added(action_name: string): void;
    action_enabled_changed(action_name: string, enabled: boolean): void;
    action_removed(action_name: string): void;
    action_state_changed(action_name: string, state: GLib.Variant): void;
    activate_action(action_name: string, parameter?: GLib.Variant | null): void;
    // Conflicted with Gtk.Widget.activate_action
    activate_action(...args: never[]): any;
    change_action_state(action_name: string, value: GLib.Variant): void;
    get_action_enabled(action_name: string): boolean;
    get_action_parameter_type(action_name: string): GLib.VariantType | null;
    get_action_state(action_name: string): GLib.Variant | null;
    get_action_state_hint(action_name: string): GLib.Variant | null;
    get_action_state_type(action_name: string): GLib.VariantType | null;
    has_action(action_name: string): boolean;
    list_actions(): string[];
    query_action(
        action_name: string
    ): [boolean, boolean, GLib.VariantType | null, GLib.VariantType | null, GLib.Variant | null, GLib.Variant | null];
    vfunc_action_added(action_name: string): void;
    vfunc_action_enabled_changed(action_name: string, enabled: boolean): void;
    vfunc_action_removed(action_name: string): void;
    vfunc_action_state_changed(action_name: string, state: GLib.Variant): void;
    vfunc_activate_action(action_name: string, parameter?: GLib.Variant | null): void;
    vfunc_change_action_state(action_name: string, value: GLib.Variant): void;
    vfunc_get_action_enabled(action_name: string): boolean;
    vfunc_get_action_parameter_type(action_name: string): GLib.VariantType | null;
    vfunc_get_action_state(action_name: string): GLib.Variant | null;
    vfunc_get_action_state_hint(action_name: string): GLib.Variant | null;
    vfunc_get_action_state_type(action_name: string): GLib.VariantType | null;
    vfunc_has_action(action_name: string): boolean;
    vfunc_list_actions(): string[];
    vfunc_query_action(
        action_name: string
    ): [boolean, boolean, GLib.VariantType | null, GLib.VariantType | null, GLib.Variant | null, GLib.Variant | null];
    add_action(action: Gio.Action): void;
    add_action_entries(entries: Gio.ActionEntry[], user_data?: any | null): void;
    lookup_action(action_name: string): Gio.Action | null;
    remove_action(action_name: string): void;
    vfunc_add_action(action: Gio.Action): void;
    vfunc_lookup_action(action_name: string): Gio.Action | null;
    vfunc_remove_action(action_name: string): void;
}
export module Avatar {
    export interface ConstructorProperties extends Gtk.Widget.ConstructorProperties {
        [key: string]: any;
        custom_image: Gdk.Paintable;
        customImage: Gdk.Paintable;
        icon_name: string;
        iconName: string;
        show_initials: boolean;
        showInitials: boolean;
        size: number;
        text: string;
    }
}
export class Avatar extends Gtk.Widget implements Gtk.Accessible, Gtk.Buildable, Gtk.ConstraintTarget {
    static $gtype: GObject.GType<Avatar>;

    constructor(properties?: Partial<Avatar.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<Avatar.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get custom_image(): Gdk.Paintable;
    set custom_image(val: Gdk.Paintable);
    get customImage(): Gdk.Paintable;
    set customImage(val: Gdk.Paintable);
    get icon_name(): string;
    set icon_name(val: string);
    get iconName(): string;
    set iconName(val: string);
    get show_initials(): boolean;
    set show_initials(val: boolean);
    get showInitials(): boolean;
    set showInitials(val: boolean);
    get size(): number;
    set size(val: number);
    get text(): string;
    set text(val: string);

    // Implemented Properties

    get accessible_role(): Gtk.AccessibleRole;
    set accessible_role(val: Gtk.AccessibleRole);
    get accessibleRole(): Gtk.AccessibleRole;
    set accessibleRole(val: Gtk.AccessibleRole);

    // Constructors

    static ["new"](size: number, text: string | null, show_initials: boolean): Avatar;

    // Members

    draw_to_texture(scale_factor: number): Gdk.Texture;
    get_custom_image(): Gdk.Paintable | null;
    get_icon_name(): string | null;
    get_show_initials(): boolean;
    get_size(): number;
    get_text(): string | null;
    set_custom_image(custom_image?: Gdk.Paintable | null): void;
    set_icon_name(icon_name?: string | null): void;
    set_show_initials(show_initials: boolean): void;
    set_size(size: number): void;
    set_text(text?: string | null): void;

    // Implemented Members

    get_accessible_parent(): Gtk.Accessible | null;
    get_accessible_role(): Gtk.AccessibleRole;
    get_at_context(): Gtk.ATContext;
    get_bounds(): [boolean, number, number, number, number];
    get_first_accessible_child(): Gtk.Accessible | null;
    get_next_accessible_sibling(): Gtk.Accessible | null;
    get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    reset_property(property: Gtk.AccessibleProperty): void;
    reset_relation(relation: Gtk.AccessibleRelation): void;
    reset_state(state: Gtk.AccessibleState): void;
    set_accessible_parent(parent?: Gtk.Accessible | null, next_sibling?: Gtk.Accessible | null): void;
    update_next_accessible_sibling(new_sibling?: Gtk.Accessible | null): void;
    update_property(properties: Gtk.AccessibleProperty[], values: GObject.Value[]): void;
    update_relation(relations: Gtk.AccessibleRelation[], values: GObject.Value[]): void;
    update_state(states: Gtk.AccessibleState[], values: GObject.Value[]): void;
    vfunc_get_accessible_parent(): Gtk.Accessible | null;
    vfunc_get_at_context(): Gtk.ATContext | null;
    vfunc_get_bounds(): [boolean, number, number, number, number];
    vfunc_get_first_accessible_child(): Gtk.Accessible | null;
    vfunc_get_next_accessible_sibling(): Gtk.Accessible | null;
    vfunc_get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    get_buildable_id(): string | null;
    vfunc_add_child(builder: Gtk.Builder, child: GObject.Object, type?: string | null): void;
    vfunc_custom_finished(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_end(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_start(
        builder: Gtk.Builder,
        child: GObject.Object | null,
        tagname: string
    ): [boolean, Gtk.BuildableParser, any | null];
    vfunc_get_id(): string;
    vfunc_get_internal_child<T = GObject.Object>(builder: Gtk.Builder, childname: string): T;
    vfunc_parser_finished(builder: Gtk.Builder): void;
    vfunc_set_buildable_property(builder: Gtk.Builder, name: string, value: GObject.Value | any): void;
    vfunc_set_id(id: string): void;
}
export module Banner {
    export interface ConstructorProperties extends Gtk.Widget.ConstructorProperties {
        [key: string]: any;
        button_label: string;
        buttonLabel: string;
        revealed: boolean;
        title: string;
        use_markup: boolean;
        useMarkup: boolean;
    }
}
export class Banner extends Gtk.Widget implements Gtk.Accessible, Gtk.Actionable, Gtk.Buildable, Gtk.ConstraintTarget {
    static $gtype: GObject.GType<Banner>;

    constructor(properties?: Partial<Banner.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<Banner.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get button_label(): string;
    set button_label(val: string);
    get buttonLabel(): string;
    set buttonLabel(val: string);
    get revealed(): boolean;
    set revealed(val: boolean);
    get title(): string;
    set title(val: string);
    get use_markup(): boolean;
    set use_markup(val: boolean);
    get useMarkup(): boolean;
    set useMarkup(val: boolean);

    // Signals

    connect(id: string, callback: (...args: any[]) => any): number;
    connect_after(id: string, callback: (...args: any[]) => any): number;
    emit(id: string, ...args: any[]): void;
    connect(signal: "button-clicked", callback: (_source: this) => void): number;
    connect_after(signal: "button-clicked", callback: (_source: this) => void): number;
    emit(signal: "button-clicked"): void;

    // Implemented Properties

    get accessible_role(): Gtk.AccessibleRole;
    set accessible_role(val: Gtk.AccessibleRole);
    get accessibleRole(): Gtk.AccessibleRole;
    set accessibleRole(val: Gtk.AccessibleRole);
    get action_name(): string;
    set action_name(val: string);
    get actionName(): string;
    set actionName(val: string);
    get action_target(): GLib.Variant;
    set action_target(val: GLib.Variant);
    get actionTarget(): GLib.Variant;
    set actionTarget(val: GLib.Variant);

    // Constructors

    static ["new"](title: string): Banner;

    // Members

    get_button_label(): string | null;
    get_revealed(): boolean;
    get_title(): string;
    get_use_markup(): boolean;
    set_button_label(label?: string | null): void;
    set_revealed(revealed: boolean): void;
    set_title(title: string): void;
    set_use_markup(use_markup: boolean): void;

    // Implemented Members

    get_accessible_parent(): Gtk.Accessible | null;
    get_accessible_role(): Gtk.AccessibleRole;
    get_at_context(): Gtk.ATContext;
    get_bounds(): [boolean, number, number, number, number];
    get_first_accessible_child(): Gtk.Accessible | null;
    get_next_accessible_sibling(): Gtk.Accessible | null;
    get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    reset_property(property: Gtk.AccessibleProperty): void;
    reset_relation(relation: Gtk.AccessibleRelation): void;
    reset_state(state: Gtk.AccessibleState): void;
    set_accessible_parent(parent?: Gtk.Accessible | null, next_sibling?: Gtk.Accessible | null): void;
    update_next_accessible_sibling(new_sibling?: Gtk.Accessible | null): void;
    update_property(properties: Gtk.AccessibleProperty[], values: GObject.Value[]): void;
    update_relation(relations: Gtk.AccessibleRelation[], values: GObject.Value[]): void;
    update_state(states: Gtk.AccessibleState[], values: GObject.Value[]): void;
    vfunc_get_accessible_parent(): Gtk.Accessible | null;
    vfunc_get_at_context(): Gtk.ATContext | null;
    vfunc_get_bounds(): [boolean, number, number, number, number];
    vfunc_get_first_accessible_child(): Gtk.Accessible | null;
    vfunc_get_next_accessible_sibling(): Gtk.Accessible | null;
    vfunc_get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    get_action_name(): string | null;
    get_action_target_value(): GLib.Variant | null;
    set_action_name(action_name?: string | null): void;
    set_action_target_value(target_value?: GLib.Variant | null): void;
    set_detailed_action_name(detailed_action_name: string): void;
    vfunc_get_action_name(): string | null;
    vfunc_get_action_target_value(): GLib.Variant | null;
    vfunc_set_action_name(action_name?: string | null): void;
    vfunc_set_action_target_value(target_value?: GLib.Variant | null): void;
    get_buildable_id(): string | null;
    vfunc_add_child(builder: Gtk.Builder, child: GObject.Object, type?: string | null): void;
    vfunc_custom_finished(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_end(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_start(
        builder: Gtk.Builder,
        child: GObject.Object | null,
        tagname: string
    ): [boolean, Gtk.BuildableParser, any | null];
    vfunc_get_id(): string;
    vfunc_get_internal_child<T = GObject.Object>(builder: Gtk.Builder, childname: string): T;
    vfunc_parser_finished(builder: Gtk.Builder): void;
    vfunc_set_buildable_property(builder: Gtk.Builder, name: string, value: GObject.Value | any): void;
    vfunc_set_id(id: string): void;
}
export module Bin {
    export interface ConstructorProperties extends Gtk.Widget.ConstructorProperties {
        [key: string]: any;
        child: Gtk.Widget;
    }
}
export class Bin extends Gtk.Widget implements Gtk.Accessible, Gtk.Buildable, Gtk.ConstraintTarget {
    static $gtype: GObject.GType<Bin>;

    constructor(properties?: Partial<Bin.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<Bin.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get child(): Gtk.Widget;
    set child(val: Gtk.Widget);

    // Implemented Properties

    get accessible_role(): Gtk.AccessibleRole;
    set accessible_role(val: Gtk.AccessibleRole);
    get accessibleRole(): Gtk.AccessibleRole;
    set accessibleRole(val: Gtk.AccessibleRole);

    // Constructors

    static ["new"](): Bin;

    // Members

    get_child(): Gtk.Widget | null;
    set_child(child?: Gtk.Widget | null): void;

    // Implemented Members

    get_accessible_parent(): Gtk.Accessible | null;
    get_accessible_role(): Gtk.AccessibleRole;
    get_at_context(): Gtk.ATContext;
    get_bounds(): [boolean, number, number, number, number];
    get_first_accessible_child(): Gtk.Accessible | null;
    get_next_accessible_sibling(): Gtk.Accessible | null;
    get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    reset_property(property: Gtk.AccessibleProperty): void;
    reset_relation(relation: Gtk.AccessibleRelation): void;
    reset_state(state: Gtk.AccessibleState): void;
    set_accessible_parent(parent?: Gtk.Accessible | null, next_sibling?: Gtk.Accessible | null): void;
    update_next_accessible_sibling(new_sibling?: Gtk.Accessible | null): void;
    update_property(properties: Gtk.AccessibleProperty[], values: GObject.Value[]): void;
    update_relation(relations: Gtk.AccessibleRelation[], values: GObject.Value[]): void;
    update_state(states: Gtk.AccessibleState[], values: GObject.Value[]): void;
    vfunc_get_accessible_parent(): Gtk.Accessible | null;
    vfunc_get_at_context(): Gtk.ATContext | null;
    vfunc_get_bounds(): [boolean, number, number, number, number];
    vfunc_get_first_accessible_child(): Gtk.Accessible | null;
    vfunc_get_next_accessible_sibling(): Gtk.Accessible | null;
    vfunc_get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    get_buildable_id(): string | null;
    vfunc_add_child(builder: Gtk.Builder, child: GObject.Object, type?: string | null): void;
    vfunc_custom_finished(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_end(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_start(
        builder: Gtk.Builder,
        child: GObject.Object | null,
        tagname: string
    ): [boolean, Gtk.BuildableParser, any | null];
    vfunc_get_id(): string;
    vfunc_get_internal_child<T = GObject.Object>(builder: Gtk.Builder, childname: string): T;
    vfunc_parser_finished(builder: Gtk.Builder): void;
    vfunc_set_buildable_property(builder: Gtk.Builder, name: string, value: GObject.Value | any): void;
    vfunc_set_id(id: string): void;
}
export module ButtonContent {
    export interface ConstructorProperties extends Gtk.Widget.ConstructorProperties {
        [key: string]: any;
        icon_name: string;
        iconName: string;
        label: string;
        use_underline: boolean;
        useUnderline: boolean;
    }
}
export class ButtonContent extends Gtk.Widget implements Gtk.Accessible, Gtk.Buildable, Gtk.ConstraintTarget {
    static $gtype: GObject.GType<ButtonContent>;

    constructor(properties?: Partial<ButtonContent.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<ButtonContent.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get icon_name(): string;
    set icon_name(val: string);
    get iconName(): string;
    set iconName(val: string);
    get label(): string;
    set label(val: string);
    get use_underline(): boolean;
    set use_underline(val: boolean);
    get useUnderline(): boolean;
    set useUnderline(val: boolean);

    // Implemented Properties

    get accessible_role(): Gtk.AccessibleRole;
    set accessible_role(val: Gtk.AccessibleRole);
    get accessibleRole(): Gtk.AccessibleRole;
    set accessibleRole(val: Gtk.AccessibleRole);

    // Constructors

    static ["new"](): ButtonContent;

    // Members

    get_icon_name(): string;
    get_label(): string;
    get_use_underline(): boolean;
    set_icon_name(icon_name: string): void;
    set_label(label: string): void;
    set_use_underline(use_underline: boolean): void;

    // Implemented Members

    get_accessible_parent(): Gtk.Accessible | null;
    get_accessible_role(): Gtk.AccessibleRole;
    get_at_context(): Gtk.ATContext;
    get_bounds(): [boolean, number, number, number, number];
    get_first_accessible_child(): Gtk.Accessible | null;
    get_next_accessible_sibling(): Gtk.Accessible | null;
    get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    reset_property(property: Gtk.AccessibleProperty): void;
    reset_relation(relation: Gtk.AccessibleRelation): void;
    reset_state(state: Gtk.AccessibleState): void;
    set_accessible_parent(parent?: Gtk.Accessible | null, next_sibling?: Gtk.Accessible | null): void;
    update_next_accessible_sibling(new_sibling?: Gtk.Accessible | null): void;
    update_property(properties: Gtk.AccessibleProperty[], values: GObject.Value[]): void;
    update_relation(relations: Gtk.AccessibleRelation[], values: GObject.Value[]): void;
    update_state(states: Gtk.AccessibleState[], values: GObject.Value[]): void;
    vfunc_get_accessible_parent(): Gtk.Accessible | null;
    vfunc_get_at_context(): Gtk.ATContext | null;
    vfunc_get_bounds(): [boolean, number, number, number, number];
    vfunc_get_first_accessible_child(): Gtk.Accessible | null;
    vfunc_get_next_accessible_sibling(): Gtk.Accessible | null;
    vfunc_get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    get_buildable_id(): string | null;
    vfunc_add_child(builder: Gtk.Builder, child: GObject.Object, type?: string | null): void;
    vfunc_custom_finished(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_end(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_start(
        builder: Gtk.Builder,
        child: GObject.Object | null,
        tagname: string
    ): [boolean, Gtk.BuildableParser, any | null];
    vfunc_get_id(): string;
    vfunc_get_internal_child<T = GObject.Object>(builder: Gtk.Builder, childname: string): T;
    vfunc_parser_finished(builder: Gtk.Builder): void;
    vfunc_set_buildable_property(builder: Gtk.Builder, name: string, value: GObject.Value | any): void;
    vfunc_set_id(id: string): void;
}
export module CallbackAnimationTarget {
    export interface ConstructorProperties extends AnimationTarget.ConstructorProperties {
        [key: string]: any;
    }
}
export class CallbackAnimationTarget extends AnimationTarget {
    static $gtype: GObject.GType<CallbackAnimationTarget>;

    constructor(properties?: Partial<CallbackAnimationTarget.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<CallbackAnimationTarget.ConstructorProperties>, ...args: any[]): void;

    // Constructors

    static ["new"](): CallbackAnimationTarget;
}
export module Carousel {
    export interface ConstructorProperties extends Gtk.Widget.ConstructorProperties {
        [key: string]: any;
        allow_long_swipes: boolean;
        allowLongSwipes: boolean;
        allow_mouse_drag: boolean;
        allowMouseDrag: boolean;
        allow_scroll_wheel: boolean;
        allowScrollWheel: boolean;
        interactive: boolean;
        n_pages: number;
        nPages: number;
        position: number;
        reveal_duration: number;
        revealDuration: number;
        scroll_params: SpringParams;
        scrollParams: SpringParams;
        spacing: number;
    }
}
export class Carousel
    extends Gtk.Widget
    implements Swipeable, Gtk.Accessible, Gtk.Buildable, Gtk.ConstraintTarget, Gtk.Orientable
{
    static $gtype: GObject.GType<Carousel>;

    constructor(properties?: Partial<Carousel.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<Carousel.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get allow_long_swipes(): boolean;
    set allow_long_swipes(val: boolean);
    get allowLongSwipes(): boolean;
    set allowLongSwipes(val: boolean);
    get allow_mouse_drag(): boolean;
    set allow_mouse_drag(val: boolean);
    get allowMouseDrag(): boolean;
    set allowMouseDrag(val: boolean);
    get allow_scroll_wheel(): boolean;
    set allow_scroll_wheel(val: boolean);
    get allowScrollWheel(): boolean;
    set allowScrollWheel(val: boolean);
    get interactive(): boolean;
    set interactive(val: boolean);
    get n_pages(): number;
    get nPages(): number;
    get position(): number;
    get reveal_duration(): number;
    set reveal_duration(val: number);
    get revealDuration(): number;
    set revealDuration(val: number);
    get scroll_params(): SpringParams;
    set scroll_params(val: SpringParams);
    get scrollParams(): SpringParams;
    set scrollParams(val: SpringParams);
    get spacing(): number;
    set spacing(val: number);

    // Signals

    connect(id: string, callback: (...args: any[]) => any): number;
    connect_after(id: string, callback: (...args: any[]) => any): number;
    emit(id: string, ...args: any[]): void;
    connect(signal: "page-changed", callback: (_source: this, index: number) => void): number;
    connect_after(signal: "page-changed", callback: (_source: this, index: number) => void): number;
    emit(signal: "page-changed", index: number): void;

    // Implemented Properties

    get accessible_role(): Gtk.AccessibleRole;
    set accessible_role(val: Gtk.AccessibleRole);
    get accessibleRole(): Gtk.AccessibleRole;
    set accessibleRole(val: Gtk.AccessibleRole);
    get orientation(): Gtk.Orientation;
    set orientation(val: Gtk.Orientation);

    // Constructors

    static ["new"](): Carousel;

    // Members

    append(child: Gtk.Widget): void;
    get_allow_long_swipes(): boolean;
    get_allow_mouse_drag(): boolean;
    get_allow_scroll_wheel(): boolean;
    get_interactive(): boolean;
    get_n_pages(): number;
    get_nth_page(n: number): Gtk.Widget;
    get_position(): number;
    get_reveal_duration(): number;
    get_scroll_params(): SpringParams;
    get_spacing(): number;
    insert(child: Gtk.Widget, position: number): void;
    prepend(child: Gtk.Widget): void;
    remove(child: Gtk.Widget): void;
    reorder(child: Gtk.Widget, position: number): void;
    scroll_to(widget: Gtk.Widget, animate: boolean): void;
    set_allow_long_swipes(allow_long_swipes: boolean): void;
    set_allow_mouse_drag(allow_mouse_drag: boolean): void;
    set_allow_scroll_wheel(allow_scroll_wheel: boolean): void;
    set_interactive(interactive: boolean): void;
    set_reveal_duration(reveal_duration: number): void;
    set_scroll_params(params: SpringParams): void;
    set_spacing(spacing: number): void;

    // Implemented Members

    get_cancel_progress(): number;
    get_distance(): number;
    get_progress(): number;
    get_snap_points(): number[];
    get_swipe_area(navigation_direction: NavigationDirection, is_drag: boolean): Gdk.Rectangle;
    vfunc_get_cancel_progress(): number;
    vfunc_get_distance(): number;
    vfunc_get_progress(): number;
    vfunc_get_snap_points(): number[];
    vfunc_get_swipe_area(navigation_direction: NavigationDirection, is_drag: boolean): Gdk.Rectangle;
    get_accessible_parent(): Gtk.Accessible | null;
    get_accessible_role(): Gtk.AccessibleRole;
    get_at_context(): Gtk.ATContext;
    get_bounds(): [boolean, number, number, number, number];
    get_first_accessible_child(): Gtk.Accessible | null;
    get_next_accessible_sibling(): Gtk.Accessible | null;
    get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    reset_property(property: Gtk.AccessibleProperty): void;
    reset_relation(relation: Gtk.AccessibleRelation): void;
    reset_state(state: Gtk.AccessibleState): void;
    set_accessible_parent(parent?: Gtk.Accessible | null, next_sibling?: Gtk.Accessible | null): void;
    update_next_accessible_sibling(new_sibling?: Gtk.Accessible | null): void;
    update_property(properties: Gtk.AccessibleProperty[], values: GObject.Value[]): void;
    update_relation(relations: Gtk.AccessibleRelation[], values: GObject.Value[]): void;
    update_state(states: Gtk.AccessibleState[], values: GObject.Value[]): void;
    vfunc_get_accessible_parent(): Gtk.Accessible | null;
    vfunc_get_at_context(): Gtk.ATContext | null;
    vfunc_get_bounds(): [boolean, number, number, number, number];
    vfunc_get_first_accessible_child(): Gtk.Accessible | null;
    vfunc_get_next_accessible_sibling(): Gtk.Accessible | null;
    vfunc_get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    get_buildable_id(): string | null;
    vfunc_add_child(builder: Gtk.Builder, child: GObject.Object, type?: string | null): void;
    vfunc_custom_finished(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_end(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_start(
        builder: Gtk.Builder,
        child: GObject.Object | null,
        tagname: string
    ): [boolean, Gtk.BuildableParser, any | null];
    vfunc_get_id(): string;
    vfunc_get_internal_child<T = GObject.Object>(builder: Gtk.Builder, childname: string): T;
    vfunc_parser_finished(builder: Gtk.Builder): void;
    vfunc_set_buildable_property(builder: Gtk.Builder, name: string, value: GObject.Value | any): void;
    vfunc_set_id(id: string): void;
    get_orientation(): Gtk.Orientation;
    set_orientation(orientation: Gtk.Orientation): void;
}
export module CarouselIndicatorDots {
    export interface ConstructorProperties extends Gtk.Widget.ConstructorProperties {
        [key: string]: any;
        carousel: Carousel;
    }
}
export class CarouselIndicatorDots
    extends Gtk.Widget
    implements Gtk.Accessible, Gtk.Buildable, Gtk.ConstraintTarget, Gtk.Orientable
{
    static $gtype: GObject.GType<CarouselIndicatorDots>;

    constructor(properties?: Partial<CarouselIndicatorDots.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<CarouselIndicatorDots.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get carousel(): Carousel;
    set carousel(val: Carousel);

    // Implemented Properties

    get accessible_role(): Gtk.AccessibleRole;
    set accessible_role(val: Gtk.AccessibleRole);
    get accessibleRole(): Gtk.AccessibleRole;
    set accessibleRole(val: Gtk.AccessibleRole);
    get orientation(): Gtk.Orientation;
    set orientation(val: Gtk.Orientation);

    // Constructors

    static ["new"](): CarouselIndicatorDots;

    // Members

    get_carousel(): Carousel | null;
    set_carousel(carousel?: Carousel | null): void;

    // Implemented Members

    get_accessible_parent(): Gtk.Accessible | null;
    get_accessible_role(): Gtk.AccessibleRole;
    get_at_context(): Gtk.ATContext;
    get_bounds(): [boolean, number, number, number, number];
    get_first_accessible_child(): Gtk.Accessible | null;
    get_next_accessible_sibling(): Gtk.Accessible | null;
    get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    reset_property(property: Gtk.AccessibleProperty): void;
    reset_relation(relation: Gtk.AccessibleRelation): void;
    reset_state(state: Gtk.AccessibleState): void;
    set_accessible_parent(parent?: Gtk.Accessible | null, next_sibling?: Gtk.Accessible | null): void;
    update_next_accessible_sibling(new_sibling?: Gtk.Accessible | null): void;
    update_property(properties: Gtk.AccessibleProperty[], values: GObject.Value[]): void;
    update_relation(relations: Gtk.AccessibleRelation[], values: GObject.Value[]): void;
    update_state(states: Gtk.AccessibleState[], values: GObject.Value[]): void;
    vfunc_get_accessible_parent(): Gtk.Accessible | null;
    vfunc_get_at_context(): Gtk.ATContext | null;
    vfunc_get_bounds(): [boolean, number, number, number, number];
    vfunc_get_first_accessible_child(): Gtk.Accessible | null;
    vfunc_get_next_accessible_sibling(): Gtk.Accessible | null;
    vfunc_get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    get_buildable_id(): string | null;
    vfunc_add_child(builder: Gtk.Builder, child: GObject.Object, type?: string | null): void;
    vfunc_custom_finished(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_end(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_start(
        builder: Gtk.Builder,
        child: GObject.Object | null,
        tagname: string
    ): [boolean, Gtk.BuildableParser, any | null];
    vfunc_get_id(): string;
    vfunc_get_internal_child<T = GObject.Object>(builder: Gtk.Builder, childname: string): T;
    vfunc_parser_finished(builder: Gtk.Builder): void;
    vfunc_set_buildable_property(builder: Gtk.Builder, name: string, value: GObject.Value | any): void;
    vfunc_set_id(id: string): void;
    get_orientation(): Gtk.Orientation;
    set_orientation(orientation: Gtk.Orientation): void;
}
export module CarouselIndicatorLines {
    export interface ConstructorProperties extends Gtk.Widget.ConstructorProperties {
        [key: string]: any;
        carousel: Carousel;
    }
}
export class CarouselIndicatorLines
    extends Gtk.Widget
    implements Gtk.Accessible, Gtk.Buildable, Gtk.ConstraintTarget, Gtk.Orientable
{
    static $gtype: GObject.GType<CarouselIndicatorLines>;

    constructor(properties?: Partial<CarouselIndicatorLines.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<CarouselIndicatorLines.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get carousel(): Carousel;
    set carousel(val: Carousel);

    // Implemented Properties

    get accessible_role(): Gtk.AccessibleRole;
    set accessible_role(val: Gtk.AccessibleRole);
    get accessibleRole(): Gtk.AccessibleRole;
    set accessibleRole(val: Gtk.AccessibleRole);
    get orientation(): Gtk.Orientation;
    set orientation(val: Gtk.Orientation);

    // Constructors

    static ["new"](): CarouselIndicatorLines;

    // Members

    get_carousel(): Carousel | null;
    set_carousel(carousel?: Carousel | null): void;

    // Implemented Members

    get_accessible_parent(): Gtk.Accessible | null;
    get_accessible_role(): Gtk.AccessibleRole;
    get_at_context(): Gtk.ATContext;
    get_bounds(): [boolean, number, number, number, number];
    get_first_accessible_child(): Gtk.Accessible | null;
    get_next_accessible_sibling(): Gtk.Accessible | null;
    get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    reset_property(property: Gtk.AccessibleProperty): void;
    reset_relation(relation: Gtk.AccessibleRelation): void;
    reset_state(state: Gtk.AccessibleState): void;
    set_accessible_parent(parent?: Gtk.Accessible | null, next_sibling?: Gtk.Accessible | null): void;
    update_next_accessible_sibling(new_sibling?: Gtk.Accessible | null): void;
    update_property(properties: Gtk.AccessibleProperty[], values: GObject.Value[]): void;
    update_relation(relations: Gtk.AccessibleRelation[], values: GObject.Value[]): void;
    update_state(states: Gtk.AccessibleState[], values: GObject.Value[]): void;
    vfunc_get_accessible_parent(): Gtk.Accessible | null;
    vfunc_get_at_context(): Gtk.ATContext | null;
    vfunc_get_bounds(): [boolean, number, number, number, number];
    vfunc_get_first_accessible_child(): Gtk.Accessible | null;
    vfunc_get_next_accessible_sibling(): Gtk.Accessible | null;
    vfunc_get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    get_buildable_id(): string | null;
    vfunc_add_child(builder: Gtk.Builder, child: GObject.Object, type?: string | null): void;
    vfunc_custom_finished(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_end(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_start(
        builder: Gtk.Builder,
        child: GObject.Object | null,
        tagname: string
    ): [boolean, Gtk.BuildableParser, any | null];
    vfunc_get_id(): string;
    vfunc_get_internal_child<T = GObject.Object>(builder: Gtk.Builder, childname: string): T;
    vfunc_parser_finished(builder: Gtk.Builder): void;
    vfunc_set_buildable_property(builder: Gtk.Builder, name: string, value: GObject.Value | any): void;
    vfunc_set_id(id: string): void;
    get_orientation(): Gtk.Orientation;
    set_orientation(orientation: Gtk.Orientation): void;
}
export module Clamp {
    export interface ConstructorProperties extends Gtk.Widget.ConstructorProperties {
        [key: string]: any;
        child: Gtk.Widget;
        maximum_size: number;
        maximumSize: number;
        tightening_threshold: number;
        tighteningThreshold: number;
    }
}
export class Clamp extends Gtk.Widget implements Gtk.Accessible, Gtk.Buildable, Gtk.ConstraintTarget, Gtk.Orientable {
    static $gtype: GObject.GType<Clamp>;

    constructor(properties?: Partial<Clamp.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<Clamp.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get child(): Gtk.Widget;
    set child(val: Gtk.Widget);
    get maximum_size(): number;
    set maximum_size(val: number);
    get maximumSize(): number;
    set maximumSize(val: number);
    get tightening_threshold(): number;
    set tightening_threshold(val: number);
    get tighteningThreshold(): number;
    set tighteningThreshold(val: number);

    // Implemented Properties

    get accessible_role(): Gtk.AccessibleRole;
    set accessible_role(val: Gtk.AccessibleRole);
    get accessibleRole(): Gtk.AccessibleRole;
    set accessibleRole(val: Gtk.AccessibleRole);
    get orientation(): Gtk.Orientation;
    set orientation(val: Gtk.Orientation);

    // Constructors

    static ["new"](): Clamp;

    // Members

    get_child(): Gtk.Widget | null;
    get_maximum_size(): number;
    get_tightening_threshold(): number;
    set_child(child?: Gtk.Widget | null): void;
    set_maximum_size(maximum_size: number): void;
    set_tightening_threshold(tightening_threshold: number): void;

    // Implemented Members

    get_accessible_parent(): Gtk.Accessible | null;
    get_accessible_role(): Gtk.AccessibleRole;
    get_at_context(): Gtk.ATContext;
    get_bounds(): [boolean, number, number, number, number];
    get_first_accessible_child(): Gtk.Accessible | null;
    get_next_accessible_sibling(): Gtk.Accessible | null;
    get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    reset_property(property: Gtk.AccessibleProperty): void;
    reset_relation(relation: Gtk.AccessibleRelation): void;
    reset_state(state: Gtk.AccessibleState): void;
    set_accessible_parent(parent?: Gtk.Accessible | null, next_sibling?: Gtk.Accessible | null): void;
    update_next_accessible_sibling(new_sibling?: Gtk.Accessible | null): void;
    update_property(properties: Gtk.AccessibleProperty[], values: GObject.Value[]): void;
    update_relation(relations: Gtk.AccessibleRelation[], values: GObject.Value[]): void;
    update_state(states: Gtk.AccessibleState[], values: GObject.Value[]): void;
    vfunc_get_accessible_parent(): Gtk.Accessible | null;
    vfunc_get_at_context(): Gtk.ATContext | null;
    vfunc_get_bounds(): [boolean, number, number, number, number];
    vfunc_get_first_accessible_child(): Gtk.Accessible | null;
    vfunc_get_next_accessible_sibling(): Gtk.Accessible | null;
    vfunc_get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    get_buildable_id(): string | null;
    vfunc_add_child(builder: Gtk.Builder, child: GObject.Object, type?: string | null): void;
    vfunc_custom_finished(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_end(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_start(
        builder: Gtk.Builder,
        child: GObject.Object | null,
        tagname: string
    ): [boolean, Gtk.BuildableParser, any | null];
    vfunc_get_id(): string;
    vfunc_get_internal_child<T = GObject.Object>(builder: Gtk.Builder, childname: string): T;
    vfunc_parser_finished(builder: Gtk.Builder): void;
    vfunc_set_buildable_property(builder: Gtk.Builder, name: string, value: GObject.Value | any): void;
    vfunc_set_id(id: string): void;
    get_orientation(): Gtk.Orientation;
    set_orientation(orientation: Gtk.Orientation): void;
}
export module ClampLayout {
    export interface ConstructorProperties extends Gtk.LayoutManager.ConstructorProperties {
        [key: string]: any;
        maximum_size: number;
        maximumSize: number;
        tightening_threshold: number;
        tighteningThreshold: number;
    }
}
export class ClampLayout extends Gtk.LayoutManager implements Gtk.Orientable {
    static $gtype: GObject.GType<ClampLayout>;

    constructor(properties?: Partial<ClampLayout.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<ClampLayout.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get maximum_size(): number;
    set maximum_size(val: number);
    get maximumSize(): number;
    set maximumSize(val: number);
    get tightening_threshold(): number;
    set tightening_threshold(val: number);
    get tighteningThreshold(): number;
    set tighteningThreshold(val: number);

    // Implemented Properties

    get orientation(): Gtk.Orientation;
    set orientation(val: Gtk.Orientation);

    // Constructors

    static ["new"](): ClampLayout;

    // Members

    get_maximum_size(): number;
    get_tightening_threshold(): number;
    set_maximum_size(maximum_size: number): void;
    set_tightening_threshold(tightening_threshold: number): void;

    // Implemented Members

    get_orientation(): Gtk.Orientation;
    set_orientation(orientation: Gtk.Orientation): void;
}
export module ClampScrollable {
    export interface ConstructorProperties extends Gtk.Widget.ConstructorProperties {
        [key: string]: any;
        child: Gtk.Widget;
        maximum_size: number;
        maximumSize: number;
        tightening_threshold: number;
        tighteningThreshold: number;
    }
}
export class ClampScrollable
    extends Gtk.Widget
    implements Gtk.Accessible, Gtk.Buildable, Gtk.ConstraintTarget, Gtk.Orientable, Gtk.Scrollable
{
    static $gtype: GObject.GType<ClampScrollable>;

    constructor(properties?: Partial<ClampScrollable.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<ClampScrollable.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get child(): Gtk.Widget;
    set child(val: Gtk.Widget);
    get maximum_size(): number;
    set maximum_size(val: number);
    get maximumSize(): number;
    set maximumSize(val: number);
    get tightening_threshold(): number;
    set tightening_threshold(val: number);
    get tighteningThreshold(): number;
    set tighteningThreshold(val: number);

    // Implemented Properties

    get accessible_role(): Gtk.AccessibleRole;
    set accessible_role(val: Gtk.AccessibleRole);
    get accessibleRole(): Gtk.AccessibleRole;
    set accessibleRole(val: Gtk.AccessibleRole);
    get orientation(): Gtk.Orientation;
    set orientation(val: Gtk.Orientation);
    get hadjustment(): Gtk.Adjustment;
    set hadjustment(val: Gtk.Adjustment);
    get hscroll_policy(): Gtk.ScrollablePolicy;
    set hscroll_policy(val: Gtk.ScrollablePolicy);
    get hscrollPolicy(): Gtk.ScrollablePolicy;
    set hscrollPolicy(val: Gtk.ScrollablePolicy);
    get vadjustment(): Gtk.Adjustment;
    set vadjustment(val: Gtk.Adjustment);
    get vscroll_policy(): Gtk.ScrollablePolicy;
    set vscroll_policy(val: Gtk.ScrollablePolicy);
    get vscrollPolicy(): Gtk.ScrollablePolicy;
    set vscrollPolicy(val: Gtk.ScrollablePolicy);

    // Constructors

    static ["new"](): ClampScrollable;

    // Members

    get_child(): Gtk.Widget | null;
    get_maximum_size(): number;
    get_tightening_threshold(): number;
    set_child(child?: Gtk.Widget | null): void;
    set_maximum_size(maximum_size: number): void;
    set_tightening_threshold(tightening_threshold: number): void;

    // Implemented Members

    get_accessible_parent(): Gtk.Accessible | null;
    get_accessible_role(): Gtk.AccessibleRole;
    get_at_context(): Gtk.ATContext;
    get_bounds(): [boolean, number, number, number, number];
    get_first_accessible_child(): Gtk.Accessible | null;
    get_next_accessible_sibling(): Gtk.Accessible | null;
    get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    reset_property(property: Gtk.AccessibleProperty): void;
    reset_relation(relation: Gtk.AccessibleRelation): void;
    reset_state(state: Gtk.AccessibleState): void;
    set_accessible_parent(parent?: Gtk.Accessible | null, next_sibling?: Gtk.Accessible | null): void;
    update_next_accessible_sibling(new_sibling?: Gtk.Accessible | null): void;
    update_property(properties: Gtk.AccessibleProperty[], values: GObject.Value[]): void;
    update_relation(relations: Gtk.AccessibleRelation[], values: GObject.Value[]): void;
    update_state(states: Gtk.AccessibleState[], values: GObject.Value[]): void;
    vfunc_get_accessible_parent(): Gtk.Accessible | null;
    vfunc_get_at_context(): Gtk.ATContext | null;
    vfunc_get_bounds(): [boolean, number, number, number, number];
    vfunc_get_first_accessible_child(): Gtk.Accessible | null;
    vfunc_get_next_accessible_sibling(): Gtk.Accessible | null;
    vfunc_get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    get_buildable_id(): string | null;
    vfunc_add_child(builder: Gtk.Builder, child: GObject.Object, type?: string | null): void;
    vfunc_custom_finished(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_end(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_start(
        builder: Gtk.Builder,
        child: GObject.Object | null,
        tagname: string
    ): [boolean, Gtk.BuildableParser, any | null];
    vfunc_get_id(): string;
    vfunc_get_internal_child<T = GObject.Object>(builder: Gtk.Builder, childname: string): T;
    vfunc_parser_finished(builder: Gtk.Builder): void;
    vfunc_set_buildable_property(builder: Gtk.Builder, name: string, value: GObject.Value | any): void;
    vfunc_set_id(id: string): void;
    get_orientation(): Gtk.Orientation;
    set_orientation(orientation: Gtk.Orientation): void;
    get_border(): [boolean, Gtk.Border];
    get_hadjustment(): Gtk.Adjustment | null;
    get_hscroll_policy(): Gtk.ScrollablePolicy;
    get_vadjustment(): Gtk.Adjustment | null;
    get_vscroll_policy(): Gtk.ScrollablePolicy;
    set_hadjustment(hadjustment?: Gtk.Adjustment | null): void;
    set_hscroll_policy(policy: Gtk.ScrollablePolicy): void;
    set_vadjustment(vadjustment?: Gtk.Adjustment | null): void;
    set_vscroll_policy(policy: Gtk.ScrollablePolicy): void;
    vfunc_get_border(): [boolean, Gtk.Border];
}
export module ComboRow {
    export interface ConstructorProperties extends ActionRow.ConstructorProperties {
        [key: string]: any;
        expression: Gtk.Expression;
        factory: Gtk.ListItemFactory;
        list_factory: Gtk.ListItemFactory;
        listFactory: Gtk.ListItemFactory;
        model: Gio.ListModel;
        selected: number;
        selected_item: GObject.Object;
        selectedItem: GObject.Object;
        use_subtitle: boolean;
        useSubtitle: boolean;
    }
}
export class ComboRow extends ActionRow implements Gtk.Accessible, Gtk.Actionable, Gtk.Buildable, Gtk.ConstraintTarget {
    static $gtype: GObject.GType<ComboRow>;

    constructor(properties?: Partial<ComboRow.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<ComboRow.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get expression(): Gtk.Expression;
    set expression(val: Gtk.Expression);
    get factory(): Gtk.ListItemFactory;
    set factory(val: Gtk.ListItemFactory);
    get list_factory(): Gtk.ListItemFactory;
    set list_factory(val: Gtk.ListItemFactory);
    get listFactory(): Gtk.ListItemFactory;
    set listFactory(val: Gtk.ListItemFactory);
    get model(): Gio.ListModel;
    set model(val: Gio.ListModel);
    get selected(): number;
    set selected(val: number);
    get selected_item(): GObject.Object;
    get selectedItem(): GObject.Object;
    get use_subtitle(): boolean;
    set use_subtitle(val: boolean);
    get useSubtitle(): boolean;
    set useSubtitle(val: boolean);

    // Constructors

    static ["new"](): ComboRow;

    // Members

    get_expression(): Gtk.Expression | null;
    get_factory(): Gtk.ListItemFactory | null;
    get_list_factory(): Gtk.ListItemFactory | null;
    get_model(): Gio.ListModel | null;
    get_selected(): number;
    get_selected_item<T = GObject.Object>(): T;
    get_use_subtitle(): boolean;
    set_expression(expression?: Gtk.Expression | null): void;
    set_factory(factory?: Gtk.ListItemFactory | null): void;
    set_list_factory(factory?: Gtk.ListItemFactory | null): void;
    set_model(model?: Gio.ListModel | null): void;
    set_selected(position: number): void;
    set_use_subtitle(use_subtitle: boolean): void;
}
export module EntryRow {
    export interface ConstructorProperties extends PreferencesRow.ConstructorProperties {
        [key: string]: any;
        activates_default: boolean;
        activatesDefault: boolean;
        attributes: Pango.AttrList;
        enable_emoji_completion: boolean;
        enableEmojiCompletion: boolean;
        input_hints: Gtk.InputHints;
        inputHints: Gtk.InputHints;
        input_purpose: Gtk.InputPurpose;
        inputPurpose: Gtk.InputPurpose;
        show_apply_button: boolean;
        showApplyButton: boolean;
    }
}
export class EntryRow
    extends PreferencesRow
    implements Gtk.Accessible, Gtk.Actionable, Gtk.Buildable, Gtk.ConstraintTarget, Gtk.Editable
{
    static $gtype: GObject.GType<EntryRow>;

    constructor(properties?: Partial<EntryRow.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<EntryRow.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get activates_default(): boolean;
    set activates_default(val: boolean);
    get activatesDefault(): boolean;
    set activatesDefault(val: boolean);
    get attributes(): Pango.AttrList;
    set attributes(val: Pango.AttrList);
    get enable_emoji_completion(): boolean;
    set enable_emoji_completion(val: boolean);
    get enableEmojiCompletion(): boolean;
    set enableEmojiCompletion(val: boolean);
    get input_hints(): Gtk.InputHints;
    set input_hints(val: Gtk.InputHints);
    get inputHints(): Gtk.InputHints;
    set inputHints(val: Gtk.InputHints);
    get input_purpose(): Gtk.InputPurpose;
    set input_purpose(val: Gtk.InputPurpose);
    get inputPurpose(): Gtk.InputPurpose;
    set inputPurpose(val: Gtk.InputPurpose);
    get show_apply_button(): boolean;
    set show_apply_button(val: boolean);
    get showApplyButton(): boolean;
    set showApplyButton(val: boolean);

    // Signals

    connect(id: string, callback: (...args: any[]) => any): number;
    connect_after(id: string, callback: (...args: any[]) => any): number;
    emit(id: string, ...args: any[]): void;
    connect(signal: "apply", callback: (_source: this) => void): number;
    connect_after(signal: "apply", callback: (_source: this) => void): number;
    emit(signal: "apply"): void;
    connect(signal: "entry-activated", callback: (_source: this) => void): number;
    connect_after(signal: "entry-activated", callback: (_source: this) => void): number;
    emit(signal: "entry-activated"): void;

    // Implemented Properties

    get cursor_position(): number;
    get cursorPosition(): number;
    get editable(): boolean;
    set editable(val: boolean);
    get enable_undo(): boolean;
    set enable_undo(val: boolean);
    get enableUndo(): boolean;
    set enableUndo(val: boolean);
    get max_width_chars(): number;
    set max_width_chars(val: number);
    get maxWidthChars(): number;
    set maxWidthChars(val: number);
    get selection_bound(): number;
    get selectionBound(): number;
    get text(): string;
    set text(val: string);
    get width_chars(): number;
    set width_chars(val: number);
    get widthChars(): number;
    set widthChars(val: number);
    get xalign(): number;
    set xalign(val: number);

    // Constructors

    static ["new"](): EntryRow;

    // Members

    add_prefix(widget: Gtk.Widget): void;
    add_suffix(widget: Gtk.Widget): void;
    get_activates_default(): boolean;
    get_attributes(): Pango.AttrList | null;
    get_enable_emoji_completion(): boolean;
    get_input_hints(): Gtk.InputHints;
    get_input_purpose(): Gtk.InputPurpose;
    get_show_apply_button(): boolean;
    grab_focus_without_selecting(): boolean;
    remove(widget: Gtk.Widget): void;
    set_activates_default(activates: boolean): void;
    set_attributes(attributes?: Pango.AttrList | null): void;
    set_enable_emoji_completion(enable_emoji_completion: boolean): void;
    set_input_hints(hints: Gtk.InputHints): void;
    set_input_purpose(purpose: Gtk.InputPurpose): void;
    set_show_apply_button(show_apply_button: boolean): void;

    // Implemented Members

    delegate_get_accessible_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    delete_selection(): void;
    delete_text(start_pos: number, end_pos: number): void;
    finish_delegate(): void;
    get_alignment(): number;
    get_chars(start_pos: number, end_pos: number): string;
    get_delegate(): Gtk.Editable | null;
    get_editable(): boolean;
    get_enable_undo(): boolean;
    get_max_width_chars(): number;
    get_position(): number;
    get_selection_bounds(): [boolean, number | null, number | null];
    get_text(): string;
    get_width_chars(): number;
    init_delegate(): void;
    insert_text(text: string, length: number, position: number): number;
    select_region(start_pos: number, end_pos: number): void;
    set_alignment(xalign: number): void;
    set_editable(is_editable: boolean): void;
    set_enable_undo(enable_undo: boolean): void;
    set_max_width_chars(n_chars: number): void;
    set_position(position: number): void;
    set_text(text: string): void;
    set_width_chars(n_chars: number): void;
    vfunc_changed(): void;
    vfunc_delete_text(start_pos: number, end_pos: number): void;
    vfunc_do_delete_text(start_pos: number, end_pos: number): void;
    vfunc_do_insert_text(text: string, length: number, position: number): number;
    vfunc_get_delegate(): Gtk.Editable | null;
    vfunc_get_selection_bounds(): [boolean, number | null, number | null];
    vfunc_get_text(): string;
    vfunc_insert_text(text: string, length: number, position: number): number;
    vfunc_set_selection_bounds(start_pos: number, end_pos: number): void;
}
export module EnumListItem {
    export interface ConstructorProperties extends GObject.Object.ConstructorProperties {
        [key: string]: any;
        name: string;
        nick: string;
        value: number;
    }
}
export class EnumListItem extends GObject.Object {
    static $gtype: GObject.GType<EnumListItem>;

    constructor(properties?: Partial<EnumListItem.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<EnumListItem.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get name(): string;
    get nick(): string;
    get value(): number;

    // Members

    get_name(): string;
    get_nick(): string;
    get_value(): number;
}
export module EnumListModel {
    export interface ConstructorProperties<A extends GObject.Object = GObject.Object>
        extends GObject.Object.ConstructorProperties {
        [key: string]: any;
        enum_type: GObject.GType;
        enumType: GObject.GType;
    }
}
export class EnumListModel<A extends GObject.Object = GObject.Object>
    extends GObject.Object
    implements Gio.ListModel<A>
{
    static $gtype: GObject.GType<EnumListModel>;

    constructor(properties?: Partial<EnumListModel.ConstructorProperties<A>>, ...args: any[]);
    _init(properties?: Partial<EnumListModel.ConstructorProperties<A>>, ...args: any[]): void;

    // Properties
    get enum_type(): GObject.GType;
    get enumType(): GObject.GType;

    // Constructors

    static ["new"](enum_type: GObject.GType): EnumListModel;

    // Members

    find_position(value: number): number;
    get_enum_type(): GObject.GType;

    // Implemented Members

    get_item_type(): GObject.GType;
    get_n_items(): number;
    get_item(position: number): A | null;
    items_changed(position: number, removed: number, added: number): void;
    vfunc_get_item(position: number): A | null;
    vfunc_get_item_type(): GObject.GType;
    vfunc_get_n_items(): number;
}
export module ExpanderRow {
    export interface ConstructorProperties extends PreferencesRow.ConstructorProperties {
        [key: string]: any;
        enable_expansion: boolean;
        enableExpansion: boolean;
        expanded: boolean;
        icon_name: string;
        iconName: string;
        show_enable_switch: boolean;
        showEnableSwitch: boolean;
        subtitle: string;
        subtitle_lines: number;
        subtitleLines: number;
        title_lines: number;
        titleLines: number;
    }
}
export class ExpanderRow
    extends PreferencesRow
    implements Gtk.Accessible, Gtk.Actionable, Gtk.Buildable, Gtk.ConstraintTarget
{
    static $gtype: GObject.GType<ExpanderRow>;

    constructor(properties?: Partial<ExpanderRow.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<ExpanderRow.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get enable_expansion(): boolean;
    set enable_expansion(val: boolean);
    get enableExpansion(): boolean;
    set enableExpansion(val: boolean);
    get expanded(): boolean;
    set expanded(val: boolean);
    get icon_name(): string;
    set icon_name(val: string);
    get iconName(): string;
    set iconName(val: string);
    get show_enable_switch(): boolean;
    set show_enable_switch(val: boolean);
    get showEnableSwitch(): boolean;
    set showEnableSwitch(val: boolean);
    get subtitle(): string;
    set subtitle(val: string);
    get subtitle_lines(): number;
    set subtitle_lines(val: number);
    get subtitleLines(): number;
    set subtitleLines(val: number);
    get title_lines(): number;
    set title_lines(val: number);
    get titleLines(): number;
    set titleLines(val: number);

    // Constructors

    static ["new"](): ExpanderRow;

    // Members

    add_action(widget: Gtk.Widget): void;
    add_prefix(widget: Gtk.Widget): void;
    add_row(child: Gtk.Widget): void;
    get_enable_expansion(): boolean;
    get_expanded(): boolean;
    get_icon_name(): string | null;
    get_show_enable_switch(): boolean;
    get_subtitle(): string;
    get_subtitle_lines(): boolean;
    get_title_lines(): boolean;
    remove(child: Gtk.Widget): void;
    set_enable_expansion(enable_expansion: boolean): void;
    set_expanded(expanded: boolean): void;
    set_icon_name(icon_name?: string | null): void;
    set_show_enable_switch(show_enable_switch: boolean): void;
    set_subtitle(subtitle: string): void;
    set_subtitle_lines(subtitle_lines: number): void;
    set_title_lines(title_lines: number): void;
}
export module Flap {
    export interface ConstructorProperties extends Gtk.Widget.ConstructorProperties {
        [key: string]: any;
        content: Gtk.Widget;
        flap: Gtk.Widget;
        flap_position: Gtk.PackType;
        flapPosition: Gtk.PackType;
        fold_duration: number;
        foldDuration: number;
        fold_policy: FlapFoldPolicy;
        foldPolicy: FlapFoldPolicy;
        fold_threshold_policy: FoldThresholdPolicy;
        foldThresholdPolicy: FoldThresholdPolicy;
        folded: boolean;
        locked: boolean;
        modal: boolean;
        reveal_flap: boolean;
        revealFlap: boolean;
        reveal_params: SpringParams;
        revealParams: SpringParams;
        reveal_progress: number;
        revealProgress: number;
        separator: Gtk.Widget;
        swipe_to_close: boolean;
        swipeToClose: boolean;
        swipe_to_open: boolean;
        swipeToOpen: boolean;
        transition_type: FlapTransitionType;
        transitionType: FlapTransitionType;
    }
}
export class Flap
    extends Gtk.Widget
    implements Swipeable, Gtk.Accessible, Gtk.Buildable, Gtk.ConstraintTarget, Gtk.Orientable
{
    static $gtype: GObject.GType<Flap>;

    constructor(properties?: Partial<Flap.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<Flap.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get content(): Gtk.Widget;
    set content(val: Gtk.Widget);
    get flap(): Gtk.Widget;
    set flap(val: Gtk.Widget);
    get flap_position(): Gtk.PackType;
    set flap_position(val: Gtk.PackType);
    get flapPosition(): Gtk.PackType;
    set flapPosition(val: Gtk.PackType);
    get fold_duration(): number;
    set fold_duration(val: number);
    get foldDuration(): number;
    set foldDuration(val: number);
    get fold_policy(): FlapFoldPolicy;
    set fold_policy(val: FlapFoldPolicy);
    get foldPolicy(): FlapFoldPolicy;
    set foldPolicy(val: FlapFoldPolicy);
    get fold_threshold_policy(): FoldThresholdPolicy;
    set fold_threshold_policy(val: FoldThresholdPolicy);
    get foldThresholdPolicy(): FoldThresholdPolicy;
    set foldThresholdPolicy(val: FoldThresholdPolicy);
    get folded(): boolean;
    get locked(): boolean;
    set locked(val: boolean);
    get modal(): boolean;
    set modal(val: boolean);
    get reveal_flap(): boolean;
    set reveal_flap(val: boolean);
    get revealFlap(): boolean;
    set revealFlap(val: boolean);
    get reveal_params(): SpringParams;
    set reveal_params(val: SpringParams);
    get revealParams(): SpringParams;
    set revealParams(val: SpringParams);
    get reveal_progress(): number;
    get revealProgress(): number;
    get separator(): Gtk.Widget;
    set separator(val: Gtk.Widget);
    get swipe_to_close(): boolean;
    set swipe_to_close(val: boolean);
    get swipeToClose(): boolean;
    set swipeToClose(val: boolean);
    get swipe_to_open(): boolean;
    set swipe_to_open(val: boolean);
    get swipeToOpen(): boolean;
    set swipeToOpen(val: boolean);
    get transition_type(): FlapTransitionType;
    set transition_type(val: FlapTransitionType);
    get transitionType(): FlapTransitionType;
    set transitionType(val: FlapTransitionType);

    // Implemented Properties

    get accessible_role(): Gtk.AccessibleRole;
    set accessible_role(val: Gtk.AccessibleRole);
    get accessibleRole(): Gtk.AccessibleRole;
    set accessibleRole(val: Gtk.AccessibleRole);
    get orientation(): Gtk.Orientation;
    set orientation(val: Gtk.Orientation);

    // Constructors

    static ["new"](): Flap;

    // Members

    get_content(): Gtk.Widget | null;
    get_flap(): Gtk.Widget | null;
    get_flap_position(): Gtk.PackType;
    get_fold_duration(): number;
    get_fold_policy(): FlapFoldPolicy;
    get_fold_threshold_policy(): FoldThresholdPolicy;
    get_folded(): boolean;
    get_locked(): boolean;
    get_modal(): boolean;
    get_reveal_flap(): boolean;
    get_reveal_params(): SpringParams;
    get_reveal_progress(): number;
    get_separator(): Gtk.Widget | null;
    get_swipe_to_close(): boolean;
    get_swipe_to_open(): boolean;
    get_transition_type(): FlapTransitionType;
    set_content(content?: Gtk.Widget | null): void;
    set_flap(flap?: Gtk.Widget | null): void;
    set_flap_position(position: Gtk.PackType): void;
    set_fold_duration(duration: number): void;
    set_fold_policy(policy: FlapFoldPolicy): void;
    set_fold_threshold_policy(policy: FoldThresholdPolicy): void;
    set_locked(locked: boolean): void;
    set_modal(modal: boolean): void;
    set_reveal_flap(reveal_flap: boolean): void;
    set_reveal_params(params: SpringParams): void;
    set_separator(separator?: Gtk.Widget | null): void;
    set_swipe_to_close(swipe_to_close: boolean): void;
    set_swipe_to_open(swipe_to_open: boolean): void;
    set_transition_type(transition_type: FlapTransitionType): void;

    // Implemented Members

    get_cancel_progress(): number;
    get_distance(): number;
    get_progress(): number;
    get_snap_points(): number[];
    get_swipe_area(navigation_direction: NavigationDirection, is_drag: boolean): Gdk.Rectangle;
    vfunc_get_cancel_progress(): number;
    vfunc_get_distance(): number;
    vfunc_get_progress(): number;
    vfunc_get_snap_points(): number[];
    vfunc_get_swipe_area(navigation_direction: NavigationDirection, is_drag: boolean): Gdk.Rectangle;
    get_accessible_parent(): Gtk.Accessible | null;
    get_accessible_role(): Gtk.AccessibleRole;
    get_at_context(): Gtk.ATContext;
    get_bounds(): [boolean, number, number, number, number];
    get_first_accessible_child(): Gtk.Accessible | null;
    get_next_accessible_sibling(): Gtk.Accessible | null;
    get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    reset_property(property: Gtk.AccessibleProperty): void;
    reset_relation(relation: Gtk.AccessibleRelation): void;
    reset_state(state: Gtk.AccessibleState): void;
    set_accessible_parent(parent?: Gtk.Accessible | null, next_sibling?: Gtk.Accessible | null): void;
    update_next_accessible_sibling(new_sibling?: Gtk.Accessible | null): void;
    update_property(properties: Gtk.AccessibleProperty[], values: GObject.Value[]): void;
    update_relation(relations: Gtk.AccessibleRelation[], values: GObject.Value[]): void;
    update_state(states: Gtk.AccessibleState[], values: GObject.Value[]): void;
    vfunc_get_accessible_parent(): Gtk.Accessible | null;
    vfunc_get_at_context(): Gtk.ATContext | null;
    vfunc_get_bounds(): [boolean, number, number, number, number];
    vfunc_get_first_accessible_child(): Gtk.Accessible | null;
    vfunc_get_next_accessible_sibling(): Gtk.Accessible | null;
    vfunc_get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    get_buildable_id(): string | null;
    vfunc_add_child(builder: Gtk.Builder, child: GObject.Object, type?: string | null): void;
    vfunc_custom_finished(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_end(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_start(
        builder: Gtk.Builder,
        child: GObject.Object | null,
        tagname: string
    ): [boolean, Gtk.BuildableParser, any | null];
    vfunc_get_id(): string;
    vfunc_get_internal_child<T = GObject.Object>(builder: Gtk.Builder, childname: string): T;
    vfunc_parser_finished(builder: Gtk.Builder): void;
    vfunc_set_buildable_property(builder: Gtk.Builder, name: string, value: GObject.Value | any): void;
    vfunc_set_id(id: string): void;
    get_orientation(): Gtk.Orientation;
    set_orientation(orientation: Gtk.Orientation): void;
}
export module HeaderBar {
    export interface ConstructorProperties extends Gtk.Widget.ConstructorProperties {
        [key: string]: any;
        centering_policy: CenteringPolicy;
        centeringPolicy: CenteringPolicy;
        decoration_layout: string;
        decorationLayout: string;
        show_end_title_buttons: boolean;
        showEndTitleButtons: boolean;
        show_start_title_buttons: boolean;
        showStartTitleButtons: boolean;
        title_widget: Gtk.Widget;
        titleWidget: Gtk.Widget;
    }
}
export class HeaderBar extends Gtk.Widget implements Gtk.Accessible, Gtk.Buildable, Gtk.ConstraintTarget {
    static $gtype: GObject.GType<HeaderBar>;

    constructor(properties?: Partial<HeaderBar.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<HeaderBar.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get centering_policy(): CenteringPolicy;
    set centering_policy(val: CenteringPolicy);
    get centeringPolicy(): CenteringPolicy;
    set centeringPolicy(val: CenteringPolicy);
    get decoration_layout(): string;
    set decoration_layout(val: string);
    get decorationLayout(): string;
    set decorationLayout(val: string);
    get show_end_title_buttons(): boolean;
    set show_end_title_buttons(val: boolean);
    get showEndTitleButtons(): boolean;
    set showEndTitleButtons(val: boolean);
    get show_start_title_buttons(): boolean;
    set show_start_title_buttons(val: boolean);
    get showStartTitleButtons(): boolean;
    set showStartTitleButtons(val: boolean);
    get title_widget(): Gtk.Widget;
    set title_widget(val: Gtk.Widget);
    get titleWidget(): Gtk.Widget;
    set titleWidget(val: Gtk.Widget);

    // Implemented Properties

    get accessible_role(): Gtk.AccessibleRole;
    set accessible_role(val: Gtk.AccessibleRole);
    get accessibleRole(): Gtk.AccessibleRole;
    set accessibleRole(val: Gtk.AccessibleRole);

    // Constructors

    static ["new"](): HeaderBar;

    // Members

    get_centering_policy(): CenteringPolicy;
    get_decoration_layout(): string | null;
    get_show_end_title_buttons(): boolean;
    get_show_start_title_buttons(): boolean;
    get_title_widget(): Gtk.Widget | null;
    pack_end(child: Gtk.Widget): void;
    pack_start(child: Gtk.Widget): void;
    remove(child: Gtk.Widget): void;
    set_centering_policy(centering_policy: CenteringPolicy): void;
    set_decoration_layout(layout?: string | null): void;
    set_show_end_title_buttons(setting: boolean): void;
    set_show_start_title_buttons(setting: boolean): void;
    set_title_widget(title_widget?: Gtk.Widget | null): void;

    // Implemented Members

    get_accessible_parent(): Gtk.Accessible | null;
    get_accessible_role(): Gtk.AccessibleRole;
    get_at_context(): Gtk.ATContext;
    get_bounds(): [boolean, number, number, number, number];
    get_first_accessible_child(): Gtk.Accessible | null;
    get_next_accessible_sibling(): Gtk.Accessible | null;
    get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    reset_property(property: Gtk.AccessibleProperty): void;
    reset_relation(relation: Gtk.AccessibleRelation): void;
    reset_state(state: Gtk.AccessibleState): void;
    set_accessible_parent(parent?: Gtk.Accessible | null, next_sibling?: Gtk.Accessible | null): void;
    update_next_accessible_sibling(new_sibling?: Gtk.Accessible | null): void;
    update_property(properties: Gtk.AccessibleProperty[], values: GObject.Value[]): void;
    update_relation(relations: Gtk.AccessibleRelation[], values: GObject.Value[]): void;
    update_state(states: Gtk.AccessibleState[], values: GObject.Value[]): void;
    vfunc_get_accessible_parent(): Gtk.Accessible | null;
    vfunc_get_at_context(): Gtk.ATContext | null;
    vfunc_get_bounds(): [boolean, number, number, number, number];
    vfunc_get_first_accessible_child(): Gtk.Accessible | null;
    vfunc_get_next_accessible_sibling(): Gtk.Accessible | null;
    vfunc_get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    get_buildable_id(): string | null;
    vfunc_add_child(builder: Gtk.Builder, child: GObject.Object, type?: string | null): void;
    vfunc_custom_finished(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_end(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_start(
        builder: Gtk.Builder,
        child: GObject.Object | null,
        tagname: string
    ): [boolean, Gtk.BuildableParser, any | null];
    vfunc_get_id(): string;
    vfunc_get_internal_child<T = GObject.Object>(builder: Gtk.Builder, childname: string): T;
    vfunc_parser_finished(builder: Gtk.Builder): void;
    vfunc_set_buildable_property(builder: Gtk.Builder, name: string, value: GObject.Value | any): void;
    vfunc_set_id(id: string): void;
}
export module Leaflet {
    export interface ConstructorProperties extends Gtk.Widget.ConstructorProperties {
        [key: string]: any;
        can_navigate_back: boolean;
        canNavigateBack: boolean;
        can_navigate_forward: boolean;
        canNavigateForward: boolean;
        can_unfold: boolean;
        canUnfold: boolean;
        child_transition_params: SpringParams;
        childTransitionParams: SpringParams;
        child_transition_running: boolean;
        childTransitionRunning: boolean;
        fold_threshold_policy: FoldThresholdPolicy;
        foldThresholdPolicy: FoldThresholdPolicy;
        folded: boolean;
        homogeneous: boolean;
        mode_transition_duration: number;
        modeTransitionDuration: number;
        pages: Gtk.SelectionModel;
        transition_type: LeafletTransitionType;
        transitionType: LeafletTransitionType;
        visible_child: Gtk.Widget;
        visibleChild: Gtk.Widget;
        visible_child_name: string;
        visibleChildName: string;
    }
}
export class Leaflet
    extends Gtk.Widget
    implements Swipeable, Gtk.Accessible, Gtk.Buildable, Gtk.ConstraintTarget, Gtk.Orientable
{
    static $gtype: GObject.GType<Leaflet>;

    constructor(properties?: Partial<Leaflet.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<Leaflet.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get can_navigate_back(): boolean;
    set can_navigate_back(val: boolean);
    get canNavigateBack(): boolean;
    set canNavigateBack(val: boolean);
    get can_navigate_forward(): boolean;
    set can_navigate_forward(val: boolean);
    get canNavigateForward(): boolean;
    set canNavigateForward(val: boolean);
    get can_unfold(): boolean;
    set can_unfold(val: boolean);
    get canUnfold(): boolean;
    set canUnfold(val: boolean);
    get child_transition_params(): SpringParams;
    set child_transition_params(val: SpringParams);
    get childTransitionParams(): SpringParams;
    set childTransitionParams(val: SpringParams);
    get child_transition_running(): boolean;
    get childTransitionRunning(): boolean;
    get fold_threshold_policy(): FoldThresholdPolicy;
    set fold_threshold_policy(val: FoldThresholdPolicy);
    get foldThresholdPolicy(): FoldThresholdPolicy;
    set foldThresholdPolicy(val: FoldThresholdPolicy);
    get folded(): boolean;
    get homogeneous(): boolean;
    set homogeneous(val: boolean);
    get mode_transition_duration(): number;
    set mode_transition_duration(val: number);
    get modeTransitionDuration(): number;
    set modeTransitionDuration(val: number);
    get pages(): Gtk.SelectionModel;
    get transition_type(): LeafletTransitionType;
    set transition_type(val: LeafletTransitionType);
    get transitionType(): LeafletTransitionType;
    set transitionType(val: LeafletTransitionType);
    get visible_child(): Gtk.Widget;
    set visible_child(val: Gtk.Widget);
    get visibleChild(): Gtk.Widget;
    set visibleChild(val: Gtk.Widget);
    get visible_child_name(): string;
    set visible_child_name(val: string);
    get visibleChildName(): string;
    set visibleChildName(val: string);

    // Implemented Properties

    get accessible_role(): Gtk.AccessibleRole;
    set accessible_role(val: Gtk.AccessibleRole);
    get accessibleRole(): Gtk.AccessibleRole;
    set accessibleRole(val: Gtk.AccessibleRole);
    get orientation(): Gtk.Orientation;
    set orientation(val: Gtk.Orientation);

    // Constructors

    static ["new"](): Leaflet;

    // Members

    append(child: Gtk.Widget): LeafletPage;
    get_adjacent_child(direction: NavigationDirection): Gtk.Widget | null;
    get_can_navigate_back(): boolean;
    get_can_navigate_forward(): boolean;
    get_can_unfold(): boolean;
    get_child_by_name(name: string): Gtk.Widget | null;
    get_child_transition_params(): SpringParams;
    get_child_transition_running(): boolean;
    get_fold_threshold_policy(): FoldThresholdPolicy;
    get_folded(): boolean;
    get_homogeneous(): boolean;
    get_mode_transition_duration(): number;
    get_page(child: Gtk.Widget): LeafletPage;
    get_pages(): Gtk.SelectionModel;
    get_transition_type(): LeafletTransitionType;
    get_visible_child(): Gtk.Widget | null;
    get_visible_child_name(): string | null;
    insert_child_after(child: Gtk.Widget, sibling?: Gtk.Widget | null): LeafletPage;
    navigate(direction: NavigationDirection): boolean;
    prepend(child: Gtk.Widget): LeafletPage;
    remove(child: Gtk.Widget): void;
    reorder_child_after(child: Gtk.Widget, sibling?: Gtk.Widget | null): void;
    set_can_navigate_back(can_navigate_back: boolean): void;
    set_can_navigate_forward(can_navigate_forward: boolean): void;
    set_can_unfold(can_unfold: boolean): void;
    set_child_transition_params(params: SpringParams): void;
    set_fold_threshold_policy(policy: FoldThresholdPolicy): void;
    set_homogeneous(homogeneous: boolean): void;
    set_mode_transition_duration(duration: number): void;
    set_transition_type(transition: LeafletTransitionType): void;
    set_visible_child(visible_child: Gtk.Widget): void;
    set_visible_child_name(name: string): void;

    // Implemented Members

    get_cancel_progress(): number;
    get_distance(): number;
    get_progress(): number;
    get_snap_points(): number[];
    get_swipe_area(navigation_direction: NavigationDirection, is_drag: boolean): Gdk.Rectangle;
    vfunc_get_cancel_progress(): number;
    vfunc_get_distance(): number;
    vfunc_get_progress(): number;
    vfunc_get_snap_points(): number[];
    vfunc_get_swipe_area(navigation_direction: NavigationDirection, is_drag: boolean): Gdk.Rectangle;
    get_accessible_parent(): Gtk.Accessible | null;
    get_accessible_role(): Gtk.AccessibleRole;
    get_at_context(): Gtk.ATContext;
    get_bounds(): [boolean, number, number, number, number];
    get_first_accessible_child(): Gtk.Accessible | null;
    get_next_accessible_sibling(): Gtk.Accessible | null;
    get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    reset_property(property: Gtk.AccessibleProperty): void;
    reset_relation(relation: Gtk.AccessibleRelation): void;
    reset_state(state: Gtk.AccessibleState): void;
    set_accessible_parent(parent?: Gtk.Accessible | null, next_sibling?: Gtk.Accessible | null): void;
    update_next_accessible_sibling(new_sibling?: Gtk.Accessible | null): void;
    update_property(properties: Gtk.AccessibleProperty[], values: GObject.Value[]): void;
    update_relation(relations: Gtk.AccessibleRelation[], values: GObject.Value[]): void;
    update_state(states: Gtk.AccessibleState[], values: GObject.Value[]): void;
    vfunc_get_accessible_parent(): Gtk.Accessible | null;
    vfunc_get_at_context(): Gtk.ATContext | null;
    vfunc_get_bounds(): [boolean, number, number, number, number];
    vfunc_get_first_accessible_child(): Gtk.Accessible | null;
    vfunc_get_next_accessible_sibling(): Gtk.Accessible | null;
    vfunc_get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    get_buildable_id(): string | null;
    vfunc_add_child(builder: Gtk.Builder, child: GObject.Object, type?: string | null): void;
    vfunc_custom_finished(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_end(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_start(
        builder: Gtk.Builder,
        child: GObject.Object | null,
        tagname: string
    ): [boolean, Gtk.BuildableParser, any | null];
    vfunc_get_id(): string;
    vfunc_get_internal_child<T = GObject.Object>(builder: Gtk.Builder, childname: string): T;
    vfunc_parser_finished(builder: Gtk.Builder): void;
    vfunc_set_buildable_property(builder: Gtk.Builder, name: string, value: GObject.Value | any): void;
    vfunc_set_id(id: string): void;
    get_orientation(): Gtk.Orientation;
    set_orientation(orientation: Gtk.Orientation): void;
}
export module LeafletPage {
    export interface ConstructorProperties extends GObject.Object.ConstructorProperties {
        [key: string]: any;
        child: Gtk.Widget;
        name: string;
        navigatable: boolean;
    }
}
export class LeafletPage extends GObject.Object {
    static $gtype: GObject.GType<LeafletPage>;

    constructor(properties?: Partial<LeafletPage.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<LeafletPage.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get child(): Gtk.Widget;
    get name(): string;
    set name(val: string);
    get navigatable(): boolean;
    set navigatable(val: boolean);

    // Members

    get_child(): Gtk.Widget;
    get_name(): string | null;
    get_navigatable(): boolean;
    set_name(name?: string | null): void;
    set_navigatable(navigatable: boolean): void;
}
export module MessageDialog {
    export interface ConstructorProperties extends Gtk.Window.ConstructorProperties {
        [key: string]: any;
        body: string;
        body_use_markup: boolean;
        bodyUseMarkup: boolean;
        close_response: string;
        closeResponse: string;
        default_response: string;
        defaultResponse: string;
        extra_child: Gtk.Widget;
        extraChild: Gtk.Widget;
        heading: string;
        heading_use_markup: boolean;
        headingUseMarkup: boolean;
    }
}
export class MessageDialog
    extends Gtk.Window
    implements Gtk.Accessible, Gtk.Buildable, Gtk.ConstraintTarget, Gtk.Native, Gtk.Root, Gtk.ShortcutManager
{
    static $gtype: GObject.GType<MessageDialog>;

    constructor(properties?: Partial<MessageDialog.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<MessageDialog.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get body(): string;
    set body(val: string);
    get body_use_markup(): boolean;
    set body_use_markup(val: boolean);
    get bodyUseMarkup(): boolean;
    set bodyUseMarkup(val: boolean);
    get close_response(): string;
    set close_response(val: string);
    get closeResponse(): string;
    set closeResponse(val: string);
    get default_response(): string;
    set default_response(val: string);
    get defaultResponse(): string;
    set defaultResponse(val: string);
    get extra_child(): Gtk.Widget;
    set extra_child(val: Gtk.Widget);
    get extraChild(): Gtk.Widget;
    set extraChild(val: Gtk.Widget);
    get heading(): string;
    set heading(val: string);
    get heading_use_markup(): boolean;
    set heading_use_markup(val: boolean);
    get headingUseMarkup(): boolean;
    set headingUseMarkup(val: boolean);

    // Signals

    connect(id: string, callback: (...args: any[]) => any): number;
    connect_after(id: string, callback: (...args: any[]) => any): number;
    emit(id: string, ...args: any[]): void;
    connect(signal: "response", callback: (_source: this, response: string) => void): number;
    connect_after(signal: "response", callback: (_source: this, response: string) => void): number;
    emit(signal: "response", response: string): void;

    // Constructors

    static ["new"](parent?: Gtk.Window | null, heading?: string | null, body?: string | null): MessageDialog;
    // Conflicted with Gtk.Window.new
    static ["new"](...args: never[]): any;

    // Members

    add_response(id: string, label: string): void;
    choose(cancellable?: Gio.Cancellable | null): void;
    choose_finish(result: Gio.AsyncResult): string;
    get_body(): string;
    get_body_use_markup(): boolean;
    get_close_response(): string;
    get_default_response(): string | null;
    get_extra_child(): Gtk.Widget | null;
    get_heading(): string | null;
    get_heading_use_markup(): boolean;
    get_response_appearance(response: string): ResponseAppearance;
    get_response_enabled(response: string): boolean;
    get_response_label(response: string): string;
    has_response(response: string): boolean;
    response(response: string): void;
    set_body(body: string): void;
    set_body_use_markup(use_markup: boolean): void;
    set_close_response(response: string): void;
    set_default_response(response?: string | null): void;
    set_extra_child(child?: Gtk.Widget | null): void;
    set_heading(heading?: string | null): void;
    set_heading_use_markup(use_markup: boolean): void;
    set_response_appearance(response: string, appearance: ResponseAppearance): void;
    set_response_enabled(response: string, enabled: boolean): void;
    set_response_label(response: string, label: string): void;
    vfunc_response(response: string): void;

    // Implemented Members

    get_renderer(): Gsk.Renderer;
    get_surface(): Gdk.Surface;
    get_surface_transform(): [number, number];
    realize(): void;
    unrealize(): void;
    get_display(): Gdk.Display;
    get_focus(): Gtk.Widget | null;
    set_focus(focus?: Gtk.Widget | null): void;
    vfunc_add_controller(controller: Gtk.ShortcutController): void;
    vfunc_remove_controller(controller: Gtk.ShortcutController): void;
}
export module PasswordEntryRow {
    export interface ConstructorProperties extends EntryRow.ConstructorProperties {
        [key: string]: any;
    }
}
export class PasswordEntryRow
    extends EntryRow
    implements Gtk.Accessible, Gtk.Actionable, Gtk.Buildable, Gtk.ConstraintTarget, Gtk.Editable
{
    static $gtype: GObject.GType<PasswordEntryRow>;

    constructor(properties?: Partial<PasswordEntryRow.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<PasswordEntryRow.ConstructorProperties>, ...args: any[]): void;

    // Implemented Properties

    get cursor_position(): number;
    get cursorPosition(): number;
    get editable(): boolean;
    set editable(val: boolean);
    get enable_undo(): boolean;
    set enable_undo(val: boolean);
    get enableUndo(): boolean;
    set enableUndo(val: boolean);
    get max_width_chars(): number;
    set max_width_chars(val: number);
    get maxWidthChars(): number;
    set maxWidthChars(val: number);
    get selection_bound(): number;
    get selectionBound(): number;
    get text(): string;
    set text(val: string);
    get width_chars(): number;
    set width_chars(val: number);
    get widthChars(): number;
    set widthChars(val: number);
    get xalign(): number;
    set xalign(val: number);

    // Constructors

    static ["new"](): PasswordEntryRow;

    // Implemented Members

    delegate_get_accessible_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    delete_selection(): void;
    delete_text(start_pos: number, end_pos: number): void;
    finish_delegate(): void;
    get_alignment(): number;
    get_chars(start_pos: number, end_pos: number): string;
    get_delegate(): Gtk.Editable | null;
    get_editable(): boolean;
    get_enable_undo(): boolean;
    get_max_width_chars(): number;
    get_position(): number;
    get_selection_bounds(): [boolean, number | null, number | null];
    get_text(): string;
    get_width_chars(): number;
    init_delegate(): void;
    insert_text(text: string, length: number, position: number): number;
    select_region(start_pos: number, end_pos: number): void;
    set_alignment(xalign: number): void;
    set_editable(is_editable: boolean): void;
    set_enable_undo(enable_undo: boolean): void;
    set_max_width_chars(n_chars: number): void;
    set_position(position: number): void;
    set_text(text: string): void;
    set_width_chars(n_chars: number): void;
    vfunc_changed(): void;
    vfunc_delete_text(start_pos: number, end_pos: number): void;
    vfunc_do_delete_text(start_pos: number, end_pos: number): void;
    vfunc_do_insert_text(text: string, length: number, position: number): number;
    vfunc_get_delegate(): Gtk.Editable | null;
    vfunc_get_selection_bounds(): [boolean, number | null, number | null];
    vfunc_get_text(): string;
    vfunc_insert_text(text: string, length: number, position: number): number;
    vfunc_set_selection_bounds(start_pos: number, end_pos: number): void;
}
export module PreferencesGroup {
    export interface ConstructorProperties extends Gtk.Widget.ConstructorProperties {
        [key: string]: any;
        description: string;
        header_suffix: Gtk.Widget;
        headerSuffix: Gtk.Widget;
        title: string;
    }
}
export class PreferencesGroup extends Gtk.Widget implements Gtk.Accessible, Gtk.Buildable, Gtk.ConstraintTarget {
    static $gtype: GObject.GType<PreferencesGroup>;

    constructor(properties?: Partial<PreferencesGroup.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<PreferencesGroup.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get description(): string;
    set description(val: string);
    get header_suffix(): Gtk.Widget;
    set header_suffix(val: Gtk.Widget);
    get headerSuffix(): Gtk.Widget;
    set headerSuffix(val: Gtk.Widget);
    get title(): string;
    set title(val: string);

    // Implemented Properties

    get accessible_role(): Gtk.AccessibleRole;
    set accessible_role(val: Gtk.AccessibleRole);
    get accessibleRole(): Gtk.AccessibleRole;
    set accessibleRole(val: Gtk.AccessibleRole);

    // Constructors

    static ["new"](): PreferencesGroup;

    // Members

    add(child: Gtk.Widget): void;
    get_description(): string | null;
    get_header_suffix(): Gtk.Widget | null;
    get_title(): string;
    remove(child: Gtk.Widget): void;
    set_description(description?: string | null): void;
    set_header_suffix(suffix?: Gtk.Widget | null): void;
    set_title(title: string): void;

    // Implemented Members

    get_accessible_parent(): Gtk.Accessible | null;
    get_accessible_role(): Gtk.AccessibleRole;
    get_at_context(): Gtk.ATContext;
    get_bounds(): [boolean, number, number, number, number];
    get_first_accessible_child(): Gtk.Accessible | null;
    get_next_accessible_sibling(): Gtk.Accessible | null;
    get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    reset_property(property: Gtk.AccessibleProperty): void;
    reset_relation(relation: Gtk.AccessibleRelation): void;
    reset_state(state: Gtk.AccessibleState): void;
    set_accessible_parent(parent?: Gtk.Accessible | null, next_sibling?: Gtk.Accessible | null): void;
    update_next_accessible_sibling(new_sibling?: Gtk.Accessible | null): void;
    update_property(properties: Gtk.AccessibleProperty[], values: GObject.Value[]): void;
    update_relation(relations: Gtk.AccessibleRelation[], values: GObject.Value[]): void;
    update_state(states: Gtk.AccessibleState[], values: GObject.Value[]): void;
    vfunc_get_accessible_parent(): Gtk.Accessible | null;
    vfunc_get_at_context(): Gtk.ATContext | null;
    vfunc_get_bounds(): [boolean, number, number, number, number];
    vfunc_get_first_accessible_child(): Gtk.Accessible | null;
    vfunc_get_next_accessible_sibling(): Gtk.Accessible | null;
    vfunc_get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    get_buildable_id(): string | null;
    vfunc_add_child(builder: Gtk.Builder, child: GObject.Object, type?: string | null): void;
    vfunc_custom_finished(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_end(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_start(
        builder: Gtk.Builder,
        child: GObject.Object | null,
        tagname: string
    ): [boolean, Gtk.BuildableParser, any | null];
    vfunc_get_id(): string;
    vfunc_get_internal_child<T = GObject.Object>(builder: Gtk.Builder, childname: string): T;
    vfunc_parser_finished(builder: Gtk.Builder): void;
    vfunc_set_buildable_property(builder: Gtk.Builder, name: string, value: GObject.Value | any): void;
    vfunc_set_id(id: string): void;
}
export module PreferencesPage {
    export interface ConstructorProperties extends Gtk.Widget.ConstructorProperties {
        [key: string]: any;
        icon_name: string;
        iconName: string;
        name: string;
        title: string;
        use_underline: boolean;
        useUnderline: boolean;
    }
}
export class PreferencesPage extends Gtk.Widget implements Gtk.Accessible, Gtk.Buildable, Gtk.ConstraintTarget {
    static $gtype: GObject.GType<PreferencesPage>;

    constructor(properties?: Partial<PreferencesPage.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<PreferencesPage.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get icon_name(): string;
    set icon_name(val: string);
    get iconName(): string;
    set iconName(val: string);
    get name(): string;
    set name(val: string);
    get title(): string;
    set title(val: string);
    get use_underline(): boolean;
    set use_underline(val: boolean);
    get useUnderline(): boolean;
    set useUnderline(val: boolean);

    // Implemented Properties

    get accessible_role(): Gtk.AccessibleRole;
    set accessible_role(val: Gtk.AccessibleRole);
    get accessibleRole(): Gtk.AccessibleRole;
    set accessibleRole(val: Gtk.AccessibleRole);

    // Constructors

    static ["new"](): PreferencesPage;

    // Members

    add(group: PreferencesGroup): void;
    get_icon_name(): string | null;
    get_name(): string | null;
    // Conflicted with Gtk.Widget.get_name
    get_name(...args: never[]): any;
    get_title(): string;
    get_use_underline(): boolean;
    remove(group: PreferencesGroup): void;
    scroll_to_top(): void;
    set_icon_name(icon_name?: string | null): void;
    set_name(name?: string | null): void;
    // Conflicted with Gtk.Widget.set_name
    set_name(...args: never[]): any;
    set_title(title: string): void;
    set_use_underline(use_underline: boolean): void;

    // Implemented Members

    get_accessible_parent(): Gtk.Accessible | null;
    get_accessible_role(): Gtk.AccessibleRole;
    get_at_context(): Gtk.ATContext;
    get_bounds(): [boolean, number, number, number, number];
    get_first_accessible_child(): Gtk.Accessible | null;
    get_next_accessible_sibling(): Gtk.Accessible | null;
    get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    reset_property(property: Gtk.AccessibleProperty): void;
    reset_relation(relation: Gtk.AccessibleRelation): void;
    reset_state(state: Gtk.AccessibleState): void;
    set_accessible_parent(parent?: Gtk.Accessible | null, next_sibling?: Gtk.Accessible | null): void;
    update_next_accessible_sibling(new_sibling?: Gtk.Accessible | null): void;
    update_property(properties: Gtk.AccessibleProperty[], values: GObject.Value[]): void;
    update_relation(relations: Gtk.AccessibleRelation[], values: GObject.Value[]): void;
    update_state(states: Gtk.AccessibleState[], values: GObject.Value[]): void;
    vfunc_get_accessible_parent(): Gtk.Accessible | null;
    vfunc_get_at_context(): Gtk.ATContext | null;
    vfunc_get_bounds(): [boolean, number, number, number, number];
    vfunc_get_first_accessible_child(): Gtk.Accessible | null;
    vfunc_get_next_accessible_sibling(): Gtk.Accessible | null;
    vfunc_get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    get_buildable_id(): string | null;
    vfunc_add_child(builder: Gtk.Builder, child: GObject.Object, type?: string | null): void;
    vfunc_custom_finished(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_end(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_start(
        builder: Gtk.Builder,
        child: GObject.Object | null,
        tagname: string
    ): [boolean, Gtk.BuildableParser, any | null];
    vfunc_get_id(): string;
    vfunc_get_internal_child<T = GObject.Object>(builder: Gtk.Builder, childname: string): T;
    vfunc_parser_finished(builder: Gtk.Builder): void;
    vfunc_set_buildable_property(builder: Gtk.Builder, name: string, value: GObject.Value | any): void;
    vfunc_set_id(id: string): void;
}
export module PreferencesRow {
    export interface ConstructorProperties extends Gtk.ListBoxRow.ConstructorProperties {
        [key: string]: any;
        title: string;
        title_selectable: boolean;
        titleSelectable: boolean;
        use_markup: boolean;
        useMarkup: boolean;
        use_underline: boolean;
        useUnderline: boolean;
    }
}
export class PreferencesRow
    extends Gtk.ListBoxRow
    implements Gtk.Accessible, Gtk.Actionable, Gtk.Buildable, Gtk.ConstraintTarget
{
    static $gtype: GObject.GType<PreferencesRow>;

    constructor(properties?: Partial<PreferencesRow.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<PreferencesRow.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get title(): string;
    set title(val: string);
    get title_selectable(): boolean;
    set title_selectable(val: boolean);
    get titleSelectable(): boolean;
    set titleSelectable(val: boolean);
    get use_markup(): boolean;
    set use_markup(val: boolean);
    get useMarkup(): boolean;
    set useMarkup(val: boolean);
    get use_underline(): boolean;
    set use_underline(val: boolean);
    get useUnderline(): boolean;
    set useUnderline(val: boolean);

    // Implemented Properties

    get action_name(): string;
    set action_name(val: string);
    get actionName(): string;
    set actionName(val: string);
    get action_target(): GLib.Variant;
    set action_target(val: GLib.Variant);
    get actionTarget(): GLib.Variant;
    set actionTarget(val: GLib.Variant);

    // Constructors

    static ["new"](): PreferencesRow;

    // Members

    get_title(): string;
    get_title_selectable(): boolean;
    get_use_markup(): boolean;
    get_use_underline(): boolean;
    set_title(title: string): void;
    set_title_selectable(title_selectable: boolean): void;
    set_use_markup(use_markup: boolean): void;
    set_use_underline(use_underline: boolean): void;

    // Implemented Members

    get_action_name(): string | null;
    get_action_target_value(): GLib.Variant | null;
    set_action_name(action_name?: string | null): void;
    set_action_target_value(target_value?: GLib.Variant | null): void;
    set_detailed_action_name(detailed_action_name: string): void;
    vfunc_get_action_name(): string | null;
    vfunc_get_action_target_value(): GLib.Variant | null;
    vfunc_set_action_name(action_name?: string | null): void;
    vfunc_set_action_target_value(target_value?: GLib.Variant | null): void;
}
export module PreferencesWindow {
    export interface ConstructorProperties extends Window.ConstructorProperties {
        [key: string]: any;
        can_navigate_back: boolean;
        canNavigateBack: boolean;
        search_enabled: boolean;
        searchEnabled: boolean;
        visible_page: Gtk.Widget;
        visiblePage: Gtk.Widget;
        visible_page_name: string;
        visiblePageName: string;
    }
}
export class PreferencesWindow
    extends Window
    implements Gtk.Accessible, Gtk.Buildable, Gtk.ConstraintTarget, Gtk.Native, Gtk.Root, Gtk.ShortcutManager
{
    static $gtype: GObject.GType<PreferencesWindow>;

    constructor(properties?: Partial<PreferencesWindow.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<PreferencesWindow.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get can_navigate_back(): boolean;
    set can_navigate_back(val: boolean);
    get canNavigateBack(): boolean;
    set canNavigateBack(val: boolean);
    get search_enabled(): boolean;
    set search_enabled(val: boolean);
    get searchEnabled(): boolean;
    set searchEnabled(val: boolean);
    get visible_page(): Gtk.Widget;
    set visible_page(val: Gtk.Widget);
    get visiblePage(): Gtk.Widget;
    set visiblePage(val: Gtk.Widget);
    get visible_page_name(): string;
    set visible_page_name(val: string);
    get visiblePageName(): string;
    set visiblePageName(val: string);

    // Constructors

    static ["new"](): PreferencesWindow;

    // Members

    add(page: PreferencesPage): void;
    add_toast(toast: Toast): void;
    close_subpage(): void;
    get_can_navigate_back(): boolean;
    get_search_enabled(): boolean;
    get_visible_page(): PreferencesPage | null;
    get_visible_page_name(): string | null;
    present_subpage(subpage: Gtk.Widget): void;
    remove(page: PreferencesPage): void;
    set_can_navigate_back(can_navigate_back: boolean): void;
    set_search_enabled(search_enabled: boolean): void;
    set_visible_page(page: PreferencesPage): void;
    set_visible_page_name(name: string): void;
}
export module PropertyAnimationTarget {
    export interface ConstructorProperties extends AnimationTarget.ConstructorProperties {
        [key: string]: any;
        object: GObject.Object;
        pspec: GObject.ParamSpec;
    }
}
export class PropertyAnimationTarget extends AnimationTarget {
    static $gtype: GObject.GType<PropertyAnimationTarget>;

    constructor(properties?: Partial<PropertyAnimationTarget.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<PropertyAnimationTarget.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get object(): GObject.Object;
    get pspec(): GObject.ParamSpec;

    // Constructors

    static ["new"](object: GObject.Object, property_name: string): PropertyAnimationTarget;
    static new_for_pspec(object: GObject.Object, pspec: GObject.ParamSpec): PropertyAnimationTarget;

    // Members

    get_object<T = GObject.Object>(): T;
    get_pspec(): GObject.ParamSpec;
}
export module SplitButton {
    export interface ConstructorProperties extends Gtk.Widget.ConstructorProperties {
        [key: string]: any;
        child: Gtk.Widget;
        direction: Gtk.ArrowType;
        dropdown_tooltip: string;
        dropdownTooltip: string;
        icon_name: string;
        iconName: string;
        label: string;
        menu_model: Gio.MenuModel;
        menuModel: Gio.MenuModel;
        popover: Gtk.Popover;
        use_underline: boolean;
        useUnderline: boolean;
    }
}
export class SplitButton
    extends Gtk.Widget
    implements Gtk.Accessible, Gtk.Actionable, Gtk.Buildable, Gtk.ConstraintTarget
{
    static $gtype: GObject.GType<SplitButton>;

    constructor(properties?: Partial<SplitButton.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<SplitButton.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get child(): Gtk.Widget;
    set child(val: Gtk.Widget);
    get direction(): Gtk.ArrowType;
    set direction(val: Gtk.ArrowType);
    get dropdown_tooltip(): string;
    set dropdown_tooltip(val: string);
    get dropdownTooltip(): string;
    set dropdownTooltip(val: string);
    get icon_name(): string;
    set icon_name(val: string);
    get iconName(): string;
    set iconName(val: string);
    get label(): string;
    set label(val: string);
    get menu_model(): Gio.MenuModel;
    set menu_model(val: Gio.MenuModel);
    get menuModel(): Gio.MenuModel;
    set menuModel(val: Gio.MenuModel);
    get popover(): Gtk.Popover;
    set popover(val: Gtk.Popover);
    get use_underline(): boolean;
    set use_underline(val: boolean);
    get useUnderline(): boolean;
    set useUnderline(val: boolean);

    // Signals

    connect(id: string, callback: (...args: any[]) => any): number;
    connect_after(id: string, callback: (...args: any[]) => any): number;
    emit(id: string, ...args: any[]): void;
    connect(signal: "activate", callback: (_source: this) => void): number;
    connect_after(signal: "activate", callback: (_source: this) => void): number;
    emit(signal: "activate"): void;
    connect(signal: "clicked", callback: (_source: this) => void): number;
    connect_after(signal: "clicked", callback: (_source: this) => void): number;
    emit(signal: "clicked"): void;

    // Implemented Properties

    get accessible_role(): Gtk.AccessibleRole;
    set accessible_role(val: Gtk.AccessibleRole);
    get accessibleRole(): Gtk.AccessibleRole;
    set accessibleRole(val: Gtk.AccessibleRole);
    get action_name(): string;
    set action_name(val: string);
    get actionName(): string;
    set actionName(val: string);
    get action_target(): GLib.Variant;
    set action_target(val: GLib.Variant);
    get actionTarget(): GLib.Variant;
    set actionTarget(val: GLib.Variant);

    // Constructors

    static ["new"](): SplitButton;

    // Members

    get_child(): Gtk.Widget | null;
    get_direction(): Gtk.ArrowType;
    // Conflicted with Gtk.Widget.get_direction
    get_direction(...args: never[]): any;
    get_dropdown_tooltip(): string;
    get_icon_name(): string | null;
    get_label(): string | null;
    get_menu_model(): Gio.MenuModel | null;
    get_popover(): Gtk.Popover | null;
    get_use_underline(): boolean;
    popdown(): void;
    popup(): void;
    set_child(child?: Gtk.Widget | null): void;
    set_direction(direction: Gtk.ArrowType): void;
    // Conflicted with Gtk.Widget.set_direction
    set_direction(...args: never[]): any;
    set_dropdown_tooltip(tooltip: string): void;
    set_icon_name(icon_name: string): void;
    set_label(label: string): void;
    set_menu_model(menu_model?: Gio.MenuModel | null): void;
    set_popover(popover?: Gtk.Popover | null): void;
    set_use_underline(use_underline: boolean): void;

    // Implemented Members

    get_accessible_parent(): Gtk.Accessible | null;
    get_accessible_role(): Gtk.AccessibleRole;
    get_at_context(): Gtk.ATContext;
    get_bounds(): [boolean, number, number, number, number];
    get_first_accessible_child(): Gtk.Accessible | null;
    get_next_accessible_sibling(): Gtk.Accessible | null;
    get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    reset_property(property: Gtk.AccessibleProperty): void;
    reset_relation(relation: Gtk.AccessibleRelation): void;
    reset_state(state: Gtk.AccessibleState): void;
    set_accessible_parent(parent?: Gtk.Accessible | null, next_sibling?: Gtk.Accessible | null): void;
    update_next_accessible_sibling(new_sibling?: Gtk.Accessible | null): void;
    update_property(properties: Gtk.AccessibleProperty[], values: GObject.Value[]): void;
    update_relation(relations: Gtk.AccessibleRelation[], values: GObject.Value[]): void;
    update_state(states: Gtk.AccessibleState[], values: GObject.Value[]): void;
    vfunc_get_accessible_parent(): Gtk.Accessible | null;
    vfunc_get_at_context(): Gtk.ATContext | null;
    vfunc_get_bounds(): [boolean, number, number, number, number];
    vfunc_get_first_accessible_child(): Gtk.Accessible | null;
    vfunc_get_next_accessible_sibling(): Gtk.Accessible | null;
    vfunc_get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    get_action_name(): string | null;
    get_action_target_value(): GLib.Variant | null;
    set_action_name(action_name?: string | null): void;
    set_action_target_value(target_value?: GLib.Variant | null): void;
    set_detailed_action_name(detailed_action_name: string): void;
    vfunc_get_action_name(): string | null;
    vfunc_get_action_target_value(): GLib.Variant | null;
    vfunc_set_action_name(action_name?: string | null): void;
    vfunc_set_action_target_value(target_value?: GLib.Variant | null): void;
    get_buildable_id(): string | null;
    vfunc_add_child(builder: Gtk.Builder, child: GObject.Object, type?: string | null): void;
    vfunc_custom_finished(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_end(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_start(
        builder: Gtk.Builder,
        child: GObject.Object | null,
        tagname: string
    ): [boolean, Gtk.BuildableParser, any | null];
    vfunc_get_id(): string;
    vfunc_get_internal_child<T = GObject.Object>(builder: Gtk.Builder, childname: string): T;
    vfunc_parser_finished(builder: Gtk.Builder): void;
    vfunc_set_buildable_property(builder: Gtk.Builder, name: string, value: GObject.Value | any): void;
    vfunc_set_id(id: string): void;
}
export module SpringAnimation {
    export interface ConstructorProperties extends Animation.ConstructorProperties {
        [key: string]: any;
        clamp: boolean;
        epsilon: number;
        estimated_duration: number;
        estimatedDuration: number;
        initial_velocity: number;
        initialVelocity: number;
        spring_params: SpringParams;
        springParams: SpringParams;
        value_from: number;
        valueFrom: number;
        value_to: number;
        valueTo: number;
        velocity: number;
    }
}
export class SpringAnimation extends Animation {
    static $gtype: GObject.GType<SpringAnimation>;

    constructor(properties?: Partial<SpringAnimation.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<SpringAnimation.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get clamp(): boolean;
    set clamp(val: boolean);
    get epsilon(): number;
    set epsilon(val: number);
    get estimated_duration(): number;
    get estimatedDuration(): number;
    get initial_velocity(): number;
    set initial_velocity(val: number);
    get initialVelocity(): number;
    set initialVelocity(val: number);
    get spring_params(): SpringParams;
    set spring_params(val: SpringParams);
    get springParams(): SpringParams;
    set springParams(val: SpringParams);
    get value_from(): number;
    set value_from(val: number);
    get valueFrom(): number;
    set valueFrom(val: number);
    get value_to(): number;
    set value_to(val: number);
    get valueTo(): number;
    set valueTo(val: number);
    get velocity(): number;

    // Constructors

    static ["new"](
        widget: Gtk.Widget,
        from: number,
        to: number,
        spring_params: SpringParams,
        target: AnimationTarget
    ): SpringAnimation;

    // Members

    calculate_value(time: number): number;
    calculate_velocity(time: number): number;
    get_clamp(): boolean;
    get_epsilon(): number;
    get_estimated_duration(): number;
    get_initial_velocity(): number;
    get_spring_params(): SpringParams;
    get_value_from(): number;
    get_value_to(): number;
    get_velocity(): number;
    set_clamp(clamp: boolean): void;
    set_epsilon(epsilon: number): void;
    set_initial_velocity(velocity: number): void;
    set_spring_params(spring_params: SpringParams): void;
    set_value_from(value: number): void;
    set_value_to(value: number): void;
}
export module Squeezer {
    export interface ConstructorProperties extends Gtk.Widget.ConstructorProperties {
        [key: string]: any;
        allow_none: boolean;
        allowNone: boolean;
        homogeneous: boolean;
        interpolate_size: boolean;
        interpolateSize: boolean;
        pages: Gtk.SelectionModel;
        switch_threshold_policy: FoldThresholdPolicy;
        switchThresholdPolicy: FoldThresholdPolicy;
        transition_duration: number;
        transitionDuration: number;
        transition_running: boolean;
        transitionRunning: boolean;
        transition_type: SqueezerTransitionType;
        transitionType: SqueezerTransitionType;
        visible_child: Gtk.Widget;
        visibleChild: Gtk.Widget;
        xalign: number;
        yalign: number;
    }
}
export class Squeezer
    extends Gtk.Widget
    implements Gtk.Accessible, Gtk.Buildable, Gtk.ConstraintTarget, Gtk.Orientable
{
    static $gtype: GObject.GType<Squeezer>;

    constructor(properties?: Partial<Squeezer.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<Squeezer.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get allow_none(): boolean;
    set allow_none(val: boolean);
    get allowNone(): boolean;
    set allowNone(val: boolean);
    get homogeneous(): boolean;
    set homogeneous(val: boolean);
    get interpolate_size(): boolean;
    set interpolate_size(val: boolean);
    get interpolateSize(): boolean;
    set interpolateSize(val: boolean);
    get pages(): Gtk.SelectionModel;
    get switch_threshold_policy(): FoldThresholdPolicy;
    set switch_threshold_policy(val: FoldThresholdPolicy);
    get switchThresholdPolicy(): FoldThresholdPolicy;
    set switchThresholdPolicy(val: FoldThresholdPolicy);
    get transition_duration(): number;
    set transition_duration(val: number);
    get transitionDuration(): number;
    set transitionDuration(val: number);
    get transition_running(): boolean;
    get transitionRunning(): boolean;
    get transition_type(): SqueezerTransitionType;
    set transition_type(val: SqueezerTransitionType);
    get transitionType(): SqueezerTransitionType;
    set transitionType(val: SqueezerTransitionType);
    get visible_child(): Gtk.Widget;
    get visibleChild(): Gtk.Widget;
    get xalign(): number;
    set xalign(val: number);
    get yalign(): number;
    set yalign(val: number);

    // Implemented Properties

    get accessible_role(): Gtk.AccessibleRole;
    set accessible_role(val: Gtk.AccessibleRole);
    get accessibleRole(): Gtk.AccessibleRole;
    set accessibleRole(val: Gtk.AccessibleRole);
    get orientation(): Gtk.Orientation;
    set orientation(val: Gtk.Orientation);

    // Constructors

    static ["new"](): Squeezer;

    // Members

    add(child: Gtk.Widget): SqueezerPage;
    get_allow_none(): boolean;
    get_homogeneous(): boolean;
    get_interpolate_size(): boolean;
    get_page(child: Gtk.Widget): SqueezerPage;
    get_pages(): Gtk.SelectionModel;
    get_switch_threshold_policy(): FoldThresholdPolicy;
    get_transition_duration(): number;
    get_transition_running(): boolean;
    get_transition_type(): SqueezerTransitionType;
    get_visible_child(): Gtk.Widget | null;
    get_xalign(): number;
    get_yalign(): number;
    remove(child: Gtk.Widget): void;
    set_allow_none(allow_none: boolean): void;
    set_homogeneous(homogeneous: boolean): void;
    set_interpolate_size(interpolate_size: boolean): void;
    set_switch_threshold_policy(policy: FoldThresholdPolicy): void;
    set_transition_duration(duration: number): void;
    set_transition_type(transition: SqueezerTransitionType): void;
    set_xalign(xalign: number): void;
    set_yalign(yalign: number): void;

    // Implemented Members

    get_accessible_parent(): Gtk.Accessible | null;
    get_accessible_role(): Gtk.AccessibleRole;
    get_at_context(): Gtk.ATContext;
    get_bounds(): [boolean, number, number, number, number];
    get_first_accessible_child(): Gtk.Accessible | null;
    get_next_accessible_sibling(): Gtk.Accessible | null;
    get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    reset_property(property: Gtk.AccessibleProperty): void;
    reset_relation(relation: Gtk.AccessibleRelation): void;
    reset_state(state: Gtk.AccessibleState): void;
    set_accessible_parent(parent?: Gtk.Accessible | null, next_sibling?: Gtk.Accessible | null): void;
    update_next_accessible_sibling(new_sibling?: Gtk.Accessible | null): void;
    update_property(properties: Gtk.AccessibleProperty[], values: GObject.Value[]): void;
    update_relation(relations: Gtk.AccessibleRelation[], values: GObject.Value[]): void;
    update_state(states: Gtk.AccessibleState[], values: GObject.Value[]): void;
    vfunc_get_accessible_parent(): Gtk.Accessible | null;
    vfunc_get_at_context(): Gtk.ATContext | null;
    vfunc_get_bounds(): [boolean, number, number, number, number];
    vfunc_get_first_accessible_child(): Gtk.Accessible | null;
    vfunc_get_next_accessible_sibling(): Gtk.Accessible | null;
    vfunc_get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    get_buildable_id(): string | null;
    vfunc_add_child(builder: Gtk.Builder, child: GObject.Object, type?: string | null): void;
    vfunc_custom_finished(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_end(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_start(
        builder: Gtk.Builder,
        child: GObject.Object | null,
        tagname: string
    ): [boolean, Gtk.BuildableParser, any | null];
    vfunc_get_id(): string;
    vfunc_get_internal_child<T = GObject.Object>(builder: Gtk.Builder, childname: string): T;
    vfunc_parser_finished(builder: Gtk.Builder): void;
    vfunc_set_buildable_property(builder: Gtk.Builder, name: string, value: GObject.Value | any): void;
    vfunc_set_id(id: string): void;
    get_orientation(): Gtk.Orientation;
    set_orientation(orientation: Gtk.Orientation): void;
}
export module SqueezerPage {
    export interface ConstructorProperties extends GObject.Object.ConstructorProperties {
        [key: string]: any;
        child: Gtk.Widget;
        enabled: boolean;
    }
}
export class SqueezerPage extends GObject.Object {
    static $gtype: GObject.GType<SqueezerPage>;

    constructor(properties?: Partial<SqueezerPage.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<SqueezerPage.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get child(): Gtk.Widget;
    get enabled(): boolean;
    set enabled(val: boolean);

    // Members

    get_child(): Gtk.Widget;
    get_enabled(): boolean;
    set_enabled(enabled: boolean): void;
}
export module StatusPage {
    export interface ConstructorProperties extends Gtk.Widget.ConstructorProperties {
        [key: string]: any;
        child: Gtk.Widget;
        description: string;
        icon_name: string;
        iconName: string;
        paintable: Gdk.Paintable;
        title: string;
    }
}
export class StatusPage extends Gtk.Widget implements Gtk.Accessible, Gtk.Buildable, Gtk.ConstraintTarget {
    static $gtype: GObject.GType<StatusPage>;

    constructor(properties?: Partial<StatusPage.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<StatusPage.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get child(): Gtk.Widget;
    set child(val: Gtk.Widget);
    get description(): string;
    set description(val: string);
    get icon_name(): string;
    set icon_name(val: string);
    get iconName(): string;
    set iconName(val: string);
    get paintable(): Gdk.Paintable;
    set paintable(val: Gdk.Paintable);
    get title(): string;
    set title(val: string);

    // Implemented Properties

    get accessible_role(): Gtk.AccessibleRole;
    set accessible_role(val: Gtk.AccessibleRole);
    get accessibleRole(): Gtk.AccessibleRole;
    set accessibleRole(val: Gtk.AccessibleRole);

    // Constructors

    static ["new"](): StatusPage;

    // Members

    get_child(): Gtk.Widget | null;
    get_description(): string | null;
    get_icon_name(): string | null;
    get_paintable(): Gdk.Paintable | null;
    get_title(): string;
    set_child(child?: Gtk.Widget | null): void;
    set_description(description?: string | null): void;
    set_icon_name(icon_name?: string | null): void;
    set_paintable(paintable?: Gdk.Paintable | null): void;
    set_title(title: string): void;

    // Implemented Members

    get_accessible_parent(): Gtk.Accessible | null;
    get_accessible_role(): Gtk.AccessibleRole;
    get_at_context(): Gtk.ATContext;
    get_bounds(): [boolean, number, number, number, number];
    get_first_accessible_child(): Gtk.Accessible | null;
    get_next_accessible_sibling(): Gtk.Accessible | null;
    get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    reset_property(property: Gtk.AccessibleProperty): void;
    reset_relation(relation: Gtk.AccessibleRelation): void;
    reset_state(state: Gtk.AccessibleState): void;
    set_accessible_parent(parent?: Gtk.Accessible | null, next_sibling?: Gtk.Accessible | null): void;
    update_next_accessible_sibling(new_sibling?: Gtk.Accessible | null): void;
    update_property(properties: Gtk.AccessibleProperty[], values: GObject.Value[]): void;
    update_relation(relations: Gtk.AccessibleRelation[], values: GObject.Value[]): void;
    update_state(states: Gtk.AccessibleState[], values: GObject.Value[]): void;
    vfunc_get_accessible_parent(): Gtk.Accessible | null;
    vfunc_get_at_context(): Gtk.ATContext | null;
    vfunc_get_bounds(): [boolean, number, number, number, number];
    vfunc_get_first_accessible_child(): Gtk.Accessible | null;
    vfunc_get_next_accessible_sibling(): Gtk.Accessible | null;
    vfunc_get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    get_buildable_id(): string | null;
    vfunc_add_child(builder: Gtk.Builder, child: GObject.Object, type?: string | null): void;
    vfunc_custom_finished(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_end(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_start(
        builder: Gtk.Builder,
        child: GObject.Object | null,
        tagname: string
    ): [boolean, Gtk.BuildableParser, any | null];
    vfunc_get_id(): string;
    vfunc_get_internal_child<T = GObject.Object>(builder: Gtk.Builder, childname: string): T;
    vfunc_parser_finished(builder: Gtk.Builder): void;
    vfunc_set_buildable_property(builder: Gtk.Builder, name: string, value: GObject.Value | any): void;
    vfunc_set_id(id: string): void;
}
export module StyleManager {
    export interface ConstructorProperties extends GObject.Object.ConstructorProperties {
        [key: string]: any;
        color_scheme: ColorScheme;
        colorScheme: ColorScheme;
        dark: boolean;
        display: Gdk.Display;
        high_contrast: boolean;
        highContrast: boolean;
        system_supports_color_schemes: boolean;
        systemSupportsColorSchemes: boolean;
    }
}
export class StyleManager extends GObject.Object {
    static $gtype: GObject.GType<StyleManager>;

    constructor(properties?: Partial<StyleManager.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<StyleManager.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get color_scheme(): ColorScheme;
    set color_scheme(val: ColorScheme);
    get colorScheme(): ColorScheme;
    set colorScheme(val: ColorScheme);
    get dark(): boolean;
    get display(): Gdk.Display;
    get high_contrast(): boolean;
    get highContrast(): boolean;
    get system_supports_color_schemes(): boolean;
    get systemSupportsColorSchemes(): boolean;

    // Members

    get_color_scheme(): ColorScheme;
    get_dark(): boolean;
    get_display(): Gdk.Display;
    get_high_contrast(): boolean;
    get_system_supports_color_schemes(): boolean;
    set_color_scheme(color_scheme: ColorScheme): void;
    static get_default(): StyleManager;
    static get_for_display(display: Gdk.Display): StyleManager;
}
export module SwipeTracker {
    export interface ConstructorProperties extends GObject.Object.ConstructorProperties {
        [key: string]: any;
        allow_long_swipes: boolean;
        allowLongSwipes: boolean;
        allow_mouse_drag: boolean;
        allowMouseDrag: boolean;
        enabled: boolean;
        reversed: boolean;
        swipeable: Swipeable;
    }
}
export class SwipeTracker extends GObject.Object implements Gtk.Orientable {
    static $gtype: GObject.GType<SwipeTracker>;

    constructor(properties?: Partial<SwipeTracker.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<SwipeTracker.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get allow_long_swipes(): boolean;
    set allow_long_swipes(val: boolean);
    get allowLongSwipes(): boolean;
    set allowLongSwipes(val: boolean);
    get allow_mouse_drag(): boolean;
    set allow_mouse_drag(val: boolean);
    get allowMouseDrag(): boolean;
    set allowMouseDrag(val: boolean);
    get enabled(): boolean;
    set enabled(val: boolean);
    get reversed(): boolean;
    set reversed(val: boolean);
    get swipeable(): Swipeable;

    // Signals

    connect(id: string, callback: (...args: any[]) => any): number;
    connect_after(id: string, callback: (...args: any[]) => any): number;
    emit(id: string, ...args: any[]): void;
    connect(signal: "begin-swipe", callback: (_source: this) => void): number;
    connect_after(signal: "begin-swipe", callback: (_source: this) => void): number;
    emit(signal: "begin-swipe"): void;
    connect(signal: "end-swipe", callback: (_source: this, velocity: number, to: number) => void): number;
    connect_after(signal: "end-swipe", callback: (_source: this, velocity: number, to: number) => void): number;
    emit(signal: "end-swipe", velocity: number, to: number): void;
    connect(signal: "prepare", callback: (_source: this, direction: NavigationDirection) => void): number;
    connect_after(signal: "prepare", callback: (_source: this, direction: NavigationDirection) => void): number;
    emit(signal: "prepare", direction: NavigationDirection): void;
    connect(signal: "update-swipe", callback: (_source: this, progress: number) => void): number;
    connect_after(signal: "update-swipe", callback: (_source: this, progress: number) => void): number;
    emit(signal: "update-swipe", progress: number): void;

    // Implemented Properties

    get orientation(): Gtk.Orientation;
    set orientation(val: Gtk.Orientation);

    // Constructors

    static ["new"](swipeable: Swipeable): SwipeTracker;

    // Members

    get_allow_long_swipes(): boolean;
    get_allow_mouse_drag(): boolean;
    get_enabled(): boolean;
    get_reversed(): boolean;
    get_swipeable(): Swipeable;
    set_allow_long_swipes(allow_long_swipes: boolean): void;
    set_allow_mouse_drag(allow_mouse_drag: boolean): void;
    set_enabled(enabled: boolean): void;
    set_reversed(reversed: boolean): void;
    shift_position(delta: number): void;

    // Implemented Members

    get_orientation(): Gtk.Orientation;
    set_orientation(orientation: Gtk.Orientation): void;
}
export module TabBar {
    export interface ConstructorProperties extends Gtk.Widget.ConstructorProperties {
        [key: string]: any;
        autohide: boolean;
        end_action_widget: Gtk.Widget;
        endActionWidget: Gtk.Widget;
        expand_tabs: boolean;
        expandTabs: boolean;
        extra_drag_preload: boolean;
        extraDragPreload: boolean;
        inverted: boolean;
        is_overflowing: boolean;
        isOverflowing: boolean;
        start_action_widget: Gtk.Widget;
        startActionWidget: Gtk.Widget;
        tabs_revealed: boolean;
        tabsRevealed: boolean;
        view: TabView;
    }
}
export class TabBar extends Gtk.Widget implements Gtk.Accessible, Gtk.Buildable, Gtk.ConstraintTarget {
    static $gtype: GObject.GType<TabBar>;

    constructor(properties?: Partial<TabBar.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<TabBar.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get autohide(): boolean;
    set autohide(val: boolean);
    get end_action_widget(): Gtk.Widget;
    set end_action_widget(val: Gtk.Widget);
    get endActionWidget(): Gtk.Widget;
    set endActionWidget(val: Gtk.Widget);
    get expand_tabs(): boolean;
    set expand_tabs(val: boolean);
    get expandTabs(): boolean;
    set expandTabs(val: boolean);
    get extra_drag_preload(): boolean;
    set extra_drag_preload(val: boolean);
    get extraDragPreload(): boolean;
    set extraDragPreload(val: boolean);
    get inverted(): boolean;
    set inverted(val: boolean);
    get is_overflowing(): boolean;
    get isOverflowing(): boolean;
    get start_action_widget(): Gtk.Widget;
    set start_action_widget(val: Gtk.Widget);
    get startActionWidget(): Gtk.Widget;
    set startActionWidget(val: Gtk.Widget);
    get tabs_revealed(): boolean;
    get tabsRevealed(): boolean;
    get view(): TabView;
    set view(val: TabView);

    // Signals

    connect(id: string, callback: (...args: any[]) => any): number;
    connect_after(id: string, callback: (...args: any[]) => any): number;
    emit(id: string, ...args: any[]): void;
    connect(
        signal: "extra-drag-drop",
        callback: (_source: this, page: TabPage, value: GObject.Value) => boolean
    ): number;
    connect_after(
        signal: "extra-drag-drop",
        callback: (_source: this, page: TabPage, value: GObject.Value) => boolean
    ): number;
    emit(signal: "extra-drag-drop", page: TabPage, value: GObject.Value | any): void;
    connect(
        signal: "extra-drag-value",
        callback: (_source: this, page: TabPage, value: GObject.Value) => Gdk.DragAction
    ): number;
    connect_after(
        signal: "extra-drag-value",
        callback: (_source: this, page: TabPage, value: GObject.Value) => Gdk.DragAction
    ): number;
    emit(signal: "extra-drag-value", page: TabPage, value: GObject.Value | any): void;

    // Implemented Properties

    get accessible_role(): Gtk.AccessibleRole;
    set accessible_role(val: Gtk.AccessibleRole);
    get accessibleRole(): Gtk.AccessibleRole;
    set accessibleRole(val: Gtk.AccessibleRole);

    // Constructors

    static ["new"](): TabBar;

    // Members

    get_autohide(): boolean;
    get_end_action_widget(): Gtk.Widget | null;
    get_expand_tabs(): boolean;
    get_extra_drag_preload(): boolean;
    get_inverted(): boolean;
    get_is_overflowing(): boolean;
    get_start_action_widget(): Gtk.Widget | null;
    get_tabs_revealed(): boolean;
    get_view(): TabView | null;
    set_autohide(autohide: boolean): void;
    set_end_action_widget(widget?: Gtk.Widget | null): void;
    set_expand_tabs(expand_tabs: boolean): void;
    set_extra_drag_preload(preload: boolean): void;
    set_inverted(inverted: boolean): void;
    set_start_action_widget(widget?: Gtk.Widget | null): void;
    set_view(view?: TabView | null): void;
    setup_extra_drop_target(actions: Gdk.DragAction, types?: GObject.GType[] | null): void;

    // Implemented Members

    get_accessible_parent(): Gtk.Accessible | null;
    get_accessible_role(): Gtk.AccessibleRole;
    get_at_context(): Gtk.ATContext;
    get_bounds(): [boolean, number, number, number, number];
    get_first_accessible_child(): Gtk.Accessible | null;
    get_next_accessible_sibling(): Gtk.Accessible | null;
    get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    reset_property(property: Gtk.AccessibleProperty): void;
    reset_relation(relation: Gtk.AccessibleRelation): void;
    reset_state(state: Gtk.AccessibleState): void;
    set_accessible_parent(parent?: Gtk.Accessible | null, next_sibling?: Gtk.Accessible | null): void;
    update_next_accessible_sibling(new_sibling?: Gtk.Accessible | null): void;
    update_property(properties: Gtk.AccessibleProperty[], values: GObject.Value[]): void;
    update_relation(relations: Gtk.AccessibleRelation[], values: GObject.Value[]): void;
    update_state(states: Gtk.AccessibleState[], values: GObject.Value[]): void;
    vfunc_get_accessible_parent(): Gtk.Accessible | null;
    vfunc_get_at_context(): Gtk.ATContext | null;
    vfunc_get_bounds(): [boolean, number, number, number, number];
    vfunc_get_first_accessible_child(): Gtk.Accessible | null;
    vfunc_get_next_accessible_sibling(): Gtk.Accessible | null;
    vfunc_get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    get_buildable_id(): string | null;
    vfunc_add_child(builder: Gtk.Builder, child: GObject.Object, type?: string | null): void;
    vfunc_custom_finished(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_end(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_start(
        builder: Gtk.Builder,
        child: GObject.Object | null,
        tagname: string
    ): [boolean, Gtk.BuildableParser, any | null];
    vfunc_get_id(): string;
    vfunc_get_internal_child<T = GObject.Object>(builder: Gtk.Builder, childname: string): T;
    vfunc_parser_finished(builder: Gtk.Builder): void;
    vfunc_set_buildable_property(builder: Gtk.Builder, name: string, value: GObject.Value | any): void;
    vfunc_set_id(id: string): void;
}
export module TabButton {
    export interface ConstructorProperties extends Gtk.Widget.ConstructorProperties {
        [key: string]: any;
        view: TabView;
    }
}
export class TabButton
    extends Gtk.Widget
    implements Gtk.Accessible, Gtk.Actionable, Gtk.Buildable, Gtk.ConstraintTarget
{
    static $gtype: GObject.GType<TabButton>;

    constructor(properties?: Partial<TabButton.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<TabButton.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get view(): TabView;
    set view(val: TabView);

    // Signals

    connect(id: string, callback: (...args: any[]) => any): number;
    connect_after(id: string, callback: (...args: any[]) => any): number;
    emit(id: string, ...args: any[]): void;
    connect(signal: "activate", callback: (_source: this) => void): number;
    connect_after(signal: "activate", callback: (_source: this) => void): number;
    emit(signal: "activate"): void;
    connect(signal: "clicked", callback: (_source: this) => void): number;
    connect_after(signal: "clicked", callback: (_source: this) => void): number;
    emit(signal: "clicked"): void;

    // Implemented Properties

    get accessible_role(): Gtk.AccessibleRole;
    set accessible_role(val: Gtk.AccessibleRole);
    get accessibleRole(): Gtk.AccessibleRole;
    set accessibleRole(val: Gtk.AccessibleRole);
    get action_name(): string;
    set action_name(val: string);
    get actionName(): string;
    set actionName(val: string);
    get action_target(): GLib.Variant;
    set action_target(val: GLib.Variant);
    get actionTarget(): GLib.Variant;
    set actionTarget(val: GLib.Variant);

    // Constructors

    static ["new"](): TabButton;

    // Members

    get_view(): TabView | null;
    set_view(view?: TabView | null): void;

    // Implemented Members

    get_accessible_parent(): Gtk.Accessible | null;
    get_accessible_role(): Gtk.AccessibleRole;
    get_at_context(): Gtk.ATContext;
    get_bounds(): [boolean, number, number, number, number];
    get_first_accessible_child(): Gtk.Accessible | null;
    get_next_accessible_sibling(): Gtk.Accessible | null;
    get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    reset_property(property: Gtk.AccessibleProperty): void;
    reset_relation(relation: Gtk.AccessibleRelation): void;
    reset_state(state: Gtk.AccessibleState): void;
    set_accessible_parent(parent?: Gtk.Accessible | null, next_sibling?: Gtk.Accessible | null): void;
    update_next_accessible_sibling(new_sibling?: Gtk.Accessible | null): void;
    update_property(properties: Gtk.AccessibleProperty[], values: GObject.Value[]): void;
    update_relation(relations: Gtk.AccessibleRelation[], values: GObject.Value[]): void;
    update_state(states: Gtk.AccessibleState[], values: GObject.Value[]): void;
    vfunc_get_accessible_parent(): Gtk.Accessible | null;
    vfunc_get_at_context(): Gtk.ATContext | null;
    vfunc_get_bounds(): [boolean, number, number, number, number];
    vfunc_get_first_accessible_child(): Gtk.Accessible | null;
    vfunc_get_next_accessible_sibling(): Gtk.Accessible | null;
    vfunc_get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    get_action_name(): string | null;
    get_action_target_value(): GLib.Variant | null;
    set_action_name(action_name?: string | null): void;
    set_action_target_value(target_value?: GLib.Variant | null): void;
    set_detailed_action_name(detailed_action_name: string): void;
    vfunc_get_action_name(): string | null;
    vfunc_get_action_target_value(): GLib.Variant | null;
    vfunc_set_action_name(action_name?: string | null): void;
    vfunc_set_action_target_value(target_value?: GLib.Variant | null): void;
    get_buildable_id(): string | null;
    vfunc_add_child(builder: Gtk.Builder, child: GObject.Object, type?: string | null): void;
    vfunc_custom_finished(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_end(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_start(
        builder: Gtk.Builder,
        child: GObject.Object | null,
        tagname: string
    ): [boolean, Gtk.BuildableParser, any | null];
    vfunc_get_id(): string;
    vfunc_get_internal_child<T = GObject.Object>(builder: Gtk.Builder, childname: string): T;
    vfunc_parser_finished(builder: Gtk.Builder): void;
    vfunc_set_buildable_property(builder: Gtk.Builder, name: string, value: GObject.Value | any): void;
    vfunc_set_id(id: string): void;
}
export module TabOverview {
    export interface ConstructorProperties extends Gtk.Widget.ConstructorProperties {
        [key: string]: any;
        child: Gtk.Widget;
        enable_new_tab: boolean;
        enableNewTab: boolean;
        enable_search: boolean;
        enableSearch: boolean;
        extra_drag_preload: boolean;
        extraDragPreload: boolean;
        inverted: boolean;
        open: boolean;
        search_active: boolean;
        searchActive: boolean;
        secondary_menu: Gio.MenuModel;
        secondaryMenu: Gio.MenuModel;
        show_end_title_buttons: boolean;
        showEndTitleButtons: boolean;
        show_start_title_buttons: boolean;
        showStartTitleButtons: boolean;
        view: TabView;
    }
}
export class TabOverview extends Gtk.Widget implements Gtk.Accessible, Gtk.Buildable, Gtk.ConstraintTarget {
    static $gtype: GObject.GType<TabOverview>;

    constructor(properties?: Partial<TabOverview.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<TabOverview.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get child(): Gtk.Widget;
    set child(val: Gtk.Widget);
    get enable_new_tab(): boolean;
    set enable_new_tab(val: boolean);
    get enableNewTab(): boolean;
    set enableNewTab(val: boolean);
    get enable_search(): boolean;
    set enable_search(val: boolean);
    get enableSearch(): boolean;
    set enableSearch(val: boolean);
    get extra_drag_preload(): boolean;
    set extra_drag_preload(val: boolean);
    get extraDragPreload(): boolean;
    set extraDragPreload(val: boolean);
    get inverted(): boolean;
    set inverted(val: boolean);
    get open(): boolean;
    set open(val: boolean);
    get search_active(): boolean;
    get searchActive(): boolean;
    get secondary_menu(): Gio.MenuModel;
    set secondary_menu(val: Gio.MenuModel);
    get secondaryMenu(): Gio.MenuModel;
    set secondaryMenu(val: Gio.MenuModel);
    get show_end_title_buttons(): boolean;
    set show_end_title_buttons(val: boolean);
    get showEndTitleButtons(): boolean;
    set showEndTitleButtons(val: boolean);
    get show_start_title_buttons(): boolean;
    set show_start_title_buttons(val: boolean);
    get showStartTitleButtons(): boolean;
    set showStartTitleButtons(val: boolean);
    get view(): TabView;
    set view(val: TabView);

    // Signals

    connect(id: string, callback: (...args: any[]) => any): number;
    connect_after(id: string, callback: (...args: any[]) => any): number;
    emit(id: string, ...args: any[]): void;
    connect(signal: "create-tab", callback: (_source: this) => TabPage): number;
    connect_after(signal: "create-tab", callback: (_source: this) => TabPage): number;
    emit(signal: "create-tab"): void;
    connect(
        signal: "extra-drag-drop",
        callback: (_source: this, page: TabPage, value: GObject.Value) => boolean
    ): number;
    connect_after(
        signal: "extra-drag-drop",
        callback: (_source: this, page: TabPage, value: GObject.Value) => boolean
    ): number;
    emit(signal: "extra-drag-drop", page: TabPage, value: GObject.Value | any): void;
    connect(
        signal: "extra-drag-value",
        callback: (_source: this, page: TabPage, value: GObject.Value) => Gdk.DragAction
    ): number;
    connect_after(
        signal: "extra-drag-value",
        callback: (_source: this, page: TabPage, value: GObject.Value) => Gdk.DragAction
    ): number;
    emit(signal: "extra-drag-value", page: TabPage, value: GObject.Value | any): void;

    // Implemented Properties

    get accessible_role(): Gtk.AccessibleRole;
    set accessible_role(val: Gtk.AccessibleRole);
    get accessibleRole(): Gtk.AccessibleRole;
    set accessibleRole(val: Gtk.AccessibleRole);

    // Constructors

    static ["new"](): TabOverview;

    // Members

    get_child(): Gtk.Widget | null;
    get_enable_new_tab(): boolean;
    get_enable_search(): boolean;
    get_extra_drag_preload(): boolean;
    get_inverted(): boolean;
    get_open(): boolean;
    get_search_active(): boolean;
    get_secondary_menu(): Gio.MenuModel | null;
    get_show_end_title_buttons(): boolean;
    get_show_start_title_buttons(): boolean;
    get_view(): TabView | null;
    set_child(child?: Gtk.Widget | null): void;
    set_enable_new_tab(enable_new_tab: boolean): void;
    set_enable_search(enable_search: boolean): void;
    set_extra_drag_preload(preload: boolean): void;
    set_inverted(inverted: boolean): void;
    set_open(open: boolean): void;
    set_secondary_menu(secondary_menu?: Gio.MenuModel | null): void;
    set_show_end_title_buttons(show_end_title_buttons: boolean): void;
    set_show_start_title_buttons(show_start_title_buttons: boolean): void;
    set_view(view?: TabView | null): void;
    setup_extra_drop_target(actions: Gdk.DragAction, types?: GObject.GType[] | null): void;

    // Implemented Members

    get_accessible_parent(): Gtk.Accessible | null;
    get_accessible_role(): Gtk.AccessibleRole;
    get_at_context(): Gtk.ATContext;
    get_bounds(): [boolean, number, number, number, number];
    get_first_accessible_child(): Gtk.Accessible | null;
    get_next_accessible_sibling(): Gtk.Accessible | null;
    get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    reset_property(property: Gtk.AccessibleProperty): void;
    reset_relation(relation: Gtk.AccessibleRelation): void;
    reset_state(state: Gtk.AccessibleState): void;
    set_accessible_parent(parent?: Gtk.Accessible | null, next_sibling?: Gtk.Accessible | null): void;
    update_next_accessible_sibling(new_sibling?: Gtk.Accessible | null): void;
    update_property(properties: Gtk.AccessibleProperty[], values: GObject.Value[]): void;
    update_relation(relations: Gtk.AccessibleRelation[], values: GObject.Value[]): void;
    update_state(states: Gtk.AccessibleState[], values: GObject.Value[]): void;
    vfunc_get_accessible_parent(): Gtk.Accessible | null;
    vfunc_get_at_context(): Gtk.ATContext | null;
    vfunc_get_bounds(): [boolean, number, number, number, number];
    vfunc_get_first_accessible_child(): Gtk.Accessible | null;
    vfunc_get_next_accessible_sibling(): Gtk.Accessible | null;
    vfunc_get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    get_buildable_id(): string | null;
    vfunc_add_child(builder: Gtk.Builder, child: GObject.Object, type?: string | null): void;
    vfunc_custom_finished(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_end(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_start(
        builder: Gtk.Builder,
        child: GObject.Object | null,
        tagname: string
    ): [boolean, Gtk.BuildableParser, any | null];
    vfunc_get_id(): string;
    vfunc_get_internal_child<T = GObject.Object>(builder: Gtk.Builder, childname: string): T;
    vfunc_parser_finished(builder: Gtk.Builder): void;
    vfunc_set_buildable_property(builder: Gtk.Builder, name: string, value: GObject.Value | any): void;
    vfunc_set_id(id: string): void;
}
export module TabPage {
    export interface ConstructorProperties extends GObject.Object.ConstructorProperties {
        [key: string]: any;
        child: Gtk.Widget;
        icon: Gio.Icon;
        indicator_activatable: boolean;
        indicatorActivatable: boolean;
        indicator_icon: Gio.Icon;
        indicatorIcon: Gio.Icon;
        indicator_tooltip: string;
        indicatorTooltip: string;
        keyword: string;
        live_thumbnail: boolean;
        liveThumbnail: boolean;
        loading: boolean;
        needs_attention: boolean;
        needsAttention: boolean;
        pinned: boolean;
        selected: boolean;
        thumbnail_xalign: number;
        thumbnailXalign: number;
        thumbnail_yalign: number;
        thumbnailYalign: number;
        title: string;
        tooltip: string;
    }
}
export class TabPage extends GObject.Object implements Gtk.Accessible {
    static $gtype: GObject.GType<TabPage>;

    constructor(properties?: Partial<TabPage.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<TabPage.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get child(): Gtk.Widget;
    get icon(): Gio.Icon;
    set icon(val: Gio.Icon);
    get indicator_activatable(): boolean;
    set indicator_activatable(val: boolean);
    get indicatorActivatable(): boolean;
    set indicatorActivatable(val: boolean);
    get indicator_icon(): Gio.Icon;
    set indicator_icon(val: Gio.Icon);
    get indicatorIcon(): Gio.Icon;
    set indicatorIcon(val: Gio.Icon);
    get indicator_tooltip(): string;
    set indicator_tooltip(val: string);
    get indicatorTooltip(): string;
    set indicatorTooltip(val: string);
    get keyword(): string;
    set keyword(val: string);
    get live_thumbnail(): boolean;
    set live_thumbnail(val: boolean);
    get liveThumbnail(): boolean;
    set liveThumbnail(val: boolean);
    get loading(): boolean;
    set loading(val: boolean);
    get needs_attention(): boolean;
    set needs_attention(val: boolean);
    get needsAttention(): boolean;
    set needsAttention(val: boolean);
    get pinned(): boolean;
    get selected(): boolean;
    get thumbnail_xalign(): number;
    set thumbnail_xalign(val: number);
    get thumbnailXalign(): number;
    set thumbnailXalign(val: number);
    get thumbnail_yalign(): number;
    set thumbnail_yalign(val: number);
    get thumbnailYalign(): number;
    set thumbnailYalign(val: number);
    get title(): string;
    set title(val: string);
    get tooltip(): string;
    set tooltip(val: string);

    // Implemented Properties

    get accessible_role(): Gtk.AccessibleRole;
    set accessible_role(val: Gtk.AccessibleRole);
    get accessibleRole(): Gtk.AccessibleRole;
    set accessibleRole(val: Gtk.AccessibleRole);

    // Members

    get_child(): Gtk.Widget;
    get_icon(): Gio.Icon | null;
    get_indicator_activatable(): boolean;
    get_indicator_icon(): Gio.Icon | null;
    get_indicator_tooltip(): string;
    get_keyword(): string | null;
    get_live_thumbnail(): boolean;
    get_loading(): boolean;
    get_needs_attention(): boolean;
    get_parent(): TabPage | null;
    get_pinned(): boolean;
    get_selected(): boolean;
    get_thumbnail_xalign(): number;
    get_thumbnail_yalign(): number;
    get_title(): string;
    get_tooltip(): string | null;
    invalidate_thumbnail(): void;
    set_icon(icon?: Gio.Icon | null): void;
    set_indicator_activatable(activatable: boolean): void;
    set_indicator_icon(indicator_icon?: Gio.Icon | null): void;
    set_indicator_tooltip(tooltip: string): void;
    set_keyword(keyword: string): void;
    set_live_thumbnail(live_thumbnail: boolean): void;
    set_loading(loading: boolean): void;
    set_needs_attention(needs_attention: boolean): void;
    set_thumbnail_xalign(xalign: number): void;
    set_thumbnail_yalign(yalign: number): void;
    set_title(title: string): void;
    set_tooltip(tooltip: string): void;

    // Implemented Members

    get_accessible_parent(): Gtk.Accessible | null;
    get_accessible_role(): Gtk.AccessibleRole;
    get_at_context(): Gtk.ATContext;
    get_bounds(): [boolean, number, number, number, number];
    get_first_accessible_child(): Gtk.Accessible | null;
    get_next_accessible_sibling(): Gtk.Accessible | null;
    get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    reset_property(property: Gtk.AccessibleProperty): void;
    reset_relation(relation: Gtk.AccessibleRelation): void;
    reset_state(state: Gtk.AccessibleState): void;
    set_accessible_parent(parent?: Gtk.Accessible | null, next_sibling?: Gtk.Accessible | null): void;
    update_next_accessible_sibling(new_sibling?: Gtk.Accessible | null): void;
    update_property(properties: Gtk.AccessibleProperty[], values: GObject.Value[]): void;
    update_relation(relations: Gtk.AccessibleRelation[], values: GObject.Value[]): void;
    update_state(states: Gtk.AccessibleState[], values: GObject.Value[]): void;
    vfunc_get_accessible_parent(): Gtk.Accessible | null;
    vfunc_get_at_context(): Gtk.ATContext | null;
    vfunc_get_bounds(): [boolean, number, number, number, number];
    vfunc_get_first_accessible_child(): Gtk.Accessible | null;
    vfunc_get_next_accessible_sibling(): Gtk.Accessible | null;
    vfunc_get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
}
export module TabView {
    export interface ConstructorProperties extends Gtk.Widget.ConstructorProperties {
        [key: string]: any;
        default_icon: Gio.Icon;
        defaultIcon: Gio.Icon;
        is_transferring_page: boolean;
        isTransferringPage: boolean;
        menu_model: Gio.MenuModel;
        menuModel: Gio.MenuModel;
        n_pages: number;
        nPages: number;
        n_pinned_pages: number;
        nPinnedPages: number;
        pages: Gtk.SelectionModel;
        selected_page: TabPage;
        selectedPage: TabPage;
        shortcuts: TabViewShortcuts;
    }
}
export class TabView extends Gtk.Widget implements Gtk.Accessible, Gtk.Buildable, Gtk.ConstraintTarget {
    static $gtype: GObject.GType<TabView>;

    constructor(properties?: Partial<TabView.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<TabView.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get default_icon(): Gio.Icon;
    set default_icon(val: Gio.Icon);
    get defaultIcon(): Gio.Icon;
    set defaultIcon(val: Gio.Icon);
    get is_transferring_page(): boolean;
    get isTransferringPage(): boolean;
    get menu_model(): Gio.MenuModel;
    set menu_model(val: Gio.MenuModel);
    get menuModel(): Gio.MenuModel;
    set menuModel(val: Gio.MenuModel);
    get n_pages(): number;
    get nPages(): number;
    get n_pinned_pages(): number;
    get nPinnedPages(): number;
    get pages(): Gtk.SelectionModel;
    get selected_page(): TabPage;
    set selected_page(val: TabPage);
    get selectedPage(): TabPage;
    set selectedPage(val: TabPage);
    get shortcuts(): TabViewShortcuts;
    set shortcuts(val: TabViewShortcuts);

    // Signals

    connect(id: string, callback: (...args: any[]) => any): number;
    connect_after(id: string, callback: (...args: any[]) => any): number;
    emit(id: string, ...args: any[]): void;
    connect(signal: "close-page", callback: (_source: this, page: TabPage) => boolean): number;
    connect_after(signal: "close-page", callback: (_source: this, page: TabPage) => boolean): number;
    emit(signal: "close-page", page: TabPage): void;
    connect(signal: "create-window", callback: (_source: this) => TabView | null): number;
    connect_after(signal: "create-window", callback: (_source: this) => TabView | null): number;
    emit(signal: "create-window"): void;
    connect(signal: "indicator-activated", callback: (_source: this, page: TabPage) => void): number;
    connect_after(signal: "indicator-activated", callback: (_source: this, page: TabPage) => void): number;
    emit(signal: "indicator-activated", page: TabPage): void;
    connect(signal: "page-attached", callback: (_source: this, page: TabPage, position: number) => void): number;
    connect_after(signal: "page-attached", callback: (_source: this, page: TabPage, position: number) => void): number;
    emit(signal: "page-attached", page: TabPage, position: number): void;
    connect(signal: "page-detached", callback: (_source: this, page: TabPage, position: number) => void): number;
    connect_after(signal: "page-detached", callback: (_source: this, page: TabPage, position: number) => void): number;
    emit(signal: "page-detached", page: TabPage, position: number): void;
    connect(signal: "page-reordered", callback: (_source: this, page: TabPage, position: number) => void): number;
    connect_after(signal: "page-reordered", callback: (_source: this, page: TabPage, position: number) => void): number;
    emit(signal: "page-reordered", page: TabPage, position: number): void;
    connect(signal: "setup-menu", callback: (_source: this, page: TabPage | null) => void): number;
    connect_after(signal: "setup-menu", callback: (_source: this, page: TabPage | null) => void): number;
    emit(signal: "setup-menu", page: TabPage | null): void;

    // Implemented Properties

    get accessible_role(): Gtk.AccessibleRole;
    set accessible_role(val: Gtk.AccessibleRole);
    get accessibleRole(): Gtk.AccessibleRole;
    set accessibleRole(val: Gtk.AccessibleRole);

    // Constructors

    static ["new"](): TabView;

    // Members

    add_page(child: Gtk.Widget, parent?: TabPage | null): TabPage;
    add_shortcuts(shortcuts: TabViewShortcuts): void;
    append(child: Gtk.Widget): TabPage;
    append_pinned(child: Gtk.Widget): TabPage;
    close_other_pages(page: TabPage): void;
    close_page(page: TabPage): void;
    close_page_finish(page: TabPage, confirm: boolean): void;
    close_pages_after(page: TabPage): void;
    close_pages_before(page: TabPage): void;
    get_default_icon(): Gio.Icon;
    get_is_transferring_page(): boolean;
    get_menu_model(): Gio.MenuModel | null;
    get_n_pages(): number;
    get_n_pinned_pages(): number;
    get_nth_page(position: number): TabPage;
    get_page(child: Gtk.Widget): TabPage;
    get_page_position(page: TabPage): number;
    get_pages(): Gtk.SelectionModel;
    get_selected_page(): TabPage | null;
    get_shortcuts(): TabViewShortcuts;
    insert(child: Gtk.Widget, position: number): TabPage;
    insert_pinned(child: Gtk.Widget, position: number): TabPage;
    invalidate_thumbnails(): void;
    prepend(child: Gtk.Widget): TabPage;
    prepend_pinned(child: Gtk.Widget): TabPage;
    remove_shortcuts(shortcuts: TabViewShortcuts): void;
    reorder_backward(page: TabPage): boolean;
    reorder_first(page: TabPage): boolean;
    reorder_forward(page: TabPage): boolean;
    reorder_last(page: TabPage): boolean;
    reorder_page(page: TabPage, position: number): boolean;
    select_next_page(): boolean;
    select_previous_page(): boolean;
    set_default_icon(default_icon: Gio.Icon): void;
    set_menu_model(menu_model?: Gio.MenuModel | null): void;
    set_page_pinned(page: TabPage, pinned: boolean): void;
    set_selected_page(selected_page: TabPage): void;
    set_shortcuts(shortcuts: TabViewShortcuts): void;
    transfer_page(page: TabPage, other_view: TabView, position: number): void;

    // Implemented Members

    get_accessible_parent(): Gtk.Accessible | null;
    get_accessible_role(): Gtk.AccessibleRole;
    get_at_context(): Gtk.ATContext;
    get_bounds(): [boolean, number, number, number, number];
    get_first_accessible_child(): Gtk.Accessible | null;
    get_next_accessible_sibling(): Gtk.Accessible | null;
    get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    reset_property(property: Gtk.AccessibleProperty): void;
    reset_relation(relation: Gtk.AccessibleRelation): void;
    reset_state(state: Gtk.AccessibleState): void;
    set_accessible_parent(parent?: Gtk.Accessible | null, next_sibling?: Gtk.Accessible | null): void;
    update_next_accessible_sibling(new_sibling?: Gtk.Accessible | null): void;
    update_property(properties: Gtk.AccessibleProperty[], values: GObject.Value[]): void;
    update_relation(relations: Gtk.AccessibleRelation[], values: GObject.Value[]): void;
    update_state(states: Gtk.AccessibleState[], values: GObject.Value[]): void;
    vfunc_get_accessible_parent(): Gtk.Accessible | null;
    vfunc_get_at_context(): Gtk.ATContext | null;
    vfunc_get_bounds(): [boolean, number, number, number, number];
    vfunc_get_first_accessible_child(): Gtk.Accessible | null;
    vfunc_get_next_accessible_sibling(): Gtk.Accessible | null;
    vfunc_get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    get_buildable_id(): string | null;
    vfunc_add_child(builder: Gtk.Builder, child: GObject.Object, type?: string | null): void;
    vfunc_custom_finished(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_end(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_start(
        builder: Gtk.Builder,
        child: GObject.Object | null,
        tagname: string
    ): [boolean, Gtk.BuildableParser, any | null];
    vfunc_get_id(): string;
    vfunc_get_internal_child<T = GObject.Object>(builder: Gtk.Builder, childname: string): T;
    vfunc_parser_finished(builder: Gtk.Builder): void;
    vfunc_set_buildable_property(builder: Gtk.Builder, name: string, value: GObject.Value | any): void;
    vfunc_set_id(id: string): void;
}
export module TimedAnimation {
    export interface ConstructorProperties extends Animation.ConstructorProperties {
        [key: string]: any;
        alternate: boolean;
        duration: number;
        easing: Easing;
        repeat_count: number;
        repeatCount: number;
        reverse: boolean;
        value_from: number;
        valueFrom: number;
        value_to: number;
        valueTo: number;
    }
}
export class TimedAnimation extends Animation {
    static $gtype: GObject.GType<TimedAnimation>;

    constructor(properties?: Partial<TimedAnimation.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<TimedAnimation.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get alternate(): boolean;
    set alternate(val: boolean);
    get duration(): number;
    set duration(val: number);
    get easing(): Easing;
    set easing(val: Easing);
    get repeat_count(): number;
    set repeat_count(val: number);
    get repeatCount(): number;
    set repeatCount(val: number);
    get reverse(): boolean;
    set reverse(val: boolean);
    get value_from(): number;
    set value_from(val: number);
    get valueFrom(): number;
    set valueFrom(val: number);
    get value_to(): number;
    set value_to(val: number);
    get valueTo(): number;
    set valueTo(val: number);

    // Constructors

    static ["new"](
        widget: Gtk.Widget,
        from: number,
        to: number,
        duration: number,
        target: AnimationTarget
    ): TimedAnimation;

    // Members

    get_alternate(): boolean;
    get_duration(): number;
    get_easing(): Easing;
    get_repeat_count(): number;
    get_reverse(): boolean;
    get_value_from(): number;
    get_value_to(): number;
    set_alternate(alternate: boolean): void;
    set_duration(duration: number): void;
    set_easing(easing: Easing): void;
    set_repeat_count(repeat_count: number): void;
    set_reverse(reverse: boolean): void;
    set_value_from(value: number): void;
    set_value_to(value: number): void;
}
export module Toast {
    export interface ConstructorProperties extends GObject.Object.ConstructorProperties {
        [key: string]: any;
        action_name: string;
        actionName: string;
        action_target: GLib.Variant;
        actionTarget: GLib.Variant;
        button_label: string;
        buttonLabel: string;
        custom_title: Gtk.Widget;
        customTitle: Gtk.Widget;
        priority: ToastPriority;
        timeout: number;
        title: string;
    }
}
export class Toast extends GObject.Object {
    static $gtype: GObject.GType<Toast>;

    constructor(properties?: Partial<Toast.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<Toast.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get action_name(): string;
    set action_name(val: string);
    get actionName(): string;
    set actionName(val: string);
    get action_target(): GLib.Variant;
    set action_target(val: GLib.Variant);
    get actionTarget(): GLib.Variant;
    set actionTarget(val: GLib.Variant);
    get button_label(): string;
    set button_label(val: string);
    get buttonLabel(): string;
    set buttonLabel(val: string);
    get custom_title(): Gtk.Widget;
    set custom_title(val: Gtk.Widget);
    get customTitle(): Gtk.Widget;
    set customTitle(val: Gtk.Widget);
    get priority(): ToastPriority;
    set priority(val: ToastPriority);
    get timeout(): number;
    set timeout(val: number);
    get title(): string;
    set title(val: string);

    // Signals

    connect(id: string, callback: (...args: any[]) => any): number;
    connect_after(id: string, callback: (...args: any[]) => any): number;
    emit(id: string, ...args: any[]): void;
    connect(signal: "button-clicked", callback: (_source: this) => void): number;
    connect_after(signal: "button-clicked", callback: (_source: this) => void): number;
    emit(signal: "button-clicked"): void;
    connect(signal: "dismissed", callback: (_source: this) => void): number;
    connect_after(signal: "dismissed", callback: (_source: this) => void): number;
    emit(signal: "dismissed"): void;

    // Constructors

    static ["new"](title: string): Toast;

    // Members

    dismiss(): void;
    get_action_name(): string | null;
    get_action_target_value(): GLib.Variant | null;
    get_button_label(): string | null;
    get_custom_title(): Gtk.Widget | null;
    get_priority(): ToastPriority;
    get_timeout(): number;
    get_title(): string | null;
    set_action_name(action_name?: string | null): void;
    set_action_target_value(action_target?: GLib.Variant | null): void;
    set_button_label(button_label?: string | null): void;
    set_custom_title(widget?: Gtk.Widget | null): void;
    set_detailed_action_name(detailed_action_name?: string | null): void;
    set_priority(priority: ToastPriority): void;
    set_timeout(timeout: number): void;
    set_title(title: string): void;
}
export module ToastOverlay {
    export interface ConstructorProperties extends Gtk.Widget.ConstructorProperties {
        [key: string]: any;
        child: Gtk.Widget;
    }
}
export class ToastOverlay extends Gtk.Widget implements Gtk.Accessible, Gtk.Buildable, Gtk.ConstraintTarget {
    static $gtype: GObject.GType<ToastOverlay>;

    constructor(properties?: Partial<ToastOverlay.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<ToastOverlay.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get child(): Gtk.Widget;
    set child(val: Gtk.Widget);

    // Implemented Properties

    get accessible_role(): Gtk.AccessibleRole;
    set accessible_role(val: Gtk.AccessibleRole);
    get accessibleRole(): Gtk.AccessibleRole;
    set accessibleRole(val: Gtk.AccessibleRole);

    // Constructors

    static ["new"](): ToastOverlay;

    // Members

    add_toast(toast: Toast): void;
    get_child(): Gtk.Widget | null;
    set_child(child?: Gtk.Widget | null): void;

    // Implemented Members

    get_accessible_parent(): Gtk.Accessible | null;
    get_accessible_role(): Gtk.AccessibleRole;
    get_at_context(): Gtk.ATContext;
    get_bounds(): [boolean, number, number, number, number];
    get_first_accessible_child(): Gtk.Accessible | null;
    get_next_accessible_sibling(): Gtk.Accessible | null;
    get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    reset_property(property: Gtk.AccessibleProperty): void;
    reset_relation(relation: Gtk.AccessibleRelation): void;
    reset_state(state: Gtk.AccessibleState): void;
    set_accessible_parent(parent?: Gtk.Accessible | null, next_sibling?: Gtk.Accessible | null): void;
    update_next_accessible_sibling(new_sibling?: Gtk.Accessible | null): void;
    update_property(properties: Gtk.AccessibleProperty[], values: GObject.Value[]): void;
    update_relation(relations: Gtk.AccessibleRelation[], values: GObject.Value[]): void;
    update_state(states: Gtk.AccessibleState[], values: GObject.Value[]): void;
    vfunc_get_accessible_parent(): Gtk.Accessible | null;
    vfunc_get_at_context(): Gtk.ATContext | null;
    vfunc_get_bounds(): [boolean, number, number, number, number];
    vfunc_get_first_accessible_child(): Gtk.Accessible | null;
    vfunc_get_next_accessible_sibling(): Gtk.Accessible | null;
    vfunc_get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    get_buildable_id(): string | null;
    vfunc_add_child(builder: Gtk.Builder, child: GObject.Object, type?: string | null): void;
    vfunc_custom_finished(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_end(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_start(
        builder: Gtk.Builder,
        child: GObject.Object | null,
        tagname: string
    ): [boolean, Gtk.BuildableParser, any | null];
    vfunc_get_id(): string;
    vfunc_get_internal_child<T = GObject.Object>(builder: Gtk.Builder, childname: string): T;
    vfunc_parser_finished(builder: Gtk.Builder): void;
    vfunc_set_buildable_property(builder: Gtk.Builder, name: string, value: GObject.Value | any): void;
    vfunc_set_id(id: string): void;
}
export module ViewStack {
    export interface ConstructorProperties extends Gtk.Widget.ConstructorProperties {
        [key: string]: any;
        hhomogeneous: boolean;
        pages: Gtk.SelectionModel;
        vhomogeneous: boolean;
        visible_child: Gtk.Widget;
        visibleChild: Gtk.Widget;
        visible_child_name: string;
        visibleChildName: string;
    }
}
export class ViewStack extends Gtk.Widget implements Gtk.Accessible, Gtk.Buildable, Gtk.ConstraintTarget {
    static $gtype: GObject.GType<ViewStack>;

    constructor(properties?: Partial<ViewStack.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<ViewStack.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get hhomogeneous(): boolean;
    set hhomogeneous(val: boolean);
    get pages(): Gtk.SelectionModel;
    get vhomogeneous(): boolean;
    set vhomogeneous(val: boolean);
    get visible_child(): Gtk.Widget;
    set visible_child(val: Gtk.Widget);
    get visibleChild(): Gtk.Widget;
    set visibleChild(val: Gtk.Widget);
    get visible_child_name(): string;
    set visible_child_name(val: string);
    get visibleChildName(): string;
    set visibleChildName(val: string);

    // Implemented Properties

    get accessible_role(): Gtk.AccessibleRole;
    set accessible_role(val: Gtk.AccessibleRole);
    get accessibleRole(): Gtk.AccessibleRole;
    set accessibleRole(val: Gtk.AccessibleRole);

    // Constructors

    static ["new"](): ViewStack;

    // Members

    add(child: Gtk.Widget): ViewStackPage;
    add_named(child: Gtk.Widget, name?: string | null): ViewStackPage;
    add_titled(child: Gtk.Widget, name: string | null, title: string): ViewStackPage;
    add_titled_with_icon(child: Gtk.Widget, name: string | null, title: string, icon_name: string): ViewStackPage;
    get_child_by_name(name: string): Gtk.Widget | null;
    get_hhomogeneous(): boolean;
    get_page(child: Gtk.Widget): ViewStackPage;
    get_pages(): Gtk.SelectionModel;
    get_vhomogeneous(): boolean;
    get_visible_child(): Gtk.Widget | null;
    get_visible_child_name(): string | null;
    remove(child: Gtk.Widget): void;
    set_hhomogeneous(hhomogeneous: boolean): void;
    set_vhomogeneous(vhomogeneous: boolean): void;
    set_visible_child(child: Gtk.Widget): void;
    set_visible_child_name(name: string): void;

    // Implemented Members

    get_accessible_parent(): Gtk.Accessible | null;
    get_accessible_role(): Gtk.AccessibleRole;
    get_at_context(): Gtk.ATContext;
    get_bounds(): [boolean, number, number, number, number];
    get_first_accessible_child(): Gtk.Accessible | null;
    get_next_accessible_sibling(): Gtk.Accessible | null;
    get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    reset_property(property: Gtk.AccessibleProperty): void;
    reset_relation(relation: Gtk.AccessibleRelation): void;
    reset_state(state: Gtk.AccessibleState): void;
    set_accessible_parent(parent?: Gtk.Accessible | null, next_sibling?: Gtk.Accessible | null): void;
    update_next_accessible_sibling(new_sibling?: Gtk.Accessible | null): void;
    update_property(properties: Gtk.AccessibleProperty[], values: GObject.Value[]): void;
    update_relation(relations: Gtk.AccessibleRelation[], values: GObject.Value[]): void;
    update_state(states: Gtk.AccessibleState[], values: GObject.Value[]): void;
    vfunc_get_accessible_parent(): Gtk.Accessible | null;
    vfunc_get_at_context(): Gtk.ATContext | null;
    vfunc_get_bounds(): [boolean, number, number, number, number];
    vfunc_get_first_accessible_child(): Gtk.Accessible | null;
    vfunc_get_next_accessible_sibling(): Gtk.Accessible | null;
    vfunc_get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    get_buildable_id(): string | null;
    vfunc_add_child(builder: Gtk.Builder, child: GObject.Object, type?: string | null): void;
    vfunc_custom_finished(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_end(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_start(
        builder: Gtk.Builder,
        child: GObject.Object | null,
        tagname: string
    ): [boolean, Gtk.BuildableParser, any | null];
    vfunc_get_id(): string;
    vfunc_get_internal_child<T = GObject.Object>(builder: Gtk.Builder, childname: string): T;
    vfunc_parser_finished(builder: Gtk.Builder): void;
    vfunc_set_buildable_property(builder: Gtk.Builder, name: string, value: GObject.Value | any): void;
    vfunc_set_id(id: string): void;
}
export module ViewStackPage {
    export interface ConstructorProperties extends GObject.Object.ConstructorProperties {
        [key: string]: any;
        badge_number: number;
        badgeNumber: number;
        child: Gtk.Widget;
        icon_name: string;
        iconName: string;
        name: string;
        needs_attention: boolean;
        needsAttention: boolean;
        title: string;
        use_underline: boolean;
        useUnderline: boolean;
        visible: boolean;
    }
}
export class ViewStackPage extends GObject.Object implements Gtk.Accessible {
    static $gtype: GObject.GType<ViewStackPage>;

    constructor(properties?: Partial<ViewStackPage.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<ViewStackPage.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get badge_number(): number;
    set badge_number(val: number);
    get badgeNumber(): number;
    set badgeNumber(val: number);
    get child(): Gtk.Widget;
    get icon_name(): string;
    set icon_name(val: string);
    get iconName(): string;
    set iconName(val: string);
    get name(): string;
    set name(val: string);
    get needs_attention(): boolean;
    set needs_attention(val: boolean);
    get needsAttention(): boolean;
    set needsAttention(val: boolean);
    get title(): string;
    set title(val: string);
    get use_underline(): boolean;
    set use_underline(val: boolean);
    get useUnderline(): boolean;
    set useUnderline(val: boolean);
    get visible(): boolean;
    set visible(val: boolean);

    // Implemented Properties

    get accessible_role(): Gtk.AccessibleRole;
    set accessible_role(val: Gtk.AccessibleRole);
    get accessibleRole(): Gtk.AccessibleRole;
    set accessibleRole(val: Gtk.AccessibleRole);

    // Members

    get_badge_number(): number;
    get_child(): Gtk.Widget;
    get_icon_name(): string | null;
    get_name(): string | null;
    get_needs_attention(): boolean;
    get_title(): string | null;
    get_use_underline(): boolean;
    get_visible(): boolean;
    set_badge_number(badge_number: number): void;
    set_icon_name(icon_name?: string | null): void;
    set_name(name?: string | null): void;
    set_needs_attention(needs_attention: boolean): void;
    set_title(title?: string | null): void;
    set_use_underline(use_underline: boolean): void;
    set_visible(visible: boolean): void;

    // Implemented Members

    get_accessible_parent(): Gtk.Accessible | null;
    get_accessible_role(): Gtk.AccessibleRole;
    get_at_context(): Gtk.ATContext;
    get_bounds(): [boolean, number, number, number, number];
    get_first_accessible_child(): Gtk.Accessible | null;
    get_next_accessible_sibling(): Gtk.Accessible | null;
    get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    reset_property(property: Gtk.AccessibleProperty): void;
    reset_relation(relation: Gtk.AccessibleRelation): void;
    reset_state(state: Gtk.AccessibleState): void;
    set_accessible_parent(parent?: Gtk.Accessible | null, next_sibling?: Gtk.Accessible | null): void;
    update_next_accessible_sibling(new_sibling?: Gtk.Accessible | null): void;
    update_property(properties: Gtk.AccessibleProperty[], values: GObject.Value[]): void;
    update_relation(relations: Gtk.AccessibleRelation[], values: GObject.Value[]): void;
    update_state(states: Gtk.AccessibleState[], values: GObject.Value[]): void;
    vfunc_get_accessible_parent(): Gtk.Accessible | null;
    vfunc_get_at_context(): Gtk.ATContext | null;
    vfunc_get_bounds(): [boolean, number, number, number, number];
    vfunc_get_first_accessible_child(): Gtk.Accessible | null;
    vfunc_get_next_accessible_sibling(): Gtk.Accessible | null;
    vfunc_get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
}
export module ViewSwitcher {
    export interface ConstructorProperties extends Gtk.Widget.ConstructorProperties {
        [key: string]: any;
        policy: ViewSwitcherPolicy;
        stack: ViewStack;
    }
}
export class ViewSwitcher extends Gtk.Widget implements Gtk.Accessible, Gtk.Buildable, Gtk.ConstraintTarget {
    static $gtype: GObject.GType<ViewSwitcher>;

    constructor(properties?: Partial<ViewSwitcher.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<ViewSwitcher.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get policy(): ViewSwitcherPolicy;
    set policy(val: ViewSwitcherPolicy);
    get stack(): ViewStack;
    set stack(val: ViewStack);

    // Implemented Properties

    get accessible_role(): Gtk.AccessibleRole;
    set accessible_role(val: Gtk.AccessibleRole);
    get accessibleRole(): Gtk.AccessibleRole;
    set accessibleRole(val: Gtk.AccessibleRole);

    // Constructors

    static ["new"](): ViewSwitcher;

    // Members

    get_policy(): ViewSwitcherPolicy;
    get_stack(): ViewStack | null;
    set_policy(policy: ViewSwitcherPolicy): void;
    set_stack(stack?: ViewStack | null): void;

    // Implemented Members

    get_accessible_parent(): Gtk.Accessible | null;
    get_accessible_role(): Gtk.AccessibleRole;
    get_at_context(): Gtk.ATContext;
    get_bounds(): [boolean, number, number, number, number];
    get_first_accessible_child(): Gtk.Accessible | null;
    get_next_accessible_sibling(): Gtk.Accessible | null;
    get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    reset_property(property: Gtk.AccessibleProperty): void;
    reset_relation(relation: Gtk.AccessibleRelation): void;
    reset_state(state: Gtk.AccessibleState): void;
    set_accessible_parent(parent?: Gtk.Accessible | null, next_sibling?: Gtk.Accessible | null): void;
    update_next_accessible_sibling(new_sibling?: Gtk.Accessible | null): void;
    update_property(properties: Gtk.AccessibleProperty[], values: GObject.Value[]): void;
    update_relation(relations: Gtk.AccessibleRelation[], values: GObject.Value[]): void;
    update_state(states: Gtk.AccessibleState[], values: GObject.Value[]): void;
    vfunc_get_accessible_parent(): Gtk.Accessible | null;
    vfunc_get_at_context(): Gtk.ATContext | null;
    vfunc_get_bounds(): [boolean, number, number, number, number];
    vfunc_get_first_accessible_child(): Gtk.Accessible | null;
    vfunc_get_next_accessible_sibling(): Gtk.Accessible | null;
    vfunc_get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    get_buildable_id(): string | null;
    vfunc_add_child(builder: Gtk.Builder, child: GObject.Object, type?: string | null): void;
    vfunc_custom_finished(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_end(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_start(
        builder: Gtk.Builder,
        child: GObject.Object | null,
        tagname: string
    ): [boolean, Gtk.BuildableParser, any | null];
    vfunc_get_id(): string;
    vfunc_get_internal_child<T = GObject.Object>(builder: Gtk.Builder, childname: string): T;
    vfunc_parser_finished(builder: Gtk.Builder): void;
    vfunc_set_buildable_property(builder: Gtk.Builder, name: string, value: GObject.Value | any): void;
    vfunc_set_id(id: string): void;
}
export module ViewSwitcherBar {
    export interface ConstructorProperties extends Gtk.Widget.ConstructorProperties {
        [key: string]: any;
        reveal: boolean;
        stack: ViewStack;
    }
}
export class ViewSwitcherBar extends Gtk.Widget implements Gtk.Accessible, Gtk.Buildable, Gtk.ConstraintTarget {
    static $gtype: GObject.GType<ViewSwitcherBar>;

    constructor(properties?: Partial<ViewSwitcherBar.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<ViewSwitcherBar.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get reveal(): boolean;
    set reveal(val: boolean);
    get stack(): ViewStack;
    set stack(val: ViewStack);

    // Implemented Properties

    get accessible_role(): Gtk.AccessibleRole;
    set accessible_role(val: Gtk.AccessibleRole);
    get accessibleRole(): Gtk.AccessibleRole;
    set accessibleRole(val: Gtk.AccessibleRole);

    // Constructors

    static ["new"](): ViewSwitcherBar;

    // Members

    get_reveal(): boolean;
    get_stack(): ViewStack | null;
    set_reveal(reveal: boolean): void;
    set_stack(stack?: ViewStack | null): void;

    // Implemented Members

    get_accessible_parent(): Gtk.Accessible | null;
    get_accessible_role(): Gtk.AccessibleRole;
    get_at_context(): Gtk.ATContext;
    get_bounds(): [boolean, number, number, number, number];
    get_first_accessible_child(): Gtk.Accessible | null;
    get_next_accessible_sibling(): Gtk.Accessible | null;
    get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    reset_property(property: Gtk.AccessibleProperty): void;
    reset_relation(relation: Gtk.AccessibleRelation): void;
    reset_state(state: Gtk.AccessibleState): void;
    set_accessible_parent(parent?: Gtk.Accessible | null, next_sibling?: Gtk.Accessible | null): void;
    update_next_accessible_sibling(new_sibling?: Gtk.Accessible | null): void;
    update_property(properties: Gtk.AccessibleProperty[], values: GObject.Value[]): void;
    update_relation(relations: Gtk.AccessibleRelation[], values: GObject.Value[]): void;
    update_state(states: Gtk.AccessibleState[], values: GObject.Value[]): void;
    vfunc_get_accessible_parent(): Gtk.Accessible | null;
    vfunc_get_at_context(): Gtk.ATContext | null;
    vfunc_get_bounds(): [boolean, number, number, number, number];
    vfunc_get_first_accessible_child(): Gtk.Accessible | null;
    vfunc_get_next_accessible_sibling(): Gtk.Accessible | null;
    vfunc_get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    get_buildable_id(): string | null;
    vfunc_add_child(builder: Gtk.Builder, child: GObject.Object, type?: string | null): void;
    vfunc_custom_finished(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_end(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_start(
        builder: Gtk.Builder,
        child: GObject.Object | null,
        tagname: string
    ): [boolean, Gtk.BuildableParser, any | null];
    vfunc_get_id(): string;
    vfunc_get_internal_child<T = GObject.Object>(builder: Gtk.Builder, childname: string): T;
    vfunc_parser_finished(builder: Gtk.Builder): void;
    vfunc_set_buildable_property(builder: Gtk.Builder, name: string, value: GObject.Value | any): void;
    vfunc_set_id(id: string): void;
}
export module ViewSwitcherTitle {
    export interface ConstructorProperties extends Gtk.Widget.ConstructorProperties {
        [key: string]: any;
        stack: ViewStack;
        subtitle: string;
        title: string;
        title_visible: boolean;
        titleVisible: boolean;
        view_switcher_enabled: boolean;
        viewSwitcherEnabled: boolean;
    }
}
export class ViewSwitcherTitle extends Gtk.Widget implements Gtk.Accessible, Gtk.Buildable, Gtk.ConstraintTarget {
    static $gtype: GObject.GType<ViewSwitcherTitle>;

    constructor(properties?: Partial<ViewSwitcherTitle.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<ViewSwitcherTitle.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get stack(): ViewStack;
    set stack(val: ViewStack);
    get subtitle(): string;
    set subtitle(val: string);
    get title(): string;
    set title(val: string);
    get title_visible(): boolean;
    get titleVisible(): boolean;
    get view_switcher_enabled(): boolean;
    set view_switcher_enabled(val: boolean);
    get viewSwitcherEnabled(): boolean;
    set viewSwitcherEnabled(val: boolean);

    // Implemented Properties

    get accessible_role(): Gtk.AccessibleRole;
    set accessible_role(val: Gtk.AccessibleRole);
    get accessibleRole(): Gtk.AccessibleRole;
    set accessibleRole(val: Gtk.AccessibleRole);

    // Constructors

    static ["new"](): ViewSwitcherTitle;

    // Members

    get_stack(): ViewStack | null;
    get_subtitle(): string;
    get_title(): string;
    get_title_visible(): boolean;
    get_view_switcher_enabled(): boolean;
    set_stack(stack?: ViewStack | null): void;
    set_subtitle(subtitle: string): void;
    set_title(title: string): void;
    set_view_switcher_enabled(enabled: boolean): void;

    // Implemented Members

    get_accessible_parent(): Gtk.Accessible | null;
    get_accessible_role(): Gtk.AccessibleRole;
    get_at_context(): Gtk.ATContext;
    get_bounds(): [boolean, number, number, number, number];
    get_first_accessible_child(): Gtk.Accessible | null;
    get_next_accessible_sibling(): Gtk.Accessible | null;
    get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    reset_property(property: Gtk.AccessibleProperty): void;
    reset_relation(relation: Gtk.AccessibleRelation): void;
    reset_state(state: Gtk.AccessibleState): void;
    set_accessible_parent(parent?: Gtk.Accessible | null, next_sibling?: Gtk.Accessible | null): void;
    update_next_accessible_sibling(new_sibling?: Gtk.Accessible | null): void;
    update_property(properties: Gtk.AccessibleProperty[], values: GObject.Value[]): void;
    update_relation(relations: Gtk.AccessibleRelation[], values: GObject.Value[]): void;
    update_state(states: Gtk.AccessibleState[], values: GObject.Value[]): void;
    vfunc_get_accessible_parent(): Gtk.Accessible | null;
    vfunc_get_at_context(): Gtk.ATContext | null;
    vfunc_get_bounds(): [boolean, number, number, number, number];
    vfunc_get_first_accessible_child(): Gtk.Accessible | null;
    vfunc_get_next_accessible_sibling(): Gtk.Accessible | null;
    vfunc_get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    get_buildable_id(): string | null;
    vfunc_add_child(builder: Gtk.Builder, child: GObject.Object, type?: string | null): void;
    vfunc_custom_finished(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_end(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_start(
        builder: Gtk.Builder,
        child: GObject.Object | null,
        tagname: string
    ): [boolean, Gtk.BuildableParser, any | null];
    vfunc_get_id(): string;
    vfunc_get_internal_child<T = GObject.Object>(builder: Gtk.Builder, childname: string): T;
    vfunc_parser_finished(builder: Gtk.Builder): void;
    vfunc_set_buildable_property(builder: Gtk.Builder, name: string, value: GObject.Value | any): void;
    vfunc_set_id(id: string): void;
}
export module Window {
    export interface ConstructorProperties extends Gtk.Window.ConstructorProperties {
        [key: string]: any;
        content: Gtk.Widget;
    }
}
export class Window
    extends Gtk.Window
    implements Gtk.Accessible, Gtk.Buildable, Gtk.ConstraintTarget, Gtk.Native, Gtk.Root, Gtk.ShortcutManager
{
    static $gtype: GObject.GType<Window>;

    constructor(properties?: Partial<Window.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<Window.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get content(): Gtk.Widget;
    set content(val: Gtk.Widget);

    // Constructors

    static ["new"](): Window;

    // Members

    get_content(): Gtk.Widget | null;
    set_content(content?: Gtk.Widget | null): void;

    // Implemented Members

    get_renderer(): Gsk.Renderer;
    get_surface(): Gdk.Surface;
    get_surface_transform(): [number, number];
    realize(): void;
    unrealize(): void;
    get_display(): Gdk.Display;
    get_focus(): Gtk.Widget | null;
    set_focus(focus?: Gtk.Widget | null): void;
    vfunc_add_controller(controller: Gtk.ShortcutController): void;
    vfunc_remove_controller(controller: Gtk.ShortcutController): void;
}
export module WindowTitle {
    export interface ConstructorProperties extends Gtk.Widget.ConstructorProperties {
        [key: string]: any;
        subtitle: string;
        title: string;
    }
}
export class WindowTitle extends Gtk.Widget implements Gtk.Accessible, Gtk.Buildable, Gtk.ConstraintTarget {
    static $gtype: GObject.GType<WindowTitle>;

    constructor(properties?: Partial<WindowTitle.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<WindowTitle.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get subtitle(): string;
    set subtitle(val: string);
    get title(): string;
    set title(val: string);

    // Implemented Properties

    get accessible_role(): Gtk.AccessibleRole;
    set accessible_role(val: Gtk.AccessibleRole);
    get accessibleRole(): Gtk.AccessibleRole;
    set accessibleRole(val: Gtk.AccessibleRole);

    // Constructors

    static ["new"](title: string, subtitle: string): WindowTitle;

    // Members

    get_subtitle(): string;
    get_title(): string;
    set_subtitle(subtitle: string): void;
    set_title(title: string): void;

    // Implemented Members

    get_accessible_parent(): Gtk.Accessible | null;
    get_accessible_role(): Gtk.AccessibleRole;
    get_at_context(): Gtk.ATContext;
    get_bounds(): [boolean, number, number, number, number];
    get_first_accessible_child(): Gtk.Accessible | null;
    get_next_accessible_sibling(): Gtk.Accessible | null;
    get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    reset_property(property: Gtk.AccessibleProperty): void;
    reset_relation(relation: Gtk.AccessibleRelation): void;
    reset_state(state: Gtk.AccessibleState): void;
    set_accessible_parent(parent?: Gtk.Accessible | null, next_sibling?: Gtk.Accessible | null): void;
    update_next_accessible_sibling(new_sibling?: Gtk.Accessible | null): void;
    update_property(properties: Gtk.AccessibleProperty[], values: GObject.Value[]): void;
    update_relation(relations: Gtk.AccessibleRelation[], values: GObject.Value[]): void;
    update_state(states: Gtk.AccessibleState[], values: GObject.Value[]): void;
    vfunc_get_accessible_parent(): Gtk.Accessible | null;
    vfunc_get_at_context(): Gtk.ATContext | null;
    vfunc_get_bounds(): [boolean, number, number, number, number];
    vfunc_get_first_accessible_child(): Gtk.Accessible | null;
    vfunc_get_next_accessible_sibling(): Gtk.Accessible | null;
    vfunc_get_platform_state(state: Gtk.AccessiblePlatformState): boolean;
    get_buildable_id(): string | null;
    vfunc_add_child(builder: Gtk.Builder, child: GObject.Object, type?: string | null): void;
    vfunc_custom_finished(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_end(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data?: any | null): void;
    vfunc_custom_tag_start(
        builder: Gtk.Builder,
        child: GObject.Object | null,
        tagname: string
    ): [boolean, Gtk.BuildableParser, any | null];
    vfunc_get_id(): string;
    vfunc_get_internal_child<T = GObject.Object>(builder: Gtk.Builder, childname: string): T;
    vfunc_parser_finished(builder: Gtk.Builder): void;
    vfunc_set_buildable_property(builder: Gtk.Builder, name: string, value: GObject.Value | any): void;
    vfunc_set_id(id: string): void;
}

export class SpringParams {
    static $gtype: GObject.GType<SpringParams>;

    constructor(damping_ratio: number, mass: number, stiffness: number);
    constructor(copy: SpringParams);

    // Constructors
    static ["new"](damping_ratio: number, mass: number, stiffness: number): SpringParams;
    static new_full(damping: number, mass: number, stiffness: number): SpringParams;

    // Members
    get_damping(): number;
    get_damping_ratio(): number;
    get_mass(): number;
    get_stiffness(): number;
    ref(): SpringParams;
    unref(): void;
}

export interface SwipeableNamespace {
    $gtype: GObject.GType<Swipeable>;
    prototype: SwipeablePrototype;
}
export type Swipeable = SwipeablePrototype;
export interface SwipeablePrototype extends Gtk.Widget {
    // Members

    get_cancel_progress(): number;
    get_distance(): number;
    get_progress(): number;
    get_snap_points(): number[];
    get_swipe_area(navigation_direction: NavigationDirection, is_drag: boolean): Gdk.Rectangle;
    vfunc_get_cancel_progress(): number;
    vfunc_get_distance(): number;
    vfunc_get_progress(): number;
    vfunc_get_snap_points(): number[];
    vfunc_get_swipe_area(navigation_direction: NavigationDirection, is_drag: boolean): Gdk.Rectangle;
}

export const Swipeable: SwipeableNamespace;
