import { ChangeEvent } from 'react';
import './searchInput.css';

interface InputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput = ({ value, onChange }: InputProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search..."
    />
  );
};
