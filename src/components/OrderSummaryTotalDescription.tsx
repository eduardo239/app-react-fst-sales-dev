export default function OrderSummaryTotalDescription({
  subtotal,
  shipping,
  tax,
}: {
  subtotal: number;
  shipping: number;
  tax: number;
}) {
  return (
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
  );
}
