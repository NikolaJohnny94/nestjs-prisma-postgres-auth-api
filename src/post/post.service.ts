//Core
import { Injectable } from '@nestjs/common';
//Prisma
import { Prisma, Post, Role } from '@prisma/client';
// Services
import { PrismaService } from '../prisma/prisma.service';
//DTOs
import { GetPostParamsDto } from './dto/params/get-post-params.dto';

type PostWithAuthor = Post & { author: { role: Role } };

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getPost(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput,
  ): Promise<PostWithAuthor | null> {
    return this.prisma.post.findUnique({
      where: postWhereUniqueInput,
      include: {
        author: {
          select: {
            role: true,
          },
        },
      },
    });
  }

  async getPosts(params: GetPostParamsDto): Promise<Post[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPost(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({
      data,
    });
  }

  async updatePost(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    const { data, where } = params;
    return this.prisma.post.update({
      data,
      where,
    });
  }

  async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return await this.prisma.post.delete({
      // where
      where: {
        id: where.id,
        authorId: where.authorId,
      },
    });
  }

  async updatePostOtherExample(params: {
    id: number;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    const { data, id } = params;
    return this.prisma.post.update({
      data,
      where: { id },
    });
  }
}
