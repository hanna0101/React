import SearchForm from '../components/SearchForm/SearchForm.tsx';
import { Pagination } from '../components/Pagination/Pagination.tsx';
import { useGetSearchTerm } from '../helpers/useGetSearchTerm.ts';
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Person } from '../services/types/types.ts';
import { prepareSearchResultsData } from '../utils/prepareSearchResultsData.ts';
import SwapiService from '../services/SwapiService.ts';
import { StorageService } from '../services/StorageService.ts';
import { ErrorIndicator } from '../components/ErrorIndicator/ErrorIndicator.tsx';
import { Results } from '../components/Results/Results.tsx';
import { useLocation, useNavigate } from 'react-router';
import { getNumberFromURL } from '../utils/getNumberFromURL.ts';
import { API } from '../constants/constants.ts';

const swapiService = new SwapiService();
const storageService = new StorageService();

export const PeopleList = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useGetSearchTerm();
  const [searchResults, setSearchResults] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    getNumberFromURL(search) || API.FIRST_PAGE
  );
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
    navigate(`/?page=${currentPage}`, { replace: true });
    fetchPeople(searchTerm);
  }, [searchTerm, fetchPeople, currentPage, navigate]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.trim();
    setSearchTerm(searchTerm);
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
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
        nextPage={nextPage}
        previousPage={previousPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};
