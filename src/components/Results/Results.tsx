import { Component } from 'react';
import './results.css';
import { CardItem } from '../CardItem/CardItem';
import Spinner from '../Spinner/Spinner.tsx';
import { Person } from '../../services/types/types.ts';

interface ResultsProps {
  searchResults: Person[];
  isLoading: boolean;
}

export default class Results extends Component<
  ResultsProps,
  Record<never, never>
> {
  renderResults = () => {
    return this.props.searchResults.map(
      ({ id, birth_year, name, gender, eye_color }) => (
        <CardItem
          key={id}
          img={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
          birthYear={birth_year}
          name={name}
          gender={gender}
          eyeColor={eye_color}
        />
      )
    );
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
