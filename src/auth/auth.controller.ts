//Core
import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
// Services
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
//Guards
import { AuthGuard } from './auth.guard';
//Types and DTOs
import { SignInDto } from './dto/singin-dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
// Decorators
import { Public } from './decorators/public.decorator';

type AuthResponse = {
  success: boolean;
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
  } | null;
};
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

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
  async signUp(@Body() signUpDto: CreateUserDto) {
    const newUser = await this.authService.signUp(signUpDto);

    return {
      success: true,
      message: 'User signed up successfully',
      data: newUser,
    };
  }

  // @UseGuards(AuthGuard)
  @Post('signout')
  async signOut(@Request() req) {
    const userId = req.user.sub;
    await this.authService.signOut(userId);

    return {
      success: true,
      message: 'User signed out successfully',
    };
  }

  @UseGuards(AuthGuard)
  @Post('refresh')
  async refreshToken(@Body('refresh_token') refreshToken: string, @Req() req) {
    const userId = req.user.sub;
    return this.authService.getNewAccessToken(userId, refreshToken);
  }
}
