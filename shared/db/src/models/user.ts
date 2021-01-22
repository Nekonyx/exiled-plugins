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

import { getNextId } from '../utils'
import { File } from './file'
import { Group } from './group'
import { Plugin } from './plugin'

@Entity('users')
export class User {
  @PrimaryColumn('bigint')
  public id = getNextId()

  @Column('bigint', {
    unique: true
  })
  public discordId!: string

  @Column('varchar', {
    unique: true
  })
  public name!: string

  @ManyToOne(() => Group, (g) => g.users)
  @JoinColumn()
  public group!: Group

  @ManyToOne(() => Plugin, (p) => p.creator)
  @JoinColumn()
  public plugins!: Plugin

  @OneToMany(() => File, (f) => f.uploader)
  public files!: File[]

  @CreateDateColumn()
  public createdAt = new Date()

  @UpdateDateColumn()
  public updatedAt = new Date()
}
