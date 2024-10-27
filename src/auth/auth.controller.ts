//Core
import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
// Services
import { AuthService } from './auth.service';
//Guards
import { AuthGuard } from './auth.guard';
// Decorators
import { Public } from './decorators/public.decorator';
//DTOs
import { SignInDto } from './dto/signin-dto';
import { CreateUserDto } from 'src/shared/dto/create-user.dto';
//Types
import { BaseResponse, AuthResponse, TokenResponse } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() signInDto: SignInDto): Promise<AuthResponse> {
    const { email, pass } = signInDto;
    const tokens = await this.authService.signIn(email, pass);
    return {
      success: true,
      message: 'User signed in successfully',
      data: tokens,
    };
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signUp(@Body() signUpDto: CreateUserDto): Promise<AuthResponse> {
    const newUser = await this.authService.signUp(signUpDto);
    return {
      success: true,
      message: 'User signed up successfully',
      data: newUser,
    };
  }

  @Post('signout')
  async signOut(@Request() request): Promise<BaseResponse> {
    const userId = request.user.sub;
    await this.authService.signOut(userId);
    return {
      success: true,
      message: 'User signed out successfully',
    };
  }

  @UseGuards(AuthGuard)
  @Post('refresh')
  async refreshToken(
    @Body('refresh_token') refreshToken: string,
    @Request() request,
  ): Promise<Pick<TokenResponse, 'access_token'>> {
    const userId = request.user.sub;
    return this.authService.getNewAccessToken(userId, refreshToken);
  }
}
