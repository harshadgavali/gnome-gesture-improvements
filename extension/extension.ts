import Clutter from '@gi-types/clutter';
import GLib from '@gi-types/glib2';
import { imports } from 'gnome-shell';
import { AllSettingsKeys, GioSettings, PinchGestureType, SwipeHorizontalGestureType, SwipeVerticalGestureType } from './common/settings';
import * as Constants from './constants';
import { SwipeGestureInfo, SwipeGestureToExtensionMapper } from './src/gestures';
import { AltTabConstants, ExtSettings, TouchpadConstants } from './constants';
import { CloseWindowExtension } from './src/pinchGestures/closeWindow';
import { ShowDesktopExtension } from './src/pinchGestures/showDesktop';
import * as DBusUtils from './src/utils/dbus';
import * as VKeyboard from './src/utils/keyboard';

const ExtensionUtils = imports.misc.extensionUtils;

class Extension {
	private _extensions: ISubExtension[];
	settings?: GioSettings;
	private _settingChangedId = 0;
	private _reloadWaitId = 0;
	private _addReloadDelayFor: AllSettingsKeys[];

	constructor() {
		this._extensions = [];
		this._addReloadDelayFor = [
			'touchpad-speed-scale',
			'alttab-delay',
			'touchpad-pinch-speed',
		];
	}

	enable() {
		this.settings = ExtensionUtils.getSettings();
		this._settingChangedId = this.settings.connect('changed', this.reload.bind(this));
		this._enable();
	}

	disable() {
		if (this.settings) {
			this.settings.disconnect(this._settingChangedId);
		}

		if (this._reloadWaitId !== 0) {
			GLib.source_remove(this._reloadWaitId);
			this._reloadWaitId = 0;
		}

		this._disable();
		DBusUtils.drop_proxy();
	}

	reload(_settings: never, key: AllSettingsKeys) {
		if (this._reloadWaitId !== 0) {
			GLib.source_remove(this._reloadWaitId);
			this._reloadWaitId = 0;
		}

		this._reloadWaitId = GLib.timeout_add(
			GLib.PRIORITY_DEFAULT,
			(this._addReloadDelayFor.includes(key) ? Constants.RELOAD_DELAY : 0),
			() => {
				this._disable();
				this._enable();
				this._reloadWaitId = 0;
				return GLib.SOURCE_REMOVE;
			},
		);
	}

	_enable() {
		this._initializeSettings();
		this._extensions = [];
		if (this.settings === undefined)
		return;
		
		if (this.settings.get_boolean('enable-alttab-gesture'))
		// this._extensions.push(new AltTabGestureExtension());
		
		this._setSwipeGestures()

		// pinch to show desktop
		const pinchToFingersMap = this._getPinchGestureTypeAndFingers();
		const showDesktopFingers = pinchToFingersMap.get(PinchGestureType.SHOW_DESKTOP);
		if (showDesktopFingers?.length)
			this._extensions.push(new ShowDesktopExtension(showDesktopFingers));

		// pinch to close window
		const closeWindowFingers = pinchToFingersMap.get(PinchGestureType.CLOSE_WINDOW);
		if (closeWindowFingers?.length)
			this._extensions.push(new CloseWindowExtension(closeWindowFingers, PinchGestureType.CLOSE_WINDOW));

		// pinch to close document
		const closeDocumentFingers = pinchToFingersMap.get(PinchGestureType.CLOSE_DOCUMENT);
		if (closeDocumentFingers?.length)
			this._extensions.push(new CloseWindowExtension(closeDocumentFingers, PinchGestureType.CLOSE_DOCUMENT));

		this._extensions.forEach(extension => extension.apply?.());
	}

	_disable() {
		VKeyboard.extensionCleanup();
		DBusUtils.unsubscribeAll();
		this._extensions.reverse().forEach(extension => extension.destroy());
		this._extensions = [];
	}

	_initializeSettings() {
		if (this.settings) {
			// TODO: fix this somewhere, somehow
			// ExtSettings.ALLOW_MINIMIZE_WINDOW = this.settings.get_boolean('allow-minimize-window');
			
			ExtSettings.FOLLOW_NATURAL_SCROLL = this.settings.get_boolean('follow-natural-scroll');
			ExtSettings.DEFAULT_OVERVIEW_GESTURE_DIRECTION = this.settings.get_boolean('default-overview-gesture-direction');
			ExtSettings.APP_GESTURES = this.settings.get_boolean('enable-forward-back-gesture');


			TouchpadConstants.SWIPE_MULTIPLIER = Constants.TouchpadConstants.DEFAULT_SWIPE_MULTIPLIER * this.settings.get_double('touchpad-speed-scale');
			TouchpadConstants.PINCH_MULTIPLIER = Constants.TouchpadConstants.DEFAULT_PINCH_MULTIPLIER * this.settings.get_double('touchpad-pinch-speed');
			AltTabConstants.DELAY_DURATION = this.settings.get_int('alttab-delay');
			TouchpadConstants.HOLD_SWIPE_DELAY_DURATION = this.settings.get_int('hold-swipe-delay-duration');
		}
	}

	private _setSwipeGestures() {
		if (this.settings)	{
			const swipeHorizontal3FingerGesture = this.settings.get_enum('swipe-horizontal-3-finger-gesture');
			const swipeVertical3FingerGesture = this.settings.get_enum('swipe-vertical-3-finger-gesture');
			const swipeHorizontal4FingerGesture = this.settings.get_enum('swipe-horizontal-4-finger-gesture');
			const swipeVertical4FingerGesture = this.settings.get_enum('swipe-vertical-4-finger-gesture');
			
			const swipeGestureToExtension = new SwipeGestureToExtensionMapper(this.settings)

			const swipeHorizontal3FingerGestureInfo = new SwipeGestureInfo(
				Clutter.Orientation.HORIZONTAL,
				[3], swipeHorizontal3FingerGesture
			)
			const extension_1 = swipeGestureToExtension.get_extension(swipeHorizontal3FingerGestureInfo)

			const swipeVertical3FingerGestureInfo = new SwipeGestureInfo(
				Clutter.Orientation.VERTICAL,
				[3], swipeVertical3FingerGesture
			)
			const extension_2 = swipeGestureToExtension.get_extension(swipeVertical3FingerGestureInfo)
			
			const swipeHorizontal4FingerGestureInfo = new SwipeGestureInfo(
				Clutter.Orientation.HORIZONTAL,
				[4], swipeHorizontal4FingerGesture
			)
			const extension_3 = swipeGestureToExtension.get_extension(swipeHorizontal4FingerGestureInfo)

			const swipeVertical4FingerGestureInfo = new SwipeGestureInfo(
				Clutter.Orientation.VERTICAL,
				[4], swipeVertical4FingerGesture
			)
			const extension_4 = swipeGestureToExtension.get_extension(swipeVertical4FingerGestureInfo)
			
			this._extensions.push(
				extension_1, extension_2, extension_3, extension_4
			);
		}
	}

	private _getPinchGestureTypeAndFingers(): Map<PinchGestureType, number[]> {
		if (!this.settings)	return new Map();

		const pinch3FingerGesture = this.settings.get_enum('pinch-3-finger-gesture');
		const pinch4FingerGesture = this.settings.get_enum('pinch-4-finger-gesture');

		const gestureToFingersMap = new Map<PinchGestureType, number[]>();
		if (pinch3FingerGesture === pinch4FingerGesture)
			gestureToFingersMap.set(pinch3FingerGesture, [3, 4]);
		else {
			gestureToFingersMap.set(pinch3FingerGesture, [3]);
			gestureToFingersMap.set(pinch4FingerGesture, [4]);
		}

		return gestureToFingersMap;
	}
}

export function init(): IExtension {
	return new Extension();
}
