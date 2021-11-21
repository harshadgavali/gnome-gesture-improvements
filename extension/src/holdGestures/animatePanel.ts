import { registerClass } from '../../common/utils/gobject';
import Clutter from '@gi-types/clutter8';
import St from '@gi-types/st1';

import { global, imports } from 'gnome-shell';
import { easeActor } from '../utils/environment';

const Main = imports.ui.main;
const { lerp } = imports.misc.util;

/**
 * GObject Class to animate top panel in circular animation
 * Without displaying it on any other monitors
 */
export const DummyCyclicPanel = registerClass(
	class extends Clutter.Actor {
		panelBox: St.BoxLayout<Clutter.Actor<Clutter.LayoutManager, Clutter.ContentPrototype>>;
		private PADDING_WIDTH;
		private _container: Clutter.Actor<Clutter.BoxLayout, Clutter.ContentPrototype>;

		constructor() {
			super({ visible: false });

			this.PADDING_WIDTH = 100 * Main.layoutManager.primaryMonitor.geometry_scale;

			this.panelBox = Main.layoutManager.panelBox;

			this._container = new Clutter.Actor({ layoutManager: new Clutter.BoxLayout({ orientation: Clutter.Orientation.HORIZONTAL, spacing: this.PADDING_WIDTH }) });
			this.add_child(this._container);

			this._container.add_child(new Clutter.Clone({ source: this.panelBox }));
			this._container.add_child(new Clutter.Clone({ source: this.panelBox }));

			// this.add_constraint(new MonitorConstraint({ primary: true }));
			this.set_clip_to_allocation(true);
			Main.layoutManager.uiGroup.add_child(this);
		}

		vfunc_get_preferred_height(for_width: number) {
			return this.panelBox.get_preferred_height(for_width);
		}

		vfunc_get_preferred_width(for_height: number) {
			return this.panelBox.get_preferred_width(for_height);
		}

		beginGesture() {
			// hide main panel
			Main.layoutManager.panelBox.opacity = 0;

			Main.layoutManager.panelBox.set_style_class_name('no-panel-corner');

			let x, y;

			// dash-to-panel
			if (this.panelBox.get_parent() !== Main.layoutManager.uiGroup)
				[x, y] = this.panelBox.get_parent().get_position();
			else
				[x, y] = Main.layoutManager.panelBox.get_position();

			if (x === null || y === null) {
				const { x, y } = Main.layoutManager.primaryMonitor;
				this.set_position(x, y);
			}
			else
				this.set_position(x, y);

			this.visible = true;
			Main.layoutManager.uiGroup.set_child_above_sibling(this, null);
		}

		updateGesture(progress: number) {
			// log('setting position to: ' + this.get_position());
			this._container.translation_x = this._getTranslationFor(progress);
		}

		endGesture(endProgress: number, duration: number) {
			// gesture returns accelerated end value, hence need to do this
			const current_workspace = global.workspace_manager.get_active_workspace_index();
			const translation_x = (
				endProgress > current_workspace ||
				(endProgress === current_workspace && this._container.translation_x <= this.min_cyclic_translation / 2)
			) ? this.min_cyclic_translation : 0;

			easeActor(this._container, {
				translation_x,
				duration,
				mode: Clutter.AnimationMode.EASE_OUT_CUBIC,
				onStopped: () => {
					this.visible = false;

					// add corners
					Main.layoutManager.panelBox.remove_style_class_name('no-panel-corner');
					Main.layoutManager.panelBox.opacity = 255;
				},
			});
		}

		private _getTranslationFor(progress: number) {
			const begin = Math.floor(progress);
			const end = Math.ceil(progress);
			progress = begin === end ? 0 : (progress - begin) / (end - begin);

			return lerp(0, this.min_cyclic_translation, progress);
		}

		/** returns maximium negative value because translation is always negative */
		get min_cyclic_translation(): number {
			return -(this.width + this.PADDING_WIDTH);
		}
	},
);