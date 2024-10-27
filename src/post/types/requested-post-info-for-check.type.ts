import { Role } from '@prisma/client';

export type RequestedPostInfoForCheck = {
  authorId: number;
  author: {
    role: Role;
  };
};
