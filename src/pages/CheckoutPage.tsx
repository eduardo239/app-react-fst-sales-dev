import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../styles/theme';
import { mockCartItems } from '../utils/db';
import type { PaymentDetails } from '../types/payment';
import type { ShippingDetails } from '../types/shipping';
import ContentWrapper from '../components/ContentWrapper';
import FormWrapper from '../components/FormWrapper';
import InputField from '../components/InputField';
import ButtonInput from '../components/ButtonInput';
import Separator from '../components/Separator';
import TextHeader1 from '../components/TextHeader1';

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
      <div className="max-w-[1000px] mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div
              className={cn(
                'flex items-center space-x-2',
                currentStep === 'shipping' ? 'text-blue-600' : 'text-gray-600'
              )}
            >
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center',
                  currentStep === 'shipping'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200'
                )}
              >
                1
              </div>
              <span className="font-medium">Shipping</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-200" />
            <div
              className={cn(
                'flex items-center space-x-2',
                currentStep === 'payment' ? 'text-blue-600' : 'text-gray-600'
              )}
            >
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center',
                  currentStep === 'payment'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200'
                )}
              >
                2
              </div>
              <span className="font-medium">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Section */}
          <div className="lg:col-span-2">
            <TextHeader1
              title={
                currentStep === 'shipping'
                  ? 'Shipping Details'
                  : 'Payment Details'
              }
            />

            {currentStep === 'shipping' ? (
              <FormWrapper
                onSubmit={handleShippingSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="First Name"
                    type="text"
                    value={shippingDetails.firstName}
                    onChange={(e) =>
                      setShippingDetails({
                        ...shippingDetails,
                        firstName: e.target.value,
                      })
                    }
                    required
                  />
                  <InputField
                    label="Last Name"
                    type="text"
                    value={shippingDetails.lastName}
                    onChange={(e) =>
                      setShippingDetails({
                        ...shippingDetails,
                        lastName: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <InputField
                  label="Email"
                  type="email"
                  value={shippingDetails.email}
                  onChange={(e) =>
                    setShippingDetails({
                      ...shippingDetails,
                      email: e.target.value,
                    })
                  }
                  required
                />

                <InputField
                  label="Phone"
                  type="tel"
                  value={shippingDetails.phone}
                  onChange={(e) =>
                    setShippingDetails({
                      ...shippingDetails,
                      phone: e.target.value,
                    })
                  }
                  required
                />

                <InputField
                  label="Address"
                  type="text"
                  value={shippingDetails.address}
                  onChange={(e) =>
                    setShippingDetails({
                      ...shippingDetails,
                      address: e.target.value,
                    })
                  }
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InputField
                    label="City"
                    type="text"
                    value={shippingDetails.city}
                    onChange={(e) =>
                      setShippingDetails({
                        ...shippingDetails,
                        city: e.target.value,
                      })
                    }
                    required
                  />
                  <InputField
                    label="State"
                    type="text"
                    value={shippingDetails.state}
                    onChange={(e) =>
                      setShippingDetails({
                        ...shippingDetails,
                        state: e.target.value,
                      })
                    }
                    required
                  />
                  <InputField
                    label="ZIP Code"
                    type="text"
                    value={shippingDetails.zipCode}
                    onChange={(e) =>
                      setShippingDetails({
                        ...shippingDetails,
                        zipCode: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <InputField
                  label="Country"
                  type="text"
                  value={shippingDetails.country}
                  onChange={(e) =>
                    setShippingDetails({
                      ...shippingDetails,
                      country: e.target.value,
                    })
                  }
                  required
                />

                <div className="flex justify-end">
                  <ButtonInput type="submit" variant="default" size="lg">
                    Continue to Payment
                  </ButtonInput>
                </div>
              </FormWrapper>
            ) : (
              <FormWrapper onSubmit={handlePaymentSubmit} className="space-y-6">
                <InputField
                  label="Card Number"
                  type="text"
                  value={paymentDetails.cardNumber}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      cardNumber: e.target.value,
                    })
                  }
                  placeholder="1234 5678 9012 3456"
                  required
                />

                <InputField
                  label="Card Holder Name"
                  type="text"
                  value={paymentDetails.cardHolder}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      cardHolder: e.target.value,
                    })
                  }
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="Expiry Date"
                    type="text"
                    value={paymentDetails.expiryDate}
                    onChange={(e) =>
                      setPaymentDetails({
                        ...paymentDetails,
                        expiryDate: e.target.value,
                      })
                    }
                    placeholder="MM/YY"
                    required
                  />
                  <InputField
                    label="CVV"
                    type="text"
                    value={paymentDetails.cvv}
                    onChange={(e) =>
                      setPaymentDetails({
                        ...paymentDetails,
                        cvv: e.target.value,
                      })
                    }
                    placeholder="123"
                    required
                  />
                </div>

                <div className="flex justify-between">
                  <ButtonInput
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => setCurrentStep('shipping')}
                  >
                    Back to Shipping
                  </ButtonInput>
                  <ButtonInput
                    type="submit"
                    variant="default"
                    size="lg"
                    loading={loading}
                  >
                    Complete Order
                  </ButtonInput>
                </div>
              </FormWrapper>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {mockCartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Totals */}
              <div className="space-y-2 my-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between mt-4 font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}
