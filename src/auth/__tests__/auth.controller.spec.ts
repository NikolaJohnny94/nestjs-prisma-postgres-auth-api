//Core
import { Test, TestingModule } from '@nestjs/testing';
//Services
import { AuthService } from 'src/auth/auth.service';
//Controllers
import { AuthController } from 'src/auth/auth.controller';
//Modules
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
//Guards
import { AuthGuard } from '../guards/auth.guard';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PrismaModule,
        UserModule,
        JwtModule.register({
          global: true,
          secret: process.env.JWT_SECRET,
        }),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: 'APP_GUARD',
          useClass: AuthGuard,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
