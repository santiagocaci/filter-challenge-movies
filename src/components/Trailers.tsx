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
  const [resetButton, setResetButton] = useState<boolean>(false);
  const [resetFilters, setResetFilters] = useState<boolean>(false);

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
    setResetFilters(false);
  }, [resetFilters]);

  return (
    <div>
      <h2 className='ml-4 sm:ml-0 text-4xl font-semibold my-3'>Top Movies</h2>
      <div className='flex flex-col sm:flex-row items-center gap-3'>
        <SearchFilter
          resetState={resetFilters}
          onChangeResetButton={(reset: boolean) => setResetButton(reset)}
          onChange={(filter: Filter) =>
            setFilters(currentFilters => ({
              ...currentFilters,
              searchFilter: filter,
            }))
          }
        />
        <RatingFilter
          resetState={resetFilters}
          onChangeResetButton={(reset: boolean) => setResetButton(reset)}
          onChange={(filter: Filter) =>
            setFilters(currentFilters => ({
              ...currentFilters,
              ratingFilter: filter,
            }))
          }
        />
        <button
          disabled={!resetButton}
          className='btn'
          onClick={() => {
            setResetButton(false);
            setResetFilters(true);
            setFilters(initalState);
          }}
        >
          Reset filters
        </button>
      </div>

      <div className='w-auto flex justify-center bg-base-200 flex-wrap gap-6 py-4 rounded'>
        {matchesMovies.length > 0 ? (
          matchesMovies.map(movie => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p>No se encontraron resultados</p>
        )}
      </div>
    </div>
  );
};
