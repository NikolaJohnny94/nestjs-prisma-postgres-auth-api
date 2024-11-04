// Core
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// Services
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
// Decorators
import { IS_PUBLIC_KEY } from 'src/shared/decorators';
// Helper
import { extractTokenFromHeader } from '../helpers/extract-token-from-header.helper';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();

    try {
      const jwtPayload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.userService.getUser({ id: jwtPayload.sub });

      if (user && user.tokenVersion === jwtPayload.tokenVersion) {
        request['user'] = jwtPayload;
        return true;
      } else {
        throw new UnauthorizedException('Token is invalid or expired');
      }
    } catch {
      throw new UnauthorizedException();
    }
  }
}
