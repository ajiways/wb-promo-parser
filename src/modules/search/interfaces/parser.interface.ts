import { ProductInfoDto } from '../dto/product-info.dto';

export interface IParser {
  getItems(searchString: string): Promise<ProductInfoDto[] | null>;
}
