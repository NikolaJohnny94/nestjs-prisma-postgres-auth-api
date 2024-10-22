import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/singin-dto';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';
import { Public } from './decorators/public.decorator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.pass);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() signUpDto: CreateUserDto) {
    return this.authService.signUp(signUpDto);
  }

  @UseGuards(AuthGuard)
  @Post('signout')
  async signOut(@Request() req) {
    const userId = req.user.sub;
    return this.authService.signOut(userId);
  }

  @UseGuards(AuthGuard)
  @Post('refresh')
  async refreshToken(@Body('refresh_token') refreshToken: string, @Req() req) {
    const userId = req.user.sub;
    return this.authService.getNewAccessToken(userId, refreshToken);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.userService.getUser({ id: req.user.sub });
    return user;
  }
}
