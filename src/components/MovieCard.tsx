import { FC } from 'react';
import { Movie } from '../types';

type Props = {
  movie: Movie;
};

export const MovieCard: FC<Props> = ({ movie }) => {
  return (
    <div className='card w-64 bg-base-300 relative rounded-lg overflow-hidden'>
      <figure>
        <img src={movie.poster_path} alt={movie.title} />
      </figure>
      <div className='opacity-0 hover:opacity-100 bg-black/90 w-full h-full absolute z-10 transition'>
        <div className='card-body overflow-hidden'>
          <div className='flex justify-between items-center'>
            <h3 className='card-title'>{movie.title}</h3>
            <div className='badge badge-accent'>
              {movie.vote_average}
              <span>★</span>
            </div>
          </div>
          <p>{movie.overview.substring(0, 200)}...</p>
        </div>
      </div>
    </div>
  );
};
