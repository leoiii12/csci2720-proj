import { IsDateString, IsDefined } from 'class-validator';

import { Event } from '@boilerplate/entity';
import { DB, Func } from '@boilerplate/util';

export class CreateEventInput {
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

export async function createEvent(input: CreateEventInput) {
  const connection = await DB.getConnection();
  const eventRepository = connection.getRepository(Event);

  const event = new Event();
  event.title = input.title;
  event.time = new Date(input.time);
  event.organizer = input.organizer;
  event.contact = input.contact;
  event.location = input.location;

  await eventRepository.insert(event);
}

export async function run(context: any) {
  context.res = await Func.run1(
    context,
    createEvent,
    CreateEventInput,
  );
}
