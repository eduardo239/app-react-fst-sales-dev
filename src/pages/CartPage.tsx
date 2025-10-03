import { useState } from 'react';
import { cn } from '../styles/theme';
import CartList from '../components/CartList';
import Checkout from '../components/Checkout';
import TextHeader1 from '../components/TextHeader1';
import ContentWrapper from '../components/ContentWrapper';
import { ImagePaths } from '../utils/imageUtils';

// Sample cart items - replace with your actual data source
const initialCartItems = [
  {
    id: 1,
    title: 'Wireless Headphones',
    price: 199.99,
    currency: '$',
    image: ImagePaths.products.product1,
    quantity: 1,
  },
  {
    id: 2,
    title: 'Smart Watch',
    price: 299.99,
    currency: '$',
    image: ImagePaths.products.product2,
    quantity: 1,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string>();
  const [isProcessing, setIsProcessing] = useState(false);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(id);
      return;
    }

    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const handleCheckout = async (data: any) => {
    setIsProcessing(true);
    setCheckoutError(undefined);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would normally send the order to your backend
      console.log('Order placed:', {
        items: cartItems,
        total: calculateTotal(),
        shippingDetails: data,
      });

      // Clear cart after successful checkout
      setCartItems([]);
      setIsCheckingOut(false);
    } catch (error) {
      setCheckoutError(
        'There was an error processing your order. Please try again.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <ContentWrapper>
        <div className="text-center py-16">
          <TextHeader1 title="Your cart is empty" />
          <p className="mt-4 text-gray-600">
            Looks like you haven't added anything to your cart yet.
          </p>
          <a
            href="/"
            className={cn(
              'inline-block mt-8 px-6 py-3 text-sm font-medium text-white',
              'bg-gray-900 hover:bg-gray-800 ',
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
            )}
          >
            Continue Shopping
          </a>
        </div>
      </ContentWrapper>
    );
  }

  return (
    <ContentWrapper>
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <TextHeader1 title="Shopping Cart" />

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          {/* Cart Items */}
          <div className="lg:col-span-7">
            <CartList
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
            />
          </div>

          {/* Order Summary */}
          <div className="mt-16 lg:mt-0 lg:col-span-5">
            <div className="bg-gray-50 px-6 py-8">
              <h2 className="text-lg font-medium text-gray-900">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Subtotal</p>
                  <p className="text-sm font-medium text-gray-900">
                    ${calculateTotal().toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <p className="text-base font-medium text-gray-900">
                    Order total
                  </p>
                  <p className="text-base font-medium text-gray-900">
                    ${calculateTotal().toFixed(2)}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsCheckingOut(true)}
                className={cn(
                  'mt-6 w-full px-6 py-3 text-base font-medium text-white',
                  'bg-gray-900 hover:bg-gray-800 ',
                  'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
                )}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>

        {/* Checkout Modal */}
        {isCheckingOut && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                onClick={() => !isProcessing && setIsCheckingOut(false)}
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div
                className={cn(
                  'inline-block align-bottom bg-white text-left',
                  'overflow-hidden shadow-xl transform transition-all',
                  'sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full'
                )}
              >
                <div className="absolute top-0 right-0 pt-4 pr-4">
                  <button
                    onClick={() => !isProcessing && setIsCheckingOut(false)}
                    className={cn(
                      'bg-white text-gray-400 hover:text-gray-500',
                      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
                    )}
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="p-6">
                  <Checkout
                    onSubmit={handleCheckout}
                    loading={isProcessing}
                    error={checkoutError}
                    total={calculateTotal()}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ContentWrapper>
  );
}
