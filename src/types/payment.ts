import type { JSX } from 'react';

export interface PaymentMethod {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
}

export interface PaymentDetails {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

export interface PaymentFormData {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
  saveCard: boolean;
}
