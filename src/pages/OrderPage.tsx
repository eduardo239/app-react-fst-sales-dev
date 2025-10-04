import { useState } from 'react';
import { cn } from '../styles/theme';
import type { Order } from '../types/order';
import ContentWrapper from '../components/ContentWrapper';
import TextHeader1 from '../components/TextHeader1';
import ButtonInput from '../components/ButtonInput';
import Separator from '../components/Separator';
import { mockOrders } from '../utils/db';

const statusColors = {
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-yellow-100 text-yellow-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const statusText = {
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

export default function OrderPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orders] = useState<Order[]>(mockOrders);

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order === selectedOrder ? null : order);
  };

  return (
    <ContentWrapper variant="default" spacing="relaxed" backgroundColor="gray">
      <div className="max-w-4xl mx-auto">
        <TextHeader1 title="My Orders" />

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
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
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No orders yet
            </h3>
            <p className="text-gray-500 mb-6">
              When you place an order, it will appear here.
            </p>
            <ButtonInput
              variant="default"
              onClick={() => (window.location.href = '/')}
            >
              Start Shopping
            </ButtonInput>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                {/* Order Header */}
                <div
                  className={cn(
                    'p-6 cursor-pointer hover:bg-gray-50 transition-colors',
                    'flex flex-col sm:flex-row sm:items-center sm:justify-between',
                    'space-y-4 sm:space-y-0'
                  )}
                  onClick={() => handleOrderClick(order)}
                >
                  <div className="space-y-2">
                    <div className="flex items-center space-x-4">
                      <h3 className="text-lg font-medium">Order {order.id}</h3>
                      <span
                        className={cn(
                          'px-3 py-1 rounded-full text-sm font-medium',
                          statusColors[order.status]
                        )}
                      >
                        {statusText[order.status]}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Placed on {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium">
                      ${order.total.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.items.length}{' '}
                      {order.items.length === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                </div>

                {/* Order Details (expandable) */}
                {selectedOrder?.id === order.id && (
                  <>
                    <Separator />
                    <div className="p-6 space-y-6">
                      {/* Items */}
                      <div>
                        <h4 className="font-medium mb-4">Order Items</h4>
                        <div className="space-y-4">
                          {order.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center space-x-4"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-md"
                              />
                              <div className="flex-1">
                                <h5 className="font-medium">{item.name}</h5>
                                <p className="text-sm text-gray-500">
                                  Quantity: {item.quantity}
                                </p>
                              </div>
                              <p className="font-medium">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Shipping Information */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-2">Shipping Address</h4>
                          <div className="text-sm text-gray-600">
                            <p>{order.shippingAddress.name}</p>
                            <p>{order.shippingAddress.address}</p>
                            <p>
                              {order.shippingAddress.city},{' '}
                              {order.shippingAddress.state}{' '}
                              {order.shippingAddress.zipCode}
                            </p>
                          </div>
                        </div>

                        {order.trackingNumber && (
                          <div>
                            <h4 className="font-medium mb-2">
                              Tracking Information
                            </h4>
                            <p className="text-sm text-gray-600">
                              Tracking Number: {order.trackingNumber}
                            </p>
                            <ButtonInput
                              variant="outline"
                              className="mt-2"
                              onClick={() => {
                                // Implement tracking link
                                console.log(
                                  'Track order:',
                                  order.trackingNumber
                                );
                              }}
                            >
                              Track Order
                            </ButtonInput>
                          </div>
                        )}
                      </div>

                      {/* Order Actions */}
                      <div className="flex justify-end space-x-4">
                        <ButtonInput
                          variant="outline"
                          onClick={() => {
                            // Implement order support
                            console.log('Need help with order:', order.id);
                          }}
                        >
                          Need Help?
                        </ButtonInput>
                        {order.status === 'delivered' && (
                          <ButtonInput
                            variant="default"
                            onClick={() => {
                              // Implement buy again functionality
                              console.log('Buy again:', order.id);
                            }}
                          >
                            Buy Again
                          </ButtonInput>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </ContentWrapper>
  );
}
