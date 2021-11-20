import Gio from '@gi-types/gio2';

// define enum
export enum AnimatePanel {
    NONE = 0,
    SWITCH_WORKSPACE = 1,
    MOVE_WINDOW = 2,
    SWITCH_WORKSPACE_AND_MOVE_WINDOW = 3,
}

export type BooleanSettingsKeys =
    'default-session-workspace' |
    'default-overview' |
    'allow-minimize-window' |
    'follow-natural-scroll' |
    'enable-alttab-gesture' |
    'enable-window-manipulation-gesture' |
    'enable-move-window-to-workspace' |
    'enable-show-desktop'
    ;

export type IntegerSettingsKeys =
    'alttab-delay'
    ;
export type DoubleSettingsKeys =
    'touchpad-speed-scale' |
    'touchpad-pinch-speed'
    ;

export type AllSettingsKeys =
    BooleanSettingsKeys |
    IntegerSettingsKeys |
    DoubleSettingsKeys |
    'animate-panel'
    ;

export type AllUIObjectKeys =
    AllSettingsKeys |
    'touchpad-speed_scale_display-value' |
    'touchpad-pinch-speed_display-value' |
    'allow-minimize-window_box-row' |
    'alttab-delay_box-row' |
    'animate-panel_box-row'
    ;

export type GioSettings = Omit<Gio.Settings, KeysThatStartsWith<keyof Gio.Settings, 'get_' | 'set_'>> & {
    get_boolean(key: BooleanSettingsKeys): boolean;
    get_int(key: IntegerSettingsKeys): number;
    get_double(key: DoubleSettingsKeys): number;
    set_double(key: DoubleSettingsKeys, value: number): void;
    get_enum(key: 'animate-panel'): AnimatePanel;
    set_enum(key: 'animate-panel', value: AnimatePanel): void;
}
