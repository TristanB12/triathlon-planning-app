import { HttpException, HttpStatus } from '@nestjs/common';

export class DatabaseConnectionFailedException extends HttpException {
  constructor(code: string) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Failed to connect to the project's database.`,
        details: {
          code,
        },
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
