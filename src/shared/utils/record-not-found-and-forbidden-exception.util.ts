//Core
import { ForbiddenException, NotFoundException } from '@nestjs/common';
// Types
import { RecordInfo, RecordAction, RecordType } from './types';

export const recordNotFoundAndForbiddenException = (
  record: RecordInfo,
  loggedUserRole: string,
  loggedUserId: number,
  action: RecordAction,
  recordType: RecordType,
) => {
  if (!record)
    throw new NotFoundException(
      `${recordType.charAt(0).toUpperCase() + recordType.slice(1)} not found`,
    );

  // if (
  //   loggedUserRole === 'MODERATOR' &&
  //   recordType === 'post' &&
  //   record.authorId !== loggedUserId &&
  //   record.author?.role !== 'USER'
  // ) {
  //   throw new ForbiddenException(
  //     `You can only ${action} your own posts and posts from users, not from other moderators and admins!`,
  //   );
  // }

  // if (
  //   loggedUserRole === 'ADMIN' &&
  //   recordType === 'post' &&
  //   record.authorId !== loggedUserId &&
  //   record.author?.role === 'ADMIN'
  // ) {
  //   throw new ForbiddenException(
  //     `You can only ${action} your own posts and posts from users and moderators but not from other admins!`,
  //   );
  // }

  if (
    recordType === 'post' &&
    record.authorId !== loggedUserId &&
    ((loggedUserRole === 'MODERATOR' && record.author?.role !== 'USER') ||
      (loggedUserRole === 'ADMIN' && record.author?.role === 'ADMIN'))
  ) {
    const roleMessage =
      loggedUserRole === 'MODERATOR'
        ? 'other moderators and admins'
        : 'other admins';

    throw new ForbiddenException(
      `You can only ${action} your own posts and posts from users, not from ${roleMessage}!`,
    );
  }

  if (
    recordType === 'user' &&
    record.role === 'ADMIN' &&
    loggedUserId !== record.id
  ) {
    throw new ForbiddenException(
      `You can only ${action} users and moderaotors, not other admins!`,
    );
  }

  // if (
  //   (recordType === 'post' &&
  //     record.authorId !== loggedUserId &&
  //     ((loggedUserRole === 'MODERATOR' && record.author?.role !== 'USER') ||
  //       (loggedUserRole === 'ADMIN' && record.author?.role === 'ADMIN'))) ||
  //   (recordType === 'user' &&
  //     record.role === 'ADMIN' &&
  //     loggedUserId !== record.id)
  // ) {
  //   const roleMessage =
  //     loggedUserRole === 'MODERATOR'
  //       ? 'other moderators and admins'
  //       : 'other admins';

  //   const actionMessage =
  //     recordType === 'post'
  //       ? `You can only ${action} your own posts and posts from users, not from ${roleMessage}!`
  //       : `You can only ${action} users and moderators, not other admins!`;

  //   throw new ForbiddenException(actionMessage);
  // }
};
