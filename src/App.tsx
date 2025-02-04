import SearchForm from './components/SearchForm/SearchForm.tsx';
import { Results } from './components/Results/Results.tsx';
import './app.css';
import SwapiService from './services/SwapiService.ts';
import { ErrorIndicator } from './components/ErrorIndicator/ErrorIndicator.tsx';
import { Button } from './components/Button/Button.tsx';
import { Person } from './services/types/types.ts';
import { StorageService } from './services/StorageService.ts';
import { prepareSearchResultsData } from './utils/prepareSearchResultsData.ts';
import { useCallback, useEffect, useState } from 'react';
import { useGetSearchTerm } from './helpers/useGetSearchTerm.ts';

const swapiService = new SwapiService();
const storageService = new StorageService();

export const App = () => {
  const [searchTerm, setSearchTerm] = useGetSearchTerm();
  const [searchResults, setSearchResults] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isServerError, setIsServerError] = useState(false);

  const fetchPeople = useCallback((searchTerm: string) => {
    if (searchTerm === storageService.getSearchTerm()) {
      setIsLoading(false);
      setSearchResults(storageService.getSearchResults());
    }

    setIsLoading(true);

    swapiService
      .getPeople(searchTerm)
      .then((data: { results: Person[] }) => {
        setIsLoading(false);
        setSearchResults(prepareSearchResultsData(data.results));
        storageService.setSearchTerm(searchTerm);
        storageService.setSearchResults(data.results);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsServerError(true);
        console.error(error);
      });
  }, []);

  useEffect(() => {
    fetchPeople(searchTerm);
  }, [searchTerm, fetchPeople]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.trim();
    setSearchTerm(searchTerm);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchPeople(searchTerm);
  };

  const handleThrowNewError = () => {
    throw new Error();
  };

  return (
    <>
      <SearchForm
        searchTerm={searchTerm}
        onInputChange={handleInputChange}
        onSearchResult={handleSearch}
        isLoading={isLoading}
      />
      {isServerError ? (
        <ErrorIndicator />
      ) : (
        <Results searchResults={searchResults} isLoading={isLoading} />
      )}
      <Button type="button" onClick={handleThrowNewError} label="Throw Error" />
    </>
  );
};
