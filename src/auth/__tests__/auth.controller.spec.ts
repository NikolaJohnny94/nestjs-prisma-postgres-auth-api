import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from '../auth.service';
import { AuthGuard } from '../auth.guard';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
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
