//Core
import { Test, TestingModule } from '@nestjs/testing';
//Services
import { PostService } from 'src/post/post.service';
import { PrismaService } from 'src/prisma/prisma.service';
//Controllers
import { PostController } from 'src/post/post.controller';

describe('PostController', () => {
  let controller: PostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [PostService, PrismaService],
    }).compile();

    controller = module.get<PostController>(PostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
