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

import { spawn } from 'child_process'
import { basename, resolve } from 'path'

import { getProjectRoot, getWorkspaces, run } from './utils'

run(async () => {
  const root = getProjectRoot()
  const args = [`-p tsconfig.build.json`, ...process.argv.slice(2)]

  const bin = resolve(
    root!,
    'node_modules/.bin',
    process.platform === 'win32' ? 'tsc.cmd' : 'tsc'
  )

  console.log('🔃 TS compiler:', bin)
  console.log('🔃 Arguments:', args)

  for (const m of getWorkspaces()) {
    const name = basename(m)

    console.log(`🔁 ${name}: Spawning...`)

    const proc = spawn(bin, args, {
      shell: true,
      cwd: m
    })

    proc.on('error', (err) => {
      console.error(`❌ ${name}:`, err)
    })

    proc.stderr.on('data', (chunk) => {
      console.error(`❌ ${name}:`, chunk.toString('utf8').trim())
    })

    proc.stdout.on('data', (chunk) => {
      console.log(`⚪ ${name}:`, chunk.toString('utf8').trim())
    })

    proc.on('exit', (code) => {
      console.log(`${code === 0 ? '✅' : '💢'} ${name}: Done (exit code: ${code})`)
    })
  }
})
