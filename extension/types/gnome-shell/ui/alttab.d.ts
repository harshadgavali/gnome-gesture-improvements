declare module "resource:///org/gnome/shell/ui/altTab.js" {    
    import St from 'gi://St';
    import Meta from 'gi://Meta';
    import { SwitcherPopup } from 'resource:///org/gnome/shell/ui/switcherPopup.js'

    class WindowSwitcherPopup extends SwitcherPopup {
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

        _noModsTimeoutId: number;
        _initialDelayTimeoutId: number;
        _selectedIndex: number;
    }
}