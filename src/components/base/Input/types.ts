import { InputProps as InputChakraProps } from '@chakra-ui/react';

import { Children } from 'model/types/Children';

export type InputProps = Omit<InputChakraProps, 'onChange'> & {
  leftAddon?: Children;
  onChange?: (value: string) => void;
  rightAddon?: Children;
};
