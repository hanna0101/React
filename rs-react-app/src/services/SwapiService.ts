export default class SwapiService {
  private readonly baseURL: string;
  constructor(baseURL = 'https://swapi.dev/api') {
    this.baseURL = baseURL;
  }

  getPeople(searchTerm) {
    const url = searchTerm
      ? `${this.baseURL}/people/?search=${searchTerm}`
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
      });
  }
}
