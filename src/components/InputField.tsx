import React from 'react';
import { theme, cn } from '../styles/theme';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: 'default' | 'outline';
}

export default function InputField({
  label,
  error,
  variant = 'default',
  className = '',
  ...props
}: InputProps) {
  const baseStyles = cn(
    theme.input.base,
    theme.base.transition,
    theme.base.focusRing
  );

  const errorStyles = error ? 'border-red-300 focus:border-red-400' : '';

  return (
    <div className={theme.spacing.component}>
      {label && <label className={theme.text.label}>{label}</label>}
      <input
        className={cn(
          baseStyles,
          theme.input.variants[variant],
          errorStyles,
          className
        )}
        {...props}
      />
      {error && <p className={theme.text.error}>{error}</p>}
    </div>
  );
}
