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

import { existsSync, readFileSync } from 'fs'
import { resolve } from 'path'
import { parse } from 'yaml'

import { Config } from './types'

const path = resolve(__dirname, '../../../config.yml')

if (!existsSync(path)) {
  throw new Error(`Config doesn't exists: ${path}`)
}

export const config: Config = {
  app: parse(readFileSync(path, 'utf8')),
  api: {},
  bot: {},
  db: {
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT),
    name: process.env.DB_NAME!,
    user: process.env.DB_USER!,
    pass: process.env.DB_PASS!
  }
}
