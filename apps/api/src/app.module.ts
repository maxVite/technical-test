import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [MoviesModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
