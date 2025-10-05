export default function CartOrderSummary({
  calculateTotal,
}: {
  calculateTotal: () => number;
}) {
  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">Subtotal</p>
        <p className="text-sm font-medium text-gray-900">
          ${calculateTotal().toFixed(2)}
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
        <p className="text-base font-medium text-gray-900">Order total</p>
        <p className="text-base font-medium text-gray-900">
          ${calculateTotal().toFixed(2)}
        </p>
      </div>
    </div>
  );
}
