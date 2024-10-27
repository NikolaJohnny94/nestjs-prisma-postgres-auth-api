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
// Types and DTOs
import { CreatePostDto, UpdatePostDto } from './dto';
import { PostResponse, PostParams, RequestedPostInfoForCheck } from './types';
// Utils and helpers
import { buildQueryPayload } from './helpers/build-query-payload.helper';
import { recordNotFoundAndForbiddenException } from 'src/shared/utils/record-not-found-and-forbidden-exception.util';
// Decorators
import { Public } from 'src/auth/decorators/public.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { LoggedUser } from 'src/shared/types/logged-user.type';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('')
  async getUsersPosts(
    @Query() params: PostParams,
    @Request() request,
  ): Promise<PostResponse> {
    const queryPayload = buildQueryPayload(params, {
      authorId: request.user.sub,
    });

    const data = await this.postService.getPosts(queryPayload);

    return { success: true, message: 'Posts retrieved successfully', data };
  }

  @Public()
  @Get('published')
  async getAllPublishedPosts(
    @Query() params: PostParams,
  ): Promise<PostResponse> {
    const queryPayload = buildQueryPayload(params, {
      published: true,
    });

    const data = await this.postService.getPosts(queryPayload);

    return { success: true, message: 'Posts retrieved successfully', data };
  }

  @Public()
  @Get('published/:id')
  async getPublishedPostById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PostResponse> {
    const post = await this.postService.getPost({
      id,
      published: true,
    });

    if (!post) throw new NotFoundException('Post not found');

    return {
      success: true,
      message: 'Post retrieved successfully',
      data: post,
    };
  }

  @Get(':id')
  async getUsersPostById(
    @Param('id', ParseIntPipe) id: number,
    @Request() request,
  ): Promise<PostResponse> {
    const post = await this.postService.getPost({
      id,
      authorId: request.user.sub,
    });

    if (!post) throw new NotFoundException('Post not found');

    return {
      success: true,
      message: 'Post retrieved successfully',
      data: post,
    };
  }

  @Post('')
  async createNewPost(
    @Body() newPost: CreatePostDto,
    @Request() request,
  ): Promise<PostResponse> {
    const { title, content } = newPost;

    const data = await this.postService.createPost({
      title,
      content,
      author: {
        connect: { id: request.user.sub },
      },
    });

    return { success: true, message: 'Post created successfully', data };
  }

  @Put(':id')
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updatedPostData: UpdatePostDto,
    @Request() request,
  ): Promise<PostResponse> {
    const user: LoggedUser = request.user;
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

    const updatedPost = await this.postService.updatePost({
      where: { id },
      data: updatedPostData,
    });

    return {
      success: true,
      message: 'Post updated successfully',
      data: updatedPost,
    };
  }

  @Delete(':id')
  async deletePost(
    @Param('id', ParseIntPipe) id: number,
    @Request() request,
  ): Promise<PostResponse> {
    const user: LoggedUser = request.user;

    const post = await this.postService.getPost(
      { id, authorId: user.sub },
      { id: true },
    );

    if (!post) throw new NotFoundException('Post not found');

    const deletedPost = await this.postService.deletePost({ id });

    return {
      success: true,
      message: 'Post deleted successfully',
      data: deletedPost,
    };
  }

  @UseGuards(RolesGuard)
  @Roles('admin', 'moderator')
  @Put('published/:id')
  async updatePublishedPost(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updatedPostData: UpdatePostDto,
    @Request() request,
  ): Promise<PostResponse> {
    const user: LoggedUser = request.user;
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

    const updatedPost = await this.postService.updatePost({
      where: { id },
      data: updatedPostData,
    });

    return {
      success: true,
      message: 'Post updated successfully',
      data: updatedPost,
    };
  }

  @UseGuards(RolesGuard)
  @Roles('admin', 'moderator')
  @Delete('published/:id')
  async deletePublishedPost(
    @Param('id', ParseIntPipe) id: number,
    @Request() request,
  ): Promise<PostResponse> {
    const user: LoggedUser = request.user;

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

    const deletedPost = await this.postService.deletePost({ id });

    return {
      success: true,
      message: 'Post deleted successfully',
      data: deletedPost,
    };
  }
}
