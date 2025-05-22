import { HttpException, HttpStatus } from '@nestjs/common';

export class DatabaseException extends HttpException {
  constructor(code: string, message: string) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `An error occured while interacting with the project's database.`,
        details: {
          code,
          message,
        },
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
