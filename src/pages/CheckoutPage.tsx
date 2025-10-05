import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../styles/theme';
import { mockCartItems } from '../utils/db';
import type { PaymentDetails } from '../types/payment';
import type { ShippingDetails } from '../types/shipping';
import ContentWrapper from '../components/ContentWrapper';
import TextHeader1 from '../components/TextHeader1';
import ProgressSteps from '../components/checkout/ProgressSteps';
import ShippingStep from '../components/checkout/ShippingStep';
import PaymentStep from '../components/checkout/PaymentStep';
import OrderSummary from '../components/checkout/OrderSummary';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<'shipping' | 'payment'>(
    'shipping'
  );
  const [loading, setLoading] = useState(false);

  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    firstName: 'Melis',
    lastName: 'Doe',
    email: 'melis@example.com',
    phone: '123-456-7890',
    address: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zipCode: '12345',
    country: 'USA',
  });

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardNumber: '9999 9999 9999 9999',
    cardHolder: 'John Doe',
    expiryDate: '12/25',
    cvv: '123',
  });

  // Calculate order summary
  const subtotal = mockCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 10.0;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Navigate to success page or show success message
      navigate('/payment-success');
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContentWrapper variant="default" spacing="relaxed" backgroundColor="gray">
      <div className="max-w-7xl mx-auto">
        {/* Progress Steps */}
        <ProgressSteps currentStep={currentStep} />

        <div className="grid grid-cols-12 gap-8">
          {/* Title Section - Left Side */}
          <div className="col-span-12 lg:col-span-2">
            <div className="sticky top-4">
              <TextHeader1
                title={
                  currentStep === 'shipping'
                    ? 'Shipping Details'
                    : 'Payment Details'
                }
              />
              <p className="text-gray-600 mt-2 text-sm">
                {currentStep === 'shipping'
                  ? 'Enter your shipping information to continue'
                  : 'Complete your payment to finish the order'}
              </p>
            </div>
          </div>

          {/* Main Form Section - Center */}
          <div className="col-span-12 lg:col-span-6">
            {currentStep === 'shipping' ? (
              <ShippingStep
                shippingDetails={shippingDetails}
                onShippingDetailsChange={setShippingDetails}
                onSubmit={handleShippingSubmit}
              />
            ) : (
              <PaymentStep
                paymentDetails={paymentDetails}
                onPaymentDetailsChange={setPaymentDetails}
                onSubmit={handlePaymentSubmit}
                onBackToShipping={() => setCurrentStep('shipping')}
                loading={loading}
              />
            )}
          </div>

          {/* Order Summary - Right Side, Wider */}
          <div className="col-span-12 lg:col-span-4">
            <OrderSummary
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              total={total}
            />
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}
