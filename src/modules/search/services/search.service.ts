import { Injectable } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common/interfaces';
import { WildberriesParser } from '../../../parser/wildberries.parser';
import { SearchProductsDto } from '../dto/search-products.dto';
import { IParser } from '../interfaces/parser.interface';

@Injectable()
export class SearchService implements OnModuleInit {
  private parserInstance: IParser;

  onModuleInit() {
    this.parserInstance = new WildberriesParser();
  }

  public async getProducts(dto: SearchProductsDto) {
    return await this.parserInstance.getItems(dto.search);
  }
}
