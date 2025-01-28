import { Component } from 'react';
import './results.css';
import { CardItem } from '../CardItem/CardItem';

export default class Results extends Component<any, any> {
  render() {
    const { searchResults } = this.props;

    return (
      <div className="containerResults">
        <h1>Results</h1>
        <div className="containerItems">
          {searchResults.map((el) => {
            const { birth_year, name, gender, eye_color, url } = el;
            const match = url.match(/\/(\d+)\/$/);
            const id = match ? parseInt(match[1], 10) : null;

            return id ? (
              <CardItem
                key={id}
                img={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                birthYear={birth_year}
                name={name}
                gender={gender}
                eyeColor={eye_color}
              />
            ) : null;
          })}
        </div>
      </div>
    );
  }
}
