import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { StorageService } from '../services/StorageService.ts';

const storageService = new StorageService();

export const useGetSearchTerm = (): [
  string,
  Dispatch<SetStateAction<string>>,
] => {
  const [searchTerm, setSearchTerm] = useState(storageService.getSearchTerm());

  useEffect(() => {
    const storedSearchTerm = storageService.getSearchTerm();
    setSearchTerm(storedSearchTerm);
  }, []);

  return [searchTerm, setSearchTerm];
};
