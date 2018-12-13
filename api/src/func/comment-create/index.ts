import { IsDefined, IsUUID, MaxLength, Min, MinLength } from 'class-validator';

import { Comment, Event } from '@boilerplate/entity';
import { DB, Func, UserFriendlyError } from '@boilerplate/util';

export class CreateCommentInput {
  @IsDefined()
  @MaxLength(255)
  @MinLength(1)
  content: string;

  @IsDefined()
  @IsUUID()
  eventId: string;

  @IsDefined()
  @MaxLength(20)
  @MinLength(4)
  username: string;
}

export async function createComment(input: CreateCommentInput) {
  const connection = await DB.getConnection();
  const commentRepository = connection.getRepository(Comment);
  const eventRepository = connection.getRepository(Event);

  const event = await eventRepository.findOne(input.eventId);
  if (!event) throw new UserFriendlyError('The event does not exist.');

  const comment = new Comment();
  comment.content = input.content;
  comment.event = event;
  comment.username = input.username;

  await commentRepository.insert(comment);
}

export async function run(context: any) {
  context.res = await Func.run1(
    context,
    createComment,
    CreateCommentInput,
  );
}
