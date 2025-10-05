import { useNavigate } from 'react-router-dom';
import ContentWrapper from '../components/ContentWrapper';
import TextHeader from '../components/TextHeader';
import ButtonInput from '../components/ButtonInput';

export default function PaymentSuccess() {
  const navigate = useNavigate();

  // Mock order details - replace with actual order data
  const orderDetails = {
    orderNumber:
      'ORD-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
    orderDate: new Date().toLocaleDateString(),
    total: 339.97,
    email: 'customer@example.com',
    estimatedDelivery: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toLocaleDateString(),
  };

  return (
    <ContentWrapper variant="narrow" spacing="relaxed" backgroundColor="white">
      <div className="text-center">
        {/* Success Icon */}
        <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-green-100 mb-8">
          <svg
            className="w-16 h-16 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Success Message */}
        <TextHeader title="Payment Successful!" />
        <p className="mt-4 text-lg text-gray-600">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        {/* Order Details Card */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6 text-left">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Order Number</p>
                <p className="font-medium">{orderDetails.orderNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Order Date</p>
                <p className="font-medium">{orderDetails.orderDate}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="font-medium">${orderDetails.total.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{orderDetails.email}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600">Estimated Delivery</p>
              <p className="font-medium">{orderDetails.estimatedDelivery}</p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">What's Next?</h2>
          <ul className="text-left space-y-3 mb-6">
            <li className="flex items-center text-gray-700">
              <svg
                className="w-5 h-5 mr-2 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              You'll receive an order confirmation email shortly
            </li>
            <li className="flex items-center text-gray-700">
              <svg
                className="w-5 h-5 mr-2 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              You can track your order status in your account
            </li>
            <li className="flex items-center text-gray-700">
              <svg
                className="w-5 h-5 mr-2 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              We'll notify you when your order ships
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-x-4">
          <ButtonInput
            variant="outline"
            onClick={() => navigate('/orders')}
            className="min-w-[150px]"
          >
            View Orders
          </ButtonInput>
          <ButtonInput
            variant="default"
            onClick={() => navigate('/')}
            className="min-w-[150px]"
          >
            Continue Shopping
          </ButtonInput>
        </div>

        {/* Support Information */}
        <div className="mt-8 text-sm text-gray-600">
          <p>Need help? Contact our support team at</p>
          <a
            href="mailto:support@example.com"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            support@example.com
          </a>
        </div>
      </div>
    </ContentWrapper>
  );
}
