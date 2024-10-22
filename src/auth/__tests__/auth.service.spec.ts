import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { AuthGuard } from '../auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
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
