import { Route, Routes } from 'react-router';
import { PeopleList } from './pages/PeopleList.tsx';
import { NotFoundPage } from './pages/NotFoundPage.tsx';

import './app.css';

export const App = () => {
  return (
    <Routes>
      <Route path={'/'} element={<PeopleList />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
