import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { SearchInput } from './SearchInput.tsx';

describe('SearchInput', () => {
  it('renders without crashing', () => {
    render(<SearchInput value={'test'} onChange={() => {}} />);
    expect(screen.getByDisplayValue('test')).toBeInTheDocument();
  });
});
