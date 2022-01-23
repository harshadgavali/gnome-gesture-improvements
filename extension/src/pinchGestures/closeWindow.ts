import Clutter from '@gi-types/clutter8';
import { registerClass } from '@gi-types/gobject2';
import Meta from '@gi-types/meta8';
import Shell from '@gi-types/shell0';
import St from '@gi-types/st1';

import { global, imports } from 'gnome-shell';

import { TouchpadPinchGesture } from '../trackers/pinchTracker';
import { easeActor } from '../utils/environment';
import { VirtualKeyboard } from '../utils/keyboard';

const Main = imports.ui.main;
const Utils = imports.misc.util;

declare type Type_TouchpadPinchGesture = typeof TouchpadPinchGesture.prototype;

const ClosePreview = registerClass(
	class ClosePreview extends St.Widget {
		private _adjustment: St.Adjustment;
		private _windowBox?: Meta.Rectangle;

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

		open(window: Meta.Window): boolean{
			this._windowBox = window.get_frame_rect();

			this.opacity = 0;
			this._adjustment.value = 0;
			this._valueChanged();
			this.visible = true;
			this.easeOpacity(255);
			return true;
		}

		finish(): void {
			this.easeOpacity(0, () => {
				this.visible = false;
				this._windowBox = undefined;
			});
		}

		_valueChanged(): void {
			const progress = this._adjustment.value;

			if (this._windowBox) {
				const [x, y] = [
					Utils.lerp(this._windowBox.x, this._windowBox.x + this._windowBox.width / 2, progress),
					Utils.lerp(this._windowBox.y, this._windowBox.y + this._windowBox.height / 2, progress),
				];

				const [width, height] = [
					Utils.lerp(this._windowBox.width, 0, progress),
					Utils.lerp(this._windowBox.height, 0, progress),
				];

				this.set_position(x, y);
				this.set_size(width, height);
			}
		}

		_onDestroy(): void {
			this._adjustment.run_dispose();
		}

		easeOpacity(value: number, callback?: () => void) {
			easeActor(this as St.Widget, {
				opacity: value,
				duration: 150,
				mode: Clutter.AnimationMode.EASE,
				onStopped: () => {
					if (callback)
						callback();
				},
			});
		}

		get adjustment(): St.Adjustment {
			return this._adjustment;
		}
	},
);

export class CloseWindowExtension implements ISubExtension {
	// Define initial progress as 0.5 to allow pinch in and pinch out.
	readonly _initialProgress: number = 0.5;
	
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
			tracker.confirmPinch(0, [0, 1], this._initialProgress);
			this._preview.open(window);
		}
	}

	gestureUpdate(_tracker: unknown, progress: number): void {
		// Convert progress to number between 0 (start) and 1 (end).
		let relativeProgress: number;
		if (this._initialProgress === 0)
			relativeProgress = progress;
		else
			relativeProgress = Math.abs(this._initialProgress - progress) / this._initialProgress;
		this._preview.adjustment.value = relativeProgress;
	}

	gestureEnd(_tracker: unknown, _duration: number, _progress: number) {
		this._preview.finish();
		this._keyboard.sendKeys(Clutter.KEY_Control_L, Clutter.KEY_w);
	}
}