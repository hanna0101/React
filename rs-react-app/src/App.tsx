import SearchForm from './components/SearchForm/SearchForm.tsx';
import Results from './components/Results/Results.tsx';
import './app.css';
import React, { Component } from 'react';
import Spinner from './components/Spinner/Spinner.tsx';
import SwapiService from './services/SwapiService.ts';

interface State {
  query: string;
  searchResults: any[];
  isLoading: boolean;
}

export default class App extends Component<any, any> {
  state: State = {
    query: '',
    searchResults: [],
    isLoading: false,
  };

  private swapiService = new SwapiService();

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = event.target.value.trim();
    this.setState({ query: trimmedValue });
  };

  handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState({ isLoading: true });

    this.swapiService
      .getAllPeople()
      .then((data) => {
        this.setState({
          isLoading: false,
          searchResults: data.results,
        });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        console.error(error);
      });
  };

  render() {
    const { searchResults, query, isLoading } = this.state;

    return (
      <div className="body">
        <SearchForm
          query={query}
          onInputChage={this.handleInputChange}
          onSearchResult={this.handleSearch}
          isLoading={this.state.isLoading}
        />
        <Results searchResults={searchResults} isLoading={isLoading} />
      </div>
    );
  }
}
