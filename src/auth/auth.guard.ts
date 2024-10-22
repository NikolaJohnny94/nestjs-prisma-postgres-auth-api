import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';
import { UserService } from 'src/user/user.service';
import { extractTokenFromHeader } from './helpers/extract-token-from-header.helper';
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
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const user = await this.userService.getUser({ id: payload.sub });

      if (user && user.tokenVersion === payload.tokenVersion) {
        request['user'] = payload;
        return true;
      } else {
        throw new UnauthorizedException('Token is invalid or expired');
      }
    } catch {
      throw new UnauthorizedException();
    }
  }
}
