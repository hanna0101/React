import { Component } from 'react';
import './cardItem.css';

interface CardItemsProps {
  img: string;
  name: string;
  birthYear: number;
  gender: string;
  eyeColor: string;
}

export class CardItem extends Component<CardItemsProps, Record<never, never>> {
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
