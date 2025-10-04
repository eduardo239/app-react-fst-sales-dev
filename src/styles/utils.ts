// Alternative approach: CSS-in-JS style objects
export const styleUtils = {
  // Combine multiple Tailwind classes
  combine: (...classes: string[]) => classes.join(' '),
  
  // Common style patterns
  patterns: {
    interactiveElement: 'transition-colors duration-200 focus:outline-none',
    grayBorder: 'border-gray-300 hover:border-gray-400 focus:border-gray-500',
    disabledState: 'disabled:opacity-50 disabled:cursor-not-allowed',
    roundedCorners: 'rounded-md',
    shadow: 'shadow-sm hover:shadow-md',
  },
  
  // Color schemes
  colors: {
    gray: {
      50: 'gray-50',
      100: 'gray-100', 
      200: 'gray-200',
      300: 'gray-300',
      400: 'gray-400',
      500: 'gray-500',
      700: 'gray-700',
      900: 'gray-900',
    }
  }
};

