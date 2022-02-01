import Clutter from '@gi-types/clutter8';
import { registerClass } from '@gi-types/gobject2';
import Meta from '@gi-types/meta8';
import Shell from '@gi-types/shell0';
import St from '@gi-types/st1';

import { global, imports } from 'gnome-shell';

import { PinchGestureType } from '../../common/settings';
import { TouchpadPinchGesture } from '../trackers/pinchTracker';
import { VirtualKeyboard } from '../utils/keyboard';

const Main = imports.ui.main;

enum CloseWindowGestureState {
	PINCH_IN = -1,
	DEFAULT = 0,
	PINCH_OUT = 1
}

declare type Type_TouchpadPinchGesture = typeof TouchpadPinchGesture.prototype;

const ClosePreview = registerClass(
	class ClosePreview extends St.Widget {
		private _adjustment: St.Adjustment;
		private _window?: Meta.Window;

		constructor() {
			super({
				reactive: false,
				style_class: 'close-window-preview',
				visible: false,
			});
			this.connect('destroy', this._onDestroy.bind(this));

			this._adjustment = new St.Adjustment({
				actor: this,
				value: 0,
				lower: 0,
				upper: 1,
			});

			this._adjustment.connect('notify::value', this._valueChanged.bind(this));
		}

		open(window: Meta.Window): void {
			this._window = window;
			const windowBox = this._window.get_frame_rect();
			this.set_position(windowBox.x, windowBox.y);
			this.set_size(windowBox.width, windowBox.height);

			this.visible = true;
			this._adjustment.value = 0;
		}

		finish(): void {
			this.visible = false;
			this._window = undefined;
		}

		_valueChanged(): void {
			const progress = this._adjustment.value;
			this.opacity = progress * 255;
		}

		_onDestroy(): void {
			this._adjustment.run_dispose();
		}

		get adjustment(): St.Adjustment {
			return this._adjustment;
		}

		get window(): Meta.Window | undefined {
			return this._window;
		}
	},
);

export class CloseWindowExtension implements ISubExtension {
	private _closeType: PinchGestureType;
	private _keyboard: VirtualKeyboard;
	private _pinchTracker: Type_TouchpadPinchGesture;
	private _preview: typeof ClosePreview.prototype;
	private _uiGroupAddedActorId: number;

	constructor(nfingers: number[], closeType: PinchGestureType) {
		if (closeType !== PinchGestureType.CLOSE_DOCUMENT && closeType !== PinchGestureType.CLOSE_WINDOW) {
			throw new Error('CloseType must be CLOSE_DOCUMENT or CLOSE_WINDOW.');
		} else {
			this._closeType = closeType;
		}

		this._keyboard = new VirtualKeyboard();

		this._pinchTracker = new TouchpadPinchGesture({
			nfingers: nfingers,
			allowedModes: Shell.ActionMode.NORMAL,
		});

		this._preview = new ClosePreview();
		Main.layoutManager.uiGroup.add_child(this._preview);
		this._uiGroupAddedActorId = Main.layoutManager.uiGroup.connect('actor-added', () => {
			Main.layoutManager.uiGroup.set_child_above_sibling(this._preview, null);
		});
		Main.layoutManager.uiGroup.set_child_above_sibling(this._preview, null);
	}

	apply(): void {
		this._pinchTracker.connect('begin', this.gestureBegin.bind(this));
		this._pinchTracker.connect('update', this.gestureUpdate.bind(this));
		this._pinchTracker.connect('end', this.gestureEnd.bind(this));
	}

	destroy(): void {
		this._pinchTracker?.destroy();

		if (this._uiGroupAddedActorId) {
			Main.layoutManager.uiGroup.disconnect(this._uiGroupAddedActorId);
			this._uiGroupAddedActorId = 0;
		}
		Main.layoutManager.uiGroup.remove_child(this._preview);
		this._preview.destroy();

		this._pinchTracker?.destroy();
	}

	gestureBegin(tracker: Type_TouchpadPinchGesture) {
		const window = global.display.get_focus_window() as Meta.Window | null;
		if (window) {
			tracker.confirmPinch(0, [CloseWindowGestureState.PINCH_IN, CloseWindowGestureState.DEFAULT, CloseWindowGestureState.PINCH_OUT], CloseWindowGestureState.DEFAULT);
			this._preview.open(window);
		}
	}

	gestureUpdate(_tracker: unknown, progress: number): void {
		this._preview.adjustment.value = Math.abs(progress);
	}

	gestureEnd(_tracker: unknown, _duration: number, progress: number) {
		if (progress !== CloseWindowGestureState.DEFAULT) {
			switch (this._closeType) {
				case PinchGestureType.CLOSE_DOCUMENT:
					this._keyboard.sendKeys(Clutter.KEY_Control_L, Clutter.KEY_w);
					break;
				case PinchGestureType.CLOSE_WINDOW:
					this._preview.window?.delete(Clutter.get_current_event_time());
					break;
				default:
					break;
			}
		}
		this._preview.finish();
	}
}