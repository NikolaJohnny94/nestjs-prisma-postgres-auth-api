// Core
import { Injectable } from '@nestjs/common';
// Prisma
import * as client from '@prisma/client';
// Services
import { PrismaService } from 'src/prisma/prisma.service';
// DTOs
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(
    userWhereUniqueInput: client.Prisma.UserWhereUniqueInput,
    select?: client.Prisma.UserSelect,
  ): Promise<client.User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      select,
    });
  }

  async getUsers(
    params: {
      skip?: number;
      take?: number;
      cursor?: client.Prisma.UserWhereUniqueInput;
      where?: client.Prisma.UserWhereInput;
      orderBy?: client.Prisma.UserOrderByWithRelationInput;
    },
    select?: client.Prisma.UserSelect,
  ): Promise<client.User[]> {
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

  async createUser(data: CreateUserDto): Promise<client.User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: client.Prisma.UserWhereUniqueInput;
    data: client.Prisma.UserUpdateInput;
  }): Promise<client.User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(
    where: client.Prisma.UserWhereUniqueInput,
  ): Promise<client.User> {
    return this.prisma.user.delete({
      where,
    });
  }

  async storeRefreshToken(userId: number, refreshToken: string) {
    return this.updateUser({
      where: { id: userId },
      data: { refreshToken },
    });
  }

  async removeRefreshToken(userId: number) {
    return this.updateUser({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }

  async incrementTokenVersion(userId: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { tokenVersion: { increment: 1 } },
    });
  }
}
