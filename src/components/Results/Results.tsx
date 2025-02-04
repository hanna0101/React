import { FC } from 'react';
import './results.css';
import { CardItem } from '../CardItem/CardItem';
import { Spinner } from '../Spinner/Spinner.tsx';
import { Person } from '../../services/types/types.ts';

interface ResultsProps {
  searchResults: Person[];
  isLoading: boolean;
}

export const Results: FC<ResultsProps> = ({
  searchResults,
  isLoading,
}: ResultsProps) => {
  const renderResults = () => {
    return searchResults.map(({ id, birth_year, name, gender, eye_color }) => (
      <CardItem
        key={id}
        img={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
        birthYear={birth_year}
        name={name}
        gender={gender}
        eyeColor={eye_color}
      />
    ));
  };

  return (
    <div className="containerResults">
      <h1>Results</h1>
      <div className="containerItems">
        {isLoading ? <Spinner /> : renderResults()}
      </div>
    </div>
  );
};
