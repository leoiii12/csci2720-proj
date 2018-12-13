import { IsDefined, IsUUID, MaxLength, Min, MinLength } from 'class-validator';

import { Comment, Event, User } from '@boilerplate/entity';
import { DB, Func, UserFriendlyError } from '@boilerplate/util';

export class FavoriteEventInput {
  @IsDefined()
  @IsUUID()
  eventId: string;

  @IsDefined()
  @MaxLength(20)
  @MinLength(4)
  username: string;
}

export async function favoriteEvent(input: FavoriteEventInput) {
  const connection = await DB.getConnection();

  const userRepository = connection.getRepository(User);
  const eventRepository = connection.getRepository(Event);

  const user = await userRepository.findOne({
    where: { username: input.username },
  });

  if (user === undefined) {
    throw new UserFriendlyError('The user does not exist.');
  }

  const event = await eventRepository.findOne(input.eventId);

  if (event === undefined) {
    throw new UserFriendlyError('The event does not exist.');
  }

  connection.createQueryBuilder()
    .relation(User, 'favoriteEvents')
    .of(user)
    .add(event);
}

export async function run(context: any) {
  context.res = await Func.run1(
    context,
    favoriteEvent,
    FavoriteEventInput,
  );
}
