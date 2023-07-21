import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './app/instances/react-query-client';
import { Router } from 'wouter';
import { useHashLocation } from './app/hooks/use-hash-location';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <Router hook={useHashLocation} base="#">
      <App />
    </Router>
  </QueryClientProvider>
  // </StrictMode>
);
