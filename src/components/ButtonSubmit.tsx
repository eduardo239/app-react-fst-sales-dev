import { theme, cn } from '../styles/theme';

export default function ButtonSubmit({
  onClick,
  value,
  variant = 'default',
  size = 'md',
  // loading = false,
  // disabled,
  className = '',
}: {
  onClick: () => void;
  value: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}) {
  const baseStyles = cn(
    theme.button.base,
    theme.base.transition,
    theme.base.focusRing,
    theme.base.disabled
  );

  return (
    <button
      onClick={onClick}
      className={cn(
        'mt-6 w-full px-6 py-3 text-base font-medium text-white',
        'bg-gray-900 hover:bg-gray-800',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500',
        baseStyles,
        theme.variants[variant],
        theme.button.sizes[size],
        className
      )}
    >
      {value || 'Submit'}
    </button>
  );
}
