import { ReactElement } from 'react';

export type ButtonProps = {
  children?: ReactElement;
  className?: string;
  color?: 'primary' | 'secondary' | 'transparent';
  disabled?: boolean;
  external?: boolean;
  id?: string;
  leftAddon?: ReactElement;
  onClick?: () => void;
  onMouseOver?: () => void;
  rightAddon?: ReactElement;
  tabIndex?: number;
  testid?: string;
  text?: string;
  to?: string;
  type?: 'submit' | 'reset' | 'button';
  variant?: 'solid' | 'outline' | 'ghost';
};
