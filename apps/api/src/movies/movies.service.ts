import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MovieDto } from './movies.dto';

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  getAll = async (): Promise<MovieDto[]> => {
    return this.prisma.movies.findMany({
      select: {
        id: true,
        title: true,
        director: true,
        synopsis: true,
        crew: true,
        critic_score: true,
        release_date_theaters: true,
      },
    });
  };
}
