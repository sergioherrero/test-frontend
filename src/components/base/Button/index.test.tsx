import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { renderWithProviders } from 'helpers/testHelpers';

import { ButtonProps } from './types';

import Button from '.';

const setup = (props?: ButtonProps) => {
  const view = renderWithProviders(<Button {...(props || {})} />, { router: true });
  const button = screen.queryByRole('button');

  return {
    button,
    ...view,
  };
};

describe('Button component', () => {
  it('Button renders properly', () => {
    const { button } = setup();

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('custom-button');
    expect(button).toHaveClass('primary');
  });

  it('Render className', () => {
    const { button } = setup({ className: 'test' });
    expect(button).toHaveClass('test');
  });

  it('Render link', () => {
    setup({ to: 'test' });
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('Render external link', () => {
    setup({ external: true, to: 'http://google.com' });
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('Render prefix and suffix', () => {
    const { getByTestId } = setup({
      leftAddon: <div data-testid="prefix" />,
      rightAddon: <div data-testid="suffix" />,
    });

    expect(getByTestId('prefix')).toBeInTheDocument();
    expect(getByTestId('suffix')).toBeInTheDocument();
  });

  it('Render text', () => {
    const { getByText } = setup({ text: 'test' });

    const text = getByText('test');

    expect(text).toBeInTheDocument();
  });

  it('Render disabled', () => {
    const { button } = setup({ disabled: true });

    expect(button).toHaveAttribute('disabled');
  });

  it('Render color', () => {
    const { button } = setup({ color: 'secondary' });

    expect(button).toHaveClass('secondary');
  });

  it('Execute onClick', async () => {
    const handleClick = jest.fn();
    const { button, rerender } = setup({ onClick: handleClick });

    userEvent.click(button as HTMLButtonElement);
    await waitFor(() => {
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    rerender(<Button disabled onClick={handleClick} />);
    userEvent.click(button as HTMLButtonElement);
    await waitFor(() => {
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    rerender(<Button />);
    userEvent.click(button as HTMLButtonElement);
    await waitFor(() => {
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
