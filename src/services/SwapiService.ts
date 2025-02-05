import { Person } from './types/types.ts';
import { API } from '../constants/constants.ts';

interface SwapiResponse {
  results: Person[];
}

export default class SwapiService {
  private readonly baseURL: string;

  constructor(baseURL = API.BASE_URL) {
    this.baseURL = baseURL;
  }

  getPeople(searchTerm: string = '', currentPage = 1): Promise<SwapiResponse> {
    const searchParams = searchTerm
      ? `/people/?search=${encodeURIComponent(searchTerm)}`
      : `/people/?page=${currentPage}`;
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
