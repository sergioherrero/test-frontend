import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Input from '.';

const setup = () => {
  const view = render(<Input placeholder="input" />);
  const inputContainer = screen.getByTestId('custom-input');
  const input = screen.getByRole('textbox');

  return {
    input,
    inputContainer,
    ...view,
  };
};
const handleChange = jest.fn();

describe('Input component', () => {
  it('Input renders properly', () => {
    const { inputContainer } = setup();

    expect(inputContainer).toBeInTheDocument();
  });

  it('Render className', () => {
    const { input, inputContainer, rerender } = setup();

    rerender(<Input className="test" name="testInput" />);
    expect(inputContainer).toHaveClass('test');
    expect(input).toHaveClass('test-input');
  });

  it('Render placeholder', () => {
    const { getByPlaceholderText, rerender } = setup();

    rerender(<Input name="testInput" placeholder="testInput" />);

    const placeholder = getByPlaceholderText('testInput');

    expect(placeholder).toBeInTheDocument();
  });

  it('Render disabled', () => {
    const { input, rerender } = setup();

    rerender(<Input isDisabled name="testInput" />);

    expect(input).toHaveAttribute('disabled');
  });

  it('Execute onChange', async () => {
    const { input, rerender } = setup();

    rerender(<Input name="testInput" onChange={handleChange} />);

    const text = 'test';
    userEvent.type(input, text);

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledWith(text);
    });
    expect(input).toHaveValue('test');
  });

  it('Render prefix and suffix', () => {
    const { getByTestId, rerender } = setup();

    rerender(
      <Input
        leftAddon={<div data-testid="prefix" />}
        name="testInput"
        onChange={handleChange}
        rightAddon={<div data-testid="suffix" />}
        value="test"
      />,
    );

    expect(getByTestId('prefix')).toBeInTheDocument();
    expect(getByTestId('suffix')).toBeInTheDocument();
  });
});
