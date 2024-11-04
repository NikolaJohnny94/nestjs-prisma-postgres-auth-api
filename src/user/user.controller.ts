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
import { RolesGuard } from 'src/shared/guards/roles.guard';
//Utils
import { recordNotFoundAndForbiddenException } from 'src/shared/utils/record-not-found-and-forbidden-exception.util';
//Decorators
import { Public, Roles } from 'src/shared/decorators';
import {
  GetUsersSwagger,
  GetProfileSwagger,
  GetPublicUsersInfoSwagger,
  GetUserByIdSwagger,
  GetPublicUserInfoByIdSwagger,
  CreateNewUserSwagger,
  UpdateProfileSwagger,
  UpdateUserSwagger,
  DeleteProfileSwagger,
  DeleteUserSwagger,
} from './decorators/swagger-user.decorator';
//DTOs
import { CreateUserDto } from 'src/shared/dto/create-user.dto';
import { UpdateProfileDto, UpdateUserDto } from './dto';
//Types
import { Request as ExpressRequest } from 'express';
import { UserResponse } from './types';
//Swagger
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GetUsersSwagger()
  @UseGuards(RolesGuard)
  @Roles('admin', 'moderator')
  @Get('')
  async getUsers(): Promise<UserResponse> {
    const users = await this.userService.getUsers(
      {},
      {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    );
    return {
      success: true,
      message: 'Users retrieved successfully!',
      data: users,
    };
  }

  @GetProfileSwagger()
  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.userService.getUser(
      { id: req.user.sub },
      { id: true, name: true, email: true, role: true },
    );
    return {
      success: true,
      message: 'Users profile info retrieved successfully',
      data: user,
    };
  }

  @GetPublicUsersInfoSwagger()
  @Public()
  @Get('public')
  async getPublicUsersInfo(): Promise<UserResponse> {
    const users = await this.userService.getUsers(
      {},
      { id: true, name: true, role: true },
    );
    return {
      success: true,
      message: 'Public users info retrieved successfully!',
      data: users,
    };
  }

  @GetUserByIdSwagger()
  @UseGuards(RolesGuard)
  @Roles('admin', 'moderator')
  @Get(':id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponse> {
    const user = await this.userService.getUser(
      { id },
      {
        id: true,
        email: true,
        name: true,
        role: true,
        posts: {
          where: { published: true },
          select: { id: true, title: true, content: true },
        },
      },
    );

    if (!user) throw new NotFoundException('User not found');

    return {
      success: true,
      message: 'User retrieved successfully!',
      data: user,
    };
  }

  @GetPublicUserInfoByIdSwagger()
  @Public()
  @Get('public/:id')
  async getPublicUserInfoById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponse> {
    const user = await this.userService.getUser(
      { id },
      {
        name: true,
        role: true,
        posts: {
          where: { published: true },
          select: {
            id: true,
            title: true,
            content: true,
          },
        },
      },
    );

    if (!user) throw new NotFoundException('User not found');

    return {
      success: true,
      message: 'Public user info retrieved successfully!',
      data: user,
    };
  }

  @CreateNewUserSwagger()
  @UseGuards(RolesGuard)
  @Roles('admin', 'moderator')
  @Post('')
  async createNewUser(@Body() newUser: CreateUserDto): Promise<UserResponse> {
    const { name, email, password } = newUser;

    const data = await this.userService.createUser(
      {
        name,
        email,
        password,
      },
      {
        id: true,
        name: true,
        email: true,
      },
    );

    return { success: true, message: 'User created successfully', data };
  }

  @UpdateProfileSwagger()
  @Put('/profile')
  async updateProfile(
    @Body()
    updatedUsersData: UpdateProfileDto,
    @Request() request: ExpressRequest,
  ): Promise<UserResponse> {
    const { sub: userId } = request.user;

    const updatedPost = await this.userService.updateUser(
      {
        where: { id: userId },
        data: updatedUsersData,
      },
      {
        name: true,
        email: true,
      },
    );

    return {
      success: true,
      message: 'User profile updated successfully',
      data: updatedPost,
    };
  }

  @DeleteProfileSwagger()
  @Delete('/profile')
  async deleteProfile(
    @Request() request: ExpressRequest,
  ): Promise<UserResponse> {
    const { sub: userId } = request.user;

    const deletedUser = await this.userService.deleteUser(
      {
        id: userId,
      },
      {
        name: true,
        email: true,
      },
    );

    return {
      success: true,
      message: 'Users profile deleted successfully',
      data: deletedUser,
    };
  }

  @UpdateUserSwagger()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updatedUsersData: UpdateUserDto,
    @Request() request: ExpressRequest,
  ): Promise<UserResponse> {
    const loggedUser = request.user;

    const user = await this.userService.getUser(
      { id },
      { role: true, id: true },
    );

    recordNotFoundAndForbiddenException(
      user,
      loggedUser.role,
      loggedUser.sub,
      'update',
      'user',
    );
    const updatedPost = await this.userService.updateUser(
      {
        where: { id },
        data: updatedUsersData,
      },
      {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    );

    return {
      success: true,
      message: 'User updated successfully',
      data: updatedPost,
    };
  }

  @DeleteUserSwagger()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @Request() request: ExpressRequest,
  ): Promise<UserResponse> {
    const loggedUser = request.user;

    const user = await this.userService.getUser(
      { id },
      { role: true, id: true },
    );

    recordNotFoundAndForbiddenException(
      user,
      loggedUser.role,
      loggedUser.sub,
      'delete',
      'user',
    );

    const deletedUser = await this.userService.deleteUser(
      { id },
      {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    );

    return {
      success: true,
      message: 'User deleted successfully',
      data: deletedUser,
    };
  }
}
