//Core
import {
  Request,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
// Services
import { UserService } from './user.service';
//Guards
import { RolesGuard } from 'src/auth/guards/roles.guard';
//Utils
import { recordNotFoundAndForbiddenException } from 'src/shared/utils/record-not-found-and-forbidden-exception.util';
//Decorators
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Public } from 'src/auth/decorators/public.decorator';
//DTOs
import { CreateUserDto } from 'src/shared/dto/create-user.dto';
//Types
import { UserResponse, RequestedUserInfo } from './types';
import { LoggedUser } from 'src/shared/types/logged-user.type';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(RolesGuard)
  @Roles('admin', 'moderator')
  @Get('')
  async getUsers(): Promise<UserResponse> {
    const users = await this.userService.getUsers({});
    return {
      success: true,
      message: 'Public users info retrieved successfully!',
      data: users,
    };
  }

  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.userService.getUser({ id: req.user.sub });
    return user;
  }

  @UseGuards(RolesGuard)
  @Roles('admin', 'moderator')
  @Get(':id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponse> {
    const user = await this.userService.getUser(
      { id },
      { name: true, role: true },
    );

    if (!user) throw new NotFoundException('User not found');

    return {
      success: true,
      message: 'Public user info retrieved successfully!',
      data: user,
    };
  }

  @Public()
  @Get('public')
  async getPublicUsersInfo(): Promise<UserResponse> {
    const users = await this.userService.getUsers(
      {},
      { name: true, role: true },
    );
    return {
      success: true,
      message: 'Public users info retrieved successfully!',
      data: users,
    };
  }

  @Public()
  @Get('public/:id')
  async getPublicUserInfoById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponse> {
    const user = await this.userService.getUser(
      { id },
      { name: true, role: true },
    );

    if (!user) throw new NotFoundException('User not found');

    return {
      success: true,
      message: 'Public user info retrieved successfully!',
      data: user,
    };
  }

  @UseGuards(RolesGuard)
  @Roles('admin', 'moderator')
  @Post('')
  async createNewUser(@Body() newUser: CreateUserDto): Promise<UserResponse> {
    const { name, email, password } = newUser;

    const data = await this.userService.createUser({
      name,
      email,
      password,
    });

    return { success: true, message: 'User created successfully', data };
  }

  @UseGuards(RolesGuard)
  @Roles('admin', 'moderator')
  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updatedUsersData: any,
    @Request() request,
  ): Promise<UserResponse> {
    const loggedUser: LoggedUser = request.user;

    const user = (await this.userService.getUser(
      { id },
      { role: true, id: true },
    )) as RequestedUserInfo;

    recordNotFoundAndForbiddenException(
      user,
      loggedUser.role,
      loggedUser.sub,
      'update',
      'user',
    );
    const updatedPost = await this.userService.updateUser({
      where: { id },
      data: updatedUsersData,
    });

    return {
      success: true,
      message: 'User updated successfully',
      data: updatedPost,
    };
  }

  @UseGuards(RolesGuard)
  @Roles('admin', 'moderator')
  @Delete(':id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @Request() request,
  ): Promise<UserResponse> {
    const loggedUser: LoggedUser = request.user;

    const user = (await this.userService.getUser(
      { id },
      { role: true, id: true },
    )) as RequestedUserInfo;

    recordNotFoundAndForbiddenException(
      user,
      loggedUser.role,
      loggedUser.sub,
      'delete',
      'user',
    );

    const deletedUser = await this.userService.deleteUser({ id });

    return {
      success: true,
      message: 'User deleted successfully',
      data: deletedUser,
    };
  }
}
