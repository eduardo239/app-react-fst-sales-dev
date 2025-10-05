export default function OrderSummaryTotal({ total }: { total: number }) {
  return (
    <div className="flex justify-between items-center mt-6 p-4 bg-blue-50 rounded-lg">
      <span className="text-lg font-semibold text-gray-900">Total</span>
      <span className="text-xl font-bold text-blue-600">
        ${total.toFixed(2)}
      </span>
    </div>
  );
}
