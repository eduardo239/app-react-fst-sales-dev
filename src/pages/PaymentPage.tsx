import React, { useState } from 'react';
import { cn } from '../styles/theme';
import { useNavigate } from 'react-router-dom';
import type { PaymentMethod } from '../types/payment';
import ContentWrapper from '../components/ContentWrapper';
import TextHeader from '../components/TextHeader';
import FormWrapper from '../components/FormWrapper';
import InputField from '../components/InputField';
import Separator from '../components/Separator';
import ButtonSubmit from '../components/ButtonSubmit';

const paymentMethods: PaymentMethod[] = [
  {
    id: 'credit-card',
    title: 'Credit Card',
    description: 'Pay with Visa, Mastercard, or American Express',
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
    ),
  },
  {
    id: 'paypal',
    title: 'PayPal',
    description: 'Pay with your PayPal account',
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

interface PaymentFormData {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
  saveCard: boolean;
}

export default function PaymentPage() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('credit-card');
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentFormData>({
    cardNumber: '9999 9999 9999 9999',
    cardName: 'John Doe',
    expiryDate: '12/25',
    cvv: '123',
    saveCard: false,
  });

  // Mock order summary data (replace with actual data from your cart/order state)
  const orderSummary = {
    subtotal: 299.98,
    shipping: 10.0,
    tax: 29.99,
    total: 339.97,
  };

  const handleInputChange =
    (field: keyof PaymentFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPaymentData({
        ...paymentData,
        [field]: e.target.value,
      });
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Navigate to success page after successful payment
      navigate('/payment-success');
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContentWrapper variant="default" spacing="relaxed" backgroundColor="gray">
      <div className="max-w-4xl mx-auto">
        <TextHeader value="Payment" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            {/* Payment Methods */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-medium mb-4">Payment Method</h2>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={cn(
                      'flex items-center p-4 border rounded-lg cursor-pointer transition-colors',
                      selectedMethod === method.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                  >
                    <input
                      type="radio"
                      name="payment-method"
                      value={method.id}
                      checked={selectedMethod === method.id}
                      onChange={(e) => setSelectedMethod(e.target.value)}
                      className="hidden"
                    />
                    <div className="flex items-center space-x-4">
                      <div className="text-gray-600">{method.icon}</div>
                      <div>
                        <p className="font-medium">{method.title}</p>
                        <p className="text-sm text-gray-500">
                          {method.description}
                        </p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Credit Card Form */}
            {selectedMethod === 'credit-card' && (
              <FormWrapper
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h2 className="text-lg font-medium mb-4">Card Details</h2>
                <div className="space-y-4">
                  <InputField
                    label="Card Number"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={paymentData.cardNumber}
                    onChange={handleInputChange('cardNumber')}
                    required
                  />
                  <InputField
                    label="Cardholder Name"
                    type="text"
                    placeholder="John Doe"
                    value={paymentData.cardName}
                    onChange={handleInputChange('cardName')}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="Expiry Date"
                      type="text"
                      placeholder="MM/YY"
                      value={paymentData.expiryDate}
                      onChange={handleInputChange('expiryDate')}
                      required
                    />
                    <InputField
                      label="CVV"
                      type="text"
                      placeholder="123"
                      value={paymentData.cvv}
                      onChange={handleInputChange('cvv')}
                      required
                    />
                  </div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={paymentData.saveCard}
                      onChange={(e) =>
                        setPaymentData({
                          ...paymentData,
                          saveCard: e.target.checked,
                        })
                      }
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">
                      Save this card for future purchases
                    </span>
                  </label>
                </div>
              </FormWrapper>
            )}

            {/* PayPal Form */}
            {selectedMethod === 'paypal' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium mb-4">PayPal</h2>
                <p className="text-gray-600 mb-4">
                  You will be redirected to PayPal to complete your payment.
                </p>

                <ButtonSubmit value="Continue with PayPal" onClick={() => {}} />
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${orderSummary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>${orderSummary.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span>${orderSummary.tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${orderSummary.total.toFixed(2)}</span>
                </div>
              </div>

              <ButtonSubmit value="Place Order" onClick={() => {}} />

              <p className="mt-4 text-sm text-gray-500 text-center">
                Your payment information is secure and encrypted
              </p>
            </div>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}
