//Swagger
import { SwaggerModule } from '@nestjs/swagger';
import { config } from './swagger.config';
//Types
import { INestApplication } from '@nestjs/common';

export const documentFactory = (app: INestApplication<any>) =>
  SwaggerModule.createDocument(app, config);
