import { ProductInfoDto } from '../dto/product-info.dto';

export interface IParser {
  getItems(
    searchString: string,
    scroll: boolean,
  ): Promise<ProductInfoDto[] | null>;
}
