import { FC } from 'react';
import { Filter } from './Trailers';

type Props = {
  onChange: (filter: Filter) => void;
};

export const RatingFilter: FC<Props> = ({ onChange }) => {
  const changeRating = (minVal: number, maxVal: number) => {
    onChange(
      movie => movie.vote_average > minVal && movie.vote_average < maxVal
    );
  };

  return (
    <div className='pb-3 flex items-center gap-2'>
      <h3 className='text-3xl'>Rating:</h3>
      <div className='rating rating-lg space-x-1'>
        <input
          type='radio'
          name='rating-2'
          className='mask mask-star bg-yellow-500'
          onChange={() => changeRating(0, 2)}
        />
        <input
          type='radio'
          name='rating-2'
          className='mask mask-star bg-yellow-500'
          onChange={() => changeRating(2, 4)}
        />
        <input
          type='radio'
          name='rating-2'
          className='mask mask-star bg-yellow-500'
          onChange={() => changeRating(4, 6)}
        />
        <input
          type='radio'
          name='rating-2'
          className='mask mask-star bg-yellow-500'
          onChange={() => changeRating(6, 8)}
        />
        <input
          type='radio'
          name='rating-2'
          className='mask mask-star bg-yellow-500'
          onChange={() => changeRating(8, 10)}
        />
      </div>
    </div>
  );
};
