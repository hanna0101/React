import React, { Component } from 'react';

interface ButtonProps {
  onClick: () => void;
  label: string;
}

export default class Button extends Component<{}, ButtonProps> {
  render() {
    const { onClick, label } = this.props;

    return <button onClick={onClick}>{label}</button>;
  }
}
