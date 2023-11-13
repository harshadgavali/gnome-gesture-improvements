import Clutter from '../../../clutter12';
import Gio from '@gi-types/gio2';
import GObject from '@gi-types/gobject2';
import Meta from '../../../meta12';
import Shell from '../../../shell12';
import St from '../../../st12';

const actionMode: Shell.ActionMode;
function notify(message: string): void;
function activateWindow(window: Meta.Window, time?: number, workspaceNum?: number): void;

const panel: {
    addToStatusArea(role: string, indicator: Clutter.Actor, position?: number, box?: string): void,
} & Clutter.Actor;

const overview: {
    dash: {
        showAppsButton: St.Button
    };
    searchEntry: St.Entry,
    shouldToggleByCornerOrButton(): boolean,
    visible: boolean,
    show(): void,
    hide(): void,
    showApps(): void,
    connect(signal: 'showing' | 'hiding' | 'hidden' | 'shown', callback: () => void): number,
    disconnect(id: number): void,
    _overview: {
        _controls: overviewControls.OverviewControlsManager
    } & St.Widget
    _gestureBegin(tracker: {
        confirmSwipe: typeof swipeTracker.SwipeTracker.prototype.confirmSwipe;
    }): void;
    _gestureUpdate(tracker: swipeTracker.SwipeTracker, progress: number);
    _gestureEnd(tracker: swipeTracker.SwipeTracker, duration: number, endProgress: number);

    _swipeTracker: swipeTracker.SwipeTracker;
};

const layoutManager: GObject.Object & {
    uiGroup: St.Widget,
    panelBox: St.BoxLayout,
    monitors: __shell_private_types.IMonitorState[],
    primaryMonitor: __shell_private_types.IMonitorState,
    currentMonitor: __shell_private_types.IMonitorState,
    getWorkAreaForMonitor: (index: number) => Meta.Rectangle,

    connect(id: 'monitors-changed', callback: () => void);
};

const wm: {
    skipNextEffect(actor: Meta.WindowActor): void;
    _workspaceAnimation: workspaceAnimation.WorkspaceAnimationController;
};

const osdWindowManager: {
    hideAll(): void;
};
