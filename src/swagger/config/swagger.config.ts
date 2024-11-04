//Swagger
import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('Blog Posts API')
  .setDescription(
    'API documentation for managing blog posts, users, and authentication',
  )
  .setVersion('1.0')
  .addBearerAuth()
  .build();
