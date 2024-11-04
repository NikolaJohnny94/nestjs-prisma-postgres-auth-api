// Core
import { Injectable } from '@nestjs/common';
// Prisma
import { Prisma } from '@prisma/client';
// Services
import { PrismaService } from 'src/prisma/prisma.service';
// DTOs
import { CreateUserDto } from 'src/shared/dto/create-user.dto';
import { GetUserParamsDto, UpdateProfileDto, UpdateUserDto } from './dto';
//Types
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    select?: Prisma.UserSelect,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      select,
    });
  }

  async getUsers(
    params: GetUserParamsDto,
    select?: Prisma.UserSelect,
  ): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select,
    });
  }

  async createUser(
    data: CreateUserDto,
    select?: Prisma.UserSelect,
  ): Promise<User> {
    return this.prisma.user.create({
      data,
      select,
    });
  }

  async updateUser(
    params: {
      where: Prisma.UserWhereUniqueInput;
      data: UpdateProfileDto | UpdateUserDto;
    },
    select?: Prisma.UserSelect,
  ): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      where,
      data,
      select,
    });
  }

  async deleteUser(
    where: Prisma.UserWhereUniqueInput,
    select?: Prisma.UserSelect,
  ): Promise<User> {
    return this.prisma.user.delete({
      where,
      select,
    });
  }

  async storeRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<{ refreshToken: string }> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
      select: { refreshToken: true },
    });
  }

  async removeRefreshToken(userId: number): Promise<{ refreshToken: string }> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
      select: { refreshToken: true },
    });
  }

  async incrementTokenVersion(
    userId: number,
  ): Promise<{ tokenVersion: number }> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { tokenVersion: { increment: 1 } },
      select: { tokenVersion: true },
    });
  }
}
