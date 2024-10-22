import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { GetPostParamsDto } from './dto/params/get-post-params.dto';
@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getPost(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput,
  ): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: postWhereUniqueInput,
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
      where,
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
