
import React from 'react';
import { useTheme } from '../../../context/ThemeContext';


class InnerBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('App error boundary caught:', error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    const { hasError } = this.state;
    const { isDark } = this.props;

    if (hasError) {
      return (
        <div
          className={`min-h-screen flex flex-col items-center justify-center px-4 ${
            isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
          }`}
        >
          <h1 className="text-4xl font-bold mb-4">Something went wrong.</h1>
          <p className="mb-4">
            An unexpected error occurred. Please try reloading the page.
          </p>
          <button className="btn-primary" onClick={this.handleReload}>
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export const AppErrorBoundary = ({ children }) => {
  // Wrap the class component so we can use hooks here
  const { isDark } = useTheme();
  return <InnerBoundary isDark={isDark}>{children}</InnerBoundary>;
};
