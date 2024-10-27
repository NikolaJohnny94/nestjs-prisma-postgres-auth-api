import { Role } from '@prisma/client';

export type LoggedUser = {
  sub: number;
  role: Role;
  tokenVestion: number;
  iat: number;
  exp: number;
};
