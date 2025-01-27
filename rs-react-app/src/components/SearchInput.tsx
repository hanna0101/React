import React, { Component } from 'react';

interface InputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default class SearchInput extends Component<{}, InputProps> {
  render() {
    const { value, onChange } = this.props;

    return (
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search..."
      />
    );
  }
}
