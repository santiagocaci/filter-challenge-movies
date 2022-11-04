import { FC, useMemo, useState } from 'react';
import { Movie } from '../types';
import { MovieCard } from './MovieCard';
import { RatingFilter } from './RatingFilter';
import { SearchFilter } from './SearchFilter';

type Props = {
  movies: Movie[];
};

export type Filter = ((movie: Movie) => boolean) | null;

export type Filters = Record<string, Filter>;

export const Trailers: FC<Props> = ({ movies }) => {
  const [filters, setFilters] = useState<Filters>({
    ratingFilter: null,
    searchFilter: null,
  });

  const matchesMovies = useMemo(() => {
    const filtersToApply = Object.values(filters).filter(Boolean);

    let match = movies;
    filtersToApply.forEach(filter => {
      match = match.filter(filter!);
    });

    match = match.sort((prev, next) => next.vote_average - prev.vote_average);
    return match;
  }, [filters, movies]);

  return (
    <div>
      <h2 className='ml-4 sm:ml-0 text-4xl font-semibold my-3'>Top Movies</h2>
      <div className='flex flex-col sm:flex-row items-center gap-3'>
        <SearchFilter
          onChange={(filter: Filter) =>
            setFilters(currentFilters => ({
              ...currentFilters,
              searchFilter: filter,
            }))
          }
        />
        <RatingFilter
          onChange={(filter: Filter) =>
            setFilters(currentFilters => ({
              ...currentFilters,
              ratingFilter: filter,
            }))
          }
        />
      </div>
      <div className='flex justify-center flex-wrap gap-6 bg-base-200 py-4 rounded'>
        {matchesMovies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};
