export interface CartItemType {
  id: number;
  title: string;
  price: number;
  currency?: string;
  image: string;
  imageAlt?: string;
  quantity: number;
}
