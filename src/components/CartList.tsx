import { cn } from '../styles/theme';
import type { CartItemType } from '../types/cart';
import { ImageWithFallback, ImagePaths } from '../utils/imageUtils';

interface CartListProps {
  items: CartItemType[];
  onUpdateQuantity?: (id: number, quantity: number) => void;
  onRemoveItem?: (id: number) => void;
  className?: string;
}

export default function CartList({
  items,
  onUpdateQuantity,
  onRemoveItem,
  className = '',
}: CartListProps) {
  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className={cn('flex flex-col space-y-4', className)}>
      {items.map((item) => (
        <div
          key={item.id}
          className="flex space-x-4 p-4 border border-gray-200"
        >
          {/* Product Image */}
          <div className="h-24 w-24 flex-shrink-0 overflow-hidden bg-gray-100">
            <ImageWithFallback
              src={item.image}
              alt={item.imageAlt || item.title}
              className="h-full w-full object-cover"
              fallback={ImagePaths.placeholders.product}
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-1 flex-col">
            <div className="flex justify-between">
              <h3 className="text-sm font-medium text-gray-900">
                {item.title}
              </h3>
              <button
                onClick={() => onRemoveItem?.(item.id)}
                className="text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Remove
              </button>
            </div>

            {/* Price and Quantity Controls */}
            <div className="mt-auto flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    onUpdateQuantity?.(item.id, Math.max(0, item.quantity - 1))
                  }
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <span className="text-gray-600">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {item.currency || '$'}
                {(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* Cart Total */}
      {items.length > 0 && (
        <div className="pt-4 mt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-base font-medium text-gray-900">Total</span>
            <span className="text-base font-medium text-gray-900">
              ${calculateTotal().toFixed(2)}
            </span>
          </div>
        </div>
      )}

      {/* Empty Cart Message */}
      {items.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">Your cart is empty</p>
        </div>
      )}
    </div>
  );
}
