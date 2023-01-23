import { Tooltip as TooltipChakra } from '@chakra-ui/react';
import React from 'react';

import { TooltipProps } from './types';

const Tooltip = ({ children, label, placement }: TooltipProps) => (
  <TooltipChakra closeDelay={200} hasArrow label={label} placement={placement}>
    {children}
  </TooltipChakra>
);

export default Tooltip;
