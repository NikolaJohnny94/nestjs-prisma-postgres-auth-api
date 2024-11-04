//Core
import {
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
  Request,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
// Services
import { PostService } from './post.service';
//Guards
import { RolesGuard } from 'src/shared/guards/roles.guard';
// Utils and helpers
import { buildQueryPayload } from './helpers/build-query-payload.helper';
import { recordNotFoundAndForbiddenException } from 'src/shared/utils/record-not-found-and-forbidden-exception.util';
// Decorators
import { Public, Roles } from 'src/shared/decorators';
import {
  GetUsersPostsSwagger,
  GetAllPublishedPostsSwagger,
  GetPublishedPostByIdSwagger,
  GetUsersPostByIdSwagger,
  CreatePostSwagger,
  UpdatePostSwagger,
  UpdatePublishedPostSwagger,
  DeletePostSwagger,
  DeletePublishedPostSwagger,
} from './decorators/swagger-post.decorator';
//  DTOs
import { CreatePostDto, UpdatePostDto } from './dto';
//Types
import { Request as ExpressRequest } from 'express';
import { PostResponse, PostParams, RequestedPostInfoForCheck } from './types';
//Swagger
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @GetUsersPostsSwagger()
  @Get('')
  async getUsersPosts(
    @Query() params: PostParams,
    @Request() request,
  ): Promise<PostResponse> {
    const queryPayload = buildQueryPayload(params, {
      authorId: request.user.sub,
    });

    const data = await this.postService.getPosts(queryPayload, {
      id: true,
      title: true,
      content: true,
      published: true,
    });

    return { success: true, message: 'Posts retrieved successfully', data };
  }

  @GetAllPublishedPostsSwagger()
  @Public()
  @Get('published')
  async getAllPublishedPosts(
    @Query() params: PostParams,
  ): Promise<PostResponse> {
    const queryPayload = buildQueryPayload(params, {
      published: true,
    });

    const data = await this.postService.getPosts(queryPayload, {
      id: true,
      title: true,
      content: true,
      author: {
        select: {
          id: true,
          name: true,
          role: true,
        },
      },
    });

    return {
      success: true,
      message: 'All published posts retrieved successfully!',
      data,
    };
  }

  @GetPublishedPostByIdSwagger()
  @Public()
  @Get('published/:id')
  async getPublishedPostById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PostResponse> {
    const post = await this.postService.getPost(
      {
        id,
        published: true,
      },
      {
        title: true,
        content: true,
        author: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },
      },
    );

    if (!post) throw new NotFoundException('Post not found');

    return {
      success: true,
      message: `Published post with id: ${id} retrieved successfully`,
      data: post,
    };
  }

  @GetUsersPostByIdSwagger()
  @Get(':id')
  async getUsersPostById(
    @Param('id', ParseIntPipe) id: number,
    @Request() request,
  ): Promise<PostResponse> {
    const post = await this.postService.getPost(
      {
        id,
        authorId: request.user.sub,
      },
      {
        title: true,
        content: true,
        published: true,
      },
    );

    if (!post) throw new NotFoundException('Post not found');

    return {
      success: true,
      message: `Post with id: ${id} retrieved successfully`,
      data: post,
    };
  }

  @CreatePostSwagger()
  @Post('')
  async createNewPost(
    @Body() newPost: CreatePostDto,
    @Request() request,
  ): Promise<PostResponse> {
    const { title, content } = newPost;

    const data = await this.postService.createPost(
      {
        title,
        content,
        author: {
          connect: { id: request.user.sub },
        },
      },
      { id: true, title: true, content: true },
    );

    return { success: true, message: 'Post created successfully', data };
  }

  @UpdatePostSwagger()
  @Put(':id')
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updatedPostData: UpdatePostDto,
    @Request() request: ExpressRequest,
  ): Promise<PostResponse> {
    const user = request.user;
    const post = (await this.postService.getPost(
      {
        id,
        authorId: user.sub,
      },
      {
        id: true,
      },
    )) as RequestedPostInfoForCheck;

    if (!post) throw new NotFoundException('Post not found');

    const updatedPost = await this.postService.updatePost(
      {
        where: { id },
        data: updatedPostData,
      },
      {
        id: true,
        title: true,
        content: true,
        published: true,
      },
    );

    return {
      success: true,
      message: 'Post updated successfully',
      data: updatedPost,
    };
  }

  @DeletePostSwagger()
  @Delete(':id')
  async deletePost(
    @Param('id', ParseIntPipe) id: number,
    @Request() request: ExpressRequest,
  ): Promise<PostResponse> {
    const user = request.user;

    const post = await this.postService.getPost(
      { id, authorId: user.sub },
      { id: true },
    );

    if (!post) throw new NotFoundException('Post not found');

    const deletedPost = await this.postService.deletePost(
      { id },
      { id: true, title: true, content: true, published: true },
    );

    return {
      success: true,
      message: 'Post deleted successfully',
      data: deletedPost,
    };
  }

  @UpdatePublishedPostSwagger()
  @UseGuards(RolesGuard)
  @Roles('admin', 'moderator')
  @Put('published/:id')
  async updatePublishedPost(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updatedPostData: UpdatePostDto,
    @Request() request: ExpressRequest,
  ): Promise<PostResponse> {
    const user = request.user;
    const post = (await this.postService.getPost(
      {
        id,
        published: true,
      },
      {
        authorId: true,
        author: {
          select: {
            role: true,
          },
        },
      },
    )) as RequestedPostInfoForCheck;

    recordNotFoundAndForbiddenException(
      post,
      user.role,
      user.sub,
      'update',
      'post',
    );

    const updatedPost = await this.postService.updatePost(
      {
        where: { id },
        data: updatedPostData,
      },
      {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
            role: true,
          },
        },
      },
    );

    return {
      success: true,
      message: 'Published post updated successfully',
      data: updatedPost,
    };
  }

  @DeletePublishedPostSwagger()
  @UseGuards(RolesGuard)
  @Roles('admin', 'moderator')
  @Delete('published/:id')
  async deletePublishedPost(
    @Param('id', ParseIntPipe) id: number,
    @Request() request: ExpressRequest,
  ): Promise<PostResponse> {
    const user = request.user;

    const post = (await this.postService.getPost(
      {
        id,
        published: true,
      },
      {
        authorId: true,
        author: {
          select: {
            role: true,
          },
        },
      },
    )) as RequestedPostInfoForCheck;

    recordNotFoundAndForbiddenException(
      post,
      user.role,
      user.sub,
      'delete',
      'post',
    );

    const deletedPost = await this.postService.deletePost(
      { id },
      {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },
      },
    );

    return {
      success: true,
      message: 'Published post deleted successfully',
      data: deletedPost,
    };
  }
}
