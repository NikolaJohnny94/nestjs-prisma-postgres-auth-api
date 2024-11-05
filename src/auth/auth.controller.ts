//Core
import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Request,
} from '@nestjs/common';
// Services
import { AuthService } from './auth.service';
// Decorators
import { Public } from 'src/shared/decorators';
import {
  SignInSwagger,
  SignUpSwagger,
  SignOutSwagger,
  RefreshTokenSwagger,
} from './decorators/swagger-auth.decorator';
//DTOs
import { SignInDto } from './dto/signin-dto';
import { CreateUserDto } from 'src/shared/dto/create-user.dto';
//Types
import { BaseResponse, AuthResponse, TokenResponse } from './types';
//Swagger
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @SignInSwagger()
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() signInDto: SignInDto): Promise<AuthResponse> {
    const { email, password } = signInDto;
    const tokens = await this.authService.signIn(email, password);
    return {
      success: true,
      message: 'User signed in successfully',
      data: tokens,
    };
  }

  @SignUpSwagger()
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

  @SignOutSwagger()
  @Post('signout')
  async signOut(@Request() request): Promise<BaseResponse> {
    const userId = request.user.sub;
    await this.authService.signOut(userId);
    return {
      success: true,
      message: 'User signed out successfully',
    };
  }

  @RefreshTokenSwagger()
  @Post('refresh')
  async refreshToken(
    @Body('refresh_token') refreshToken: string,
    @Request() request,
  ): Promise<Pick<TokenResponse, 'access_token'>> {
    const userId = request.user.sub;
    return this.authService.getNewAccessToken(userId, refreshToken);
  }
}
