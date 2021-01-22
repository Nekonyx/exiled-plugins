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
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'

import { ReleaseType } from '@ex-plugins/constants'

import { getNextId } from '../utils'
import { Download } from './download'
import { Plugin } from './plugin'

@Entity('releases')
export class Release {
  @PrimaryColumn('bigint')
  public id = getNextId()

  @ManyToOne(() => Plugin, (p) => p.releases)
  @JoinColumn()
  public plugin!: Plugin

  @Column('enum', {
    enum: ReleaseType,
    default: ReleaseType.Stable
  })
  public type!: ReleaseType

  @Column('text')
  public changelog!: string

  @Column('varchar', {
    length: 16
  })
  public version!: string

  @Column('varchar', {
    length: 16
  })
  public exiledVersion!: string

  @OneToMany(() => Download, (d) => d.release)
  public downloads!: Download[]

  @Column('int', {
    default: 0
  })
  public downloadsCount!: number

  @CreateDateColumn()
  public createdAt = new Date()

  @UpdateDateColumn()
  public updatedAt = new Date()
}
