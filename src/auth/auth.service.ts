// Core
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
// Services
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
// DTOs
import { CreateUserDto } from 'src/shared/dto/create-user.dto';
// Types
import { TokenResponse } from './types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<TokenResponse> {
    const user = await this.usersService.getUser({ email });

    if (!user)
      throw new NotFoundException(
        `User with email: ${email} was not found in the Database`,
      );

    if (user?.password !== pass)
      throw new UnauthorizedException('Incorect password. Pleaase try again.');

    const { tokenVersion: updatedTokenVersion } =
      await this.usersService.incrementTokenVersion(user.id);

    const access_token = await this.jwtService.signAsync(
      { sub: user.id, role: user.role, tokenVersion: updatedTokenVersion },
      { expiresIn: '15m' },
    );
    const refresh_token = await this.jwtService.signAsync(
      { sub: user.id },
      { expiresIn: '7d' },
    );

    await this.usersService.storeRefreshToken(user.id, refresh_token);

    return { refresh_token, access_token };
  }
  async signUp(signUpData: CreateUserDto): Promise<TokenResponse> {
    const user = await this.usersService.createUser(signUpData);

    const { tokenVersion: updatedTokenVersion } =
      await this.usersService.incrementTokenVersion(user.id);

    const access_token = await this.jwtService.signAsync(
      { sub: user.id, role: user.role, tokenVersion: updatedTokenVersion },
      { expiresIn: '1h' },
    );
    const refresh_token = await this.jwtService.signAsync(
      { sub: user.id },
      { expiresIn: '7d' },
    );

    await this.usersService.storeRefreshToken(user.id, refresh_token);

    return { refresh_token, access_token };
  }

  async signOut(userId: number): Promise<void> {
    await this.usersService.incrementTokenVersion(userId);
    await this.usersService.removeRefreshToken(userId);
  }

  async getNewAccessToken(
    userId: number,
    refreshToken: string,
  ): Promise<Pick<TokenResponse, 'access_token'>> {
    const user = await this.usersService.getUser({ id: userId });

    if (!user || user.refreshToken !== refreshToken) {
      await this.usersService.removeRefreshToken(userId);
      throw new UnauthorizedException('Invalid refresh token');
    }

    const { tokenVersion: updatedTokenVersion } =
      await this.usersService.incrementTokenVersion(userId);

    const access_token = await this.jwtService.signAsync(
      { sub: user.id, role: user.role, tokenVersion: updatedTokenVersion },
      { expiresIn: '15m' },
    );

    return { access_token };
  }
}
