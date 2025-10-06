import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../styles/theme';
import { initialCartItems } from '../utils/db';
import CartList from '../components/CartList';
import TextHeader from '../components/TextHeader';
import ContentWrapper from '../components/ContentWrapper';
import ButtonSubmit from '../components/ButtonSubmit';
import CartOrderSummary from '../components/CartOrderSummary';

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
            value="Your cart is empty"
            subtitle="Looks like you haven't added anything to your cart yet."
          />

          <Link
            to="/"
            className={cn(
              'inline-block mt-8 px-6 py-3 text-sm font-medium text-white',
              'bg-gray-900 hover:bg-gray-800',
              'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
            )}
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <TextHeader
              value="Shopping Cart"
              subtitle="Looks like you haven't added anything to your cart yet."
              fontSize="xl"
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
              <TextHeader value="Order Summary" fontSize="xl" />

              <CartOrderSummary calculateTotal={calculateTotal} />
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
