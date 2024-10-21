import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.getUser({ email });

    if (user?.password !== pass) throw new UnauthorizedException();

    const access_token = await this.jwtService.signAsync({ sub: user.id });

    return { access_token };
  }
}
