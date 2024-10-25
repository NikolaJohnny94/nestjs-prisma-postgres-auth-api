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
  ForbiddenException,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
// Services
import { PostService } from './post.service';
// Types and DTOs
import { GetQueryPostParamsDto } from './dto/params/get-query-post-params.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostResponse } from './types/response.type';
// Utils and helpers
import { buildQueryPayload } from './helpers/build-query-payload.helper';
import { Public } from 'src/auth/decorators/public.decorator';

enum ROLES {
  USER = 'USER',
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN',
}

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('')
  async getUsersPosts(
    @Query() params: any,
    //ParsePipe type
    @Request() request,
  ): Promise<PostResponse> {
    const queryPayload = buildQueryPayload(params, true, {
      authorId: request.user.sub,
    });

    //contains i published/unpublished
    // samo contains published/unpublished, (authorId vec je prebaceno) i id postoji ruta za to

    const data = await this.postService.getPosts(queryPayload);

    return { success: true, message: 'Posts retrieved successfully', data };
  }

  @Public()
  @Get('published')
  async getAllPublishedPosts(@Query() params: any): Promise<PostResponse> {
    const queryPayload = buildQueryPayload(params, true, {
      published: true,
    });
    // contains samo
    // samo contains published (vec prebaceno) (authorId new treba) i id postoji ruta za to
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
    const user = request.user;

    const post = await this.postService.getPost({
      id,
      ...(user.role === 'USER' && { authorId: user.sub }),
    });

    if (!post) throw new NotFoundException('Post not found');

    if (user.role === 'MODERATOR' && post.author.role === 'ADMIN') {
      throw new ForbiddenException("You cannot update admin's posts");
    }

    if (
      user.role === 'MODERATOR' &&
      post.authorId !== user.sub &&
      post.author.role === 'MODERATOR'
    ) {
      throw new ForbiddenException(
        'You can only update your own posts and posts from users',
      );
    }

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
    const user = request.user;

    const post = await this.postService.getPost({
      id,
      ...(user.role === 'USER' && { authorId: user.sub }),
    });

    console.log(post, user.sub, user.role, post.author.role);

    if (!post) throw new NotFoundException('Post not found');

    if (user.role === 'MODERATOR' && post.author.role === 'ADMIN') {
      throw new ForbiddenException("You cannot delete admin's posts");
    }

    if (
      user.role === 'MODERATOR' &&
      post.authorId !== user.sub &&
      post.author.role === 'MODERATOR'
    ) {
      throw new ForbiddenException(
        'You can only delete your own posts and posts from users',
      );
    }

    const deletedPost = await this.postService.deletePost({
      id,
    });

    return {
      success: true,
      message: 'Post deleted successfully',
      data: deletedPost,
    };
  }

  // @Get(':id')
  // async getPostById(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Request() request,
  // ): Promise<PostResponse> {
  //   const post = await this.postService.getPost({
  //     id,
  //     authorId: request.user.sub,
  //   });

  //   if (!post) throw new NotFoundException('Post not found');

  //   return {
  //     success: true,
  //     message: 'Post retrieved successfully',
  //     data: post,
  //   };
  // }
}

// @Get('filtered/:searchString')
// async getFilteredPosts(
//   @Param('searchString') searchString: string,
//   @Request() request,
//   @Query() params: GetQueryPostParamsDto,
// ): Promise<PostResponse> {
//   const queryPayload = buildQueryPayload(params, false);
//   const posts = await this.postService.getPosts({
//     ...queryPayload,
//     where: {
//       authorId: request.user.sub,
//       OR: [
//         {
//           title: {
//             contains: searchString.toLowerCase(),
//             mode: 'insensitive',
//           },
//         },
//         {
//           content: {
//             contains: searchString.toLowerCase(),
//             mode: 'insensitive',
//           },
//         },
//       ],
//     },
//   });

//   return {
//     success: true,
//     message: 'Filtered posts retrieved successfully',
//     data: posts,
//   };
// }
