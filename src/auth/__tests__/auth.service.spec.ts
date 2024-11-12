//Core
import { Test, TestingModule } from '@nestjs/testing';
//Services
import { AuthService } from 'src/auth/auth.service';
//Modules
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
//Guards
import { AuthGuard } from '../guards/auth.guard';

describe('AuthService', () => {
  let service: AuthService;

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
      providers: [
        AuthService,
        {
          provide: 'APP_GUARD',
          useClass: AuthGuard,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
