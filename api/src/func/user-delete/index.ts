import { IsDefined } from 'class-validator';

import { User } from '@boilerplate/entity';
import { DB, Func } from '@boilerplate/util';

export class DeleteUserInput {
  @IsDefined()
  id: string;
}

export async function deleteUser(input: DeleteUserInput) {
  const connection = await DB.getConnection();
  const userRepository = connection.getRepository(User);

  const user = await userRepository.findOne(input.id);

  if (user) {
    await userRepository.delete(input.id);
  }
}

export async function run(context: any) {
  context.res = await Func.run1(
    context,
    deleteUser,
    DeleteUserInput,
  );
}
