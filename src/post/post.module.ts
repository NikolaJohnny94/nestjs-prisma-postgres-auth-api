import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostController } from './post.controller';

@Module({
  providers: [PostService, PrismaService],
  controllers: [PostController],
})
export class PostModule {}
