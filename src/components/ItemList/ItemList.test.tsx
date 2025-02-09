import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ItemList } from './ItemList';
import { jest } from '@jest/globals';
import { MemoryRouter, useNavigate } from 'react-router';

jest.mock('react-router', () => ({
  MemoryRouter: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
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
  beforeEach(() => {
    jest.clearAllMocks();
  });

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

    render(
      <MemoryRouter>
        <ItemList items={mockPersonList} isLoading={false} />
      </MemoryRouter>
    );

    const personButton = screen.getByText(mockPersonList[0].name);
    fireEvent.click(personButton);

    expect(mockNavigate).toHaveBeenCalledWith('/page/1/people/1');
  });
});
