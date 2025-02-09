import { render, screen, waitFor } from '@testing-library/react';
import { Results } from './Results';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const FakeOutlet = () => null;

describe('Results Component', () => {
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
        json: async () => ({ results: [], next: null, previous: null }),
      } as Response)
    ) as jest.MockedFunction<
      (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
    >;

    render(
      <MemoryRouter initialEntries={['/page/1']}>
        <Routes>
          <Route path={'/page/:pageId'} element={<Results />}>
            <Route path={'/page/:pageId/people/:id'} element={<FakeOutlet />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Results')).toBeInTheDocument();
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
          <Route path={'/page/:pageId'} element={<Results />}>
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
