import { useState } from 'react';
import FormWrapper from './FormWrapper';
import InputField from './InputField';
import { cn } from '../styles/theme';

interface CheckoutFormData {
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

interface CheckoutProps {
  onSubmit: (data: CheckoutFormData) => void;
  loading?: boolean;
  error?: string;
  className?: string;
  total?: number;
}

export default function Checkout({
  onSubmit,
  loading = false,
  error,
  className = '',
  total = 0,
}: CheckoutProps) {
  const [formData, setFormData] = useState<CheckoutFormData>({
    shippingFirstName: '',
    shippingLastName: '',
    shippingEmail: '',
    shippingPhone: '',
    shippingAddress: '',
    shippingCity: '',
    shippingState: '',
    shippingZip: '',
    shippingCountry: '',
    sameAsShipping: true,
    billingFirstName: '',
    billingLastName: '',
    billingEmail: '',
    billingPhone: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZip: '',
    billingCountry: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // If sameAsShipping is checked, copy shipping details to billing
    if (name === 'sameAsShipping' && checked) {
      setFormData((prev) => ({
        ...prev,
        billingFirstName: prev.shippingFirstName,
        billingLastName: prev.shippingLastName,
        billingEmail: prev.shippingEmail,
        billingPhone: prev.shippingPhone,
        billingAddress: prev.shippingAddress,
        billingCity: prev.shippingCity,
        billingState: prev.shippingState,
        billingZip: prev.shippingZip,
        billingCountry: prev.shippingCountry,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <FormWrapper
      title="Checkout"
      variant="card"
      maxWidth="lg"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      className={className}
    >
      {/* Order Summary */}
      <div className="mb-8 p-4 bg-gray-50 ">
        <h2 className="text-lg font-medium text-gray-900 mb-2">
          Order Summary
        </h2>
        <div className="flex justify-between items-center">
          <span className="text-base text-gray-600">Total</span>
          <span className="text-lg font-medium text-gray-900">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Shipping Information */}
      <div className="space-y-6">
        <h2 className="text-xl font-medium text-gray-900">
          Shipping Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="First Name"
            name="shippingFirstName"
            value={formData.shippingFirstName}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="Last Name"
            name="shippingLastName"
            value={formData.shippingLastName}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="Email"
            type="email"
            name="shippingEmail"
            value={formData.shippingEmail}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="Phone"
            type="tel"
            name="shippingPhone"
            value={formData.shippingPhone}
            onChange={handleInputChange}
            required
          />
          <div className="md:col-span-2">
            <InputField
              label="Address"
              name="shippingAddress"
              value={formData.shippingAddress}
              onChange={handleInputChange}
              required
            />
          </div>
          <InputField
            label="City"
            name="shippingCity"
            value={formData.shippingCity}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="State/Province"
            name="shippingState"
            value={formData.shippingState}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="ZIP/Postal Code"
            name="shippingZip"
            value={formData.shippingZip}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="Country"
            name="shippingCountry"
            value={formData.shippingCountry}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      {/* Billing Information */}
      <div className="space-y-6">
        <div className="flex items-center">
          <h2 className="text-xl font-medium text-gray-900">
            Billing Information
          </h2>
          <label className="ml-4 flex items-center">
            <input
              type="checkbox"
              name="sameAsShipping"
              checked={formData.sameAsShipping}
              onChange={handleInputChange}
              className="h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-600">Same as shipping</span>
          </label>
        </div>

        {!formData.sameAsShipping && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="First Name"
              name="billingFirstName"
              value={formData.billingFirstName}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="Last Name"
              name="billingLastName"
              value={formData.billingLastName}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="Email"
              type="email"
              name="billingEmail"
              value={formData.billingEmail}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="Phone"
              type="tel"
              name="billingPhone"
              value={formData.billingPhone}
              onChange={handleInputChange}
              required
            />
            <div className="md:col-span-2">
              <InputField
                label="Address"
                name="billingAddress"
                value={formData.billingAddress}
                onChange={handleInputChange}
                required
              />
            </div>
            <InputField
              label="City"
              name="billingCity"
              value={formData.billingCity}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="State/Province"
              name="billingState"
              value={formData.billingState}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="ZIP/Postal Code"
              name="billingZip"
              value={formData.billingZip}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="Country"
              name="billingCountry"
              value={formData.billingCountry}
              onChange={handleInputChange}
              required
            />
          </div>
        )}
      </div>

      {/* Payment Information */}
      <div className="space-y-6">
        <h2 className="text-xl font-medium text-gray-900">
          Payment Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <InputField
              label="Card Number"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="**** **** **** ****"
              required
            />
          </div>
          <InputField
            label="Name on Card"
            name="cardName"
            value={formData.cardName}
            onChange={handleInputChange}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Expiry Date"
              name="cardExpiry"
              value={formData.cardExpiry}
              onChange={handleInputChange}
              placeholder="MM/YY"
              required
            />
            <InputField
              label="CVC"
              name="cardCvc"
              value={formData.cardCvc}
              onChange={handleInputChange}
              placeholder="***"
              required
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={cn(
          'w-full py-3 px-4 text-white bg-gray-900 hover:bg-gray-800 font-medium ',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'transition-colors duration-200 hover:cursor-pointer '
        )}
      >
        {loading
          ? 'Processing...'
          : `Pay ${total ? `$${total.toFixed(2)}` : ''}`}
      </button>
    </FormWrapper>
  );
}
