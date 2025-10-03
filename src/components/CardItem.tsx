import React from 'react';
import { cn } from '../styles/theme';
import { ImagePaths, ImageWithFallback } from '../utils/imageUtils';

interface CardItemProps {
  // Product information
  title: string;
  description?: string;
  price: number;
  originalPrice?: number;
  currency?: string;

  // Image
  image: string;
  imageAlt?: string;

  // Status and badges
  isOnSale?: boolean;
  isOutOfStock?: boolean;
  badge?: string;
  rating?: number;
  reviewCount?: number;

  // Interaction
  onClick?: () => void;
  onAddToCart?: () => void;
  onQuickView?: () => void;

  // Styling
  variant?: 'default' | 'compact' | 'detailed';
  className?: string;
  loading?: boolean;
}

export default function CardItem({
  title,
  description,
  price,
  originalPrice,
  currency = '$',
  image,
  imageAlt,
  isOnSale = false,
  isOutOfStock = false,
  rating,
  reviewCount,
  onClick,
  onAddToCart,
  onQuickView,
  variant = 'default',
  className = '',
  loading = false,
}: CardItemProps) {
  const baseStyles =
    'bg-white border border-gray-200 overflow-hidden hover:border-gray-300';

  const variantStyles = {
    default: 'p-4',
    compact: 'p-3',
    detailed: 'p-5',
  };

  const imageHeightStyles = {
    default: 'h-48',
    compact: 'h-32',
    detailed: 'h-56',
  };

  const formatPrice = (amount: number) => `${currency}${amount.toFixed(2)}`;

  const handleCardClick = () => {
    if (loading || isOutOfStock) return;
    onClick?.();
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (loading || isOutOfStock) return;
    onAddToCart?.();
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (loading) return;
    onQuickView?.();
  };

  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant],
        onClick && !isOutOfStock && !loading && 'cursor-pointer',
        isOutOfStock && 'opacity-75',
        loading && 'opacity-50 pointer-events-none',
        className
      )}
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative mb-3">
        <div
          className={cn(
            'w-full bg-gray-100 overflow-hidden',
            imageHeightStyles[variant]
          )}
        >
          {loading ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="bg-gray-200 w-full h-full" />
            </div>
          ) : (
            <ImageWithFallback
              src={image}
              alt={imageAlt || title}
              className="w-full h-full object-cover"
              fallback={ImagePaths.placeholders.product} // Falls back if image fails to load
            />
          )}
        </div>

        {/* Badges and Status Indicators */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isOnSale && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium">
              Sale
            </span>
          )}
        </div>

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <span className="w-full text-center bg-white text-gray-900 px-3 py-1 text-sm font-medium">
              Out of Stock
            </span>
          </div>
        )}

        {/* Quick View Button */}
        {onQuickView && !isOutOfStock && (
          <button
            onClick={handleQuickView}
            className="absolute top-2 right-2 p-2 bg-white bg-opacity-90 hover:bg-white opacity-0 group-hover:opacity-100"
          >
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="space-y-2">
        {/* Title */}
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-gray-700">
          {title}
        </h3>

        {/* Description (for detailed variant) */}
        {variant === 'detailed' && description && (
          <p className="text-xs text-gray-600 line-clamp-2">{description}</p>
        )}

        {/* Rating */}
        {rating && (
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={cn(
                    'w-4 h-4',
                    i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
                  )}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            {reviewCount && (
              <span className="text-xs text-gray-500">({reviewCount})</span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex flex-col items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-gray-900">
              {formatPrice(price)}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          {onAddToCart && !isOutOfStock && (
            <button
              onClick={handleAddToCart}
              className="w-full px-3 py-1.5 bg-gray-900 text-white text-xs font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 hover:cursor-pointer mt-2"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
