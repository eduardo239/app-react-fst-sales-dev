import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../styles/theme';
import { ImagePaths, ImageWithFallback } from '../utils/imageUtils';
import type { CardItemProps } from '../types/card';

export default function CardItem({
  id,
  title,
  description,
  price,
  originalPrice,
  currency = '$',
  image,
  imageAlt,
  isOnSale = false,
  isOutOfStock = false,
  onAddToCart,
  className,
}: CardItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isOutOfStock && onAddToCart) {
      onAddToCart();
    }
  };

  return (
    <Link
      to={`/products?id=${id}`}
      className={cn(
        'block no-underline group border border-gray-200 overflow-hidden',
        isOutOfStock && 'opacity-60 cursor-not-allowed',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-white transition-all duration-300">
        {/* Image */}
        <div className="aspect-[4/5] overflow-hidden relative">
          <ImageWithFallback
            src={image}
            alt={imageAlt || title}
            className={cn(
              'w-full h-full object-cover transition-transform duration-700',
              isHovered && !isOutOfStock && 'scale-105'
            )}
            fallback={ImagePaths.placeholders.product}
          />

          {/* Sale Badge */}
          {isOnSale && (
            <div className="absolute top-0 left-0 bg-black text-white px-4 py-1">
              Sale
            </div>
          )}

          {/* Out of Stock Overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-900 bg-white px-4 py-2">
                Out of Stock
              </span>
            </div>
          )}

          {/* Add to Cart Button - Only shows on hover */}
          {!isOutOfStock && onAddToCart && (
            <button
              onClick={handleAddToCart}
              className={cn(
                'absolute bottom-0 left-0 right-0 bg-black text-white py-3',
                'text-sm font-medium text-center transition-all duration-300',
                'transform translate-y-full group-hover:translate-y-0',
                'hover:bg-gray-900 focus:outline-none'
              )}
            >
              Add to Cart
            </button>
          )}
        </div>

        {/* Product Info */}
        <div className=" space-y-1 p-4">
          {/* Title */}
          <h3 className="text-sm text-gray-900 font-normal">{title}</h3>

          {/* Description - Optional */}
          {description && (
            <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-sm text-gray-900">
              {currency}
              {price.toFixed(2)}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-sm text-gray-500 line-through">
                {currency}
                {originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
