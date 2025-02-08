import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { swapiService } from '../services/SwapiService.ts';
import { Person } from '../services/types/types.ts';
import { CardItem } from '../components/CardItem/CardItem.tsx';
import { ErrorIndicator } from '../components/ErrorIndicator/ErrorIndicator.tsx';
import { Spinner } from '../components/Spinner/Spinner.tsx';

export const CardItemDetails = () => {
  const { id: personId } = useParams();
  const [searchResults, setSearchResults] = useState<Person>({} as never);
  const [isLoading, setIsLoading] = useState(false);
  const [isServerError, setIsServerError] = useState(false);

  const { name, birth_year, gender, eye_color } = searchResults || [];

  useEffect(() => {
    setIsLoading(true);

    if (!personId) return;

    swapiService
      .getPersonById(Number(personId))
      .then((data) => {
        setIsLoading(false);
        setSearchResults(data);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsServerError(true);
        console.error(error);
      });
  }, [personId]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {isServerError ? (
        <ErrorIndicator />
      ) : (
        <CardItem
          img={`https://starwars-visualguide.com/assets/img/characters/${personId}.jpg`}
          name={name}
          birthYear={birth_year}
          gender={gender}
          eyeColor={eye_color}
        />
      )}
    </>
  );
};
