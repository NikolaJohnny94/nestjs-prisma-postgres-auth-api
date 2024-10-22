import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AppGuardProvider } from './providers/app-guard.provider';

const configuredJwtModule = JwtModule.register({
  global: true,
  secret: process.env.JWT_SECRET,
});

@Module({
  imports: [UserModule, configuredJwtModule],
  controllers: [AuthController],
  providers: [AuthService, AppGuardProvider],
})
export class AuthModule {}
