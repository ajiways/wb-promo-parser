import { Controller, Get, HttpStatus } from '@nestjs/common';
import { HttpCode, Inject, Query } from '@nestjs/common/decorators';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import {
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { InternalServerErrorExceptionDto } from '../dto/internal-server-error-exception.dto';
import { ProductInfoDto } from '../dto/product-info.dto';
import { SearchProductsDto } from '../dto/search-products.dto';
import { SearchService } from '../services/search.service';

@ApiTags('/search')
@Controller()
export class SearchController {
  @Inject()
  private readonly searchService: SearchService;

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    description: 'Получить список товаров с лейблом "ПРОМОТОВАР" по названию.',
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorExceptionDto,
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  @ApiResponse({ type: ProductInfoDto, isArray: true, status: HttpStatus.OK })
  async searchProducts(@Query() args: SearchProductsDto) {
    const products = await this.searchService.getProducts(args);

    if (!products) {
      throw new InternalServerErrorException('Что-то пошло не так (:');
    }

    return products;
  }
}
