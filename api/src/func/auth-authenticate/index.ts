import { compare } from 'bcryptjs';
import { IsDefined } from 'class-validator';
import { sign } from 'jsonwebtoken';

import { User } from '@boilerplate/entity';
import { DB, Func, UnauthorizedError, UserFriendlyError } from '@boilerplate/util';

export class AuthenticateInput {
  @IsDefined()
  username: string;

  @IsDefined()
  password: string;
}

export class AuthenticateOutput {
  constructor(public accessToken: string) {
  }
}

export async function authenticate(input: AuthenticateInput): Promise<AuthenticateOutput> {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error('Invalid AUTH_SECRET.');

  const connection = await DB.getConnection();
  const userRepository = connection.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      username: input.username,
    },
  });
  if (!user) throw new UserFriendlyError('Invalid username.');

  const isValid = await compare(input.password, user.password);
  if (!isValid) throw new UserFriendlyError('Invalid password.');

  const options = {
    expiresIn: 60 * 60 * 24 * 31,
    audience: ['http://localhost:7071'],
    issuer: 'http://localhost:7071',
    subject: user.id,
  };

  const payload = {
    role: user.roles,
    gty: 'Auth/Authenticate',
  };

  const token = await sign(payload, secret, options);

  return new AuthenticateOutput(token);
}

export async function run(context: any) {
  context.res = await Func.run1(
    context,
    authenticate,
    AuthenticateInput,
  );
}
