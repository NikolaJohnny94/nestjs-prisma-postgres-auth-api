import {
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
  Res,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Controller } from '@nestjs/common';
import { PostService } from './post.service';
import { Response } from 'express';
import { GetQueryPostParamsDto } from './dto/params/get-query-post-params.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { PostResponse } from './types/response.type';
import { UpdatePostDto } from './dto/update-post.dto';
import { buildQueryPayload } from './helpers/build-query-payload.helper';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('')
  async getPosts(
    @Res({ passthrough: true }) response: Response,
    @Query() params: GetQueryPostParamsDto,
  ): Promise<PostResponse> {
    try {
      const queryPayload = buildQueryPayload(params);
      const data = await this.postService.posts(queryPayload);
      return { success: true, message: 'Posts retrieved successfully', data };
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error occurred while trying to retrieve posts from the DB.',
        data: null,
      });
    }
  }

  @Get(':id')
  async getPostById(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) response: Response,
  ): Promise<PostResponse> {
    try {
      const post = await this.postService.post({ id });
      if (!post) {
        response.status(HttpStatus.NOT_FOUND);
        return {
          success: false,
          message: `Post with id: ${id} not found in the DB`,
          data: null,
        };
      }
      return {
        success: true,
        message: 'Post retrieved successfully',
        data: post,
      };
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return {
        success: false,
        message: `Error occured while trying to retrieve post with id: ${id} from the DB.`,
        data: null,
      };
    }
  }

  @Post('')
  async createNewPost(
    @Body() postData: CreatePostDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<PostResponse> {
    const { title, content } = postData;
    try {
      const data = await this.postService.createPost({
        title,
        content,
        author: {
          connect: { email: 'tom@email.com' },
        },
      });
      return { success: true, message: 'Post created successfully', data };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        response.status(HttpStatus.BAD_REQUEST);
        return {
          success: false,
          data: null,
          message:
            'Validation error occurred. Please double-check your input data and try again.',
        };
      }
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        response.status(HttpStatus.CONFLICT);
        return {
          success: false,
          data: null,
          message:
            'A post with the same title already exists. Please try again with a different title.',
        };
      }
      response.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return {
        success: false,
        message:
          'Error occured while trying to create new post in the DB. Please try again.',
        data: null,
      };
    }
  }

  @Get('filtered/:searchString')
  async getFilteredPosts(
    @Param('searchString') searchString: string,
    @Res({ passthrough: true }) response: Response,
    @Query() params: GetQueryPostParamsDto,
  ): Promise<PostResponse> {
    try {
      const queryPayload = buildQueryPayload(params, false);
      const lowerSearchString = searchString.toLowerCase();
      const posts = await this.postService.posts({
        ...queryPayload,
        where: {
          OR: [
            {
              title: { contains: lowerSearchString, mode: 'insensitive' },
            },
            {
              content: { contains: lowerSearchString, mode: 'insensitive' },
            },
          ],
        },
      });
      return {
        success: true,
        message: 'Filtered posts retrieved successfully',
        data: posts,
      };
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return {
        success: false,
        message: 'Error occurred while retrieving filtered posts from the DB.',
        data: null,
      };
    }
  }

  @Put(':id')
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: UpdatePostDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<PostResponse> {
    try {
      const updatedPost = await this.postService.updatePost({
        where: { id },
        data: body,
      });
      return {
        success: true,
        message: 'Post updated successfully',
        data: updatedPost,
      };
    } catch (error) {
      response.status(HttpStatus.NOT_FOUND);
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        return {
          success: false,
          message: `Post with id: ${id} not found in the DB`,
          data: null,
        };
      }
      if (error instanceof Prisma.PrismaClientValidationError) {
        response.status(HttpStatus.BAD_REQUEST);
        return {
          success: false,
          data: null,
          message:
            'Validation error occurred. Please double-check your input data and try again.',
        };
      }
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        response.status(HttpStatus.CONFLICT);
        return {
          success: false,
          data: null,
          message:
            'A post with the same title already exists. Please try again with a different title.',
        };
      }
      response.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return {
        success: false,
        message: 'Error occurred while updating post in the DB.',
        data: null,
      };
    }
  }

  @Delete(':id')
  async deletePost(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) response: Response,
  ): Promise<PostResponse> {
    try {
      const deletedPost = await this.postService.deletePost({ id });

      return {
        success: true,
        message: 'Post deleted successfully',
        data: deletedPost,
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        return {
          success: false,
          message: 'Post not found!',
          data: null,
        };
      }
      response.status(HttpStatus.INTERNAL_SERVER_ERROR);
      return {
        success: false,
        message: 'Error occurred while deleting post from the DB.',
        data: null,
      };
    }
  }
}
