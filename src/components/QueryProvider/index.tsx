import React, { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { QueryProviderProps } from './types';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const QueryProvider: FC<QueryProviderProps> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default QueryProvider;
