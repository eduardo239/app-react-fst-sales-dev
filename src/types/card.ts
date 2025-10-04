export interface CardItemProps {
  id: number;
  title: string;
  description?: string;
  price: number;
  originalPrice?: number;
  currency?: string;
  image: string;
  imageAlt?: string;
  isOnSale?: boolean;
  isOutOfStock?: boolean;
  onAddToCart?: () => void;
  className?: string;
}

export interface CardWrapperProps {
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
