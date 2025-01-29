import React, { Component } from 'react';
import Button from '../Button/Button.tsx';
import SearchInput from '../SearchInput/SearchInput.tsx';
import './searchForm.css';

export default class SearchForm extends Component<{}, any> {
  render() {
    return (
      <form onSubmit={this.props.onSearchResult}>
        <SearchInput
          value={this.props.searchTerm}
          onChange={this.props.onInputChage}
        />
        <Button type="submit" label="Search" disabled={this.props.isLoading} />
      </form>
    );
  }
}
