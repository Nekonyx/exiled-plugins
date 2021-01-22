/**
 * Copyright (C) 2021 Nekonyx
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

export enum Permission {
  Administrator = 0x1,
  ManagePlugins = 0x2,
  ManageUsers = 0x4,
  UploadPlugins = 0x8,
  ForkPlugins = 0x10
}

export enum PluginState {
  Active = 'active',
  Discontinued = 'discontinued'
}

export enum ReleaseType {
  Alpha = 'alpha',
  Beta = 'beta',
  Stable = 'stable'
}

export enum FileType {
  Image = 'image',
  Archive = 'archive',
  Plugin = 'plugin',
  Other = 'other'
}