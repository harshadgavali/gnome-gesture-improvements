import Clutter from '@gi-types/clutter';
import GLib from '@gi-types/glib2';
import Shell from '@gi-types/shell';
import St from '@gi-types/st';
import { imports } from 'gnome-shell';
import { AltTabConstants, ExtSettings } from '../constants';
import { TouchpadSwipeGesture } from './swipeTracker';

const Main = imports.ui.main;
const { WindowSwitcherPopup } = imports.ui.altTab;

let dummyWinCount = AltTabConstants.DUMMY_WIN_COUNT;

function getIndexForProgress(progress: number, nelement: number): number {
	let index = Math.floor(progress * (nelement + 2 * dummyWinCount));
	index = index - dummyWinCount;
	return Math.clamp(index, 0, nelement - 1);
}

// index -> index + AltTabConstants.DUMMY_WIN_COUNT
function getAvgProgressForIndex(index: number, nelement: number): number {
	index = index + dummyWinCount;
	const progress = (index + 0.5) / (nelement + 2 * dummyWinCount);
	return progress;
}

// declare enum
enum AltTabExtState {
	DISABLED = 0,
	DEFAULT = 1,
	ALTTABDELAY = 2,
	ALTTAB = 3,
}

export class AltTabGestureExtension implements ISubExtension {
	private _connectHandlers: number[];
	private _touchpadSwipeTracker: typeof TouchpadSwipeGesture.prototype;
	private _adjustment: St.Adjustment;
	private _switcher?: typeof WindowSwitcherPopup.prototype;
	private _extState = AltTabExtState.DISABLED;
	private _progress = 0;
	private _altTabTimeoutId = 0;

	constructor() {
		this._connectHandlers = [];

		this._touchpadSwipeTracker = new TouchpadSwipeGesture(
			(ExtSettings.DEFAULT_SESSION_WORKSPACE_GESTURE ? [4] : [3]),
			Shell.ActionMode.ALL,
			Clutter.Orientation.HORIZONTAL,
			false,
			this._checkAllowedGesture.bind(this),
		);

		this._adjustment = new St.Adjustment({
			value: 0,
			lower: 0,
			upper: 1,
		});
	}

	_checkAllowedGesture(): boolean {
		return (
			this._extState <= AltTabExtState.DEFAULT && 
			Main.actionMode === Shell.ActionMode.NORMAL &&
			!(ExtSettings.APP_GESTURES && this._touchpadSwipeTracker.isItHoldAndSwipeGesture())
		);
	}

	apply(): void {
		this._adjustment.connect('notify::value', this._onUpdateAdjustmentValue.bind(this));

		this._connectHandlers.push(this._touchpadSwipeTracker.connect('begin', this._gestureBegin.bind(this)));
		this._connectHandlers.push(this._touchpadSwipeTracker.connect('update', this._gestureUpdate.bind(this)));
		this._connectHandlers.push(this._touchpadSwipeTracker.connect('end', this._gestureEnd.bind(this)));
		this._extState = AltTabExtState.DEFAULT;
	}

	destroy(): void {
		this._extState = AltTabExtState.DISABLED;
		this._connectHandlers.forEach(handle => this._touchpadSwipeTracker.disconnect(handle));

		this._touchpadSwipeTracker.destroy();
		this._connectHandlers = [];
		this._adjustment.run_dispose();

		if (this._switcher) {
			this._switcher.destroy();
			this._switcher = undefined;
		}
	}

	_onUpdateAdjustmentValue(): void {
		if (this._extState === AltTabExtState.ALTTAB && this._switcher) {
			const nelement = this._switcher._items.length;
			if (nelement > 1) {
				const n = getIndexForProgress(this._adjustment.value, nelement);
				this._switcher._select(n);
				const adjustment = this._switcher._switcherList._scrollView.hscroll.adjustment;
				const transition = adjustment.get_transition('value');
				if (transition) {
					transition.advance(AltTabConstants.POPUP_SCROLL_TIME);
				}
			}
		}
	}

	_gestureBegin(): void {
		this._progress = 0;
		if (this._extState === AltTabExtState.DEFAULT) {
			this._switcher = new WindowSwitcherPopup();
			this._switcher._switcherList.add_style_class_name('gie-alttab-quick-transition');
			this._switcher.connect('destroy', () => {
				this._switcher = undefined;
				this._reset();
			});

			// remove timeout entirely
			this._switcher._resetNoModsTimeout = function () {
				if (this._noModsTimeoutId) {
					GLib.source_remove(this._noModsTimeoutId);
					this._noModsTimeoutId = 0;
				}
			};
			const nelement = this._switcher._items.length;
			if (nelement > 0) {
				this._switcher.show(false, 'switch-windows', 0);
				this._switcher._popModal();

				if (this._switcher._initialDelayTimeoutId !== 0) {
					GLib.source_remove(this._switcher._initialDelayTimeoutId);
					this._switcher._initialDelayTimeoutId = 0;
				}

				const leftOver = AltTabConstants.MIN_WIN_COUNT - nelement;
				if (leftOver > 0) {
					dummyWinCount = Math.max(AltTabConstants.DUMMY_WIN_COUNT, Math.ceil(leftOver / 2));
				}
				else {
					dummyWinCount = AltTabConstants.DUMMY_WIN_COUNT;
				}

				if (nelement === 1) {
					this._switcher._select(0);
					this._progress = 0;
				} else {
					this._progress = getAvgProgressForIndex(1, nelement);
					this._switcher._select(1);
				}
				this._adjustment.value = 0;
				this._extState = AltTabExtState.ALTTABDELAY;
				this._altTabTimeoutId = GLib.timeout_add(
					GLib.PRIORITY_DEFAULT,
					AltTabConstants.DELAY_DURATION,
					() => {
						Main.osdWindowManager.hideAll();
						if (this._switcher)
							this._switcher.opacity = 255;
						this._adjustment.value = this._progress;
						this._extState = AltTabExtState.ALTTAB;
						this._altTabTimeoutId = 0;
						return GLib.SOURCE_REMOVE;
					},
				);
			} else {
				this._switcher.destroy();
				this._switcher = undefined;
			}
		}
	}

	_gestureUpdate(_gesture: never, _time: never, delta: number, distance: number): void {
		if (this._extState > AltTabExtState.ALTTABDELAY) {
			this._progress = Math.clamp(this._progress + delta / distance, 0, 1);
			this._adjustment.value = this._progress;
		}
	}

	_gestureEnd(): void {
		if (this._switcher) {
			const win = this._switcher._items[this._switcher._selectedIndex].window;
			Main.activateWindow(win);
			this._switcher.destroy();
			this._switcher = undefined;
		}

		this._reset();
	}

	private _reset() {
		if (this._extState > AltTabExtState.DEFAULT) {
			this._extState = AltTabExtState.DEFAULT;
			if (this._altTabTimeoutId) {
				GLib.source_remove(this._altTabTimeoutId);
				this._altTabTimeoutId = 0;
			}

			this._progress = 0;
			this._adjustment.value = 0;
		}
		this._extState = AltTabExtState.DEFAULT;
	}
}