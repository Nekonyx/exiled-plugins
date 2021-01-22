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

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from 'typeorm'

import { getNextId } from '../utils'
import { Release } from './release'

@Entity('downloads')
export class Download {
  @PrimaryColumn('bigint')
  public id = getNextId()

  @Column('char', {
    length: 40
  })
  public userAgent!: string

  @Column('varchar', {
    length: 45
  })
  public ip!: string

  @ManyToOne(() => Release, (r) => r.downloads)
  @JoinColumn()
  public release!: Release

  @CreateDateColumn()
  public createdAt = new Date()
}
