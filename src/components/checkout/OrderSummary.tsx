import Separator from '../Separator';
import { mockCartItems } from '../../utils/db';

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export default function OrderSummary({
  subtotal,
  shipping,
  tax,
  total,
}: OrderSummaryProps) {
  return (
    <div className="bg-white p-6 sticky top-4">
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {mockCartItems.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-gray-50 rounded-lg border border-gray-100"
          >
            <div className="flex items-start space-x-4 mb-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 leading-tight">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  ${item.price.toFixed(2)} each
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Quantity:</span>
                <span className="font-medium text-gray-900">
                  {item.quantity}
                </span>
              </div>
              <div className="text-right">
                <p className="font-semibold text-lg text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Separator />

      {/* Totals */}
      <div className="space-y-3 my-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Tax (10%)</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
      </div>

      <Separator />

      <div className="flex justify-between items-center mt-6 p-4 bg-blue-50 rounded-lg">
        <span className="text-lg font-semibold text-gray-900">Total</span>
        <span className="text-xl font-bold text-blue-600">
          ${total.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
