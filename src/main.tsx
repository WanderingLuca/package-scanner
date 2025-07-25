import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import '@radix-ui/themes/styles.css';
import './index.css';
import { Theme } from '@radix-ui/themes';
import App from './App.tsx';
import { queryClient } from './utils/queryClient';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme appearance='dark'>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Theme>
  </StrictMode>
);
