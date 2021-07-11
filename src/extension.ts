/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

import { ExtensionMeta, imports } from 'gnome-shell';
import { Indicator } from './lib/indicator';

const ExtensionUtils = imports.misc.extensionUtils;
const Main = imports.ui.main;

const GETTEXT_DOMAIN = 'my-indicator-extension';

const Gettext = imports.gettext.domain(GETTEXT_DOMAIN);

class Extension implements IExtension {
	private _uuid: string;
	private _indicator?: typeof Indicator.prototype;

	constructor(uuid: string) {
		this._uuid = uuid;

		ExtensionUtils.initTranslations(GETTEXT_DOMAIN);
	}

	enable() {
		this._indicator = new Indicator(Gettext.gettext);
		Main.panel.addToStatusArea(this._uuid, this._indicator);
	}

	disable() {
		if (this._indicator) {
			this._indicator.destroy();
			this._indicator = undefined;
		}
	}
}

export function init(meta: ExtensionMeta): IExtension {
	return new Extension(meta.uuid);
}
