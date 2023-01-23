import {
  Input as InputChakra,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
} from '@chakra-ui/react';
import React, { ChangeEvent } from 'react';

import { InputProps } from './types';

const Input = ({ className, leftAddon, onChange, rightAddon, size, ...rest }: InputProps) => {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <InputGroup className={className} data-testid="custom-input" size={size}>
      {leftAddon && <InputLeftElement pointerEvents="none">{leftAddon}</InputLeftElement>}
      <InputChakra
        className={className ? `${className}-input` : undefined}
        onChange={handleOnChange}
        size={size}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
      {rightAddon && <InputRightAddon pointerEvents="none">{rightAddon}</InputRightAddon>}
    </InputGroup>
  );
};

export default Input;
