import { Component } from 'react';
import './button.css';

interface ButtonProps {
  onClick?: () => void;
  label: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default class Button extends Component<
  ButtonProps,
  Record<never, never>
> {
  render() {
    const { onClick, label, type = 'button', disabled } = this.props;
    return (
      <button
        type={type as 'button' | 'submit' | 'reset'}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </button>
    );
  }
}
