import { FC } from 'react';
import { Movie } from '../types';

type Props = {
  movies: Movie[];
};

export const Trailers: FC<Props> = ({ movies }) => {
  return (
    <div>
      {movies.map(movie => (
        <div key={movie.id}>{movie.title}</div>
      ))}
    </div>
  );
};
