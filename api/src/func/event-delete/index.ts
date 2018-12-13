import { IsDefined } from 'class-validator';

import { Event } from '@boilerplate/entity';
import { DB, Func, UserFriendlyError } from '@boilerplate/util';

export class DeleteEventInput {
  @IsDefined()
  id: string;
}

export async function deleteEvent(input: DeleteEventInput) {
  const connection = await DB.getConnection();
  const eventRepository = connection.getRepository(Event);

  const event = await eventRepository.findOne(input.id);
  if (event === undefined) {
    throw new UserFriendlyError('The event does not exist.');
  }

  event.isDeleted = true;

  await eventRepository.save(event);
}

export async function run(context: any) {
  context.res = await Func.run1(
    context,
    deleteEvent,
    DeleteEventInput,
  );
}
