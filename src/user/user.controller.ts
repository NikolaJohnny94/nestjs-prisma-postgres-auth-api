import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { Public } from 'src/auth/decorators/public.decorator';
import { Request } from '@nestjs/common';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';

type UserResponse = {
  success: boolean;
  message: string;
  data: User | User[] | null;
};

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
    const loggedUser = request.user;

    const user = await this.userService.getUser({ id });

    if (!user) throw new NotFoundException('User not found');

    if (loggedUser.role === 'MODERATOR' && user.role === 'ADMIN') {
      throw new ForbiddenException('You cannot update admin users!');
    }

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
    const loggedUser = request.user;

    const user = await this.userService.getUser({ id });

    if (!user) throw new NotFoundException('User not found');

    if (loggedUser.role === 'MODERATOR' && user.role === 'ADMIN') {
      throw new ForbiddenException('You cannot delete admin users!');
    }

    const deletedUser = await this.userService.deleteUser({ id });

    return {
      success: true,
      message: 'User deleted successfully',
      data: deletedUser,
    };
  }
}
