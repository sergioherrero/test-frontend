import React, { Component, ErrorInfo } from 'react';

import GeneralErrorFallback from 'components/error/GeneralErrorFallback';

import { ErrorBoundaryProps, ErrorBoundaryState } from './types';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      error: undefined,
      errorInfo: undefined,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    const { errorInfo, error } = this.state;
    const { children } = this.props;
    if (errorInfo && error) {
      return <GeneralErrorFallback componentStack={errorInfo.componentStack} error={error} />;
    }

    return children;
  }
}

export default ErrorBoundary;
