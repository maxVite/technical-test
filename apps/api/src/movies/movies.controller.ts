import { Controller, Get, Logger } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('/api/movies')
export class MoviesController {
  #logger = new Logger(MoviesController.name);

  constructor(private readonly service: MoviesService) {}

  @Get()
  async getMovies() {
    try {
      return await this.service.getAll();
    } catch (error) {
      this.#logger.error(`Error retrieving movies`, error);
      throw error;
    }
  }
}
