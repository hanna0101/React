import { Component } from 'react';
import './button.css';

interface ButtonProps {
  onClick: () => void;
  label: string;
  type?: 'submit' | 'reset' | 'button';
  value: string;
  disabled: boolean;
}

export default class Button extends Component<ButtonProps, undefined> {
  render() {
    const { onClick, label, type, disabled } = this.props;

    return (
      <button type={type} onClick={onClick} disabled={disabled}>
        {label}
      </button>
    );
  }
}
