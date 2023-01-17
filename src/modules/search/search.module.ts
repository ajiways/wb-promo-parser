import { Module } from '@nestjs/common';
import { SearchController } from './controllers/search.controller';
import { SearchService } from './services/search.service';

const controllers = [SearchController];
const services = [SearchService];

@Module({
  controllers: [...controllers],
  providers: [...services],
})
export class SearchModule {}
