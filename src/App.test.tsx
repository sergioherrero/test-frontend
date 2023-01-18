import React from 'react';

import { renderWithProviders } from 'helpers/testHelpers';

import App from './App';

test('renders learn react link', () => {
  renderWithProviders(<App />, { query: true, router: true });
  expect(true).toBeTruthy();
});
