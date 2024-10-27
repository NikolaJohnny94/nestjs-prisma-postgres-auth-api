import { User } from '@prisma/client';

export type UserResponse = {
  success: boolean;
  message: string;
  data: User | User[] | null;
};
