import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../styles/theme';

interface CardWrapperProps {
  children: React.ReactNode;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
    '3xl'?: number;
  };
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
  loading?: boolean;
  loadingCount?: number;
  orderBy?: 'vertical' | 'horizontal' | 'balanced'; // vertical = CSS columns, horizontal = left-to-right, balanced = height-aware distribution
}

export default function CardWrapper({
  children,
  columns = { sm: 2, md: 3, lg: 4, xl: 4, '2xl': 4, '3xl': 4 },
  gap = 'md',
  className = '',
  loading = false,
  loadingCount = 8,
  orderBy = 'horizontal',
}: CardWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columnCount, setColumnCount] = useState(3);

  const gapStyles = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };

  // Update column count based on container width (fixed 1000px width)
  useEffect(() => {
    const updateColumnCount = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.offsetWidth;

      // Optimized breakpoints for 1000px fixed width container
      if (width >= 950) {
        setColumnCount(columns.xl || 4); // 4 columns for 1000px width
      } else if (width >= 700) {
        setColumnCount(columns.lg || 3); // 3 columns for smaller but decent width
      } else if (width >= 480) {
        setColumnCount(columns.md || 2); // 2 columns for medium width
      } else {
        setColumnCount(columns.sm || 1); // 1 column for mobile
      }
    };

    updateColumnCount();
    window.addEventListener('resize', updateColumnCount);
    return () => window.removeEventListener('resize', updateColumnCount);
  }, [columns]);

  // Create horizontal masonry layout (left to right)
  const createHorizontalMasonry = (items: React.ReactNode[]) => {
    const columnsArray: React.ReactNode[][] = Array.from(
      { length: columnCount },
      () => []
    );

    // Simple round-robin distribution (left to right)
    items.forEach((item, index) => {
      const columnIndex = index % columnCount;
      columnsArray[columnIndex].push(
        <div key={index} className="mb-4 w-full">
          {item}
        </div>
      );
    });

    return columnsArray;
  };

  // Advanced horizontal masonry with height balancing (optional)
  const createBalancedHorizontalMasonry = (items: React.ReactNode[]) => {
    const columnsArray: React.ReactNode[][] = Array.from(
      { length: columnCount },
      () => []
    );
    const columnHeights = Array(columnCount).fill(0);

    items.forEach((item, index) => {
      // Find the shortest column
      const shortestColumnIndex = columnHeights.indexOf(
        Math.min(...columnHeights)
      );

      columnsArray[shortestColumnIndex].push(
        <div key={index} className="mb-4 w-full">
          {item}
        </div>
      );

      // Estimate height (you could make this more sophisticated)
      columnHeights[shortestColumnIndex] += 300; // approximate card height
    });

    return columnsArray;
  };

  // Convert children to array
  const childrenArray = React.Children.toArray(children);

  // Create loading skeletons that match the minimalist card style
  const loadingSkeletons = Array.from({ length: loadingCount }, (_, index) => (
    <div
      key={`skeleton-${index}`}
      className="bg-white rounded-lg shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-md"
    >
      {/* Image skeleton with aspect ratio */}
      <div className="relative w-full pb-[100%] bg-gray-100 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-gray-200" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title skeleton */}
        <div className="h-5 bg-gray-100 rounded-md w-4/5 animate-pulse" />

        {/* Price skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-4 bg-gray-100 rounded-md w-1/4 animate-pulse" />
          <div className="h-4 bg-gray-100 rounded-md w-1/4 animate-pulse" />
        </div>

        {/* Action button skeleton */}
        <div className="h-8 bg-gray-100 rounded-md w-full animate-pulse mt-2" />

        {/* Price and button skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-5 bg-gray-200 w-16" />
            {Math.random() > 0.7 && <div className="h-4 bg-gray-200 w-12" />}
          </div>
          <div className="h-7 bg-gray-200 w-20" />
        </div>
      </div>
    </div>
  ));

  const itemsToRender = loading ? loadingSkeletons : childrenArray;

  return (
    <div
      ref={containerRef}
      className={cn('mx-auto', className)}
      style={{ width: '1000px', maxWidth: '100%' }}
    >
      {orderBy === 'vertical' ? (
        /* CSS-based masonry - fills vertically (top to bottom) */
        <div
          className={cn(gapStyles[gap])}
          style={{
            columnCount: columnCount,
            columnFill: 'balance',
            columnGap:
              gap === 'sm'
                ? '8px'
                : gap === 'md'
                ? '16px'
                : gap === 'lg'
                ? '24px'
                : '32px',
          }}
        >
          {itemsToRender.map((item, index) => (
            <div
              key={index}
              className="break-inside-avoid mb-4 inline-block w-full"
            >
              {item}
            </div>
          ))}
        </div>
      ) : (
        /* JavaScript-based masonry - fills horizontally (left to right) */
        <div
          className="flex"
          style={{
            gap:
              gap === 'sm'
                ? '8px'
                : gap === 'md'
                ? '16px'
                : gap === 'lg'
                ? '24px'
                : '32px',
          }}
        >
          {(orderBy === 'balanced'
            ? createBalancedHorizontalMasonry(itemsToRender)
            : createHorizontalMasonry(itemsToRender)
          ).map((column, columnIndex) => (
            <div
              key={columnIndex}
              className="flex flex-col"
              style={{
                flex: 1,
                width: `${100 / columnCount}%`,
              }}
            >
              {column}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Alternative pure CSS approach component
export function CSSMasonryGrid({
  children,
  columns = 'auto-fit',
  minColumnWidth = '300px',
  gap = '1rem',
  className = '',
}: {
  children: React.ReactNode;
  columns?: string | number;
  minColumnWidth?: string;
  gap?: string;
  className?: string;
}) {
  const columnValue =
    typeof columns === 'number'
      ? columns
      : `repeat(${columns}, minmax(${minColumnWidth}, 1fr))`;

  return (
    <div
      className={cn('grid', className)}
      style={{
        gridTemplateColumns: columnValue,
        gap: gap,
      }}
    >
      {React.Children.map(children, (child, index) => (
        <div key={index} className="break-inside-avoid">
          {child}
        </div>
      ))}
    </div>
  );
}

// Pure masonry layout hook for advanced usage
export function useMasonry(items: any[], columnCount: number) {
  const [masonryLayout, setMasonryLayout] = useState<any[][]>([]);

  useEffect(() => {
    const columnsArray: any[][] = Array.from({ length: columnCount }, () => []);

    items.forEach((item, index) => {
      const columnIndex = index % columnCount;
      columnsArray[columnIndex].push(item);
    });

    setMasonryLayout(columnsArray);
  }, [items, columnCount]);

  return masonryLayout;
}
