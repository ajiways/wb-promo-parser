import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule, Routes } from 'nest-router';
import { SearchModule } from './search/search.module';

const modules = [SearchModule];

const routes: Routes = [
  {
    path: `/api`,
    children: [
      {
        path: '/search',
        module: SearchModule,
      },
    ],
  },
];

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RouterModule.forRoutes(routes),
    ...modules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
