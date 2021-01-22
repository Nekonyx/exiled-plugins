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

import { existsSync, readdirSync } from 'fs'
import { resolve } from 'path'

export const getProjectRoot = (): string | null => {
  let path = __dirname
  let i = 0

  while (i++ <= 6) {
    path = resolve(path, '../')

    if (existsSync(resolve(path, 'package.json'))) {
      return path
    }
  }

  return null
}

export const getWorkspaces = (includeWeb?: boolean): string[] => {
  const root = getProjectRoot()

  if (!root) {
    return []
  }

  let workspaces = [
    ...readdirSync(resolve(root, 'services')).map((x) => resolve(root, 'services', x)),
    ...readdirSync(resolve(root, 'shared')).map((x) => resolve(root, 'shared', x))
  ]

  if (!includeWeb) {
    workspaces = workspaces.filter((ws) => !ws.endsWith('web'))
  }

  return workspaces.filter((ws) => existsSync(resolve(ws, 'package.json')))
}

export const run = (fn: () => Promise<any>) =>
  fn().catch((err) => {
    console.error('❌ Error:', err)
    process.exit(1)
  })
