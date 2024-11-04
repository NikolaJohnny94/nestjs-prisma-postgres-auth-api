//Core
import { Injectable } from '@nestjs/common';
//Prisma
import { Prisma } from '@prisma/client';
// Services
import { PrismaService } from '../prisma/prisma.service';
//DTOs
import { GetPostParamsDto } from './dto';
//Types
import { Post } from '@prisma/client';
import { PostWithAuthorDataIncluded } from './types';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getPost(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput,
    select?: Prisma.PostSelect,
  ): Promise<PostWithAuthorDataIncluded | null> {
    return this.prisma.post.findUnique({
      where: postWhereUniqueInput,
      select,
    });
  }

  async getPosts(
    params: GetPostParamsDto,
    select?: Prisma.PostSelect,
  ): Promise<PostWithAuthorDataIncluded[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select,
    });
  }

  async createPost(
    data: Prisma.PostCreateInput,
    select?: Prisma.PostSelect,
  ): Promise<Post> {
    return this.prisma.post.create({
      data,
      select,
    });
  }

  async updatePost(
    params: {
      where: Prisma.PostWhereUniqueInput;
      data: Prisma.PostUpdateInput;
    },
    select?: Prisma.PostSelect,
  ): Promise<Post> {
    const { data, where } = params;
    return this.prisma.post.update({
      data,
      where,
      select,
    });
  }

  async deletePost(
    where: Prisma.PostWhereUniqueInput,
    select?: Prisma.PostSelect,
  ): Promise<Post> {
    return await this.prisma.post.delete({
      where: {
        id: where.id,
        authorId: where.authorId,
      },
      select,
    });
  }
}
