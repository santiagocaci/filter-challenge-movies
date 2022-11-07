import { ChangeEvent, FC } from 'react';

type Props = {
  input: string;
  onChangeInput: (input: string) => void;
};

export const SearchFilter: FC<Props> = ({ input, onChangeInput }) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeInput(e.target.value);
  };

  return (
    <input
      value={input}
      onChange={e => onChange(e)}
      type='text'
      placeholder='Search movie . . .'
      className='input max-w-xs min-w-[250px] input-secondary input-md'
    />
  );
};
