import { IsDefined } from 'class-validator';

import { Event } from '@boilerplate/entity';
import { DB, Func } from '@boilerplate/util';

export class DeleteEventInput {
  @IsDefined()
  id: string;
}

export async function deleteEvent(input: DeleteEventInput) {
  const connection = await DB.getConnection();
  const eventRepository = connection.getRepository(Event);

  const user = await eventRepository.findOne({
    where: {
      id: input.id,
    },
  });

  if (user) {
    await eventRepository.delete(user);
  }
}

export async function run(context: any) {
  context.res = await Func.run1(
    context,
    deleteEvent,
    DeleteEventInput,
  );
}
