import SearchForm from './components/SearchForm/SearchForm.tsx';
import Results from './components/Results/Results.tsx';
import './app.css';
import { Component } from 'react';
import SwapiService from './services/SwapiService.ts';
import ErrorIndicator from './components/ErrorIndicator/ErrorIndicator.tsx';
import Button from './components/Button/Button.tsx';
import { Person } from './services/types/types.ts';
import { StorageService } from './services/StorageService.ts';
import { prepareSearchResultsData } from './utils/prepareSearchResultsData.ts';

interface AppState {
  searchTerm: string;
  searchResults: Person[];
  isLoading: boolean;
  isServerError: boolean;
  isError: boolean;
}

export default class App extends Component<object, AppState> {
  state: AppState = {
    searchTerm: '',
    searchResults: [],
    isLoading: false,
    isServerError: false,
    isError: false,
  };

  private swapiService = new SwapiService();
  private storageService = new StorageService();

  fetchPeople = (searchTerm: string) => {
    if (searchTerm === this.storageService.getSearchTerm()) {
      this.setState((prevState) => ({
        ...prevState,
        isLoading: false,
        searchResults: this.storageService.getSearchResults(),
      }));
    }

    this.setState((prevState) => ({ ...prevState, isLoading: true }));

    this.swapiService
      .getPeople(searchTerm)
      .then((data: { results: Person[] }) => {
        this.setState((prevState) => ({
          ...prevState,
          isLoading: false,
          searchResults: prepareSearchResultsData(data.results),
        }));
        this.storageService.setSearchTerm(searchTerm);
        this.storageService.setSearchResults(data.results);
      })
      .catch((error) => {
        this.setState((prevState) => ({
          ...prevState,
          isLoading: false,
          isServerError: true,
        }));
        console.error(error);
      });
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.trim();
    this.setState((prevState) => ({ ...prevState, searchTerm }));
  };

  handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.fetchPeople(this.state.searchTerm);
  };

  componentDidMount() {
    const storedSearchTerm = this.storageService.getSearchTerm();
    this.setState(
      (prevState) => ({ ...prevState, searchTerm: storedSearchTerm }),
      () => {
        this.fetchPeople(storedSearchTerm);
      }
    );
  }

  handleThrowNewError = () => {
    this.setState((prevState) => ({ ...prevState, isError: true }));
    throw new Error();
  };

  render() {
    const { searchResults, searchTerm, isLoading, isServerError } = this.state;

    return (
      <>
        <SearchForm
          searchTerm={searchTerm}
          onInputChange={this.handleInputChange}
          onSearchResult={this.handleSearch}
          isLoading={isLoading}
        />
        {isServerError ? (
          <ErrorIndicator />
        ) : (
          <Results searchResults={searchResults} isLoading={isLoading} />
        )}
        <Button
          type="button"
          onClick={this.handleThrowNewError}
          label="Throw Error"
        />
      </>
    );
  }
}
