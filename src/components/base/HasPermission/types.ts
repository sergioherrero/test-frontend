import { ReactElement } from 'react';

export type HasPermissionProps = {
  children: ReactElement;
  propName: string;
  expectedValue: string;
};
