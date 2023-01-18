import { ChakraProvider } from '@chakra-ui/react';
import React, { FC } from 'react';

import theme from 'theme';

import { ThemeProviderProps } from './types';

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
);

export default ThemeProvider;
