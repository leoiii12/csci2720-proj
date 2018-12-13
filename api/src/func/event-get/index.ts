import { IsDefined } from 'class-validator';

import { Event, User } from '@boilerplate/entity';
import { DB, Func, UserFriendlyError } from '@boilerplate/util';

export class GetEventInput {
  @IsDefined()
  id: string;

  @IsDefined()
  username: string;
}

export class GetEventOutput {
  constructor(public event: Event, public isFavorite: boolean) {
  }
}

export async function getEvent(input: GetEventInput) {
  const connection = await DB.getConnection();
  const eventRepository = connection.getRepository(Event);
  const userRepository = connection.getRepository(User);

  const event = await eventRepository
    .createQueryBuilder('event')
    .leftJoinAndSelect('event.comments', 'comment')
    .where('event.id = :id AND event.isDeleted = 0', { id: input.id })
    .getOne();

  if (event === undefined) {
    throw new UserFriendlyError('The event does not exist.');
  }

  const user = await userRepository
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.favoriteEvents', 'event')
    .where('user.username = :username', { username: input.username })
    .getOne();

  if (user === undefined) {
    throw new UserFriendlyError('The user does not exist.');
  }

  return new GetEventOutput(event, user.favoriteEvents.some(e => e.id === event.id));
}

export async function run(context: any) {
  context.res = await Func.run1(
    context,
    getEvent,
    GetEventInput,
  );
}
