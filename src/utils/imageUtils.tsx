import React from 'react';

// Utility for managing local images
export const ImagePaths = {
  products: {
    product1: '/images/products/product1.jpg',
    product2: '/images/products/product2.jpg',
    product3: '/images/products/product3.png',
    // Add more as needed
  },
  categories: {
    electronics: '/images/categories/electronics.jpg',
    clothing: '/images/categories/clothing.jpg',
  },
  placeholders: {
    product: '/images/placeholder-product.jpg',
    user: '/images/placeholder-user.png',
  },
};

// Image component with fallback
interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  fallback = ImagePaths.placeholders.product,
}: ImageWithFallbackProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        if (target.src !== fallback) {
          target.src = fallback;
        }
      }}
      loading="lazy"
    />
  );
}

// Hook for dynamic image loading
export function useImagePath(
  category: keyof typeof ImagePaths,
  imageName: string
) {
  const basePath = ImagePaths[category] as Record<string, string>;
  return basePath[imageName] || ImagePaths.placeholders.product;
}
