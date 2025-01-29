export default class SwapiService {
  private readonly baseURL: string;
  constructor(baseURL = 'https://swapi.dev/api') {
    this.baseURL = baseURL;
  }

  getAllPeople() {
    const url = `${this.baseURL}/people/`;

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
