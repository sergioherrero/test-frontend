import { render } from '@testing-library/react';
import React from 'react';

import GeneralErrorFallback from '.';

const componentStack = 'COMPONENT_STACK';
const error = new Error('ERROR');

const setup = () => {
  const view = render(<GeneralErrorFallback componentStack={componentStack} error={error} />);

  return {
    ...view,
  };
};

describe('GeneralErrorFallback test', () => {
  it('should render GeneralErrorFallback', () => {
    const { getByText } = setup();
    expect(getByText(componentStack, { exact: false })).toBeInTheDocument();
  });
});
