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
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn
} from 'typeorm'

import { PluginState } from '@ex-plugins/constants'

import { getNextId } from '../utils'
import { User } from './'
import { Category } from './category'
import { File } from './file'
import { Release } from './release'

@Entity('plugins')
export class Plugin {
  @PrimaryColumn('bigint')
  public id = getNextId()

  @Column('varchar', {
    unique: true
  })
  public name!: string

  @Column('varchar', {
    unique: true
  })
  public slug!: string

  @Column('enum', {
    enum: PluginState,
    default: PluginState.Active
  })
  public state!: PluginState

  @Column('text')
  public description!: string

  @Column('varchar')
  public license!: string

  @OneToOne(() => File, {
    nullable: true
  })
  public icon?: string

  @Column('int', {
    default: 0
  })
  public totalDownloads!: number

  @OneToOne(() => Release)
  @JoinColumn()
  public currentRelease!: Release

  @ManyToOne(() => User, (u) => u.plugins)
  @JoinColumn()
  public creator!: User

  @ManyToOne(() => Plugin, (p) => p.forks, {
    nullable: true
  })
  public mainline?: Plugin

  @OneToMany(() => Plugin, (p) => p.mainline)
  public forks!: Plugin[]

  @OneToMany(() => Release, (r) => r.plugin)
  public releases!: Release[]

  // @ManyToOne(() => Category, (c) => c.plugins)
  // @JoinColumn()
  @ManyToMany(() => Category, (c) => c.plugins)
  @JoinTable()
  public categories!: Category
}
