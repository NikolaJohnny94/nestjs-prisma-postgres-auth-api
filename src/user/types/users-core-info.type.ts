import { User } from '@prisma/client';

export type UsersCoreInfo = Pick<User, 'id' | 'name' | 'email'>;
