declare module "resource:///org/gnome/shell/ui/overviewControls.js" {
    import St from 'gi://St';
    import Clutter from 'gi://Clutter';
    import { SwipeTracker } from 'resource:///org/gnome/shell/ui/swipeTracker.js';

    enum ControlsState {
        HIDDEN,
        WINDOW_PICKER,
        APP_GRID
    }

    class OverviewAdjustment extends St.Adjustment {
        getStateTransitionParams(): {
            initialState: ControlsState,
            finalState: ControlsState
            currentState: number,
            progress: number
        }
    }

    class ControlsManager extends St.Widget {
        _stateAdjustment: OverviewAdjustment;
        
        layout_Manager: Clutter.BoxLayout & {
            _searchEntry: St.Bin;
        };

        _toggleAppsPage(): void

        _workspacesDisplay: {
            _swipeTracker: SwipeTracker
        };

        _appDisplay: {
            _swipeTracker: SwipeTracker
        };

        _searchController: {
            searchActive: boolean
        };
    }
}