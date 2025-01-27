import React, { Component } from 'react';

interface ButtonProps {
  onClick: () => void;
  label: string;
  type?: string;
}

export default class Button extends Component<{}, ButtonProps> {
  render() {
    const { onClick, label, type } = this.props;

    return (
      <button type={type} onClick={onClick}>
        {label}
      </button>
    );
  }
}
