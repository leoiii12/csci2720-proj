import {
    Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { Event } from './event';
import { Role } from './role';

@Entity('user')
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column('simple-array')
  roles: Role[];

  @ManyToMany(type => Event)
  @JoinTable()
  favoriteEvents: string[];

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

}
