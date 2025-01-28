import React, { Component } from 'react';
import Button from './Button.tsx';
import SearchInput from './SearchInput.tsx';

export default class SearchForm extends Component<{}, any> {
  render() {
    return (
      <form onSubmit={this.props.onSearchResult}>
        <SearchInput
          value={this.props.query}
          onChange={this.props.onInputChage}
        />
        <Button
          type="submit"
          label="Search"
          value={this.props.query}
          isLoading={this.props.isLoading}
        />
      </form>
    );
  }
}
