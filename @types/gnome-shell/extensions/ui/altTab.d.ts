import Meta from '../../../meta12';
import St from '../../../st12';

declare class WindowSwitcherPopup extends St.Widget {
  _items: St.Widget & {
      window: Meta.Window
  }[];

  _switcherList: St.Widget & {
      _scrollView: {
          hscroll: {
              adjustment: St.Adjustment
          }
      }
  };
  
  _select(n: number): void;
  _resetNoModsTimeout(): void;
  _popModal(): void;

  _noModsTimeoutId: number;
  _initialDelayTimeoutId: number;
  _selectedIndex: number;

  show(backward: boolean, binding: string, mask: number);
}