import {
    Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { Event } from './event';
import { Role } from './role';

@Entity('user')
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column('simple-array')
  roles: Role[];

  @ManyToMany(type => Event)
  @JoinTable()
  favoriteEvents: Event[];

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

}
