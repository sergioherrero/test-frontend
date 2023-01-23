import React, { ReactElement } from 'react';

import { renderWithProviders } from 'helpers/testHelpers';

import HasPermission from '.';

const setup = (children: ReactElement, expectedValue: string, propName: string) => {
  const view = renderWithProviders(
    <HasPermission expectedValue={expectedValue} propName={propName}>
      {children}
    </HasPermission>,
    { query: true },
  );

  return {
    ...view,
  };
};

describe('HasPermission component', () => {
  it('HasPermission renders properly', () => {
    const { queryByTestId } = setup(<div data-testid="test" />, 'aa', 'aa');
    expect(queryByTestId('test')).not.toBeInTheDocument();
  });
});
