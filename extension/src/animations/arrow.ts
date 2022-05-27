// import GObject from '@gi-types/gobject2';
import Gio from '@gi-types/gio2';
import Clutter from '@gi-types/clutter';
import St from '@gi-types/st';

import { imports } from 'gnome-shell';
import { registerClass } from '../../common/utils/gobject';
import { easeActor } from '../utils/environment';
import { WIGET_SHOWING_DURATION } from '../../constants';

const ExtMe = imports.misc.extensionUtils.getCurrentExtension();
const Util = imports.misc.util;

declare type IconList = 'arrow1-right-symbolic.svg' | 'arrow1-left-symbolic.svg';

const Circle = registerClass(
	class GIE_Circle extends St.Widget {
		constructor(style_class: string) {
			style_class = `gie-circle ${style_class}`;
			super({ style_class });
			this.set_pivot_point(0.5, 0.5);
		}
	},
);

export const ArrowIconAnimation = registerClass(
	class GIE_ArrowIcon extends St.Widget {
		private _inner_circle: typeof Circle.prototype;
		private _outer_circle: typeof Circle.prototype;
		private _arrow_icon: St.Icon;
		private _transition?: { arrow: { from: number; end: number; }; outer_circle: { from: number; end: number; }; };

		constructor() {
			super();

			this._inner_circle = new Circle('gie-inner-circle');
			this._outer_circle = new Circle('gie-outer-circle');
			this._arrow_icon = new St.Icon({ style_class: 'gie-arrow-icon' });

			this._inner_circle.set_clip_to_allocation(true);
			this._inner_circle.add_child(this._arrow_icon);

			this.add_child(this._outer_circle);
			this.add_child(this._inner_circle);
		}

		gestureBegin(icon_name: IconList, from_left: boolean) {
			this._transition = {
				arrow: {
					from: this._inner_circle.width * (from_left ? -1 : 1),
					end: 0,
				},
				outer_circle: {
					from: 1,
					end: 2,
				},
			};

			this._arrow_icon.translation_x = this._transition.arrow.from;
			this._outer_circle.scale_x = this._transition.outer_circle.from;
			this._outer_circle.scale_y = this._outer_circle.scale_x;
			this._arrow_icon.opacity = 255;
			
			// animating showing widget
			this.opacity = 0;
			this.show();
			easeActor(this as St.Widget, {
				opacity: 255,
				mode: Clutter.AnimationMode.EASE_OUT_QUAD,
				duration: WIGET_SHOWING_DURATION,
			});

			this._arrow_icon.set_gicon(Gio.Icon.new_for_string(`${ExtMe.dir.get_uri()}/assets/${icon_name}`));
		}

		gestureUpdate(progress: number) {
			if (this._transition === undefined) return;

			this._arrow_icon.translation_x = Util.lerp(this._transition.arrow.from, this._transition.arrow.end, progress);
			this._outer_circle.scale_x = Util.lerp(this._transition.outer_circle.from, this._transition.outer_circle.end, progress);
			this._outer_circle.scale_y = this._outer_circle.scale_x;
		}

		gestureEnd(duration: number, progress: number, callback: () => void) {
			if (this._transition === undefined) return;

			easeActor(this as St.Widget, {
				opacity: 0,
				mode: Clutter.AnimationMode.EASE_OUT_QUAD,
				duration,
			});

			const translation_x = Util.lerp(this._transition.arrow.from, this._transition.arrow.end, progress);
			easeActor(this._arrow_icon, {
				translation_x,
				duration,
				mode: Clutter.AnimationMode.EASE_OUT_EXPO,
				onStopped: () => {
					callback();
					this.hide();
					this._arrow_icon.opacity = 0;
					this._arrow_icon.translation_x = 0;
					this._outer_circle.scale_x = 1;
					this._outer_circle.scale_y = 1;
				},
			});

			const scale = Util.lerp(this._transition.outer_circle.from, this._transition.outer_circle.end, progress);
			easeActor(this._outer_circle, {
				scale_x: scale,
				scale_y: scale,
				duration,
				mode: Clutter.AnimationMode.EASE_OUT_EXPO,
			});
		}
	},
);