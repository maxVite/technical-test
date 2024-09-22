"use client";

import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { Movie, MovieCard as MovieCardTypes } from "./movie.types";

const MovieSearch = ({
  setSearch,
}: {
  setSearch: Dispatch<SetStateAction<string | undefined>>;
}) => {
  return (
    <div className="w-full mb-6">
      Movie:
      <input
        type="text"
        placeholder="Search by title or author"
        className="w-full p-2 border border-gray-300 rounded-lg"
        onChange={(event) => setSearch(event.target.value)}
      />
    </div>
  );
};

const MovieCard = ({
  title,
  releaseDate,
  synopsis,
  cast,
  criticScore,
}: MovieCardTypes) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <span className="text-sm bg-yellow-400 text-gray-800 font-semibold px-2 py-1 rounded">
          Critic Score: {criticScore}
        </span>
      </div>
      <p className="text-sm text-gray-500">{releaseDate}</p>
      <div className="mt-4">
        <h4 className="font-semibold text-gray-800">Synopsis</h4>
        <p className="text-gray-700 mt-1">{synopsis}</p>
      </div>
      <div className="mt-4">
        <h4 className="font-semibold text-gray-800">Cast</h4>
        <p className="text-gray-700 mt-1">{cast}</p>
      </div>
    </div>
  );
};

const MovieList = ({ movies }: { movies: Movie[] }) => {
  return (
    <div className="space-y-4">
      {movies.map(
        ({ id, title, release_date, synopsis, crew, critic_score }) => (
          <MovieCard
            key={id}
            title={title}
            releaseDate={release_date}
            synopsis={synopsis}
            cast={crew}
            criticScore={critic_score}
          />
        ),
      )}
    </div>
  );
};

export const Movies = () => {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies`);
      const jsonMovies = await result.json();
      setMovies(jsonMovies);
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const filteredMovies = useMemo(() => {
    if (!debouncedSearch) return movies;

    return movies.filter(
      ({ title, director }) =>
        title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        director?.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [debouncedSearch, movies]);

  return (
    <>
      <MovieSearch setSearch={setSearch} />
      <MovieList movies={filteredMovies} />
    </>
  );
};
