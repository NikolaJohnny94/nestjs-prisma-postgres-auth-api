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

  if (
    loggedUserRole === 'MODERATOR' &&
    ((recordType === 'post' &&
      record.authorId !== loggedUserId &&
      record.author?.role !== 'USER') ||
      (recordType === 'user' &&
        record.role !== 'USER' &&
        loggedUserId !== record.id))
  ) {
    throw new ForbiddenException(
      `You can only ${action} your own ${recordType}s and ${recordType}s from users, not from other moderators and admins!`,
    );
  }
};
