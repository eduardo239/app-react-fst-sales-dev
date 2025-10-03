import React from 'react';
import { cn } from '../styles/theme';

type SocialProvider =
  | 'google'
  | 'facebook'
  | 'x'
  | 'github'
  | 'apple'
  | 'linkedin';

interface SocialButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  provider: SocialProvider;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'minimal';
  showText?: boolean;
  loading?: boolean;
}

export default function SocialButton({
  provider,
  size = 'md',
  variant = 'default',
  showText = true,
  loading = false,
  className = '',
  disabled,
  ...props
}: SocialButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const providerConfig = {
    google: {
      name: 'Google',
      colors: {
        default:
          'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50',
        outline:
          'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50',
        minimal: 'bg-transparent text-gray-700 hover:bg-gray-100',
      },
      focusRing: 'focus:ring-blue-500',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
      ),
    },
    facebook: {
      name: 'Facebook',
      colors: {
        default: 'bg-blue-600 text-white hover:bg-blue-700',
        outline:
          'bg-white border border-blue-600 text-blue-600 hover:bg-blue-50',
        minimal: 'bg-transparent text-blue-600 hover:bg-blue-50',
      },
      focusRing: 'focus:ring-blue-500',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    x: {
      name: 'X',
      colors: {
        default: 'bg-black text-white hover:bg-gray-800',
        outline:
          'bg-white border border-gray-900 text-gray-900 hover:bg-gray-50',
        minimal: 'bg-transparent text-gray-900 hover:bg-gray-100',
      },
      focusRing: 'focus:ring-gray-500',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    github: {
      name: 'GitHub',
      colors: {
        default: 'bg-gray-900 text-white hover:bg-gray-800',
        outline:
          'bg-white border border-gray-900 text-gray-900 hover:bg-gray-50',
        minimal: 'bg-transparent text-gray-900 hover:bg-gray-100',
      },
      focusRing: 'focus:ring-gray-500',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.300 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    apple: {
      name: 'Apple',
      colors: {
        default: 'bg-black text-white hover:bg-gray-800',
        outline:
          'bg-white border border-gray-900 text-gray-900 hover:bg-gray-50',
        minimal: 'bg-transparent text-gray-900 hover:bg-gray-100',
      },
      focusRing: 'focus:ring-gray-500',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C8.396 0 8.001 3.021 8.001 4.021c0 .711 0 2.625 0 4.625C8.001 9.953 8.98 11 11.017 11c2.037 0 3.017-1.047 3.017-2.354 0-2 0-3.914 0-4.625C14.034 3.021 13.639 0 12.017 0zm2.5 10c-.175 0-2.025 0-2.025 1.405 0 .402-.02.995-.02 1.595 0 1.8.02 2.605.02 3.605 0 2.4-1.8 2.4-2.475 2.4-.675 0-2.475 0-2.475-2.4 0-1 .02-1.805.02-3.605 0-.6-.02-1.193-.02-1.595 0-1.405-1.85-1.405-2.025-1.405C4.78 10 4 10.78 4 11.517s.78 1.517 1.517 1.517c.094 0 1.734 0 1.734.859 0 .3-.019.781-.019 1.281 0 1.4.019 2.119.019 2.619 0 3.5 2.8 3.5 3.749 3.5.949 0 3.749 0 3.749-3.5 0-.5.019-1.219.019-2.619 0-.5-.019-.981-.019-1.281 0-.859 1.64-.859 1.734-.859C19.22 13.034 20 12.254 20 11.517S19.22 10 18.483 10z" />
        </svg>
      ),
    },
    linkedin: {
      name: 'LinkedIn',
      colors: {
        default: 'bg-blue-700 text-white hover:bg-blue-800',
        outline:
          'bg-white border border-blue-700 text-blue-700 hover:bg-blue-50',
        minimal: 'bg-transparent text-blue-700 hover:bg-blue-50',
      },
      focusRing: 'focus:ring-blue-500',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  };

  const config = providerConfig[provider];
  const isDisabled = disabled || loading;

  return (
    <button
      className={cn(
        baseStyles,
        sizeStyles[size],
        config.colors[variant],
        config.focusRing,
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
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
      ) : (
        <span className={showText ? 'mr-2' : ''}>{config.icon}</span>
      )}
      {showText && !loading && `Continue with ${config.name}`}
      {loading && 'Connecting...'}
    </button>
  );
}

// Social Login Group Component
export function SocialLoginGroup({
  providers = ['google', 'facebook', 'x'],
  variant = 'default',
  size = 'md',
  showText = true,
  onProviderClick,
  className = '',
}: {
  providers?: SocialProvider[];
  variant?: 'default' | 'outline' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  onProviderClick?: (provider: SocialProvider) => void;
  className?: string;
}) {
  return (
    <div className={cn('space-y-3', className)}>
      {providers.map((provider) => (
        <SocialButton
          key={provider}
          provider={provider}
          variant={variant}
          size={size}
          showText={showText}
          onClick={() => onProviderClick?.(provider)}
          className="w-full"
        />
      ))}
    </div>
  );
}

// Compact Social Icons (for icon-only display)
export function SocialIcons({
  providers = ['google', 'facebook', 'x'],
  size = 'md',
  onProviderClick,
  className = '',
}: {
  providers?: SocialProvider[];
  size?: 'sm' | 'md' | 'lg';
  onProviderClick?: (provider: SocialProvider) => void;
  className?: string;
}) {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return (
    <div className={cn('flex space-x-3', className)}>
      {providers.map((provider) => (
        <SocialButton
          key={provider}
          provider={provider}
          variant="outline"
          size={size}
          showText={false}
          onClick={() => onProviderClick?.(provider)}
          className={cn('aspect-square', iconSizes[size])}
        />
      ))}
    </div>
  );
}
