import React, { Component } from 'react';
import Button from './Button.tsx';
import SearchInput from './SearchInput.tsx';

interface State {
  query: string;
}

export default class SearchForm extends Component<{}, State> {
  state: State = {
    query: '',
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { query } = this.state;
    console.log('Search Query:', query);
  };

  render() {
    return (
      <form onSubmit={this.handleSearch}>
        <SearchInput
          value={this.state.query}
          onChange={this.handleInputChange}
        />
        <Button onClick={this.handleSearch} label="Search" />
      </form>
    );
  }
}
