import Clutter from '../../../clutter12';
import Meta from '../../../meta12';
import { SwipeTracker } from './swipeTracker';

declare class WorkspaceAnimationController {
  _swipeTracker: SwipeTracker;
  _switchWorkspaceBegin(tracker: {
      orientation: Clutter.Orientation,
      confirmSwipe: typeof SwipeTracker.prototype.confirmSwipe
  }, monitor: number);

  _switchWorkspaceUpdate(tracker: SwipeTracker, progress: number);
  _switchWorkspaceEnd(tracker: SwipeTracker, duration: number, progress: number);

  movingWindow: Meta.Window | undefined;
}