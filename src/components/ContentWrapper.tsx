import React from 'react';
import { cn } from '../styles/theme';
import type { ContentWrapperProps } from '../types/layout';

export default function ContentWrapper({
  children,
  variant = 'default',
  spacing = 'default',
  backgroundColor = 'none',
  centered = true,
  className = '',
  containerClassName = '',
}: ContentWrapperProps) {
  // Base max-width is now 1000px for 'default' variant
  const variantStyles = {
    default: 'max-w-[1000px]', // Custom 1000px
    narrow: 'max-w-[720px]', // Narrower layout
    wide: 'max-w-[1200px]', // Wider layout
    full: 'max-w-full', // Full width
  };

  // Enhanced responsive spacing
  const spacingStyles = {
    none: 'p-0',
    tight: 'px-3 py-2 sm:px-4 sm:py-3',
    default: 'px-4 py-4 sm:px-6 sm:py-6 lg:px-8',
    relaxed: 'px-4 py-6 sm:px-8 sm:py-10 lg:px-12 lg:py-12',
    loose: 'px-6 py-8 sm:px-10 sm:py-12 lg:px-16 lg:py-16',
  };

  // Background colors with subtle gradients
  const backgroundStyles = {
    none: '',
    white: 'bg-white shadow-sm',
    gray: 'bg-gradient-to-b from-gray-50 to-gray-100',
    primary: 'bg-gradient-to-b from-blue-50 to-blue-100',
  };

  return (
    <div
      className={cn(
        'w-full',
        backgroundStyles[backgroundColor],
        containerClassName
      )}
    >
      <div
        className={cn(
          'w-full relative',
          variantStyles[variant],
          spacingStyles[spacing],
          centered && 'mx-auto',
          'transition-all duration-300 ease-in-out', // Smooth transitions
          // Responsive container behavior
          'sm:w-[95%]',
          'md:w-[92%]',
          'lg:w-[90%]',
          // Add backdrop blur effect when backgroundColor is set
          backgroundColor !== 'none' && 'backdrop-blur-sm',
          // Base container styles
          'rounded-lg',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

// Alternative: Responsive content wrapper with breakpoint-specific max-widths
export function ResponsiveContentWrapper({
  children,
  className = '',
  padding = 'md',
}: {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}) {
  const paddingStyles = {
    none: '',
    sm: 'px-4 py-2',
    md: 'px-6 py-4',
    lg: 'px-8 py-6',
    xl: 'px-12 py-8',
  };

  return (
    <div
      className={cn(
        'w-full mx-auto',
        // Responsive max-widths that grow with screen size
        'max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl',
        paddingStyles[padding],
        className
      )}
    >
      {children}
    </div>
  );
}

// Page-level wrapper for full page layouts
export function PageWrapper({
  children,
  className = '',
  backgroundColor = 'bg-gray-50',
  minHeight = 'min-h-screen',
}: {
  children: React.ReactNode;
  className?: string;
  backgroundColor?: string;
  minHeight?: string;
}) {
  return (
    <div className={cn(backgroundColor, minHeight, className)}>
      <ResponsiveContentWrapper padding="lg">
        {children}
      </ResponsiveContentWrapper>
    </div>
  );
}

// Section wrapper for different content sections
export function SectionWrapper({
  children,
  title,
  subtitle,
  spacing = 'md',
  className = '',
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}) {
  const spacingStyles = {
    sm: 'mb-6',
    md: 'mb-8',
    lg: 'mb-12',
    xl: 'mb-16',
  };

  return (
    <section className={cn(spacingStyles[spacing], className)}>
      {(title || subtitle) && (
        <div className="text-center mb-6">
          {title && (
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
