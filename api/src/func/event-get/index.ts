import { IsDefined } from 'class-validator';

import { Event } from '@boilerplate/entity';
import { DB, Func, UserFriendlyError } from '@boilerplate/util';

export class GetEventInput {
  @IsDefined()
  id: string;
}

export class GetEventOutput {
  constructor(public event: Event) {
  }
}

export async function getEvent(input: GetEventInput) {
  const connection = await DB.getConnection();
  const eventRepository = connection.getRepository(Event);

  const event = await eventRepository
    .createQueryBuilder('event')
    .leftJoinAndSelect('event.comments', 'comment')
    .where('event.id = :id', { id: input.id })
    .getOne();

  if (event) {
    return new GetEventOutput(event);
  }

  throw new UserFriendlyError('The event does not exist.');
}

export async function run(context: any) {
  context.res = await Func.run1(
    context,
    getEvent,
    GetEventInput,
  );
}
