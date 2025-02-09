import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Pagination } from './Pagination.tsx';
import { jest } from '@jest/globals';

jest.mock('react-router', () => ({
  useNavigate: jest.fn(),
}));

describe('Pagination', () => {
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
});
