/**
 * Shell 0.1
 *
 * Generated from 0.1
 */

import * as Atk from "@gi-types/atk1";
import * as Gtk from "@gi-types/gtk3";
import * as Gio from "@gi-types/gio2";
import * as GObject from "@gi-types/gobject2";
import * as Clutter from "@gi-types/clutter10";
import * as Cogl from "@gi-types/cogl10";
import * as NM from "@gi-types/nm1";
import * as PolkitAgent from "@gi-types/polkitagent1";
import * as St from "@gi-types/st1";
import * as Gcr from "@gi-types/gcr3";
import * as cairo from "@gi-types/cairo1";
import * as GdkPixbuf from "@gi-types/gdkpixbuf2";
import * as Meta from "@gi-types/meta10";
import * as GLib from "@gi-types/glib2";
import * as Graphene from "@gi-types/graphene1";

export const KEYRING_SK_TAG: string;
export const KEYRING_SN_TAG: string;
export const KEYRING_UUID_TAG: string;
export function get_file_contents_utf8_sync(path: string): string;
export function util_check_cloexec_fds(): void;
export function util_composite_capture_images(
    captures: Clutter.Capture,
    n_captures: number,
    x: number,
    y: number,
    target_width: number,
    target_height: number,
    target_scale: number
): cairo.Surface;
export function util_create_pixbuf_from_data(
    data: Uint8Array | string,
    colorspace: GdkPixbuf.Colorspace,
    has_alpha: boolean,
    bits_per_sample: number,
    width: number,
    height: number,
    rowstride: number
): GdkPixbuf.Pixbuf;
export function util_get_translated_folder_name(name: string): string | null;
export function util_get_uid(): number;
export function util_get_week_start(): number;
export function util_has_x11_display_extension(display: Meta.Display, extension: string): boolean;
export function util_regex_escape(str: string): string;
export function util_sd_notify(): void;
export function util_set_hidden_from_pick(actor: Clutter.Actor, hidden: boolean): void;
export function util_start_systemd_unit(
    unit: string,
    mode: string,
    cancellable?: Gio.Cancellable | null,
    callback?: Gio.AsyncReadyCallback<string> | null
): void;
export function util_start_systemd_unit_finish(res: Gio.AsyncResult): boolean;
export function util_stop_systemd_unit(
    unit: string,
    mode: string,
    cancellable?: Gio.Cancellable | null,
    callback?: Gio.AsyncReadyCallback<string> | null
): void;
export function util_stop_systemd_unit_finish(res: Gio.AsyncResult): boolean;
export function util_systemd_unit_exists(
    unit: string,
    cancellable?: Gio.Cancellable | null,
    callback?: Gio.AsyncReadyCallback<string> | null
): void;
export function util_systemd_unit_exists_finish(res: Gio.AsyncResult): boolean;
export function util_touch_file_async(file: Gio.File, callback?: Gio.AsyncReadyCallback<Gio.File> | null): void;
export function util_touch_file_finish(file: Gio.File, res: Gio.AsyncResult): boolean;
export function util_translate_time_string(str: string): string;
export function util_wifexited(status: number): [boolean, number];
export function write_string_to_stream(stream: Gio.OutputStream, str: string): boolean;
export type LeisureFunction = (data?: any | null) => void;
export type PerfReplayFunction = (time: number, name: string, signature: string, arg: GObject.Value | any) => void;
export type PerfStatisticsCallback = (perf_log: PerfLog, data?: any | null) => void;

export namespace AppLaunchGpu {
    export const $gtype: GObject.GType<AppLaunchGpu>;
}

export enum AppLaunchGpu {
    APP_PREF = 0,
    DISCRETE = 1,
    DEFAULT = 2,
}

export namespace AppState {
    export const $gtype: GObject.GType<AppState>;
}

export enum AppState {
    STOPPED = 0,
    STARTING = 1,
    RUNNING = 2,
}

export namespace BlurMode {
    export const $gtype: GObject.GType<BlurMode>;
}

export enum BlurMode {
    ACTOR = 0,
    BACKGROUND = 1,
}

export namespace NetworkAgentResponse {
    export const $gtype: GObject.GType<NetworkAgentResponse>;
}

export enum NetworkAgentResponse {
    CONFIRMED = 0,
    USER_CANCELED = 1,
    INTERNAL_ERROR = 2,
}

export namespace SnippetHook {
    export const $gtype: GObject.GType<SnippetHook>;
}

export enum SnippetHook {
    VERTEX = 0,
    VERTEX_TRANSFORM = 1,
    FRAGMENT = 2048,
    TEXTURE_COORD_TRANSFORM = 4096,
    LAYER_FRAGMENT = 6144,
    TEXTURE_LOOKUP = 6145,
}

export namespace ActionMode {
    export const $gtype: GObject.GType<ActionMode>;
}

export enum ActionMode {
    NONE = 0,
    NORMAL = 1,
    OVERVIEW = 2,
    LOCK_SCREEN = 4,
    UNLOCK_SCREEN = 8,
    LOGIN_SCREEN = 16,
    SYSTEM_MODAL = 32,
    LOOKING_GLASS = 64,
    POPUP = 128,
    ALL = -1,
}
export module App {
    export interface ConstructorProperties extends GObject.Object.ConstructorProperties {
        [key: string]: any;
        action_group: Gio.ActionGroup;
        actionGroup: Gio.ActionGroup;
        app_info: Gio.DesktopAppInfo;
        appInfo: Gio.DesktopAppInfo;
        busy: boolean;
        icon: Gio.Icon;
        id: string;
        state: AppState;
    }
}
export class App extends GObject.Object {
    static $gtype: GObject.GType<App>;

    constructor(properties?: Partial<App.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<App.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get action_group(): Gio.ActionGroup;
    get actionGroup(): Gio.ActionGroup;
    get app_info(): Gio.DesktopAppInfo;
    get appInfo(): Gio.DesktopAppInfo;
    get busy(): boolean;
    get icon(): Gio.Icon;
    get id(): string;
    get state(): AppState;

    // Signals

    connect(id: string, callback: (...args: any[]) => any): number;
    connect_after(id: string, callback: (...args: any[]) => any): number;
    emit(id: string, ...args: any[]): void;
    connect(signal: "windows-changed", callback: (_source: this) => void): number;
    connect_after(signal: "windows-changed", callback: (_source: this) => void): number;
    emit(signal: "windows-changed"): void;

    // Members

    activate(): void;
    activate_full(workspace: number, timestamp: number): void;
    activate_window(window: Meta.Window | null, timestamp: number): void;
    can_open_new_window(): boolean;
    compare(other: App): number;
    compare_by_name(other: App): number;
    create_icon_texture(size: number): Clutter.Actor;
    get_app_info(): Gio.DesktopAppInfo;
    get_busy(): boolean;
    get_description(): string;
    get_icon(): Gio.Icon;
    get_id(): string;
    get_n_windows(): number;
    get_name(): string;
    get_pids(): number[];
    get_state(): AppState;
    get_windows(): Meta.Window[];
    is_on_workspace(workspace: Meta.Workspace): boolean;
    is_window_backed(): boolean;
    launch(timestamp: number, workspace: number, gpu_pref: AppLaunchGpu): boolean;
    launch_action(action_name: string, timestamp: number, workspace: number): void;
    open_new_window(workspace: number): void;
    request_quit(): boolean;
    update_app_actions(window: Meta.Window): void;
    update_window_actions(window: Meta.Window): void;
}
export module AppSystem {
    export interface ConstructorProperties extends GObject.Object.ConstructorProperties {
        [key: string]: any;
    }
}
export class AppSystem extends GObject.Object {
    static $gtype: GObject.GType<AppSystem>;

    constructor(properties?: Partial<AppSystem.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<AppSystem.ConstructorProperties>, ...args: any[]): void;

    // Signals

    connect(id: string, callback: (...args: any[]) => any): number;
    connect_after(id: string, callback: (...args: any[]) => any): number;
    emit(id: string, ...args: any[]): void;
    connect(signal: "app-state-changed", callback: (_source: this, object: App) => void): number;
    connect_after(signal: "app-state-changed", callback: (_source: this, object: App) => void): number;
    emit(signal: "app-state-changed", object: App): void;
    connect(signal: "installed-changed", callback: (_source: this) => void): number;
    connect_after(signal: "installed-changed", callback: (_source: this) => void): number;
    emit(signal: "installed-changed"): void;

    // Members

    get_installed(): Gio.AppInfo[];
    get_running(): App[];
    lookup_app(id: string): App;
    lookup_desktop_wmclass(wmclass?: string | null): App;
    lookup_heuristic_basename(id: string): App;
    lookup_startup_wmclass(wmclass?: string | null): App;
    static get_default(): AppSystem;
    static search(search_string: string): string[][];
}
export module AppUsage {
    export interface ConstructorProperties extends GObject.Object.ConstructorProperties {
        [key: string]: any;
    }
}
export class AppUsage extends GObject.Object {
    static $gtype: GObject.GType<AppUsage>;

    constructor(properties?: Partial<AppUsage.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<AppUsage.ConstructorProperties>, ...args: any[]): void;

    // Members

    compare(id_a: string, id_b: string): number;
    get_most_used(): App[];
    static get_default(): AppUsage;
}
export module BlurEffect {
    export interface ConstructorProperties extends Clutter.Effect.ConstructorProperties {
        [key: string]: any;
        brightness: number;
        mode: BlurMode;
        sigma: number;
    }
}
export class BlurEffect extends Clutter.Effect {
    static $gtype: GObject.GType<BlurEffect>;

    constructor(properties?: Partial<BlurEffect.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<BlurEffect.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get brightness(): number;
    set brightness(val: number);
    get mode(): BlurMode;
    set mode(val: BlurMode);
    get sigma(): number;
    set sigma(val: number);

    // Constructors

    static ["new"](): BlurEffect;

    // Members

    get_brightness(): number;
    get_mode(): BlurMode;
    get_sigma(): number;
    set_brightness(brightness: number): void;
    set_mode(mode: BlurMode): void;
    set_sigma(sigma: number): void;
}
export module EmbeddedWindow {
    export interface ConstructorProperties extends Gtk.Window.ConstructorProperties {
        [key: string]: any;
    }
}
export class EmbeddedWindow extends Gtk.Window implements Atk.ImplementorIface, Gtk.Buildable {
    static $gtype: GObject.GType<EmbeddedWindow>;

    constructor(properties?: Partial<EmbeddedWindow.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<EmbeddedWindow.ConstructorProperties>, ...args: any[]): void;

    // Constructors

    static ["new"](): EmbeddedWindow;
}
export module GLSLEffect {
    export interface ConstructorProperties extends Clutter.OffscreenEffect.ConstructorProperties {
        [key: string]: any;
    }
}
export class GLSLEffect extends Clutter.OffscreenEffect {
    static $gtype: GObject.GType<GLSLEffect>;

    constructor(properties?: Partial<GLSLEffect.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<GLSLEffect.ConstructorProperties>, ...args: any[]): void;

    // Members

    add_glsl_snippet(hook: SnippetHook, declarations: string, code: string, is_replace: boolean): void;
    get_uniform_location(name: string): number;
    set_uniform_float(uniform: number, n_components: number, value: number[]): void;
    set_uniform_matrix(uniform: number, transpose: boolean, dimensions: number, value: number[]): void;
    vfunc_build_pipeline(): void;
}
export module Global {
    export interface ConstructorProperties extends GObject.Object.ConstructorProperties {
        [key: string]: any;
        backend: Meta.Backend;
        context: Meta.Context;
        datadir: string;
        display: Meta.Display;
        focus_manager: St.FocusManager;
        focusManager: St.FocusManager;
        frame_finish_timestamp: boolean;
        frameFinishTimestamp: boolean;
        frame_timestamps: boolean;
        frameTimestamps: boolean;
        imagedir: string;
        screen_height: number;
        screenHeight: number;
        screen_width: number;
        screenWidth: number;
        session_mode: string;
        sessionMode: string;
        settings: Gio.Settings;
        stage: Clutter.Actor;
        switcheroo_control: Gio.DBusProxy;
        switcherooControl: Gio.DBusProxy;
        top_window_group: Clutter.Actor;
        topWindowGroup: Clutter.Actor;
        userdatadir: string;
        window_group: Clutter.Actor;
        windowGroup: Clutter.Actor;
        window_manager: WM;
        windowManager: WM;
        workspace_manager: Meta.WorkspaceManager;
        workspaceManager: Meta.WorkspaceManager;
    }
}
export class Global extends GObject.Object {
    static $gtype: GObject.GType<Global>;

    constructor(properties?: Partial<Global.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<Global.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get backend(): Meta.Backend;
    get context(): Meta.Context;
    get datadir(): string;
    get display(): Meta.Display;
    get focus_manager(): St.FocusManager;
    get focusManager(): St.FocusManager;
    get frame_finish_timestamp(): boolean;
    set frame_finish_timestamp(val: boolean);
    get frameFinishTimestamp(): boolean;
    set frameFinishTimestamp(val: boolean);
    get frame_timestamps(): boolean;
    set frame_timestamps(val: boolean);
    get frameTimestamps(): boolean;
    set frameTimestamps(val: boolean);
    get imagedir(): string;
    get screen_height(): number;
    get screenHeight(): number;
    get screen_width(): number;
    get screenWidth(): number;
    get session_mode(): string;
    get sessionMode(): string;
    get settings(): Gio.Settings;
    get stage(): Clutter.Actor;
    get switcheroo_control(): Gio.DBusProxy;
    get switcherooControl(): Gio.DBusProxy;
    get top_window_group(): Clutter.Actor;
    get topWindowGroup(): Clutter.Actor;
    get userdatadir(): string;
    get window_group(): Clutter.Actor;
    get windowGroup(): Clutter.Actor;
    get window_manager(): WM;
    get windowManager(): WM;
    get workspace_manager(): Meta.WorkspaceManager;
    get workspaceManager(): Meta.WorkspaceManager;

    // Signals

    connect(id: string, callback: (...args: any[]) => any): number;
    connect_after(id: string, callback: (...args: any[]) => any): number;
    emit(id: string, ...args: any[]): void;
    connect(signal: "locate-pointer", callback: (_source: this) => void): number;
    connect_after(signal: "locate-pointer", callback: (_source: this) => void): number;
    emit(signal: "locate-pointer"): void;
    connect(signal: "notify-error", callback: (_source: this, object: string, p0: string) => void): number;
    connect_after(signal: "notify-error", callback: (_source: this, object: string, p0: string) => void): number;
    emit(signal: "notify-error", object: string, p0: string): void;

    // Members

    begin_work(): void;
    create_app_launch_context(timestamp: number, workspace: number): Gio.AppLaunchContext;
    end_work(): void;
    get_current_time(): number;
    get_display(): Meta.Display;
    get_persistent_state(property_type: string, property_name: string): GLib.Variant;
    get_pointer(): [number, number, Clutter.ModifierType];
    get_runtime_state(property_type: string, property_name: string): GLib.Variant;
    get_session_mode(): string;
    get_settings(): Gio.Settings;
    get_stage(): Clutter.Stage;
    get_switcheroo_control(): Gio.DBusProxy;
    get_window_actors(): Meta.WindowActor[];
    notify_error(msg: string, details: string): void;
    reexec_self(): void;
    run_at_leisure(func: LeisureFunction): void;
    set_persistent_state(property_name: string, variant?: GLib.Variant | null): void;
    set_runtime_state(property_name: string, variant?: GLib.Variant | null): void;
    set_stage_input_region(rectangles: Meta.Rectangle[]): void;
    static get(): Global;
}
export module GtkEmbed {
    export interface ConstructorProperties<A extends Clutter.Actor = Clutter.Actor>
        extends Clutter.Clone.ConstructorProperties<A> {
        [key: string]: any;
        window: EmbeddedWindow;
    }
}
export class GtkEmbed<A extends Clutter.Actor = Clutter.Actor>
    extends Clutter.Clone<A>
    implements Atk.ImplementorIface, Clutter.Animatable, Clutter.Container<A>, Clutter.Scriptable
{
    static $gtype: GObject.GType<GtkEmbed>;

    constructor(properties?: Partial<GtkEmbed.ConstructorProperties<A>>, ...args: any[]);
    _init(properties?: Partial<GtkEmbed.ConstructorProperties<A>>, ...args: any[]): void;

    // Properties
    get window(): EmbeddedWindow;

    // Constructors

    static ["new"](window: EmbeddedWindow): GtkEmbed;
    // Conflicted with Clutter.Clone.new
    static ["new"](...args: never[]): any;

    // Implemented Members

    add_actor(actor: A): void;
    child_get_property(child: A, property: string, value: GObject.Value | any): void;
    child_notify(child: A, pspec: GObject.ParamSpec): void;
    child_set_property(child: A, property: string, value: GObject.Value | any): void;
    create_child_meta(actor: A): void;
    destroy_child_meta(actor: A): void;
    find_child_by_name(child_name: string): A;
    get_child_meta(actor: A): Clutter.ChildMeta;
    remove_actor(actor: A): void;
    vfunc_actor_added(actor: A): void;
    vfunc_actor_removed(actor: A): void;
    vfunc_add(actor: A): void;
    vfunc_child_notify(child: A, pspec: GObject.ParamSpec): void;
    vfunc_create_child_meta(actor: A): void;
    vfunc_destroy_child_meta(actor: A): void;
    vfunc_get_child_meta(actor: A): Clutter.ChildMeta;
    vfunc_remove(actor: A): void;
}
export module InvertLightnessEffect {
    export interface ConstructorProperties extends Clutter.OffscreenEffect.ConstructorProperties {
        [key: string]: any;
    }
}
export class InvertLightnessEffect extends Clutter.OffscreenEffect {
    static $gtype: GObject.GType<InvertLightnessEffect>;

    constructor(properties?: Partial<InvertLightnessEffect.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<InvertLightnessEffect.ConstructorProperties>, ...args: any[]): void;

    // Constructors

    static ["new"](): InvertLightnessEffect;
}
export module KeyringPrompt {
    export interface ConstructorProperties extends GObject.Object.ConstructorProperties {
        [key: string]: any;
        choice_visible: boolean;
        choiceVisible: boolean;
        confirm_actor: Clutter.Text;
        confirmActor: Clutter.Text;
        confirm_visible: boolean;
        confirmVisible: boolean;
        password_actor: Clutter.Text;
        passwordActor: Clutter.Text;
        password_visible: boolean;
        passwordVisible: boolean;
        warning_visible: boolean;
        warningVisible: boolean;
    }
}
export class KeyringPrompt extends GObject.Object implements Gcr.Prompt {
    static $gtype: GObject.GType<KeyringPrompt>;

    constructor(properties?: Partial<KeyringPrompt.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<KeyringPrompt.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get choice_visible(): boolean;
    get choiceVisible(): boolean;
    get confirm_actor(): Clutter.Text;
    set confirm_actor(val: Clutter.Text);
    get confirmActor(): Clutter.Text;
    set confirmActor(val: Clutter.Text);
    get confirm_visible(): boolean;
    get confirmVisible(): boolean;
    get password_actor(): Clutter.Text;
    set password_actor(val: Clutter.Text);
    get passwordActor(): Clutter.Text;
    set passwordActor(val: Clutter.Text);
    get password_visible(): boolean;
    get passwordVisible(): boolean;
    get warning_visible(): boolean;
    get warningVisible(): boolean;

    // Signals

    connect(id: string, callback: (...args: any[]) => any): number;
    connect_after(id: string, callback: (...args: any[]) => any): number;
    emit(id: string, ...args: any[]): void;
    connect(signal: "show-confirm", callback: (_source: this) => void): number;
    connect_after(signal: "show-confirm", callback: (_source: this) => void): number;
    emit(signal: "show-confirm"): void;
    connect(signal: "show-password", callback: (_source: this) => void): number;
    connect_after(signal: "show-password", callback: (_source: this) => void): number;
    emit(signal: "show-password"): void;

    // Implemented Properties

    get caller_window(): string;
    set caller_window(val: string);
    get callerWindow(): string;
    set callerWindow(val: string);
    get cancel_label(): string;
    set cancel_label(val: string);
    get cancelLabel(): string;
    set cancelLabel(val: string);
    get choice_chosen(): boolean;
    set choice_chosen(val: boolean);
    get choiceChosen(): boolean;
    set choiceChosen(val: boolean);
    get choice_label(): string;
    set choice_label(val: string);
    get choiceLabel(): string;
    set choiceLabel(val: string);
    get continue_label(): string;
    set continue_label(val: string);
    get continueLabel(): string;
    set continueLabel(val: string);
    get description(): string;
    set description(val: string);
    get message(): string;
    set message(val: string);
    get password_new(): boolean;
    set password_new(val: boolean);
    get passwordNew(): boolean;
    set passwordNew(val: boolean);
    get password_strength(): number;
    get passwordStrength(): number;
    get title(): string;
    set title(val: string);
    get warning(): string;
    set warning(val: string);

    // Constructors

    static ["new"](): KeyringPrompt;

    // Members

    cancel(): void;
    complete(): boolean;
    get_confirm_actor(): Clutter.Text | null;
    get_password_actor(): Clutter.Text | null;
    set_confirm_actor(confirm_actor?: Clutter.Text | null): void;
    set_password_actor(password_actor?: Clutter.Text | null): void;

    // Implemented Members

    close(): void;
    confirm(cancellable?: Gio.Cancellable | null): Gcr.PromptReply;
    confirm_async(cancellable?: Gio.Cancellable | null, callback?: Gio.AsyncReadyCallback<this> | null): void;
    confirm_finish(result: Gio.AsyncResult): Gcr.PromptReply;
    confirm_run(cancellable?: Gio.Cancellable | null): Gcr.PromptReply;
    get_caller_window(): string;
    get_cancel_label(): string;
    get_choice_chosen(): boolean;
    get_choice_label(): string;
    get_continue_label(): string;
    get_description(): string;
    get_message(): string;
    get_password_new(): boolean;
    get_password_strength(): number;
    get_title(): string;
    get_warning(): string;
    password(cancellable?: Gio.Cancellable | null): string;
    password_async(cancellable?: Gio.Cancellable | null, callback?: Gio.AsyncReadyCallback<this> | null): void;
    password_finish(result: Gio.AsyncResult): string;
    password_run(cancellable?: Gio.Cancellable | null): string;
    reset(): void;
    set_caller_window(window_id: string): void;
    set_cancel_label(cancel_label: string): void;
    set_choice_chosen(chosen: boolean): void;
    set_choice_label(choice_label?: string | null): void;
    set_continue_label(continue_label: string): void;
    set_description(description: string): void;
    set_message(message: string): void;
    set_password_new(new_password: boolean): void;
    set_title(title: string): void;
    set_warning(warning?: string | null): void;
    vfunc_prompt_close(): void;
    vfunc_prompt_confirm_async(
        cancellable?: Gio.Cancellable | null,
        callback?: Gio.AsyncReadyCallback<this> | null
    ): void;
    vfunc_prompt_confirm_finish(result: Gio.AsyncResult): Gcr.PromptReply;
    vfunc_prompt_password_async(
        cancellable?: Gio.Cancellable | null,
        callback?: Gio.AsyncReadyCallback<this> | null
    ): void;
    vfunc_prompt_password_finish(result: Gio.AsyncResult): string;
}
export module MountOperation {
    export interface ConstructorProperties extends Gio.MountOperation.ConstructorProperties {
        [key: string]: any;
    }
}
export class MountOperation extends Gio.MountOperation {
    static $gtype: GObject.GType<MountOperation>;

    constructor(properties?: Partial<MountOperation.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<MountOperation.ConstructorProperties>, ...args: any[]): void;

    // Signals

    connect(id: string, callback: (...args: any[]) => any): number;
    connect_after(id: string, callback: (...args: any[]) => any): number;
    emit(id: string, ...args: any[]): void;
    connect(signal: "show-processes-2", callback: (_source: this) => void): number;
    connect_after(signal: "show-processes-2", callback: (_source: this) => void): number;
    emit(signal: "show-processes-2"): void;

    // Constructors

    static ["new"](): MountOperation;

    // Members

    get_show_processes_choices(): string[];
    get_show_processes_message(): string;
    get_show_processes_pids(): GLib.Pid[];
}
export module NetworkAgent {
    export interface ConstructorProperties extends NM.SecretAgentOld.ConstructorProperties {
        [key: string]: any;
    }
}
export class NetworkAgent extends NM.SecretAgentOld implements Gio.AsyncInitable<NetworkAgent>, Gio.Initable {
    static $gtype: GObject.GType<NetworkAgent>;

    constructor(properties?: Partial<NetworkAgent.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<NetworkAgent.ConstructorProperties>, ...args: any[]): void;

    // Signals

    connect(id: string, callback: (...args: any[]) => any): number;
    connect_after(id: string, callback: (...args: any[]) => any): number;
    emit(id: string, ...args: any[]): void;
    connect(signal: "cancel-request", callback: (_source: this, object: string) => void): number;
    connect_after(signal: "cancel-request", callback: (_source: this, object: string) => void): number;
    emit(signal: "cancel-request", object: string): void;
    connect(
        signal: "new-request",
        callback: (_source: this, object: string, p0: NM.Connection, p1: string, p2: string[], p3: number) => void
    ): number;
    connect_after(
        signal: "new-request",
        callback: (_source: this, object: string, p0: NM.Connection, p1: string, p2: string[], p3: number) => void
    ): number;
    emit(signal: "new-request", object: string, p0: NM.Connection, p1: string, p2: string[], p3: number): void;

    // Members

    add_vpn_secret(request_id: string, setting_key: string, setting_value: string): void;
    respond(request_id: string, response: NetworkAgentResponse): void;
    search_vpn_plugin(service: string, callback?: Gio.AsyncReadyCallback<this> | null): void;
    search_vpn_plugin_finish(result: Gio.AsyncResult): NM.VpnPluginInfo | null;
    set_password(request_id: string, setting_key: string, setting_value: string): void;

    // Implemented Members

    init_async(
        io_priority: number,
        cancellable?: Gio.Cancellable | null,
        callback?: Gio.AsyncReadyCallback<this> | null
    ): void;
    init_finish(res: Gio.AsyncResult): boolean;
    new_finish(res: Gio.AsyncResult): NetworkAgent;
    vfunc_init_async(
        io_priority: number,
        cancellable?: Gio.Cancellable | null,
        callback?: Gio.AsyncReadyCallback<this> | null
    ): void;
    vfunc_init_finish(res: Gio.AsyncResult): boolean;
    init(cancellable?: Gio.Cancellable | null): boolean;
    vfunc_init(cancellable?: Gio.Cancellable | null): boolean;
}
export module PerfLog {
    export interface ConstructorProperties extends GObject.Object.ConstructorProperties {
        [key: string]: any;
    }
}
export class PerfLog extends GObject.Object {
    static $gtype: GObject.GType<PerfLog>;

    constructor(properties?: Partial<PerfLog.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<PerfLog.ConstructorProperties>, ...args: any[]): void;

    // Members

    add_statistics_callback(callback: PerfStatisticsCallback): void;
    collect_statistics(): void;
    define_event(name: string, description: string, signature: string): void;
    define_statistic(name: string, description: string, signature: string): void;
    dump_events(out: Gio.OutputStream): boolean;
    dump_log(out: Gio.OutputStream): boolean;
    event(name: string): void;
    event_i(name: string, arg: number): void;
    event_s(name: string, arg: string): void;
    event_x(name: string, arg: number): void;
    replay(replay_function: PerfReplayFunction): void;
    set_enabled(enabled: boolean): void;
    update_statistic_i(name: string, value: number): void;
    update_statistic_x(name: string, value: number): void;
    static get_default(): PerfLog;
}
export module PolkitAuthenticationAgent {
    export interface ConstructorProperties extends PolkitAgent.Listener.ConstructorProperties {
        [key: string]: any;
    }
}
export class PolkitAuthenticationAgent extends PolkitAgent.Listener {
    static $gtype: GObject.GType<PolkitAuthenticationAgent>;

    constructor(properties?: Partial<PolkitAuthenticationAgent.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<PolkitAuthenticationAgent.ConstructorProperties>, ...args: any[]): void;

    // Signals

    connect(id: string, callback: (...args: any[]) => any): number;
    connect_after(id: string, callback: (...args: any[]) => any): number;
    emit(id: string, ...args: any[]): void;
    connect(signal: "cancel", callback: (_source: this) => void): number;
    connect_after(signal: "cancel", callback: (_source: this) => void): number;
    emit(signal: "cancel"): void;
    connect(
        signal: "initiate",
        callback: (_source: this, object: string, p0: string, p1: string, p2: string, p3: string[]) => void
    ): number;
    connect_after(
        signal: "initiate",
        callback: (_source: this, object: string, p0: string, p1: string, p2: string, p3: string[]) => void
    ): number;
    emit(signal: "initiate", object: string, p0: string, p1: string, p2: string, p3: string[]): void;

    // Constructors

    static ["new"](): PolkitAuthenticationAgent;

    // Members

    complete(dismissed: boolean): void;
    register(): void;
    // Conflicted with PolkitAgent.Listener.register
    register(...args: never[]): any;
    unregister(): void;
}
export module Screenshot {
    export interface ConstructorProperties extends GObject.Object.ConstructorProperties {
        [key: string]: any;
    }
}
export class Screenshot extends GObject.Object {
    static $gtype: GObject.GType<Screenshot>;

    constructor(properties?: Partial<Screenshot.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<Screenshot.ConstructorProperties>, ...args: any[]): void;

    // Signals

    connect(id: string, callback: (...args: any[]) => any): number;
    connect_after(id: string, callback: (...args: any[]) => any): number;
    emit(id: string, ...args: any[]): void;
    connect(signal: "screenshot-taken", callback: (_source: this, object: Meta.Rectangle) => void): number;
    connect_after(signal: "screenshot-taken", callback: (_source: this, object: Meta.Rectangle) => void): number;
    emit(signal: "screenshot-taken", object: Meta.Rectangle): void;

    // Constructors

    static ["new"](): Screenshot;

    // Members

    pick_color(x: number, y: number, callback?: Gio.AsyncReadyCallback<this> | null): void;
    pick_color_finish(result: Gio.AsyncResult): [boolean, Clutter.Color];
    screenshot(include_cursor: boolean, stream: Gio.OutputStream, callback?: Gio.AsyncReadyCallback<this> | null): void;
    screenshot_area(
        x: number,
        y: number,
        width: number,
        height: number,
        stream: Gio.OutputStream,
        callback?: Gio.AsyncReadyCallback<this> | null
    ): void;
    screenshot_area_finish(result: Gio.AsyncResult): [boolean, cairo.RectangleInt];
    screenshot_finish(result: Gio.AsyncResult): [boolean, cairo.RectangleInt];
    screenshot_stage_to_content(callback?: Gio.AsyncReadyCallback<this> | null): void;
    screenshot_stage_to_content_finish(
        result: Gio.AsyncResult
    ): [Clutter.Content, number | null, Clutter.Content | null, Graphene.Point | null, number | null];
    screenshot_window(
        include_frame: boolean,
        include_cursor: boolean,
        stream: Gio.OutputStream,
        callback?: Gio.AsyncReadyCallback<this> | null
    ): void;
    screenshot_window_finish(result: Gio.AsyncResult): [boolean, cairo.RectangleInt];
    static composite_to_stream(
        texture: Cogl.Texture,
        x: number,
        y: number,
        width: number,
        height: number,
        scale: number,
        cursor: Cogl.Texture | null,
        cursor_x: number,
        cursor_y: number,
        cursor_scale: number,
        stream: Gio.OutputStream,
        callback?: Gio.AsyncReadyCallback<Screenshot> | null
    ): void;
    static composite_to_stream_finish(result: Gio.AsyncResult): GdkPixbuf.Pixbuf | null;
}
export module SecureTextBuffer {
    export interface ConstructorProperties extends Clutter.TextBuffer.ConstructorProperties {
        [key: string]: any;
    }
}
export class SecureTextBuffer extends Clutter.TextBuffer {
    static $gtype: GObject.GType<SecureTextBuffer>;

    constructor(properties?: Partial<SecureTextBuffer.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<SecureTextBuffer.ConstructorProperties>, ...args: any[]): void;

    // Constructors

    static ["new"](): SecureTextBuffer;
}
export module SquareBin {
    export interface ConstructorProperties<A extends Clutter.Actor = Clutter.Actor>
        extends St.Bin.ConstructorProperties<A> {
        [key: string]: any;
    }
}
export class SquareBin<A extends Clutter.Actor = Clutter.Actor>
    extends St.Bin<A>
    implements Atk.ImplementorIface, Clutter.Animatable, Clutter.Container<A>, Clutter.Scriptable
{
    static $gtype: GObject.GType<SquareBin>;

    constructor(properties?: Partial<SquareBin.ConstructorProperties<A>>, ...args: any[]);
    _init(properties?: Partial<SquareBin.ConstructorProperties<A>>, ...args: any[]): void;

    // Implemented Members

    add_actor(actor: A): void;
    child_get_property(child: A, property: string, value: GObject.Value | any): void;
    child_notify(child: A, pspec: GObject.ParamSpec): void;
    child_set_property(child: A, property: string, value: GObject.Value | any): void;
    create_child_meta(actor: A): void;
    destroy_child_meta(actor: A): void;
    find_child_by_name(child_name: string): A;
    get_child_meta(actor: A): Clutter.ChildMeta;
    remove_actor(actor: A): void;
    vfunc_actor_added(actor: A): void;
    vfunc_actor_removed(actor: A): void;
    vfunc_add(actor: A): void;
    vfunc_child_notify(child: A, pspec: GObject.ParamSpec): void;
    vfunc_create_child_meta(actor: A): void;
    vfunc_destroy_child_meta(actor: A): void;
    vfunc_get_child_meta(actor: A): Clutter.ChildMeta;
    vfunc_remove(actor: A): void;
}
export module Stack {
    export interface ConstructorProperties<A extends Clutter.Actor = Clutter.Actor>
        extends St.Widget.ConstructorProperties {
        [key: string]: any;
    }
}
export class Stack<A extends Clutter.Actor = Clutter.Actor>
    extends St.Widget
    implements Atk.ImplementorIface, Clutter.Animatable, Clutter.Container<A>, Clutter.Scriptable
{
    static $gtype: GObject.GType<Stack>;

    constructor(properties?: Partial<Stack.ConstructorProperties<A>>, ...args: any[]);
    _init(properties?: Partial<Stack.ConstructorProperties<A>>, ...args: any[]): void;

    // Implemented Members

    add_actor(actor: A): void;
    child_get_property(child: A, property: string, value: GObject.Value | any): void;
    child_notify(child: A, pspec: GObject.ParamSpec): void;
    child_set_property(child: A, property: string, value: GObject.Value | any): void;
    create_child_meta(actor: A): void;
    destroy_child_meta(actor: A): void;
    find_child_by_name(child_name: string): A;
    get_child_meta(actor: A): Clutter.ChildMeta;
    remove_actor(actor: A): void;
    vfunc_actor_added(actor: A): void;
    vfunc_actor_removed(actor: A): void;
    vfunc_add(actor: A): void;
    vfunc_child_notify(child: A, pspec: GObject.ParamSpec): void;
    vfunc_create_child_meta(actor: A): void;
    vfunc_destroy_child_meta(actor: A): void;
    vfunc_get_child_meta(actor: A): Clutter.ChildMeta;
    vfunc_remove(actor: A): void;
}
export module TrayIcon {
    export interface ConstructorProperties<A extends Clutter.Actor = Clutter.Actor>
        extends GtkEmbed.ConstructorProperties<A> {
        [key: string]: any;
        pid: number;
        title: string;
        wm_class: string;
        wmClass: string;
    }
}
export class TrayIcon<A extends Clutter.Actor = Clutter.Actor>
    extends GtkEmbed<A>
    implements Atk.ImplementorIface, Clutter.Animatable, Clutter.Container<A>, Clutter.Scriptable
{
    static $gtype: GObject.GType<TrayIcon>;

    constructor(properties?: Partial<TrayIcon.ConstructorProperties<A>>, ...args: any[]);
    _init(properties?: Partial<TrayIcon.ConstructorProperties<A>>, ...args: any[]): void;

    // Properties
    get pid(): number;
    get title(): string;
    get wm_class(): string;
    get wmClass(): string;

    // Constructors

    static ["new"](window: EmbeddedWindow): TrayIcon;
    // Conflicted with Clutter.Clone.new
    static ["new"](...args: never[]): any;

    // Members

    click(event: Clutter.Event): void;

    // Implemented Members

    add_actor(actor: A): void;
    child_get_property(child: A, property: string, value: GObject.Value | any): void;
    child_notify(child: A, pspec: GObject.ParamSpec): void;
    child_set_property(child: A, property: string, value: GObject.Value | any): void;
    create_child_meta(actor: A): void;
    destroy_child_meta(actor: A): void;
    find_child_by_name(child_name: string): A;
    get_child_meta(actor: A): Clutter.ChildMeta;
    remove_actor(actor: A): void;
    vfunc_actor_added(actor: A): void;
    vfunc_actor_removed(actor: A): void;
    vfunc_add(actor: A): void;
    vfunc_child_notify(child: A, pspec: GObject.ParamSpec): void;
    vfunc_create_child_meta(actor: A): void;
    vfunc_destroy_child_meta(actor: A): void;
    vfunc_get_child_meta(actor: A): Clutter.ChildMeta;
    vfunc_remove(actor: A): void;
}
export module TrayManager {
    export interface ConstructorProperties extends GObject.Object.ConstructorProperties {
        [key: string]: any;
        bg_color: Clutter.Color;
        bgColor: Clutter.Color;
    }
}
export class TrayManager extends GObject.Object {
    static $gtype: GObject.GType<TrayManager>;

    constructor(properties?: Partial<TrayManager.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<TrayManager.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get bg_color(): Clutter.Color;
    get bgColor(): Clutter.Color;

    // Signals

    connect(id: string, callback: (...args: any[]) => any): number;
    connect_after(id: string, callback: (...args: any[]) => any): number;
    emit(id: string, ...args: any[]): void;
    connect(signal: "tray-icon-added", callback: (_source: this, object: Clutter.Actor) => void): number;
    connect_after(signal: "tray-icon-added", callback: (_source: this, object: Clutter.Actor) => void): number;
    emit(signal: "tray-icon-added", object: Clutter.Actor): void;
    connect(signal: "tray-icon-removed", callback: (_source: this, object: Clutter.Actor) => void): number;
    connect_after(signal: "tray-icon-removed", callback: (_source: this, object: Clutter.Actor) => void): number;
    emit(signal: "tray-icon-removed", object: Clutter.Actor): void;

    // Constructors

    static ["new"](): TrayManager;

    // Members

    manage_screen(theme_widget: St.Widget): void;
    unmanage_screen(): void;
}
export module WM {
    export interface ConstructorProperties extends GObject.Object.ConstructorProperties {
        [key: string]: any;
    }
}
export class WM extends GObject.Object {
    static $gtype: GObject.GType<WM>;

    constructor(properties?: Partial<WM.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<WM.ConstructorProperties>, ...args: any[]): void;

    // Signals

    connect(id: string, callback: (...args: any[]) => any): number;
    connect_after(id: string, callback: (...args: any[]) => any): number;
    emit(id: string, ...args: any[]): void;
    connect(signal: "confirm-display-change", callback: (_source: this) => void): number;
    connect_after(signal: "confirm-display-change", callback: (_source: this) => void): number;
    emit(signal: "confirm-display-change"): void;
    connect(signal: "create-close-dialog", callback: (_source: this, window: Meta.Window) => Meta.CloseDialog): number;
    connect_after(
        signal: "create-close-dialog",
        callback: (_source: this, window: Meta.Window) => Meta.CloseDialog
    ): number;
    emit(signal: "create-close-dialog", window: Meta.Window): void;
    connect(
        signal: "create-inhibit-shortcuts-dialog",
        callback: (_source: this, window: Meta.Window) => Meta.InhibitShortcutsDialog
    ): number;
    connect_after(
        signal: "create-inhibit-shortcuts-dialog",
        callback: (_source: this, window: Meta.Window) => Meta.InhibitShortcutsDialog
    ): number;
    emit(signal: "create-inhibit-shortcuts-dialog", window: Meta.Window): void;
    connect(signal: "destroy", callback: (_source: this, object: Meta.WindowActor) => void): number;
    connect_after(signal: "destroy", callback: (_source: this, object: Meta.WindowActor) => void): number;
    emit(signal: "destroy", object: Meta.WindowActor): void;
    connect(signal: "filter-keybinding", callback: (_source: this, object: Meta.KeyBinding) => boolean): number;
    connect_after(signal: "filter-keybinding", callback: (_source: this, object: Meta.KeyBinding) => boolean): number;
    emit(signal: "filter-keybinding", object: Meta.KeyBinding): void;
    connect(signal: "hide-tile-preview", callback: (_source: this) => void): number;
    connect_after(signal: "hide-tile-preview", callback: (_source: this) => void): number;
    emit(signal: "hide-tile-preview"): void;
    connect(signal: "kill-switch-workspace", callback: (_source: this) => void): number;
    connect_after(signal: "kill-switch-workspace", callback: (_source: this) => void): number;
    emit(signal: "kill-switch-workspace"): void;
    connect(signal: "kill-window-effects", callback: (_source: this, object: Meta.WindowActor) => void): number;
    connect_after(signal: "kill-window-effects", callback: (_source: this, object: Meta.WindowActor) => void): number;
    emit(signal: "kill-window-effects", object: Meta.WindowActor): void;
    connect(signal: "map", callback: (_source: this, object: Meta.WindowActor) => void): number;
    connect_after(signal: "map", callback: (_source: this, object: Meta.WindowActor) => void): number;
    emit(signal: "map", object: Meta.WindowActor): void;
    connect(signal: "minimize", callback: (_source: this, object: Meta.WindowActor) => void): number;
    connect_after(signal: "minimize", callback: (_source: this, object: Meta.WindowActor) => void): number;
    emit(signal: "minimize", object: Meta.WindowActor): void;
    connect(
        signal: "show-tile-preview",
        callback: (_source: this, object: Meta.Window, p0: Meta.Rectangle, p1: number) => void
    ): number;
    connect_after(
        signal: "show-tile-preview",
        callback: (_source: this, object: Meta.Window, p0: Meta.Rectangle, p1: number) => void
    ): number;
    emit(signal: "show-tile-preview", object: Meta.Window, p0: Meta.Rectangle, p1: number): void;
    connect(
        signal: "show-window-menu",
        callback: (_source: this, object: Meta.Window, p0: number, p1: Meta.Rectangle) => void
    ): number;
    connect_after(
        signal: "show-window-menu",
        callback: (_source: this, object: Meta.Window, p0: number, p1: Meta.Rectangle) => void
    ): number;
    emit(signal: "show-window-menu", object: Meta.Window, p0: number, p1: Meta.Rectangle): void;
    connect(
        signal: "size-change",
        callback: (
            _source: this,
            object: Meta.WindowActor,
            p0: Meta.SizeChange,
            p1: Meta.Rectangle,
            p2: Meta.Rectangle
        ) => void
    ): number;
    connect_after(
        signal: "size-change",
        callback: (
            _source: this,
            object: Meta.WindowActor,
            p0: Meta.SizeChange,
            p1: Meta.Rectangle,
            p2: Meta.Rectangle
        ) => void
    ): number;
    emit(
        signal: "size-change",
        object: Meta.WindowActor,
        p0: Meta.SizeChange,
        p1: Meta.Rectangle,
        p2: Meta.Rectangle
    ): void;
    connect(signal: "size-changed", callback: (_source: this, object: Meta.WindowActor) => void): number;
    connect_after(signal: "size-changed", callback: (_source: this, object: Meta.WindowActor) => void): number;
    emit(signal: "size-changed", object: Meta.WindowActor): void;
    connect(
        signal: "switch-workspace",
        callback: (_source: this, object: number, p0: number, p1: number) => void
    ): number;
    connect_after(
        signal: "switch-workspace",
        callback: (_source: this, object: number, p0: number, p1: number) => void
    ): number;
    emit(signal: "switch-workspace", object: number, p0: number, p1: number): void;
    connect(signal: "unminimize", callback: (_source: this, object: Meta.WindowActor) => void): number;
    connect_after(signal: "unminimize", callback: (_source: this, object: Meta.WindowActor) => void): number;
    emit(signal: "unminimize", object: Meta.WindowActor): void;

    // Constructors

    static ["new"](plugin: Meta.Plugin): WM;

    // Members

    complete_display_change(ok: boolean): void;
    completed_destroy(actor: Meta.WindowActor): void;
    completed_map(actor: Meta.WindowActor): void;
    completed_minimize(actor: Meta.WindowActor): void;
    completed_size_change(actor: Meta.WindowActor): void;
    completed_switch_workspace(): void;
    completed_unminimize(actor: Meta.WindowActor): void;
}
export module WindowPreview {
    export interface ConstructorProperties<A extends Clutter.Actor = Clutter.Actor>
        extends St.Widget.ConstructorProperties {
        [key: string]: any;
        window_container: Clutter.Actor;
        windowContainer: Clutter.Actor;
    }
}
export class WindowPreview<A extends Clutter.Actor = Clutter.Actor>
    extends St.Widget
    implements Atk.ImplementorIface, Clutter.Animatable, Clutter.Container<A>, Clutter.Scriptable
{
    static $gtype: GObject.GType<WindowPreview>;

    constructor(properties?: Partial<WindowPreview.ConstructorProperties<A>>, ...args: any[]);
    _init(properties?: Partial<WindowPreview.ConstructorProperties<A>>, ...args: any[]): void;

    // Properties
    get window_container(): Clutter.Actor;
    set window_container(val: Clutter.Actor);
    get windowContainer(): Clutter.Actor;
    set windowContainer(val: Clutter.Actor);

    // Implemented Members

    add_actor(actor: A): void;
    child_get_property(child: A, property: string, value: GObject.Value | any): void;
    child_notify(child: A, pspec: GObject.ParamSpec): void;
    child_set_property(child: A, property: string, value: GObject.Value | any): void;
    create_child_meta(actor: A): void;
    destroy_child_meta(actor: A): void;
    find_child_by_name(child_name: string): A;
    get_child_meta(actor: A): Clutter.ChildMeta;
    remove_actor(actor: A): void;
    vfunc_actor_added(actor: A): void;
    vfunc_actor_removed(actor: A): void;
    vfunc_add(actor: A): void;
    vfunc_child_notify(child: A, pspec: GObject.ParamSpec): void;
    vfunc_create_child_meta(actor: A): void;
    vfunc_destroy_child_meta(actor: A): void;
    vfunc_get_child_meta(actor: A): Clutter.ChildMeta;
    vfunc_remove(actor: A): void;
}
export module WindowPreviewLayout {
    export interface ConstructorProperties extends Clutter.LayoutManager.ConstructorProperties {
        [key: string]: any;
        bounding_box: Clutter.ActorBox;
        boundingBox: Clutter.ActorBox;
    }
}
export class WindowPreviewLayout extends Clutter.LayoutManager {
    static $gtype: GObject.GType<WindowPreviewLayout>;

    constructor(properties?: Partial<WindowPreviewLayout.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<WindowPreviewLayout.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get bounding_box(): Clutter.ActorBox;
    get boundingBox(): Clutter.ActorBox;

    // Members

    add_window(window: Meta.Window): Clutter.Actor;
    get_windows(): Meta.Window[];
    remove_window(window: Meta.Window): void;
}
export module WindowTracker {
    export interface ConstructorProperties extends GObject.Object.ConstructorProperties {
        [key: string]: any;
        focus_app: App;
        focusApp: App;
    }
}
export class WindowTracker extends GObject.Object {
    static $gtype: GObject.GType<WindowTracker>;

    constructor(properties?: Partial<WindowTracker.ConstructorProperties>, ...args: any[]);
    _init(properties?: Partial<WindowTracker.ConstructorProperties>, ...args: any[]): void;

    // Properties
    get focus_app(): App;
    get focusApp(): App;

    // Signals

    connect(id: string, callback: (...args: any[]) => any): number;
    connect_after(id: string, callback: (...args: any[]) => any): number;
    emit(id: string, ...args: any[]): void;
    connect(
        signal: "startup-sequence-changed",
        callback: (_source: this, object: Meta.StartupSequence) => void
    ): number;
    connect_after(
        signal: "startup-sequence-changed",
        callback: (_source: this, object: Meta.StartupSequence) => void
    ): number;
    emit(signal: "startup-sequence-changed", object: Meta.StartupSequence): void;
    connect(signal: "tracked-windows-changed", callback: (_source: this) => void): number;
    connect_after(signal: "tracked-windows-changed", callback: (_source: this) => void): number;
    emit(signal: "tracked-windows-changed"): void;

    // Members

    get_app_from_pid(pid: number): App;
    get_startup_sequences(): Meta.StartupSequence[];
    get_window_app(metawin: Meta.Window): App;
    static get_default(): WindowTracker;
}

export class MemoryInfo {
    static $gtype: GObject.GType<MemoryInfo>;

    constructor(
        properties?: Partial<{
            glibc_uordblks?: number;
            js_bytes?: number;
            gjs_boxed?: number;
            gjs_gobject?: number;
            gjs_function?: number;
            gjs_closure?: number;
            last_gc_seconds_ago?: number;
        }>
    );
    constructor(copy: MemoryInfo);

    // Fields
    glibc_uordblks: number;
    js_bytes: number;
    gjs_boxed: number;
    gjs_gobject: number;
    gjs_function: number;
    gjs_closure: number;
    last_gc_seconds_ago: number;
}

export class NetworkAgentPrivate {
    static $gtype: GObject.GType<NetworkAgentPrivate>;

    constructor(copy: NetworkAgentPrivate);
}

export class WindowPreviewLayoutPrivate {
    static $gtype: GObject.GType<WindowPreviewLayoutPrivate>;

    constructor(copy: WindowPreviewLayoutPrivate);
}
