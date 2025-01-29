import React, { Component } from 'react';
import './results.css';
import { CardItem } from '../CardItem/CardItem';
import Spinner from '../Spinner/Spinner.tsx';

export default class Results extends Component<any, any> {
  extractIdFromUrl = (url) => {
    const match = url.match(/\/(\d+)\/$/);
    return match ? parseInt(match[1], 10) : null;
  };

  renderResults = () => {
    const { searchResults } = this.props;

    return searchResults.map((el) => {
      const { birth_year, name, gender, eye_color, url } = el;
      const id = this.extractIdFromUrl(url);

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
    });
  };
  render() {
    const { isLoading } = this.props;

    return (
      <div className="containerResults">
        <h1>Results</h1>
        <div className="containerItems">
          {isLoading ? <Spinner /> : this.renderResults()}
        </div>
      </div>
    );
  }
}
