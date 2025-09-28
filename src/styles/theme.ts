// Shared design system styles
export const theme = {
  // Base styles that can be reused
  base: {
    transition: 'transition-colors duration-200',
    focusRing: 'focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2',
    disabled: 'disabled:opacity-50 disabled:cursor-not-allowed',
  },

  // Color variants
  variants: {
    default: 'bg-gray-900 text-white hover:bg-gray-700 active:bg-gray-800',
    outline: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200',
  },

  // Input specific styles
  input: {
    base: 'w-full px-3 py-2 text-sm text-gray-900 placeholder-gray-500',
    variants: {
      default: 'bg-gray-50 border border-gray-200 focus:bg-white focus:border-gray-400',
      outline: 'bg-white border border-gray-300 focus:border-gray-500'
    }
  },

  // Button specific styles
  button: {
    base: 'inline-flex items-center justify-center font-medium',
    sizes: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    }
  },

  // Common sizes
  sizes: {
    sm: 'text-sm',
    md: 'text-sm', 
    lg: 'text-base',
  },

  // Typography
  text: {
    label: 'block text-sm font-medium text-gray-700',
    error: 'text-xs text-red-500 mt-1',
    placeholder: 'text-gray-500',
  },

  // Spacing
  spacing: {
    component: 'space-y-1',
  }
};

// Utility function to combine classes
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};