import { Component } from 'react';
import Button from '../Button/Button.tsx';
import SearchInput from '../SearchInput/SearchInput.tsx';
import './searchForm.css';

interface SearchFormProps {
  onSearchResult: (event: React.FormEvent<HTMLFormElement>) => void;
  searchTerm: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
}

export default class SearchForm extends Component<
  SearchFormProps,
  Record<never, never>
> {
  render() {
    const { onSearchResult, searchTerm, onInputChange, isLoading } = this.props;

    return (
      <form onSubmit={onSearchResult}>
        <SearchInput value={searchTerm} onChange={onInputChange} />
        <Button type="submit" label="Search" disabled={isLoading} />
      </form>
    );
  }
}
