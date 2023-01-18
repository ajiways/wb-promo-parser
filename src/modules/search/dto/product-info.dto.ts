import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IProductInfo } from '../interfaces/product-info.interface';

export class ProductInfoDto implements IProductInfo {
  @Expose()
  @ApiProperty({ default: 'Mior', description: 'Название бренда товара' })
  brand: string;

  @Expose()
  @ApiProperty({ default: 1, description: 'Положение в списке выдачи' })
  place: number;
}
