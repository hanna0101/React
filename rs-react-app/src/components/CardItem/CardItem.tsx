import { Component } from 'react';
import './cardItem.css';
export class CardItem extends Component<{}, any> {
  render() {
    return (
      <div className="cardItem">
        <div>Name: {this.props.name}</div>
        <div>Birth Year: {this.props.birthYear}</div>
        <div>Gender: {this.props.gender}</div>
        <div>Eye Color: {this.props.eyeColor}</div>
      </div>
    );
  }
}
