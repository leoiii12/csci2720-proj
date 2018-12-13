import { IsDefined } from 'class-validator';

import { Event, User } from '@boilerplate/entity';
import { DB, Func, UserFriendlyError } from '@boilerplate/util';

export class ListEventInput {
  @IsDefined()
  isFavorite: boolean;

  @IsDefined()
  username: string;
}

export class ListEventOutput {
  constructor(public events: Event[]) {
  }
}

export async function listEvent(input: ListEventInput) {
  const connection = await DB.getConnection();
  const eventRepository = connection.getRepository(Event);
  const userRepository = connection.getRepository(User);

  if (input.isFavorite) {
    const user = await userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.favoriteEvents', 'event')
      .where('user.username = :username', { username: input.username })
      .getOne();

    if (user === undefined) {
      throw new UserFriendlyError('The user does not exist.');
    }

    return new ListEventOutput(user.favoriteEvents.filter(e => e.isDeleted === false));
  }

  const events = await eventRepository.find({ where: { isDeleted: false } });

  return new ListEventOutput(events);
}

export async function run(context: any) {
  context.res = await Func.run1(
    context,
    listEvent,
    ListEventInput,
  );
}
