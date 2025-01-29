import { Component } from 'react';
import Button from '../Button/Button.tsx';
import SearchInput from '../SearchInput/SearchInput.tsx';
import './searchForm.css';

interface SearchFormProps {
  onSearchResult: (event) => void;
  searchTerm: string;
  onInputChange: (event) => void;
  isLoading: boolean;
}
export default class SearchForm extends Component<SearchFormProps, undefined> {
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
