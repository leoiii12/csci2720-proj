import { IsDateString, IsDefined } from 'class-validator';

import { Event } from '@boilerplate/entity';
import { DB, Func, UserFriendlyError } from '@boilerplate/util';

export class UpdateEventInput {
  @IsDefined()
  id: string;

  @IsDefined()
  title: string;

  @IsDefined()
  @IsDateString()
  time: string;

  @IsDefined()
  organizer: string;

  @IsDefined()
  contact: string;

  @IsDefined()
  location: string;
}

export async function updateEvent(input: UpdateEventInput) {
  const connection = await DB.getConnection();
  const eventRepository = connection.getRepository(Event);

  const event = await eventRepository.findOne(input.id);
  if (!event) throw new UserFriendlyError('The event does not exist.');

  event.title = input.title;
  event.time = new Date(input.time);
  event.organizer = input.organizer;
  event.contact = input.contact;
  event.location = input.location;

  await eventRepository.save(event);
}

export async function run(context: any) {
  context.res = await Func.run1(
    context,
    updateEvent,
    UpdateEventInput,
  );
}
