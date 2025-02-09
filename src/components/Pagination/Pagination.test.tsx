import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import { Pagination } from './Pagination';

const mockNavigate = jest.fn();

jest.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
}));

describe('Pagination', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders without crashing', () => {
    const mockSetSearchTerm = jest.fn();

    render(
      <Pagination
        nextPage={'2'}
        previousPage={null}
        currentPage={1}
        setCurrentPage={mockSetSearchTerm}
      />
    );

    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('url updates after clicking Next button', () => {
    const mockSetCurrentPage = jest.fn();

    render(
      <Pagination
        nextPage={'2'}
        previousPage={null}
        currentPage={1}
        setCurrentPage={mockSetCurrentPage}
      />
    );

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    expect(mockNavigate).toHaveBeenCalledWith('/page/2');
    expect(mockSetCurrentPage).toHaveBeenCalled();
  });

  it('url updates after clicking Previous button', () => {
    const mockSetCurrentPage = jest.fn();

    render(
      <Pagination
        nextPage={'3'}
        previousPage={'1'}
        currentPage={2}
        setCurrentPage={mockSetCurrentPage}
      />
    );

    const previousButton = screen.getByText('Previous');
    fireEvent.click(previousButton);

    expect(mockSetCurrentPage).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/page/1');
  });
});
