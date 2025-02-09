import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary.tsx';

import '@testing-library/jest-dom';

const ThrowError = () => {
  throw Error('Test');
};

describe('ErrorBoundary', () => {
  it('renders children when everything is fine', async () => {
    render(
      <ErrorBoundary>
        <p>Everything is fine</p>
      </ErrorBoundary>
    );
    expect(screen.getByText(/Everything is fine/i)).toBeInTheDocument();
  });

  it('shows an apologetic error message when an unhandled exception is thrown', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('error-indicator')).toBeInTheDocument();
  });
});
