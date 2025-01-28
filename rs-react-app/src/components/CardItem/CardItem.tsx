import { Component } from 'react';
import PropTypes from 'prop-types';
import './cardItem.css';

export class CardItem extends Component<any, any> {
  render() {
    const { img, name, birthYear, gender, eyeColor } = this.props;

    return (
      <div className="cardItem">
        <img src={img} alt={name} />
        <div>
          <strong>Name:</strong> {name}
        </div>
        <div>
          <strong>Birth Year:</strong> {birthYear}
        </div>
        <div>
          <strong>Gender:</strong> {gender}
        </div>
        <div>
          <strong>Eye Color:</strong> {eyeColor}
        </div>
      </div>
    );
  }
}
