//Core
import { Module } from '@nestjs/common';
//Services
import { PostService } from './post.service';
//Controllers
import { PostController } from './post.controller';
//Modules
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
