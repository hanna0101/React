import SearchForm from './components/SearchForm/SearchForm.tsx';
import Results from './components/Results/Results.tsx';
import './app.css';
import React, { Component } from 'react';
import Spinner from './components/Spinner/Spinner.tsx';
import SwapiService from './services/SwapiService.ts';
import ErrorIndicator from './components/ErrorIndicator/ErrorIndicator.tsx';
import Button from './components/Button/Button.tsx';

interface State {
  searchTerm: string;
  searchResults: any[];
  isLoading: boolean;
  isServerError: boolean;
  isError: boolean;
}

export default class App extends Component<any, any> {
  state: State = {
    searchTerm: '',
    searchResults: [],
    isLoading: false,
    isServerError: false,
    isError: false,
  };

  private swapiService = new SwapiService();

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = event.target.value.trim();
    this.setState({ searchTerm: trimmedValue });
  };

  handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({ isLoading: true });

    const { searchTerm } = this.state;

    if (searchTerm === localStorage.getItem('searchTerm')) {
      this.setState({
        isLoading: false,
        searchResults: JSON.parse(localStorage.getItem('result')),
      });
    } else {
      this.swapiService
        .getPeople(searchTerm)
        .then((data) => {
          this.setState({
            isLoading: false,
            searchResults: data.results,
          });
          localStorage.setItem('searchTerm', searchTerm);
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
    const { searchResults, searchTerm, isLoading, isServerError, isError } =
      this.state;

    if (isError) {
      return <ErrorIndicator />;
    }

    return (
      <div className="body">
        <SearchForm
          searchTerm={searchTerm}
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
