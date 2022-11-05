import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Filter } from './Trailers';

type Props = {
  onChange: (filter: Filter) => void;
  onChangeReset?: (reset: boolean) => void;
  reset?: boolean;
};

export const SearchFilter: FC<Props> = ({ onChange, reset, onChangeReset }) => {
  const [movieTitle, setMovieTitle] = useState<string>('');

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setMovieTitle(input);
    onChange(
      input
        ? movie => movie.title.toLowerCase().includes(input.toLowerCase())
        : null
    );
  };

  useEffect(() => {
    if (!reset) return;

    setMovieTitle('');
    // onChangeReset && onChangeReset(false);
  }, [reset]);

  return (
    <input
      value={movieTitle}
      onChange={e => onInputChange(e)}
      type='text'
      placeholder='Search movie . . .'
      className='input max-w-xs min-w-[250px] input-secondary input-md'
    />
  );
};
