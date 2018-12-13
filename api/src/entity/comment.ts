import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Event } from './event';

@Entity('comment')
export class Comment {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  username: string;

  @ManyToOne(type => Event, user => user.comments)
  event: Event;

  @CreateDateColumn()
  createDate: Date;

}
