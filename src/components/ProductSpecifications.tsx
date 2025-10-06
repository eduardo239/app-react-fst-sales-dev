export default function ProductSpecifications({
  product,
}: {
  product: {
    specs: { name: string; value: string }[];
  };
}) {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Specifications</h3>
      <div className="grid grid-cols-2 gap-4">
        {product.specs.map((spec, index) => (
          <div key={index}>
            <dt className="text-sm font-medium text-gray-500">{spec.name}</dt>
            <dd className="mt-1 text-sm text-gray-900">{spec.value}</dd>
          </div>
        ))}
      </div>
    </div>
  );
}
