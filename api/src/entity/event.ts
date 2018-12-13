import {
    Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { Comment } from './comment';
import { User } from './user';

@Entity('event')
export class Event {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  time: Date;

  @Column()
  organizer: string;

  @Column()
  contact: string;

  @Column()
  location: string;

  @OneToMany(type => Comment, comment => comment.event)
  comments: Comment[];

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

}
