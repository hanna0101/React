import { API } from '../constants/constants.ts';
import { Person } from './types/types.ts';

interface SwapiResponse {
  next: string | null;
  previous: string | null;
  results: Person[];
}

class SwapiService {
  private readonly baseURL: string;

  constructor(baseURL = API.BASE_URL) {
    this.baseURL = baseURL;
  }

  getPeople(
    searchTerm: string = '',
    currentPage: number = API.FIRST_PAGE
  ): Promise<SwapiResponse> {
    const url = `${this.baseURL}/people/?page=${currentPage}&search=${encodeURIComponent(searchTerm)}`;

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

  getPersonById(id: number) {
    return fetch(`${this.baseURL}/people/${id}`)
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

export const swapiService = new SwapiService();
