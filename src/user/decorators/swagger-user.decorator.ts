//Core
import { applyDecorators } from '@nestjs/common';
//Swagger
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
//Config
import { swaggerUserConfig } from '../swagger/config';

//Destructuring
const {
  getUsers,
  getProfile,
  updateProfile,
  deleteProfile,
  createUser,
  getUserById,
  getPublicUsersInfo,
  getPublicUserInfoById,
  updateUser,
  deleteUser,
} = swaggerUserConfig;

//Decorators
export function GetUsersSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation(getUsers.apiOperation),
    ApiResponse(getUsers.apiResponse),
  );
}

export function GetProfileSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation(getProfile.apiOperation),
    ApiResponse(getProfile.apiResponse),
  );
}

export function GetPublicUsersInfoSwagger() {
  return applyDecorators(
    ApiOperation(getPublicUsersInfo.apiOperation),
    ApiResponse(getPublicUsersInfo.apiResponse),
  );
}

export function GetUserByIdSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation(getUserById.apiOperation),
    ApiResponse(getUserById.apiResponse),
  );
}

export function GetPublicUserInfoByIdSwagger() {
  return applyDecorators(
    ApiOperation(getPublicUserInfoById.apiOperation),
    ApiResponse(getPublicUserInfoById.apiResponse),
  );
}

export function CreateNewUserSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation(createUser.apiOperation),
    ApiResponse(createUser.apiResponse),
    ApiBody(createUser.apiBody),
  );
}

export function UpdateProfileSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation(updateProfile.apiOperation),
    ApiResponse(updateProfile.apiResponse),
    ApiBody(updateProfile.apiBody),
  );
}

export function DeleteProfileSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation(deleteProfile.apiOperation),
    ApiResponse(deleteProfile.apiResponse),
  );
}

export function UpdateUserSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation(updateUser.apiOperation),
    ApiResponse(updateUser.apiResponse),
    ApiBody(updateUser.apiBody),
  );
}

export function DeleteUserSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation(deleteUser.apiOperation),
    ApiResponse(deleteUser.apiResponse),
  );
}
