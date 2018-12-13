import { hash } from 'bcryptjs';
import { IsDefined, MaxLength, MinLength } from 'class-validator';

import { User } from '@boilerplate/entity';
import { DB, Func, UserFriendlyError } from '@boilerplate/util';

export class CreateUserInput {
  @IsDefined()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsDefined()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}

export async function createUser(input: CreateUserInput) {
  const connection = await DB.getConnection();
  const userRepository = connection.getRepository(User);

  let user = await userRepository.findOne({
    where: {
      username: input.username,
    },
  });
  if (user) throw new UserFriendlyError('The username is occupied.');

  user = new User();
  user.username = input.username;
  user.password = await hash(input.password, 12);
  user.roles = [];

  await userRepository.insert(user);
}

export async function run(context: any, req: any) {
  context.res = await Func.run1(
    context,
    createUser,
    CreateUserInput,
  );
}
