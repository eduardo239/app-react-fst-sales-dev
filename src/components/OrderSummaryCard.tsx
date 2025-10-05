export default function OrderSummaryCard({
  item,
}: {
  item: {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
  };
}) {
  return (
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
          <span className="font-medium text-gray-900">{item.quantity}</span>
        </div>
        <div className="text-right">
          <p className="font-semibold text-lg text-gray-900">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
