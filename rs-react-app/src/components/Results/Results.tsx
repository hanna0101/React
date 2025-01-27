import { Component } from 'react';
import './results.css';
import { CardItem } from '../CardItem.tsx';

export default class Results extends Component<{}, any> {
  render() {
    return (
      <div className="containerResults">
        <h1>Results</h1>
        <div className="containerItems">
          <div>Item Name</div>
          <div>Item Description</div>
        </div>
        <CardItem />
      </div>
    );
  }
}
