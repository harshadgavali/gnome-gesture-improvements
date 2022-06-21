import Gio from '@gi-types/gio2';
import GLib from '@gi-types/glib2';

// define enum
export enum PinchGestureType {
    NONE = 0,
    SHOW_DESKTOP = 1,
    CLOSE_WINDOW = 2,
    CLOSE_DOCUMENT = 3,
}

// define enum
export enum OverviewNavigationState {
    CYCLIC = 0,
    GNOME = 1,
    WINDOW_PICKER_ONLY = 2,
}

export enum ForwardBackKeyBinds {
    Default = 0,
    'Forward/Backward' = 1,
    'Page Up/Down' = 2,
    'Right/Left' = 3,
    'Audio Next/Prev' = 4,
    'Tab Next/Prev' = 5,
}

export type BooleanSettingsKeys =
    'default-session-workspace' |
    'default-overview' |
    'allow-minimize-window' |
    'follow-natural-scroll' |
    'enable-alttab-gesture' |
    'enable-forward-back-gesture' |
    'enable-window-manipulation-gesture' |
    'default-overview-gesture-direction'
    ;

export type IntegerSettingsKeys =
    'alttab-delay' |
    'hold-swipe-delay-duration'
    ;
export type DoubleSettingsKeys =
    'touchpad-speed-scale' |
    'touchpad-pinch-speed'
    ;

export type EnumSettingsKeys =
    'pinch-3-finger-gesture' |
    'pinch-4-finger-gesture' |
    'overview-navifation-states'
    ;

export type MiscSettingsKeys = 
    'forward-back-application-keyboard-shortcuts'
    ;

export type AllSettingsKeys =
    BooleanSettingsKeys |
    IntegerSettingsKeys |
    DoubleSettingsKeys |
    EnumSettingsKeys |
    MiscSettingsKeys
    ;

export type UIPageObjectIds = 
    'gestures_page' |
    'customizations_page'
    ;

export type AllUIObjectKeys =
    UIPageObjectIds |
    AllSettingsKeys |
    'touchpad-speed-scale_display-value' |
    'touchpad-pinch-speed_display-value'
    ;

type Enum_Functions<K extends EnumSettingsKeys, T> = {
    get_enum(key: K): T;
    set_enum(key: K, value: T): void;
}

type SettingsEnumFunctions =
    Enum_Functions<'pinch-3-finger-gesture' | 'pinch-4-finger-gesture', PinchGestureType> &
    Enum_Functions<'overview-navifation-states', OverviewNavigationState>
    ;

type Misc_Functions<K extends MiscSettingsKeys, T extends string> = {
    get_value(key: K): GLib.Variant<T>;
    set_value(key: K, value: GLib.Variant<T>): void;
}

type SettingsMiscFunctions = 
    Misc_Functions<'forward-back-application-keyboard-shortcuts', 'a{s(ib)}'>
    ;

export type GioSettings =
    Omit<Gio.Settings, KeysThatStartsWith<keyof Gio.Settings, 'get_' | 'set_'>> &
    {
        get_boolean(key: BooleanSettingsKeys): boolean;
        get_int(key: IntegerSettingsKeys): number;
        get_double(key: DoubleSettingsKeys): number;
        set_double(key: DoubleSettingsKeys, value: number): void;
    } &
    SettingsEnumFunctions &
    SettingsMiscFunctions
    ;