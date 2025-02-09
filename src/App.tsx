import { Route, Routes } from 'react-router';

import { Root } from './pages/Root/Root.tsx';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage.tsx';
import { CardItemDetails } from './pages/CardItemDetails/CardItemDetails.tsx';
import { Dashboard } from './pages/Dashboard/Dashboard.tsx';

import './AppStyles.css';

export const App = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Root />}>
        <Route path={'/page/:pageId'} element={<Dashboard />}>
          <Route
            path={'/page/:pageId/people/:id'}
            element={<CardItemDetails />}
          />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
