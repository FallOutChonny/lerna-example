import React from 'react';
import styled from 'styled-components';

const ErrorFallbackWrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  padding: 50px;
`;

type FallbackComponentProps = {
  componentStack: string;
  error: Error;
};

const ErrorBoundaryFallbackComponent = ({
  componentStack,
  error,
}: FallbackComponentProps) => (
  <ErrorFallbackWrapper>
    <h1>Something went wrong.</h1>
    {error && error.toString()}
    <p style={{ whiteSpace: 'pre-wrap' }}>{componentStack}</p>
  </ErrorFallbackWrapper>
);

type ErrorInfo = {
  componentStack: string;
};

type ErrorBoundaryProps = {
  children?: any;
  FallbackComponent: React.ComponentType<any>;
  onError?: (error: Error, componentStack: string) => void;
};

type ErrorBoundaryState = {
  hasError?: boolean;
  error?: Error | null;
  info?: ErrorInfo | null;
};

export default class ErrorBoundary extends React.PureComponent<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  static defaultProps = {
    FallbackComponent: ErrorBoundaryFallbackComponent,
  };

  state = {
    error: null,
    info: null,
  };

  componentDidCatch(error: Error, info: ErrorInfo): void {
    const { onError } = this.props;

    if (typeof onError === 'function') {
      try {
        /* istanbul ignore next: Ignoring ternary; can’t reproduce missing info in test environment. */
        onError.call(this, error, info ? info.componentStack : '');
      } catch (ignoredError) {}
    }

    this.setState({ error, info });
  }

  render() {
    const {
      props: { children, FallbackComponent },
      state: { error, info },
    } = this;

    if (error !== null) {
      return (
        <FallbackComponent
          componentStack={
            // @ts-ignore
            info ? info.componentStack : ''
          }
          error={error}
        />
      );
    }

    return children || null;
  }
}
