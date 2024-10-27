//Core
import { Module } from '@nestjs/common';
//Services
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
//Controllers
import { UserController } from './user.controller';

@Module({
  providers: [UserService, PrismaService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
