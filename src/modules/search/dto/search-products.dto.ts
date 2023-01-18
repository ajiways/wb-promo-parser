import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SearchProductsDto {
  @ApiProperty({
    default: 'Косметичка женская',
    description: 'Название товара для поиска',
  })
  @IsString()
  search: string;
}
