import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { mockCardItemData } from '../../components/CardItem/CardItem.test.tsx';
import { Dashboard } from './Dashboard.tsx';

const FakeOutlet = () => null;

const PAGE_SIZE = 10;

describe('Dashboard Component', () => {
  afterEach(() => {
    if (global.fetch) {
      (global.fetch as jest.Mock).mockClear();
      global.fetch = {} as (
        input: RequestInfo | URL,
        init?: RequestInit
      ) => Promise<Response>;
    }
  });

  it('renders correctly initially', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: async () => ({
          results: Array.from({ length: PAGE_SIZE }, (_, i) => ({
            ...mockCardItemData,
            id: i + 1,
          })),
          next: null,
          previous: null,
        }),
      } as Response)
    ) as jest.MockedFunction<
      (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
    >;

    render(
      <MemoryRouter initialEntries={['/page/1']}>
        <Routes>
          <Route path={'/page/:pageId'} element={<Dashboard />}>
            <Route path={'/page/:pageId/people/:id'} element={<FakeOutlet />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Results')).toBeInTheDocument();
      const cardItems = screen.getAllByTestId('card-item');
      expect(cardItems.length).toBe(PAGE_SIZE);
    });
  });

  it('handle error correctly', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: async () => ({ results: [], next: null, previous: null }),
      } as Response)
    ) as jest.MockedFunction<
      (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
    >;

    render(
      <MemoryRouter initialEntries={['/page/1']}>
        <Routes>
          <Route path={'/page/:pageId'} element={<Dashboard />}>
            <Route path={'/page/:pageId/people/:id'} element={<FakeOutlet />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Results')).toBeInTheDocument();
    });
  });
});
