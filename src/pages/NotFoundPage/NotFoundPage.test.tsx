import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NotFoundPage } from './NotFoundPage.tsx';

describe('NotFoundPage', () => {
  it('renders without crashing', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('404 Page Not Found')).toBeInTheDocument();
  });
});
