import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Filter } from './Trailers';

type Props = {
  onChange: (filter: Filter) => void;
  onChangeResetButton?: (reset: boolean) => void;
  resetState?: boolean;
};

export const SearchFilter: FC<Props> = ({
  onChange,
  onChangeResetButton,
  resetState,
}) => {
  const [movieTitle, setMovieTitle] = useState<string>('');

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setMovieTitle(input);
    onChange(
      input
        ? movie => movie.title.toLowerCase().includes(input.toLowerCase())
        : null
    );
    onChangeResetButton && onChangeResetButton(true);
  };

  useEffect(() => {
    if (resetState) setMovieTitle('');
  }, [resetState]);

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
