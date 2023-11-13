// Copyright Sebastian Wiesner <sebastian@swsnr.de>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0.If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//
// Alternatively, the contents of this file may be used under the terms
// of the GNU General Public License Version 2 or later, as described below:
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

import type Gio from "@gi-types/gio2";

// See https://gjs.guide/extensions/topics/extension.html#types
export declare interface ExtensionMetadata {
  readonly uuid: string;
  readonly name: string;
  readonly description: string;
  readonly "shell-version": readonly string[];
  readonly dir: Gio.File;
  readonly path: string;
  readonly url: string;
}

declare class ExtensionBase {
  constructor(metadata: ExtensionMetadata);

  get metadata(): ExtensionMetadata;
  getSettings(schema?: string): Gio.Settings;
  public static lookupByUUID(uuid: string): ExtensionBase;
}

export declare class Extension extends ExtensionBase {
  constructor(metadata: ExtensionMetadata);

  enable(): void;

  disable(): void;
}
