//Core
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
//Types
import { LoggedUser } from 'src/shared/types/logged-user.type';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user: LoggedUser = request.user;

    const hasRole = () => roles.includes(user.role);
    if (!hasRole()) {
      throw new ForbiddenException('You do not have the required role');
    }

    return true;
  }
}
