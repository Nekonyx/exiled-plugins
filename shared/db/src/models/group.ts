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
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'

import { Permission } from '@ex-plugins/constants'

import { getNextId } from '../utils'
import { User } from './user'

@Entity('groups')
export class Group {
  @PrimaryColumn('bigint')
  public id = getNextId()

  @Column('varchar', {
    unique: true
  })
  public name!: string

  @Column('char', {
    length: 6
  })
  public color!: string

  @Column('bigint')
  public permissions!: Permission

  @OneToMany(() => User, (u) => u.group)
  public users!: User[]

  @CreateDateColumn()
  public createdAt = new Date()

  @UpdateDateColumn()
  public updatedAt = new Date()
}
