import { useCallback, useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router';

import { Person } from '../../services/types/types.ts';
import { ItemList } from '../../components/ItemList/ItemList.tsx';
import { useGetSearchTerm } from '../../helpers/useGetSearchTerm.ts';
import { prepareSearchResultsData } from '../../utils/prepareSearchResultsData.ts';
import SearchForm from '../../components/SearchForm/SearchForm.tsx';
import { Pagination } from '../../components/Pagination/Pagination.tsx';
import { StorageService } from '../../services/StorageService.ts';
import { swapiService } from '../../services/SwapiService.ts';

import './DashboardStyles.css';

const storageService = new StorageService();

type PeopleResponse = {
  results: Person[];
  next: string | null;
  previous: string | null;
};

export const Dashboard = () => {
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
        setSearchResults(storageService.getSearchResults());
      }

      setIsLoading(true);

      swapiService
        .getPeople(searchTerm, currentPage)
        .then((data: PeopleResponse) => {
          setSearchResults(prepareSearchResultsData(data.results));
          setNextPage(data.next);
          setPreviousPage(data.previous);
          storageService.setSearchTerm(searchTerm);
          storageService.setSearchResults(data.results);
        })
        .catch((error) => {
          setIsServerError(true);
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
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
      <ItemList
        items={searchResults}
        isLoading={isLoading}
        isServerError={isServerError}
      >
        <Outlet />
      </ItemList>
      <Pagination
        nextPage={nextPage}
        previousPage={previousPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};
