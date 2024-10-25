//Core
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
//Prisma
import { Prisma } from '@prisma/client';
//Utils
import { handlePrismaError, getCustomErrorMessage } from './utils';

type HttpExceptionResponse = {
  message: string | string[];
  error: string;
  statusCode: number;
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = (exception.getResponse() as HttpExceptionResponse).message;
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      const { message: prismaClientMessage, status: prismaClientStatus } =
        handlePrismaError(exception);
      message = prismaClientMessage;
      status = prismaClientStatus;
    } else {
      if (exception.message) {
        let id: string;
        if (request.params && request.params.id) id = request.params.id;
        message = getCustomErrorMessage(request.url, request.method, id);
      }
    }

    console.log(exception.message);

    response.status(status).json({
      success: false,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
