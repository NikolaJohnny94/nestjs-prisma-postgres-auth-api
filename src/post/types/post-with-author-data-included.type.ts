import { Post, Role } from '@prisma/client';

export type PostWithAuthorDataIncluded = Post & {
  author?: {
    name?: string;
    id?: number;
    email?: string;
    password?: string;
    refreshToken?: string | null;
    tokenVersion?: number;
    role?: Role;
  };
};
