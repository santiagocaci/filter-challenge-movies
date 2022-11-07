import { FC } from 'react';

type Props = {
  star: 0 | 1 | 2 | 3 | 4 | 5;
  onChangeStar: (star: 0 | 1 | 2 | 3 | 4 | 5) => void;
};

export const RatingFilter: FC<Props> = ({ onChangeStar, star }) => {
  const changeRating = (num: 0 | 1 | 2 | 3 | 4 | 5) => onChangeStar(num);

  return (
    <div className='md:pb-3 flex items-center gap-2'>
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
