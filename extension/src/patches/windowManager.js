
const Clutter = imports.gi.Clutter;
const Main = imports.ui.main;

const WINDOW_ANIMATION_TIME = 250;

export function WMsizeChangedWindow(shellwm, actor, topActor) {
	if (!actor.__animationInfo)
		return;
	if (this._resizing.has(actor))
		return;

	let actorClone = actor.__animationInfo.clone;
	let targetRect = actor.meta_window.get_frame_rect();
	let sourceRect = actor.__animationInfo.oldRect;

	let scaleX = targetRect.width / sourceRect.width;
	let scaleY = targetRect.height / sourceRect.height;

	this._resizePending.delete(actor);
	this._resizing.add(actor);

	actorClone.visible = false;
	Main.uiGroup.add_child(actorClone);
	// set tilepreview above content clone
	Main.layoutManager.uiGroup.set_child_above_sibling(topActor, null);
	actorClone.visible = true;

	// Now scale and fade out the clone
	actorClone.ease({
		x: targetRect.x,
		y: targetRect.y,
		scale_x: scaleX,
		scale_y: scaleY,
		opacity: 0,
		duration: WINDOW_ANIMATION_TIME,
		mode: Clutter.AnimationMode.EASE_OUT_QUAD,
	});

	actor.translation_x = -targetRect.x + sourceRect.x;
	actor.translation_y = -targetRect.y + sourceRect.y;

	// Now set scale the actor to size it as the clone.
	actor.scale_x = 1 / scaleX;
	actor.scale_y = 1 / scaleY;

	// Scale it to its actual new size
	actor.ease({
		scale_x: 1,
		scale_y: 1,
		translation_x: 0,
		translation_y: 0,
		duration: WINDOW_ANIMATION_TIME,
		mode: Clutter.AnimationMode.EASE_OUT_QUAD,
		onStopped: () => this._sizeChangeWindowDone(shellwm, actor),
	});

	// ease didn't animate and cleared the info, we are done
	if (!actor.__animationInfo)
		return;

	// Now unfreeze actor updates, to get it to the new size.
	// It's important that we don't wait until the animation is completed to
	// do this, otherwise our scale will be applied to the old texture size.
	actor.thaw();
	actor.__animationInfo.frozen = false;
}