//Core
import { Module } from '@nestjs/common';
// Services
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
//Controllers
import { AuthController } from './auth.controller';
//Modules
import { UserModule } from 'src/user/user.module';
//Providers
import { AppGuardProvider } from './providers/app-guard.provider';
//Config
import { jwtConfig } from './config';

@Module({
  imports: [UserModule, JwtModule.register(jwtConfig)],
  controllers: [AuthController],
  providers: [AuthService, AppGuardProvider],
})
export class AuthModule {}
