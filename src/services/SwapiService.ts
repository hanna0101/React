import { Person } from './types/types.ts';
import { API } from '../constants/constants.ts';

interface SwapiResponse {
  next: string | null;
  previous: string | null;
  results: Person[];
}

export default class SwapiService {
  private readonly baseURL: string;

  constructor(baseURL = API.BASE_URL) {
    this.baseURL = baseURL;
  }

  getPeople(
    searchTerm: string = '',
    currentPage: number = API.FIRST_PAGE
  ): Promise<SwapiResponse> {
    const searchParams = `/people/?page=${currentPage}&search=${encodeURIComponent(searchTerm)}`;
    const url = `${this.baseURL}${searchParams}`;

    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Received ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }
}
