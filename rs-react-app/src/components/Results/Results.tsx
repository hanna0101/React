import { Component } from 'react';
import './results.css';
import { CardItem } from '../CardItem/CardItem.tsx';

export default class Results extends Component<{}, any> {
  render() {
    const searchResults = this.props.searchResults;

    return (
      <div className="containerResults">
        <h1>Results</h1>
        <div className="containerItems">
          {searchResults.map((el, key) => {
            const { birth_year, name, gender, eye_color } = el;

            return (
              <CardItem
                id={key + 1}
                birthYear={birth_year}
                name={name}
                gender={gender}
                eyeColor={eye_color}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
