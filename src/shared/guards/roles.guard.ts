//Core
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
//Express
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user;

    const hasRole = () => roles.includes(user.role);
    if (!hasRole()) {
      throw new ForbiddenException(
        'You do not have the required permission to perform this action',
      );
    }

    return true;
  }
}
