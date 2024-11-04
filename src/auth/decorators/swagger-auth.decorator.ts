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
import { swaggerAuthConfig } from '../swagger/config';

//Destructuring
const { signIn, signUp, signOut, refreshToken } = swaggerAuthConfig;

//Decorators
export function SignInSwagger() {
  return applyDecorators(
    ApiOperation(signIn.apiOperation),
    ApiResponse(signIn.apiResponse),
    ApiBody(signIn.apiBody),
  );
}

export function SignUpSwagger() {
  return applyDecorators(
    ApiOperation(signUp.apiOperation),
    ApiResponse(signUp.apiResponse),
    ApiBody(signUp.apiBody),
  );
}

export function SignOutSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation(signOut.apiOperation),
    ApiResponse(signOut.apiResponse),
  );
}

export function RefreshTokenSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation(refreshToken.apiOperation),
    ApiResponse(refreshToken.apiResponse),
    ApiBody(refreshToken.apiBody),
  );
}
