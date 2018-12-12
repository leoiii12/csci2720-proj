import { Event } from '@boilerplate/entity';
import { DB, Func } from '@boilerplate/util';

export class ListEventOutput {
  constructor(public events: Event[]) {
  }
}

export async function listEvent() {
  const connection = await DB.getConnection();
  const eventRepository = connection.getRepository(Event);

  const events = await eventRepository.find();

  return new ListEventOutput(events);
}

export async function run(context: any) {
  context.res = await Func.run0(
    context,
    listEvent,
  );
}
