import React from 'react';
import FormWrapper from '../FormWrapper';
import InputField from '../InputField';
import type { ShippingDetails } from '../../types/shipping';
import ButtonSubmit from '../ButtonSubmit';

interface ShippingStepProps {
  shippingDetails: ShippingDetails;
  onShippingDetailsChange: (details: ShippingDetails) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ShippingStep({
  shippingDetails,
  onShippingDetailsChange,
  onSubmit,
}: ShippingStepProps) {
  const handleInputChange = (field: keyof ShippingDetails, value: string) => {
    onShippingDetailsChange({
      ...shippingDetails,
      [field]: value,
    });
  };

  return (
    <FormWrapper onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="First Name"
          type="text"
          value={shippingDetails.firstName}
          onChange={(e) => handleInputChange('firstName', e.target.value)}
          required
        />
        <InputField
          label="Last Name"
          type="text"
          value={shippingDetails.lastName}
          onChange={(e) => handleInputChange('lastName', e.target.value)}
          required
        />
      </div>

      <InputField
        label="Email"
        type="email"
        value={shippingDetails.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
        required
      />

      <InputField
        label="Phone"
        type="tel"
        value={shippingDetails.phone}
        onChange={(e) => handleInputChange('phone', e.target.value)}
        required
      />

      <InputField
        label="Address"
        type="text"
        value={shippingDetails.address}
        onChange={(e) => handleInputChange('address', e.target.value)}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputField
          label="City"
          type="text"
          value={shippingDetails.city}
          onChange={(e) => handleInputChange('city', e.target.value)}
          required
        />
        <InputField
          label="State"
          type="text"
          value={shippingDetails.state}
          onChange={(e) => handleInputChange('state', e.target.value)}
          required
        />
        <InputField
          label="ZIP Code"
          type="text"
          value={shippingDetails.zipCode}
          onChange={(e) => handleInputChange('zipCode', e.target.value)}
          required
        />
      </div>

      <InputField
        label="Country"
        type="text"
        value={shippingDetails.country}
        onChange={(e) => handleInputChange('country', e.target.value)}
        required
      />

      <div className="flex justify-end">
        <ButtonSubmit onClick={() => {}} value="Continue to Payment" />
      </div>
    </FormWrapper>
  );
}
