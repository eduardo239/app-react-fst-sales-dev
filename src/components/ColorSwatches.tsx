import { cn } from '../styles/theme';

export default function ColorSwatches({
  product,
  selectedVariant,
  setSelectedVariant,
}: {
  product: any;
  selectedVariant: any;
  setSelectedVariant: (variant: any) => void;
}) {
  return (
    <div className="mt-4 flex items-center space-x-3">
      {product.variants.map((variant: any) => (
        <button
          key={variant.id}
          onClick={() => setSelectedVariant(variant)}
          className={cn(
            'relative w-8 h-8 rounded-full border border-gray-300 cursor-pointer',
            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500',
            selectedVariant.id === variant.id ? 'ring-2 ring-blue-500' : ''
          )}
          style={{ backgroundColor: variant.color }}
          disabled={!variant.inStock}
        >
          <span className="sr-only">{variant.name}</span>
          {!variant.inStock && (
            <span className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
