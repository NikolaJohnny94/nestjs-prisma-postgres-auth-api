import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('')
  async signupUser(
    @Body() userData: { name: string; email: string; password: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Get('get')
  async getUser(@Body() userWhereUniqueInput: any): Promise<UserModel> {
    return this.userService.getUser(userWhereUniqueInput);
  }
}
