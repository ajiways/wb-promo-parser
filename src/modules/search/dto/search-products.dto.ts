import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { IsBooleanLike } from '../../../decorators/is-boolean-like.decorator';

export class SearchProductsDto {
  @ApiProperty({
    default: 'Косметичка женская',
    description: 'Название товара для поиска',
  })
  @IsString()
  search: string;

  @ApiProperty({
    type: 'enum',
    enum: ['true', '1'],
    default: null,
    description:
      'Boolean-like флаг. Нужен что бы определить, нужно ли скроллить страницу до конца (задеплоенная версия упадет в таймаут, юзать только локально)',
    required: false,
  })
  @IsOptional()
  @IsBooleanLike({ isOptional: true })
  scroll = false;
}
