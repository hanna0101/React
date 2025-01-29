import SearchForm from './components/SearchForm/SearchForm.tsx';
import Results from './components/Results/Results.tsx';
import './app.css';
import React, { Component } from 'react';
import Spinner from './components/Spinner/Spinner.tsx';
import SwapiService from './services/SwapiService.ts';
import ErrorIndicator from './components/ErrorIndicator/ErrorIndicator.tsx';
import Button from './components/Button/Button.tsx';

interface State {
  query: string;
  searchResults: any[];
  isLoading: boolean;
  isServerError: boolean;
  isError: boolean;
}

export default class App extends Component<any, any> {
  state: State = {
    query: '',
    searchResults: [],
    isLoading: false,
    isServerError: false,
    isError: false,
  };

  private swapiService = new SwapiService();

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = event.target.value.trim();
    this.setState({ query: trimmedValue });
  };

  handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({ isLoading: true });

    if (this.state.query === localStorage.getItem('searchTerm')) {
      this.setState({
        isLoading: false,
        searchResults: JSON.parse(localStorage.getItem('result')),
      });
    } else {
      this.swapiService
        .getAllPeople()
        .then((data) => {
          this.setState({
            isLoading: false,
            searchResults: data.results,
          });
          localStorage.setItem('searchTerm', this.state.query);
          localStorage.setItem('result', JSON.stringify(data.results));
        })
        .catch((error) => {
          this.setState({ isLoading: false, isServerError: true });
          console.error(error);
        });
    }
  };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(error);
    this.setState({ isError: true });
  }

  handleTrowNewError = () => {
    this.setState({ isError: true });
    throw new Error();
  };

  render() {
    const { searchResults, query, isLoading, isServerError, isError } =
      this.state;

    if (isError) {
      return <ErrorIndicator />;
    }

    return (
      <div className="body">
        <SearchForm
          query={query}
          onInputChage={this.handleInputChange}
          onSearchResult={this.handleSearch}
          isLoading={this.state.isLoading}
        />
        {isServerError ? (
          <ErrorIndicator />
        ) : (
          <Results searchResults={searchResults} isLoading={isLoading} />
        )}
        <Button
          type="text"
          onClick={this.handleTrowNewError}
          label="Throw Error"
        />
      </div>
    );
  }
}
