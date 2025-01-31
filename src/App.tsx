import SearchForm from './components/SearchForm/SearchForm.tsx';
import Results from './components/Results/Results.tsx';
import './app.css';
import { Component } from 'react';
import SwapiService from './services/SwapiService.ts';
import ErrorIndicator from './components/ErrorIndicator/ErrorIndicator.tsx';
import Button from './components/Button/Button.tsx';
import { Person } from './services/types/types.ts';

interface AppState {
  searchTerm: string;
  searchResults: Person[];
  isLoading: boolean;
  isServerError: boolean;
  isError: boolean;
}

export default class App extends Component<Record<never, never>, AppState> {
  state: AppState = {
    searchTerm: '',
    searchResults: [],
    isLoading: false,
    isServerError: false,
    isError: false,
  };

  private swapiService = new SwapiService();

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = event.target.value.trim();
    this.setState((prevState) => ({ ...prevState, searchTerm: trimmedValue }));
  };

  handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState((prevState) => ({ ...prevState, isLoading: true }));

    const { searchTerm } = this.state;

    if (searchTerm === localStorage.getItem('searchTerm')) {
      const storedResults = localStorage.getItem('result');
      this.setState((prevState) => ({
        ...prevState,
        isLoading: false,
        searchResults: storedResults ? JSON.parse(storedResults) : [],
      }));
    } else {
      this.swapiService
        .getPeople(searchTerm)
        .then((data: { results: Person[] }) => {
          this.setState((prevState) => ({
            ...prevState,
            isLoading: false,
            searchResults: data.results,
          }));
          localStorage.setItem('searchTerm', searchTerm);
          localStorage.setItem('result', JSON.stringify(data.results));
        })
        .catch((error) => {
          this.setState((prevState) => ({
            ...prevState,
            isLoading: false,
            isServerError: true,
          }));
          console.error(error);
        });
    }
  };

  componentDidMount() {
    const storedSearchTerm = localStorage.getItem('searchTerm') || '';
    this.setState((prevState) => ({
      ...prevState,
      searchTerm: storedSearchTerm,
    }));
  }

  componentDidCatch(error: Error) {
    console.error(error);
    this.setState((prevState) => ({ ...prevState, isError: true }));
  }

  handleThrowNewError = () => {
    this.setState((prevState) => ({ ...prevState, isError: true }));
    throw new Error();
  };

  render() {
    const { searchResults, searchTerm, isLoading, isServerError, isError } =
      this.state;

    if (isError) {
      return <ErrorIndicator />;
    }

    return (
      <div className="body">
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
      </div>
    );
  }
}
