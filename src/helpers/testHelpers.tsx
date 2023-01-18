// eslint-disable-next-line import/order, import/no-extraneous-dependencies
import { render } from '@testing-library/react';

import React, { JSXElementConstructor, ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

type ProvidersType = { router?: boolean; query?: boolean };

export const renderWithProviders = (
  children: ReactElement<unknown, string | JSXElementConstructor<unknown>>,
  props?: ProvidersType,
) => {
  let res = children;

  if (props?.query) {
    res = <QueryClientProvider client={queryClient}>{res}</QueryClientProvider>;
  }
  if (props?.router) {
    res = <BrowserRouter>{res}</BrowserRouter>;
  }

  return render(res);
};
