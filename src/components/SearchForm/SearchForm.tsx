import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { SearchInput } from '../SearchInput/SearchInput.tsx';
import { Button } from '../Button/Button.tsx';
import './searchForm.css';

interface SearchFormProps {
  searchTerm: string;
  isLoading: boolean;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

const SearchForm = ({
  searchTerm,
  setSearchTerm,
  isLoading,
}: SearchFormProps) => {
  const [value, setValue] = useState(searchTerm);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchTerm(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <SearchInput
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <Button type="submit" label="Search" disabled={isLoading} />
    </form>
  );
};

export default SearchForm;
