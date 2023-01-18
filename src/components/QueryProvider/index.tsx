import React, { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { QueryProviderProps } from './types';

const queryClient = new QueryClient();

const QueryProvider: FC<QueryProviderProps> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default QueryProvider;
