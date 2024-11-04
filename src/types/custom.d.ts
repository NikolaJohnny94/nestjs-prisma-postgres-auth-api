//Express
import { Request } from 'express';
//Types
import { LoggedUser } from './logged-user.type';

declare module 'express' {
  export interface Request {
    user?: LoggedUser;
  }
}
