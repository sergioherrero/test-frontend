import { render } from '@testing-library/react';
import React from 'react';

import { Children } from 'model/types/Children';

import ErrorBoundary from '.';

const setup = (children: Children) => {
  const view = render(<ErrorBoundary>{children}</ErrorBoundary>);

  return {
    ...view,
  };
};

const errorText = 'This is the text of the error';

const ThrowError = () => {
  throw new Error(errorText);
};

describe('ErrorBoundary test', () => {
  it('should render ErrorBoundary', () => {
    const children = <div data-testid="test-id" />;
    const { getByTestId } = setup(children);
    expect(getByTestId(children.props['data-testid'])).toBeInTheDocument();
  });
  it('should render the error', () => {
    const { getByText } = setup(<ThrowError />);

    expect(getByText(errorText)).toBeInTheDocument();
  });
});
