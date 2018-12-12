import { User } from '@boilerplate/entity';
import { DB, Func } from '@boilerplate/util';

export class ListUserOutput {
  constructor(public users: User[]) {
  }
}

export async function listUser() {
  const connection = await DB.getConnection();
  const userRepository = connection.getRepository(User);

  const users = await userRepository.find();

  for (const user of users) {
    user.password = 'encrypted';
  }

  return new ListUserOutput(users);
}

export async function run(context: any) {
  context.res = await Func.run0(
    context,
    listUser,
  );
}
