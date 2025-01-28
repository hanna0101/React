import React, { Component } from 'react';

interface ButtonProps {
  onClick: () => void;
  label: string;
  type?: string;
  value: string;
}

export default class Button extends Component<{}, ButtonProps> {
  render() {
    const { onClick, label, type, value } = this.props;

    return (
      <button type={type} onClick={onClick} disabled={!value}>
        {label}
      </button>
    );
  }
}
