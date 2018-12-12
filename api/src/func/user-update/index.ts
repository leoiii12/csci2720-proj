import { hash } from 'bcryptjs';
import { IsDefined } from 'class-validator';

import { User } from '@boilerplate/entity';
import { DB, Func, UserFriendlyError } from '@boilerplate/util';

export class UpdateUserInput {
  @IsDefined()
  id: string;

  @IsDefined()
  password: string;
}

export async function updateUser(input: UpdateUserInput) {
  const connection = await DB.getConnection();
  const userRepository = connection.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      id: input.id,
    },
  });
  if (!user) throw new UserFriendlyError('The user does not exist.');

  user.password = await hash(input.password, 12);

  await userRepository.save(user);
}

export async function run(context: any, req: any) {
  context.res = await Func.run1(
    context,
    updateUser,
    UpdateUserInput,
  );
}
