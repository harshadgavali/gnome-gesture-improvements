import Clutter from '../../../clutter12';
import St from '../../../st12';
import { SwipeTracker } from './swipeTracker';

export enum ControlsState {
  HIDDEN,
  WINDOW_PICKER,
  APP_GRID
}

declare class OverviewAdjustment extends St.Adjustment {
  getStateTransitionParams(): {
      initialState: ControlsState,
      finalState: ControlsState
      currentState: number,
      progress: number
  }
}

declare class OverviewControlsManager extends St.Widget {
    _stateAdjustment: OverviewAdjustment;
    glayoutManager: Clutter.BoxLayout & {
        _searchEntry: St.Bin
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
