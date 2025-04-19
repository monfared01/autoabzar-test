import { HttpException } from '@nestjs/common';

export class ResponseDto<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Error | HttpException;

  constructor(options: {
    success: boolean;
    message?: string;
    data?: T;
    errors?: Error | HttpException;
  }) {
    this.success = options.success;
    this.message = options.message;
    this.data = options.data;
    this.errors = options.errors;
  }

  static ok<T>(data?: T, message = 'Success'): ResponseDto<T> {
    return new ResponseDto({ success: true, message, data });
  }
}
