import { ErrorInfo, ReactNode } from 'react';

export type ErrorBoundaryState = {
  error?: Error;
  errorInfo?: ErrorInfo;
};

export type ErrorBoundaryProps = {
  children: ReactNode;
};
