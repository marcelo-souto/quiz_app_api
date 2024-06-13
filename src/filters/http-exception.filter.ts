import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = (exception.getResponse() as any).message || exception.message;
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      data: null,
    });
    
  }
}
