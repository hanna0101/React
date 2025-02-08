import SearchForm from '../components/SearchForm/SearchForm.tsx';
import { API } from '../constants/constants.ts';
import { Pagination } from '../components/Pagination/Pagination.tsx';
import { useGetSearchTerm } from '../helpers/useGetSearchTerm.ts';
import { useCallback, useEffect, useState } from 'react';
import { Person } from '../services/types/types.ts';
import { prepareSearchResultsData } from '../utils/prepareSearchResultsData.ts';
import SwapiService from '../services/SwapiService.ts';
import { StorageService } from '../services/StorageService.ts';
import { ErrorIndicator } from '../components/ErrorIndicator/ErrorIndicator.tsx';
import { Results } from '../components/Results/Results.tsx';

const swapiService = new SwapiService();
const storageService = new StorageService();

export const PeopleList = () => {
  const [searchTerm, setSearchTerm] = useGetSearchTerm();
  const [searchResults, setSearchResults] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPeople = useCallback(
    (searchTerm: string) => {
      if (searchTerm === storageService.getSearchTerm()) {
        setIsLoading(false);
        setSearchResults(storageService.getSearchResults());
      }

      setIsLoading(true);

      swapiService
        .getPeople(searchTerm, currentPage)
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
    },
    [currentPage]
  );

  useEffect(() => {
    fetchPeople(searchTerm);
  }, [searchTerm, fetchPeople, currentPage]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.trim();
    setSearchTerm(searchTerm);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchPeople(searchTerm);
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
      <Pagination
        currentPage={currentPage}
        totalPage={API.TOTAL_PAGE}
        handleClickPrev={() =>
          setCurrentPage((prev) => Math.max(prev - 1, API.FIRST_PAGE))
        }
        handleClickNext={() =>
          setCurrentPage((prev) => Math.min(prev + 1, API.TOTAL_PAGE))
        }
      />
    </>
  );
};
