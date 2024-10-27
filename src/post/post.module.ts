//Core
import { Module } from '@nestjs/common';
//Services
import { PostService } from './post.service';
import { PrismaService } from 'src/prisma/prisma.service';
//Controllers
import { PostController } from './post.controller';

@Module({
  providers: [PostService, PrismaService],
  controllers: [PostController],
})
export class PostModule {}
