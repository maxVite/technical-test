import { Controller, Get } from '@nestjs/common';

@Controller('/api/movies')
export class MoviesController {
  @Get()
  async getMovies() {
    return [];
  }
}
