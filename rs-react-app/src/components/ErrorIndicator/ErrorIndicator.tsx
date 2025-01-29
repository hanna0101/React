import { Component } from 'react';
import './errorIndicator.css';
export default class ErrorIndicator extends Component<any, any> {
  render() {
    return (
      <div className="error-indicator">
        <h2>Error</h2>
        <p>Something has gone wrong. Please try again later.</p>
      </div>
    );
  }
}
