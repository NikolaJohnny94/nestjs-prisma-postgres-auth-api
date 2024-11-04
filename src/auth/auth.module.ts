//Core
import { Module } from '@nestjs/common';
// Services
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
//Controllers
import { AuthController } from './auth.controller';
//Modules
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
//Providers
import { AppGuardProvider } from './providers/app-guard.provider';
//Config
import { jwtConfig } from './config';

@Module({
  imports: [PrismaModule, UserModule, JwtModule.register(jwtConfig)],
  providers: [AuthService, AppGuardProvider],
  controllers: [AuthController],
})
export class AuthModule {}
