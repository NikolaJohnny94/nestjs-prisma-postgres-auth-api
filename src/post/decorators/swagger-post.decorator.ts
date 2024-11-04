//Core
import { applyDecorators } from '@nestjs/common';
//Swagger
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
//Config
import { swaggerPostConfig } from '../swagger/config';

// Destructuring
const {
  getUsersPosts,
  getPublishedPosts,
  getPublishedPostById,
  getUsersPostById,
  createPost,
  updatePost,
  deletePost,
  updatePublishedPost,
  deletePublishedPost,
} = swaggerPostConfig;

// Decorators
export function GetUsersPostsSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation(getUsersPosts.apiOperation),
    ApiResponse(getUsersPosts.apiResponse),
    ApiQuery(getUsersPosts.apiQuery[0]),
    ApiQuery(getUsersPosts.apiQuery[1]),
    ApiQuery(getUsersPosts.apiQuery[2]),
    ApiQuery(getUsersPosts.apiQuery[3]),
    ApiQuery(getUsersPosts.apiQuery[4]),
  );
}

export function GetAllPublishedPostsSwagger() {
  return applyDecorators(
    ApiOperation(getPublishedPosts.apiOperation),
    ApiResponse(getPublishedPosts.apiResponse),
    ApiQuery(getPublishedPosts.apiQuery[0]),
    ApiQuery(getPublishedPosts.apiQuery[1]),
    ApiQuery(getPublishedPosts.apiQuery[2]),
    ApiQuery(getPublishedPosts.apiQuery[3]),
    ApiQuery(getPublishedPosts.apiQuery[4]),
  );
}

export function GetPublishedPostByIdSwagger() {
  return applyDecorators(
    ApiOperation(getPublishedPostById.apiOperation),
    ApiResponse(getPublishedPostById.apiResponse),
  );
}

export function GetUsersPostByIdSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation(getUsersPostById.apiOperation),
    ApiResponse(getUsersPostById.apiResponse),
  );
}

export function CreatePostSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation(createPost.apiOperation),
    ApiResponse(createPost.apiResponse),
    ApiBody(createPost.apiBody),
  );
}

export function UpdatePostSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation(updatePost.apiOperation),
    ApiResponse(updatePost.apiResponse),
    ApiBody(updatePost.apiBody),
  );
}

export function DeletePostSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation(deletePost.apiOperation),
    ApiResponse(deletePost.apiResponse),
  );
}

export function UpdatePublishedPostSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation(updatePublishedPost.apiOperation),
    ApiResponse(updatePublishedPost.apiResponse),
    ApiBody(updatePublishedPost.apiBody),
  );
}

export function DeletePublishedPostSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation(deletePublishedPost.apiOperation),
    ApiResponse(deletePublishedPost.apiResponse),
  );
}
