export default function ProductKeyFeatures({
  product,
}: {
  product: {
    features: string[];
  };
}) {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Key Features</h3>
      <ul className="list-disc pl-5 space-y-2">
        {product.features.map((feature, index) => (
          <li key={index} className="text-gray-600">
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
