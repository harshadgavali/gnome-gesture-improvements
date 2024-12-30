declare module "resource:///org/gnome/shell/ui/main.js" {
    import Shell from 'gi://Shell';
    import Meta from 'gi://Meta';
    import Mtk from 'gi://Mtk';
    import St from 'gi://St';
    import GObject from 'gi://GObject';
    import { Panel } from 'resource:///org/gnome/shell/ui/panel.js';
    import { SwipeTracker } from 'resource:///org/gnome/shell/ui/swipeTracker.js';
    import { Monitor, UiActor } from 'resource:///org/gnome/shell/ui/layout.js';
    import { ControlsManager } from 'resource:///org/gnome/shell/ui/overviewControls.js';
    import { WorkspaceAnimationController } from 'resource:///org/gnome/shell/ui/workspaceAnimation.js';

    const actionMode: Shell.ActionMode;
    function notify(message: string): void;
    function activateWindow(window: Meta.Window, time?: number, workspaceNum?: number): void;

    // const panel: {
    // 	addToStatusArea(role: string, indicator: Clutter.Actor, position?: number, box?: string): void,
    // } & Clutter.Actor;

    const panel: Panel;

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
            _controls: ControlsManager;
        } & St.Widget
        _gestureBegin(tracker: {
            confirmSwipe: typeof SwipeTracker.prototype.confirmSwipe;
        }): void;
        _gestureUpdate(tracker: SwipeTracker, progress: number): void;
        _gestureEnd(tracker: SwipeTracker, duration: number, endProgress: number): void;

        _swipeTracker: SwipeTracker;
    };

    const layoutManager: GObject.Object & {
        uiGroup: UiActor,
        panelBox: St.BoxLayout,
        monitors: Monitor[],
        primaryMonitor: Monitor,
        currentMonitor: Monitor,
        getWorkAreaForMonitor: (index: number) => Mtk.Rectangle,

        connect(id: 'monitors-changed', callback: () => void): number;
    };

    const wm: {
        skipNextEffect(actor: Meta.WindowActor): void;
        _workspaceAnimation: WorkspaceAnimationController;
    };

    const osdWindowManager: {
        hideAll(): void;
    };
}