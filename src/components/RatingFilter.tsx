import { FC, useEffect, useState } from 'react';
import { Filter } from './Trailers';

type Props = {
  onChange: (filter: Filter) => void;
  onChangeResetButton?: (reset: boolean) => void;
  resetState?: boolean;
};

export const RatingFilter: FC<Props> = ({
  onChange,
  onChangeResetButton,
  resetState,
}) => {
  const [star, setStar] = useState<number>(0);

  const changeRating = (val: number) => {
    onChange(
      movie =>
        movie.vote_average >= val * 2 - 2 && movie.vote_average <= val * 2
    );
    setStar(val);
    onChangeResetButton && onChangeResetButton(true);
  };

  useEffect(() => {
    if (resetState) setStar(0);
  }, [resetState]);

  return (
    <div className='pb-3 flex items-center gap-2'>
      <h3 className='text-3xl'>Rating:</h3>
      <div className='rating rating-lg space-x-1'>
        <input
          type='radio'
          className='rating-hidden'
          checked={star === 0}
          onChange={() => {}}
        />
        <input
          value={star}
          checked={star === 1}
          type='radio'
          name='rating-2'
          className='mask mask-star bg-yellow-500 disabled:cursor-not-allowed'
          onChange={() => changeRating(1)}
          disabled={star === 1}
        />
        <input
          value={star}
          checked={star === 2}
          type='radio'
          name='rating-2'
          className='mask mask-star bg-yellow-500 disabled:cursor-not-allowed'
          onChange={() => changeRating(2)}
          disabled={star === 2}
        />
        <input
          value={star}
          checked={star === 3}
          type='radio'
          name='rating-2'
          className='mask mask-star bg-yellow-500 disabled:cursor-not-allowed'
          onChange={() => changeRating(3)}
          disabled={star === 3}
        />
        <input
          value={star}
          checked={star === 4}
          type='radio'
          name='rating-2'
          className='mask mask-star bg-yellow-500 disabled:cursor-not-allowed'
          onChange={() => changeRating(4)}
          disabled={star === 4}
        />
        <input
          value={star}
          checked={star === 5}
          type='radio'
          name='rating-2'
          className='mask mask-star bg-yellow-500 disabled:cursor-not-allowed'
          onChange={() => {
            changeRating(5);
          }}
          disabled={star === 5}
        />
      </div>
    </div>
  );
};
