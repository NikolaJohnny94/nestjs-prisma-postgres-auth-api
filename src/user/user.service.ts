// Core
import { Injectable } from '@nestjs/common';
// Prisma
import { Prisma } from '@prisma/client';
// Services
import { PrismaService } from 'src/prisma/prisma.service';
// DTOs
import { CreateUserDto } from 'src/shared/dto/create-user.dto';
import { GetUserParamsDto } from './dto/get-user-params.dto';
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

  async createUser(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }

  async storeRefreshToken(userId: number, refreshToken: string): Promise<User> {
    return this.updateUser({
      where: { id: userId },
      data: { refreshToken },
    });
  }

  async removeRefreshToken(userId: number): Promise<User> {
    return this.updateUser({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }

  async incrementTokenVersion(userId: number): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { tokenVersion: { increment: 1 } },
    });
  }
}
