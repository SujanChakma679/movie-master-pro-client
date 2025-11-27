
import React from 'react';
import { useRouteError, Link } from 'react-router';
import { useTheme } from '../../../context/ThemeContext';


const ErrorPage = () => {
  const error = useRouteError();
  const { isDark } = useTheme();

  const status = error?.status || error?.statusCode;
  const message =
    error?.statusText ||
    error?.message ||
    'Something went wrong. Please try again later.';

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-4 ${
        isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <h1 className="text-5xl font-bold mb-4">Oops!</h1>
      <p className="text-xl mb-2">We&apos;re sorry, an error occurred.</p>

      {status && (
        <p className="text-lg font-semibold mb-1">
          Status: <span className="font-bold">{status}</span>
        </p>
      )}

      <p className="max-w-xl text-center opacity-80 mb-6">{message}</p>

      <div className="flex gap-4">
        <button
          className="btn-primary"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
        <Link to="/" className="btn">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
