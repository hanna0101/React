import { Component } from 'react';
import './spinner.css';

export default class Spinner extends Component<
  Record<never, never>,
  Record<never, never>
> {
  render() {
    return (
      <div className="container-spinner">
        <div className="spinner"></div>
      </div>
    );
  }
}
