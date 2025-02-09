import { useNavigate } from 'react-router';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

import { ItemList } from './ItemList';

jest.mock('react-router', () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn().mockReturnValue({ pageId: '1' }),
}));

const mockPersonList = [
  {
    id: 1,
    name: 'Luke Skywalker',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
    url: 'https://swapi.dev/api/people/1/',
  },
  {
    id: 2,
    name: 'Anakin Skywalker',
    eye_color: 'blue',
    birth_year: '41.9BBY',
    gender: 'male',
    url: 'https://swapi.dev/api/people/11/',
  },
];

describe('ItemList', () => {
  it('renders without crashing', () => {
    render(<ItemList items={mockPersonList} isLoading={false} />);
    expect(screen.getByText(mockPersonList[0].name)).toBeInTheDocument();
  });

  it('renders spinner during loading', () => {
    render(<ItemList items={mockPersonList} isLoading={true} />);
    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toBeInTheDocument();
  });

  it('navigates to the correct URL when a person is clicked', () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(<ItemList items={mockPersonList} isLoading={false} />);

    const personButton = screen.getByText(mockPersonList[0].name);
    fireEvent.click(personButton);

    expect(mockNavigate).toHaveBeenCalledWith('/page/1/people/1');
  });
});
