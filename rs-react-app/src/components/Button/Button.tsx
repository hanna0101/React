import React, { Component } from 'react';
import './button.css';

interface ButtonProps {
  onClick: () => void;
  label: string;
  type?: string;
  value: string;
  disabled: boolean;
}

export default class Button extends Component<{}, ButtonProps> {
  render() {
    const { onClick, label, type, disabled } = this.props;

    return (
      <button type={type} onClick={onClick} disabled={disabled}>
        {label}
      </button>
    );
  }
}
