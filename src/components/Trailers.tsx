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
  const [input, setInput] = useState<string>('');
  const [star, setStar] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);

  const matches = useMemo(() => {
    return movies
      .filter(movie => movie.title.toLowerCase().includes(input.toLowerCase()))
      .filter(movie =>
        star === 0
          ? movie
          : movie.vote_average <= star * 2 && movie.vote_average >= star * 2 - 2
      )
      .sort((prev, next) => next.vote_average - prev.vote_average);
  }, [input, star]);

  return (
    <div className='mx-4'>
      <h2 className='sm:ml-0 text-4xl font-semibold my-3'>Top Movies</h2>
      <div className='flex flex-col md:flex-row md:items-center gap-2 md:gap-3'>
        <SearchFilter
          input={input}
          onChangeInput={(input: string) => setInput(input)}
        />
        <RatingFilter
          star={star}
          onChangeStar={(star: 0 | 1 | 2 | 3 | 4 | 5) => setStar(star)}
        />
        <button
          className='btn btn-md w-36'
          onClick={() => {
            if (!input && !star) return;
            setInput('');
            setStar(0);
          }}
        >
          Reset filters
        </button>
      </div>

      <div className='w-auto flex justify-center bg-base-200 flex-wrap gap-6 py-4 rounded'>
        {matches.length > 0 ? (
          matches.map(movie => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p>No se encontraron resultados</p>
        )}
      </div>
    </div>
  );
};
