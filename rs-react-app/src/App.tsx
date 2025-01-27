import SearchForm from './components/SearchForm.tsx';
import Results from './components/Results/Results.tsx';
import './app.css';
import React, { Component } from 'react';

interface State {
  query: string;
  searchResults: any[];
}

export default class App extends Component<any, any> {
  state: State = {
    query: '',
    searchResults: [],
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchResults: [], query: event.target.value });
  };

  handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(`https://swapi.dev/api/people?search=${this.state.query}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          searchResults: data.results,
        });
      });
  };

  render() {
    const { searchResults, query } = this.state;

    return (
      <div className="body">
        <SearchForm
          query={query}
          onInputChage={this.handleInputChange}
          onSearchResult={this.handleSearch}
        />
        <Results searchResults={searchResults} />
      </div>
    );
  }
}
