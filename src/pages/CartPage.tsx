import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../styles/theme';
import { initialCartItems } from '../utils/db';
import CartList from '../components/CartList';
import TextHeader from '../components/TextHeader';
import ContentWrapper from '../components/ContentWrapper';
import ButtonSubmit from '../components/ButtonSubmit';

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const navigate = useNavigate();

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

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate('/checkout');
    }
  };

  return (
    <ContentWrapper>
      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <TextHeader
            title="Your cart is empty"
            subtitle="Looks like you haven't added anything to your cart yet."
          />

          <a
            href="/"
            className={cn(
              'inline-block mt-8 px-6 py-3 text-sm font-medium text-white',
              'bg-gray-900 hover:bg-gray-800',
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
            )}
          >
            Continue Shopping
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <TextHeader
              title="Shopping Cart"
              subtitle="Looks like you haven't added anything to your cart yet."
            />
            <CartList
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
            />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-gray-50 rounded-lg px-6 py-8">
              <h2 className="text-lg font-medium text-gray-900">
                Order Summary
              </h2>
              <TextHeader title="Order Summary" />

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

              <ButtonSubmit
                onClick={handleCheckout}
                value="Proceed to Checkout"
              />
            </div>
          </div>
        </div>
      )}
    </ContentWrapper>
  );
}
