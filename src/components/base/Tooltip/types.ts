import { TooltipProps as TooltipChakraProps } from '@chakra-ui/react';

import { Children } from 'model/types/Children';

export type TooltipProps = Pick<TooltipChakraProps, 'placement' | 'label'> & {
  children: Children;
};
