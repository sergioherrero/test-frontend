import { ErrorInfo } from 'react';

import { Children } from 'model/types/Children';

export type ErrorBoundaryState = {
  error?: Error;
  errorInfo?: ErrorInfo;
};

export type ErrorBoundaryProps = {
  children: Children;
};
