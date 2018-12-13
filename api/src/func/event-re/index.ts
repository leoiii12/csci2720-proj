import { Event } from '@boilerplate/entity';
import { DB, Func } from '@boilerplate/util';

export async function reEvent() {
  const connection = await DB.getConnection();
  const eventRepository = connection.getRepository(Event);

  await eventRepository.clear();
}

export async function run(context: any) {
  context.res = await Func.run0(
    context,
    reEvent,
  );
}
