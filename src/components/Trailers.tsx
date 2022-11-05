import { FC, useEffect, useMemo, useState } from 'react';
import { Movie } from '../types';
import { MovieCard } from './MovieCard';
import { RatingFilter } from './RatingFilter';
import { SearchFilter } from './SearchFilter';

type Props = {
  movies: Movie[];
};

export type Filter = ((movie: Movie) => boolean) | null;

export type Filters = Record<string, Filter>;

const initalState: Filters = {
  ratingFilter: null,
  searchFilter: null,
};

export const Trailers: FC<Props> = ({ movies }) => {
  const [filters, setFilters] = useState<Filters>(initalState);
  const [reset, setReset] = useState<boolean>(false);

  const matchesMovies = useMemo(() => {
    const filtersToApply = Object.values(filters).filter(Boolean);

    let match: Movie[] = structuredClone(movies);
    filtersToApply.forEach(filter => {
      match = match.filter(filter!);
    });

    match = match.sort((prev, next) => next.vote_average - prev.vote_average);
    return match;
  }, [filters, movies]);

  useEffect(() => {
    if (reset) setReset(false);
  }, [reset]);

  return (
    <div>
      <h2 className='ml-4 sm:ml-0 text-4xl font-semibold my-3'>Top Movies</h2>
      <div className='flex flex-col sm:flex-row items-center gap-3'>
        <SearchFilter
          reset={reset}
          onChangeReset={(reset: boolean) => setReset(reset)}
          onChange={(filter: Filter) =>
            setFilters(currentFilters => ({
              ...currentFilters,
              searchFilter: filter,
            }))
          }
        />
        <RatingFilter
          reset={reset}
          onChangeReset={(reset: boolean) => setReset(reset)}
          onChange={(filter: Filter) =>
            setFilters(currentFilters => ({
              ...currentFilters,
              ratingFilter: filter,
            }))
          }
        />
        <button
          className='btn'
          onClick={() => {
            setReset(true);
            setFilters(initalState);
          }}
        >
          Reset filters
        </button>
      </div>
      <div className='flex justify-center flex-wrap gap-6 bg-base-200 py-4 rounded'>
        {matchesMovies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};
