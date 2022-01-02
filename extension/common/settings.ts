import Gio from '@gi-types/gio2';

// define enum
export enum PinchGestureType {
    NONE = 0,
    SHOW_DESKTOP = 1,
}

export enum SwipeGestureType {
    SWITCH_WINDOWS = 0,
    FORWARD_BACK = 1,
}

export type BooleanSettingsKeys =
    'default-session-workspace' |
    'default-overview' |
    'allow-minimize-window' |
    'follow-natural-scroll' |
    'enable-window-manipulation-gesture' |
    'default-overview-gesture-direction'
    ;

export type IntegerSettingsKeys =
    'alttab-delay'
    ;
export type DoubleSettingsKeys =
    'touchpad-speed-scale' |
    'touchpad-pinch-speed'
    ;

export type EnumSettingsKeys =
    'pinch-3-finger-gesture' |
    'pinch-4-finger-gesture' |
    'swipe-3-finger-horizontal-gesture'
    ;


export type AllSettingsKeys =
    BooleanSettingsKeys |
    IntegerSettingsKeys |
    DoubleSettingsKeys |
    EnumSettingsKeys
    ;

export type AllUIObjectKeys =
    AllSettingsKeys |
    'touchpad-speed_scale_display-value' |
    'touchpad-pinch-speed_display-value' |
    'allow-minimize-window_box-row' |
    'alttab-delay_box-row'
    ;

type Enum_Functions<K extends EnumSettingsKeys, T> = {
    get_enum(key: K): T;
    set_enum(key: K, value: T): void;
}

type SettingsEnumFunctions =
    Enum_Functions<'pinch-3-finger-gesture' | 'pinch-4-finger-gesture', PinchGestureType> &
    Enum_Functions<'swipe-3-finger-horizontal-gesture', SwipeGestureType>
    ;

export type GioSettings =
    Omit<Gio.Settings, KeysThatStartsWith<keyof Gio.Settings, 'get_' | 'set_'>> &
    {
        get_boolean(key: BooleanSettingsKeys): boolean;
        get_int(key: IntegerSettingsKeys): number;
        get_double(key: DoubleSettingsKeys): number;
        set_double(key: DoubleSettingsKeys, value: number): void;
    } &
    SettingsEnumFunctions
    ;
