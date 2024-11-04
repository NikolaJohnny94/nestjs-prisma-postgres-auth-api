import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      const { method, originalUrl, body, params } = req;
      const { statusCode } = res;

      console.log('\n', method, originalUrl, body, statusCode, `${duration}ms`);
    });

    next();
  }
}