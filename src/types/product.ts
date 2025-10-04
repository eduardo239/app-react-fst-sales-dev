export interface ProductVariant {
  id: number;
  name: string;
  price: number;
  compareAtPrice?: number;
  color?: string;
  size?: string;
  inStock: boolean;
}

export interface ProductImage {
  id: number;
  url: string;
  alt: string;
}
