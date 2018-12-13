import { DB, Func } from '@boilerplate/util';

export async function reEvent() {
  const connection = await DB.getConnection();

  connection.query('DELETE FROM comment WHERE 1 = 1;');
  connection.query('DELETE FROM user_favorite_events_event WHERE 1 = 1;');
  connection.query('DELETE FROM event WHERE 1 = 1;');
}

export async function run(context: any) {
  context.res = await Func.run0(
    context,
    reEvent,
  );
}
