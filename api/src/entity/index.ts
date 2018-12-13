import { Comment } from './comment';
import { Event } from './event';
import { User } from './user';

export * from './comment';
export * from './event';
export * from './role';
export * from './user';

export const ENTITIES = [Comment, User, Event];
