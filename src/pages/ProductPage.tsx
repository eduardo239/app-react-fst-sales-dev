import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../styles/theme';
import ContentWrapper from '../components/ContentWrapper';
import Separator from '../components/Separator';
import type { ProductImage, ProductVariant } from '../types/product';
import { product, relatedProducts } from '../utils/db';
import ButtonSubmit from '../components/ButtonSubmit';
import TextHeader from '../components/TextHeader';
import Rating from '../components/Rating';
import ColorSwatches from '../components/ColorSwatches';
import TextParagraph from '../components/TextParagraph';
import ProductKeyFeatures from '../components/ProductKeyFeatures';
import ProductSpecifications from '../components/ProductSpecifications';

export default function ProductPage() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<ProductImage>(
    product.images[0]
  );
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // Implement add to cart functionality
    console.log('Added to cart:', {
      productId: product.id,
      variantId: selectedVariant.id,
      quantity,
    });
    navigate('/cart');
  };

  const handleBuyNow = () => {
    // Implement buy now functionality
    console.log('Buy now:', {
      productId: product.id,
      variantId: selectedVariant.id,
      quantity,
    });
    navigate('/checkout');
  };

  return (
    <ContentWrapper variant="default" spacing="relaxed" backgroundColor="white">
      <div className="max-w-7xl mx-auto">
        {/* Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-w-1 aspect-h-1 bg-gray-100 overflow-hidden">
              <img
                src={selectedImage.url}
                alt={selectedImage.alt}
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(image)}
                  className={cn(
                    'aspect-w-1 aspect-h-1 overflow-hidden',
                    selectedImage.id === image.id
                      ? 'ring-3 ring-gray-800'
                      : 'ring-3 ring-gray-200'
                  )}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-center object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <TextHeader value={product.name} fontSize="3xl" />

              {/* Product Rating */}
              <Rating
                product={{
                  rating: product.rating,
                  reviewCount: product.reviewCount,
                }}
              />
            </div>

            <Separator />

            {/* Price */}
            <div className="flex items-baseline">
              <TextHeader
                value={`${selectedVariant.price.toFixed(2)}`}
                fontSize="2xl"
              />

              {selectedVariant.compareAtPrice && (
                <p className="ml-2 text-lg text-gray-500 line-through">
                  ${selectedVariant.compareAtPrice.toFixed(2)}
                </p>
              )}
            </div>

            {/* Color Selection */}
            <div>
              <TextParagraph value="Color" fontSize="sm" />

              {/* Color Swatches */}
              <ColorSwatches
                product={product}
                selectedVariant={selectedVariant}
                setSelectedVariant={setSelectedVariant}
              />
            </div>

            {/* Quantity */}
            <div>
              <TextParagraph value="Quantity" fontSize="sm" />
              <div className="mt-2 flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300"
                  disabled={quantity <= 1}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <span className="text-lg font-medium w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-gray-300"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <ButtonSubmit value="Add to Cart" onClick={handleAddToCart} />
              <ButtonSubmit value="Buy Now" onClick={handleBuyNow} />
            </div>

            {/* Product Description */}
            <div className="prose prose-sm max-w-none">
              <p>{product.description}</p>
            </div>

            {/* Features */}
            <ProductKeyFeatures product={{ features: product.features }} />

            {/* Specifications */}
            <ProductSpecifications product={{ specs: product.specs }} />
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="group relative bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-center object-cover group-hover:opacity-75"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    {relatedProduct.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    ${relatedProduct.price.toFixed(2)}
                  </p>
                  <div className="mt-1 flex items-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={cn(
                            'w-4 h-4',
                            i < Math.floor(relatedProduct.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          )}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="ml-1 text-xs text-gray-500">
                      ({relatedProduct.reviewCount})
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}
