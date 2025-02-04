export interface Person {
  id?: number | null;
  name: string;
  height: number;
  mass: number;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: number;
  gender: string;
  homeworld: string;
  films: [string];
  species: [];
  vehicles: [string];
  starships: [string];
  created: string;
  edited: string;
  url: string;
}
