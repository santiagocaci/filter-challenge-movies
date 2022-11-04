import { ChangeEvent, FC, useState } from 'react';
import { Filter } from './Trailers';

type Props = {
  onChange: (filter: Filter) => void;
};

export const SearchFilter: FC<Props> = ({ onChange }) => {
  const [movieTitle, setMovieTitle] = useState('');
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setMovieTitle(input);
    onChange(
      input
        ? movie => movie.title.toLowerCase().includes(input.toLowerCase())
        : null
    );
  };
  console.log(movieTitle);

  return (
    <input
      value={movieTitle}
      onChange={e => onInputChange(e)}
      type='text'
      placeholder='Search movie...'
      className='input max-w-xs min-w-[250px] input-secondary input-md'
    />
  );
};
