import { Person } from './types/types.ts';

interface SwapiResponse {
  results: Person[];
}

export default class SwapiService {
  private readonly baseURL: string;

  constructor(baseURL = 'https://swapi.dev/api') {
    this.baseURL = baseURL;
  }

  getPeople(searchTerm: string = ''): Promise<SwapiResponse> {
    const url = searchTerm
      ? `${this.baseURL}/people/?search=${encodeURIComponent(searchTerm)}`
      : `${this.baseURL}/people/?page=1`;

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
