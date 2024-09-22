export interface Movie {
  id: number;
  title: string;
  director?: string;
  release_date: string;
  synopsis: string;
  crew: string;
  critic_score: number;
}

export interface MovieCard {
  title: string;
  releaseDate: string;
  synopsis: string;
  cast: string;
  criticScore: number;
}
