import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ErrorIndicator } from './ErrorIndicator.tsx';

describe('ErrorIndicator', () => {
  it('renders without crashing', () => {
    render(<ErrorIndicator />);
    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});
