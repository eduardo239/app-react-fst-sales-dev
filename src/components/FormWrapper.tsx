import React from 'react';
import { cn } from '../styles/theme';
import type { FormWrapperProps } from '../types/layout';

export default function FormWrapper({
  children,
  title,
  subtitle,
  onSubmit,
  className = '',
  variant = 'default',
  maxWidth = 'md',
  loading = false,
  error,
  success,
}: FormWrapperProps) {
  const maxWidthStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full',
  };

  const variantStyles = {
    default: 'bg-white',
    card: 'bg-white border border-gray-200 p-6',
    minimal: 'bg-transparent',
  };

  const baseStyles = 'w-full mx-auto space-y-6';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    onSubmit?.(e);
  };

  return (
    <div className={cn(baseStyles, maxWidthStyles[maxWidth], className)}>
      <div className={cn(variantStyles[variant])}>
        {/* Header Section */}
        {(title || subtitle) && (
          <div className="text-center space-y-2 mb-6">
            {title && (
              <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
            )}
            {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
          </div>
        )}

        {/* Status Messages */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-red-400 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-green-400 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-green-700">{success}</p>
            </div>
          </div>
        )}

        {/* Form Content */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 border border-gray-200 p-6"
        >
          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <svg
                  className="animate-spin h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span className="text-sm text-gray-600">Processing...</span>
              </div>
            </div>
          )}

          {/* Form Fields */}
          <div
            className={cn(
              'space-y-4',
              loading && 'opacity-50 pointer-events-none'
            )}
          >
            {children}
          </div>
        </form>
      </div>
    </div>
  );
}
