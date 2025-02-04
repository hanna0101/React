import { LOCAL_STORAGE } from '../constants/constants.ts';
import { Person } from './types/types.ts';

export class StorageService {
  getSearchTerm() {
    return this.getItem(LOCAL_STORAGE.SEARCH_TERM) || '';
  }

  getSearchResults() {
    const results = this.getItem(LOCAL_STORAGE.RESULTS);
    return results ? JSON.parse(results) : [];
  }

  setSearchTerm(value: string) {
    this.setItem(LOCAL_STORAGE.SEARCH_TERM, value);
  }

  setSearchResults(value: Person[]) {
    this.setItem(LOCAL_STORAGE.RESULTS, JSON.stringify(value));
  }

  private getItem(key: string) {
    return localStorage.getItem(key);
  }

  private setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }
}
