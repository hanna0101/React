import React, { Component } from 'react';
import './spinner.css';

export default class Spinner extends Component<any, any> {
  render() {
    return (
      <div className="container-spinner">
        <div className="spinner"></div>
      </div>
    );
  }
}
