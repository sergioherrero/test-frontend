import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Children } from 'model/types/Children';

import { renderWithProviders } from 'helpers/testHelpers';

import Tooltip from '.';

import { TooltipProps } from './types';

const setup = (children: Children, props: Omit<TooltipProps, 'children'>) => {
  const view = renderWithProviders(<Tooltip {...props}>{children}</Tooltip>, { query: true });

  return {
    ...view,
  };
};

describe('Tooltip component', () => {
  it('Tooltip renders properly', async () => {
    const props = { label: 'Tooltip Label' };
    const { getByTestId, getByText } = setup(<div data-testid="test" />, props);

    const testDiv = getByTestId('test');
    expect(testDiv).toBeInTheDocument();
    userEvent.hover(testDiv);
    await waitFor(() => {
      expect(getByText(props.label)).toBeInTheDocument();
    });
  });
});
