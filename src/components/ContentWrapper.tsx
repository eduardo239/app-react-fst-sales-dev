import React from 'react';
import { cn } from '../styles/theme';

interface ContentWrapperProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  centered?: boolean;
}

export default function ContentWrapper({
  children,
  maxWidth = 'xl',
  padding = 'md',
  className = '',
  centered = true,
}: ContentWrapperProps) {
  const maxWidthStyles = {
    sm: 'max-w-sm', // 384px
    md: 'max-w-md', // 448px
    lg: 'max-w-lg', // 512px
    xl: 'max-w-xl', // 576px
    '2xl': 'max-w-2xl', // 672px
    '3xl': 'max-w-3xl', // 768px
    full: 'max-w-full',
  };

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
        'w-full',
        maxWidthStyles[maxWidth],
        paddingStyles[padding],
        centered && 'mx-auto',
        className
      )}
    >
      {children}
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
