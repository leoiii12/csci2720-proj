import {
    Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

import { Role } from './role';

@Entity('user')
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  mobilePhone: string;

  @Column()
  password: string;

  @Column('simple-array')
  roles: Role[];

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

}
