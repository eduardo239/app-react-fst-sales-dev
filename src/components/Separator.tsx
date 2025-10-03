import { cn } from '../styles/theme';

interface SeparatorProps {
  label?: string;
  className?: string;
  variant?: 'default' | 'light' | 'dark';
  orientation?: 'horizontal' | 'vertical';
}

export default function Separator({
  label,
  className = '',
  variant = 'default',
  orientation = 'horizontal',
}: SeparatorProps) {
  const variantStyles = {
    default: 'border-gray-200',
    light: 'border-gray-100',
    dark: 'border-gray-300',
  };

  if (orientation === 'vertical') {
    return (
      <div
        className={cn(
          'inline-flex h-full w-px self-stretch',
          variantStyles[variant],
          className
        )}
        role="separator"
        aria-orientation="vertical"
      />
    );
  }

  if (label) {
    return (
      <div className={cn('relative mt-6', className)}>
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className={cn('w-full border-t', variantStyles[variant])} />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-sm text-gray-500">{label}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'h-px w-full',
        variantStyles[variant],
        'border-t',
        className
      )}
      role="separator"
      aria-orientation="horizontal"
    />
  );
}
