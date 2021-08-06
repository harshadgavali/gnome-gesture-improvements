// FIXME: ideally these values matches physical touchpad size. We can get the
// correct values for gnome-shell specifically, since mutter uses libinput
// directly, but GTK apps cannot get it, so use an arbitrary value so that
// it's consistent with apps.
export const TouchpadConstants = {
	DEFAULT_SWIPE_MULTIPLIER: 1,
	SWIPE_MULTIPLIER: 1,
	DRAG_THRESHOLD_DISTANCE: 16,
	TOUCHPAD_BASE_HEIGHT: 300,
	TOUCHPAD_BASE_WIDTH: 400,
};

export const AltTabConstants = {
	DEFAULT_DELAY_DURATION: 100,
	DELAY_DURATION: 100,
	POPUP_SCROLL_TIME: 100,
	DUMMY_WIN_COUNT: 1, // so swiping to the end of touchpad is not needed for last window
	MIN_WIN_COUNT: 8,
};

export const OverviewControlsState = {
	APP_GRID_P: -1,
	HIDDEN: 0,
	WINDOW_PICKER: 1,
	APP_GRID: 2,
	HIDDEN_N: 3,
};

export const ExtSettings = {
	DEFAULT_SESSION_WORKSPACE_GESTURE: false,
	DEFAULT_OVERVIEW_GESTURE: false,
};

export const RELOAD_DELAY = 150; // reload extension delay in ms