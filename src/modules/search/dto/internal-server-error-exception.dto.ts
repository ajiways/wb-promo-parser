import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class InternalServerErrorExceptionDto {
  @ApiProperty({ default: 'Что-то пошло не так (:' })
  message: string;

  @ApiProperty({ default: 'internal server error' })
  error: string;

  @ApiProperty({ default: HttpStatus.INTERNAL_SERVER_ERROR })
  status: HttpStatus.INTERNAL_SERVER_ERROR;
}
