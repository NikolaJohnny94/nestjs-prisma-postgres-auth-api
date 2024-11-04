//Core
import { Module, NestModule, type MiddlewareConsumer } from '@nestjs/common';
//Services
import { AppService } from './app.service';
//Controllers
import { AppController } from './app.controller';
//Modules
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
//Middlewares
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [UserModule, PostModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
