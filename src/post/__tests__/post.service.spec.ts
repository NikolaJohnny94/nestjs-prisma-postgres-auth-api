//Core
import { Test, TestingModule } from '@nestjs/testing';
//Services
import { PostService } from 'src/post/post.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('PostService', () => {
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService, PrismaService],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
