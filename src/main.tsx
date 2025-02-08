import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary.tsx';
import { BrowserRouter } from 'react-router';
import { Spinner } from './components/Spinner/Spinner.tsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Suspense fallback={<Spinner />}>
        <BrowserRouter>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </BrowserRouter>
      </Suspense>
    </StrictMode>
  );
} else {
  console.error("Root element with ID 'root' not found.");
}
