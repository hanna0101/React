import { useCallback, useEffect, useState } from 'react';
import { Person } from '../../services/types/types.ts';
import { ItemList } from '../ItemList/ItemList.tsx';
import { ErrorIndicator } from '../ErrorIndicator/ErrorIndicator.tsx';
import { Outlet, useParams } from 'react-router';
import { useGetSearchTerm } from '../../helpers/useGetSearchTerm.ts';
import { prepareSearchResultsData } from '../../utils/prepareSearchResultsData.ts';
import SearchForm from '../SearchForm/SearchForm.tsx';
import { Pagination } from '../Pagination/Pagination.tsx';
import { StorageService } from '../../services/StorageService.ts';
import { swapiService } from '../../services/SwapiService.ts';
import './results.css';

const storageService = new StorageService();

export const Results = () => {
  const { pageId } = useParams();
  const [searchTerm, setSearchTerm] = useGetSearchTerm();
  const [searchResults, setSearchResults] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  const [currentPage, setCurrentPage] = useState(Number(pageId));
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [previousPage, setPreviousPage] = useState<string | null>(null);

  const fetchPeople = useCallback(
    (searchTerm: string) => {
      if (searchTerm === storageService.getSearchTerm()) {
        setIsLoading(false);
        setSearchResults(storageService.getSearchResults());
      }

      setIsLoading(true);

      swapiService
        .getPeople(searchTerm, currentPage)
        .then(
          (data: {
            results: Person[];
            next: string | null;
            previous: string | null;
          }) => {
            setIsLoading(false);
            setSearchResults(prepareSearchResultsData(data.results));
            setNextPage(data.next);
            setPreviousPage(data.previous);
            storageService.setSearchTerm(searchTerm);
            storageService.setSearchResults(data.results);
          }
        )
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
  }, [searchTerm, fetchPeople]);

  return (
    <>
      <SearchForm
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isLoading={isLoading}
      />
      {isServerError ? (
        <ErrorIndicator />
      ) : (
        <div className="containerResults">
          <h1>Results</h1>
          <div className="containerItems">
            <ItemList items={searchResults} isLoading={isLoading} />
            <Outlet />
          </div>
        </div>
      )}
      <Pagination
        nextPage={nextPage}
        previousPage={previousPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};
