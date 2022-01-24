import Clutter from '@gi-types/clutter8';
import { registerClass } from '@gi-types/gobject2';
import Meta from '@gi-types/meta8';
import Shell from '@gi-types/shell0';
import St from '@gi-types/st1';

import { global, imports } from 'gnome-shell';

import { TouchpadPinchGesture } from '../trackers/pinchTracker';
import { VirtualKeyboard } from '../utils/keyboard';

const Main = imports.ui.main;

declare type Type_TouchpadPinchGesture = typeof TouchpadPinchGesture.prototype;

/**
 * Define initial progress as 0.5 to allow pinch in and pinch out.
 */
const _initialProgress = 0.5;
/**
 * Relative progress must finish above this value to execute close action.
 */
const _closeThreshold = 0.5;

const ClosePreview = registerClass(
	class ClosePreview extends St.Widget {
		private _adjustment: St.Adjustment;

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
			const windowBox = window.get_frame_rect();
			this.set_position(windowBox.x, windowBox.y);
			this.set_size(windowBox.width, windowBox.height);

			this.visible = true;
			this._adjustment.value = 0;
		}

		finish(): void {
			this.visible = false;
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
	},
);

export class CloseWindowExtension implements ISubExtension {
	private _keyboard: VirtualKeyboard;
	private _pinchTracker: Type_TouchpadPinchGesture;
	private _preview: typeof ClosePreview.prototype;
	private _uiGroupAddedActorId: number;

	constructor(nfingers: number[]) {
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
			tracker.confirmPinch(0, [0, 1], _initialProgress);
			this._preview.open(window);
		}
	}

	gestureUpdate(_tracker: unknown, progress: number): void {
		this._preview.adjustment.value = this.calculateRelativeProgress(progress);
	}

	gestureEnd(_tracker: unknown, _duration: number, _progress: number) {
		// Don't use _progress parameter, as it's value is always 0 or 1 but not a value between.
		this._preview.finish();
		if (this._preview.adjustment.value >= _closeThreshold)
			this._keyboard.sendKeys(Clutter.KEY_Control_L, Clutter.KEY_w);
	}

	/**
	 * Convert absolute progress from pinch tracker to number between 0 (start) and 1 (end).
	 * @param progress Progress from pinch tracker as value between 0 and 1.
	 */
	calculateRelativeProgress(progress: number) {
		// Disable compile / lint error in order to allow modification of _initialProgress.
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		if (_initialProgress === 0)
			return progress;
		else
			return Math.abs(_initialProgress - progress) / _initialProgress;
	}
}