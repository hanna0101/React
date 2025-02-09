import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CardItem } from './CardItem.tsx';

export const mockCardItemData = {
  url: 'https://swapi.dev/api/people/1/',
  img: `https://starwars-visualguide.com/assets/img/characters/1.jpg`,
  name: 'Luke Skywalker',
  birthYear: '19BBY',
  gender: 'male',
  eyeColor: 'blue',
};

describe('CardItem', () => {
  it('renders without crashing', () => {
    render(
      <CardItem
        img={mockCardItemData.img}
        name={mockCardItemData.name}
        birthYear={mockCardItemData.birthYear}
        gender={mockCardItemData.gender}
        eyeColor={mockCardItemData.eyeColor}
        handleDetailsClose={() => {}}
      />
    );
    expect(screen.getByText(mockCardItemData.name)).toBeInTheDocument();
  });
});
