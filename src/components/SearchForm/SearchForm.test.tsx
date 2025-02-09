import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchForm from './SearchForm';

describe('SearchForm', () => {
  const mockSetSearchTerm = jest.fn();

  it('renders without crashing', () => {
    render(
      <SearchForm
        searchTerm="test search"
        isLoading={false}
        setSearchTerm={mockSetSearchTerm}
      />
    );

    expect(screen.getByDisplayValue('test search')).toBeInTheDocument();
  });

  it('calls setSearchTerm when the form is submitted', () => {
    render(
      <SearchForm
        searchTerm="test search"
        isLoading={false}
        setSearchTerm={mockSetSearchTerm}
      />
    );

    const form = screen.getByRole('form');

    fireEvent.submit(form);

    expect(mockSetSearchTerm).toHaveBeenCalledWith('test search');
  });

  it('updates input value', () => {
    render(
      <SearchForm
        searchTerm="test search"
        isLoading={false}
        setSearchTerm={mockSetSearchTerm}
      />
    );

    const input = screen.getByDisplayValue('test search') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'new search term' } });

    expect(input.value).toBe('new search term');
  });
});
