import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './app/instances/react-query-client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
  // </StrictMode>
);
