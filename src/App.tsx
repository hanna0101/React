import { Route, Routes } from 'react-router';
import { Dashboard } from './pages/Dashboard/Dashboard.tsx';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage.tsx';
import { CardItemDetails } from './pages/CardItemDetails/CardItemDetails.tsx';
import { Results } from './components/Results/Results.tsx';
import './app.css';

export const App = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Dashboard />}>
        <Route path={'/page/:pageId'} element={<Results />}>
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
