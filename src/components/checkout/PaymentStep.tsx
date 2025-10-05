import React from 'react';
import FormWrapper from '../FormWrapper';
import InputField from '../InputField';
import type { PaymentDetails } from '../../types/payment';
import ButtonSubmit from '../ButtonSubmit';

interface PaymentStepProps {
  paymentDetails: PaymentDetails;
  onPaymentDetailsChange: (details: PaymentDetails) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBackToShipping: () => void;
  loading?: boolean;
}

export default function PaymentStep({
  paymentDetails,
  onPaymentDetailsChange,
  onSubmit,
  onBackToShipping,
}: PaymentStepProps) {
  const handleInputChange = (field: keyof PaymentDetails, value: string) => {
    onPaymentDetailsChange({
      ...paymentDetails,
      [field]: value,
    });
  };

  return (
    <FormWrapper onSubmit={onSubmit} className="space-y-6">
      <InputField
        label="Card Number"
        type="text"
        value={paymentDetails.cardNumber}
        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
        placeholder="1234 5678 9012 3456"
        required
      />

      <InputField
        label="Card Holder Name"
        type="text"
        value={paymentDetails.cardHolder}
        onChange={(e) => handleInputChange('cardHolder', e.target.value)}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="Expiry Date"
          type="text"
          value={paymentDetails.expiryDate}
          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
          placeholder="MM/YY"
          required
        />
        <InputField
          label="CVV"
          type="text"
          value={paymentDetails.cvv}
          onChange={(e) => handleInputChange('cvv', e.target.value)}
          placeholder="123"
          required
        />
      </div>

      <div className="flex gap-4 justify-between">
        <ButtonSubmit onClick={onBackToShipping} value="Back to Shipping" />
        <ButtonSubmit onClick={() => {}} value="Complete Order" />
      </div>
    </FormWrapper>
  );
}
