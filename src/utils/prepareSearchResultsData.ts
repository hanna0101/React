import { extractIdFromUrl } from './extractIdFromUrl.ts';
import { Person } from '../services/types/types.ts';

export const prepareSearchResultsData = (searchResults: Person[]) => {
  return searchResults
    .map((el) => ({ ...el, id: extractIdFromUrl(el.url) }))
    .filter((el) => el.id);
};
