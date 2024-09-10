import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';

@Module({
  controllers: [MoviesController],
  imports: [],
})
export class MoviesModule {}
