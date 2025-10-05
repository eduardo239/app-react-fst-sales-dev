import OrderSummaryCard from './OrderSummaryCard';

export default function OrderSummaryCardList({
  mockCartItems,
}: {
  mockCartItems: any[];
}) {
  return (
    <div className="space-y-4 mb-6">
      {mockCartItems.map((item) => (
        <OrderSummaryCard key={item.id} item={item} />
      ))}
    </div>
  );
}
