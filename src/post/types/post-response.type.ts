import { Post } from '@prisma/client';
export type PostResponse = {
  success: boolean;
  message: string;
  data: Post | Post[] | null;
};
