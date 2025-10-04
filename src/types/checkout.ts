export interface CheckoutFormData {
  // Shipping Information
  shippingFirstName: string;
  shippingLastName: string;
  shippingEmail: string;
  shippingPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  shippingCountry: string;

  // Billing Information
  sameAsShipping: boolean;
  billingFirstName: string;
  billingLastName: string;
  billingEmail: string;
  billingPhone: string;
  billingAddress: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
  billingCountry: string;

  // Payment Information
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  cardName: string;
}

export interface CheckoutProps {
  onSubmit: (data: CheckoutFormData) => void;
  loading?: boolean;
  error?: string;
  className?: string;
  total?: number;
}
