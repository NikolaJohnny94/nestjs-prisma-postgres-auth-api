import { Role } from '@prisma/client';

export type RecordInfo = {
  id?: number;
  authorId?: number;
  role?: string;
  author?: {
    role: Role;
  };
};
