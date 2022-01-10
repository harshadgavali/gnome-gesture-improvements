import Clutter from '@gi-types/clutter8';
import Shell from '@gi-types/shell0';
import Meta from '@gi-types/meta8';

import { imports, global } from 'gnome-shell';

import { ExtSettings } from '../constants';
import { ArrowIconAnimation } from './animations/arrow';
import { createSwipeTracker } from './swipeTracker';
import { VirtualKeyboard } from './utils/keyboard';

const Main = imports.ui.main;
declare type SwipeTrackerT = imports.ui.swipeTracker.SwipeTracker;

// declare enum
enum AnimationState {
	WAITING = 0, // waiting to cross threshold
	DEFAULT = WAITING,
	LEFT = -1,
	RIGHT = 1,
}

const SnapPointThreshold = 0.1;

export class ForwardBackGestureExtension implements ISubExtension {
	private _connectHandlers: number[];
	private _swipeTracker: SwipeTrackerT;
	private _keyboard: VirtualKeyboard;
	private _arrowIconAnimation: typeof ArrowIconAnimation.prototype;
	private _animationState = AnimationState.WAITING;

	constructor() {
		this._keyboard = new VirtualKeyboard();

		this._swipeTracker = createSwipeTracker(
			global.stage,
			ExtSettings.DEFAULT_SESSION_WORKSPACE_GESTURE ? [4] : [3],
			Shell.ActionMode.NORMAL,
			Clutter.Orientation.HORIZONTAL,
			false,
			1,
			{ allowTouch: false },
		);

		this._connectHandlers = [
			this._swipeTracker.connect('begin', this._gestureBegin.bind(this)),
			this._swipeTracker.connect('update', this._gestureUpdate.bind(this)),
			this._swipeTracker.connect('end', this._gestureEnd.bind(this)),
		];

		this._arrowIconAnimation = new ArrowIconAnimation();
		this._arrowIconAnimation.hide();
		Main.layoutManager.uiGroup.add_child(this._arrowIconAnimation);
	}

	destroy(): void {
		this._connectHandlers.forEach(handle => this._swipeTracker.disconnect(handle));
		this._connectHandlers = [];
		this._swipeTracker.destroy();
		this._arrowIconAnimation.destroy();
	}


	_gestureBegin(tracker: SwipeTrackerT): void {
		this._animationState = AnimationState.WAITING;
		tracker.confirmSwipe(
			global.screen_width,
			[AnimationState.LEFT, AnimationState.DEFAULT, AnimationState.RIGHT],
			AnimationState.DEFAULT,
			AnimationState.DEFAULT,
		);
	}

	_gestureUpdate(_tracker: SwipeTrackerT, progress: number): void {
		switch (this._animationState) {
			case AnimationState.WAITING:
				if (Math.abs(progress - AnimationState.DEFAULT) < SnapPointThreshold) return;
				this._showArrow(progress);
				break;
			case AnimationState.RIGHT:
				progress = (progress - SnapPointThreshold) / (AnimationState.RIGHT - SnapPointThreshold);
				this._arrowIconAnimation.gestureUpdate(Math.clamp(progress, 0, 1));
				break;
			case AnimationState.LEFT:
				progress = (progress + SnapPointThreshold) / (AnimationState.LEFT + SnapPointThreshold);
				this._arrowIconAnimation.gestureUpdate(Math.clamp(progress, 0, 1));
		}
	}

	_gestureEnd(_tracker: SwipeTrackerT, duration: number, progress: AnimationState): void {
		if (this._animationState === AnimationState.WAITING) {
			if (progress === AnimationState.DEFAULT) return;
			this._showArrow(progress);
		}

		switch (this._animationState) {
			case AnimationState.RIGHT:
				progress = (progress - SnapPointThreshold) / (AnimationState.RIGHT - SnapPointThreshold);
				progress = Math.clamp(progress, 0, 1);
				this._arrowIconAnimation.gestureEnd(duration, progress, () => {
					if (progress !== 0) {
						// bring left page to right
						this._keyboard.sendKeys(Clutter.KEY_Back);
					}
					this._arrowIconAnimation.hide();
				});
				break;
			case AnimationState.LEFT:
				progress = (progress + SnapPointThreshold) / (AnimationState.LEFT + SnapPointThreshold);
				progress = Math.clamp(progress, 0, 1);
				this._arrowIconAnimation.gestureEnd(duration, progress, () => {
					if (progress !== 0) {
						// bring right page to left
						this._keyboard.sendKeys(Clutter.KEY_Forward);
					}
					this._arrowIconAnimation.hide();
				});
		}
	}

	_showArrow(progress: number) {
		const [height, width] = [this._arrowIconAnimation.height, this._arrowIconAnimation.width];
		const workArea = this._getWorkArea();
		if (progress > AnimationState.DEFAULT) {
			this._animationState = AnimationState.RIGHT;
			this._arrowIconAnimation.gestureBegin('arrow1-left-symbolic.svg', true);
			this._arrowIconAnimation.set_position(workArea.x + width, workArea.y + Math.round((workArea.height - height) / 2));
		}
		else {
			this._animationState = AnimationState.LEFT;
			this._arrowIconAnimation.gestureBegin('arrow1-right-symbolic.svg', false);
			this._arrowIconAnimation.set_position(workArea.x + workArea.width - 2 * width, workArea.y + Math.round((workArea.height - height) / 2));
		}

		this._arrowIconAnimation.show();
	}

	_getWorkArea() {
		const window = global.display.get_focus_window() as Meta.Window | null;
		if (window)
			return window.get_frame_rect();
		return Main.layoutManager.getWorkAreaForMonitor(Main.layoutManager.currentMonitor.index);
	}
}