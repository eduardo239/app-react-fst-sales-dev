import { useState, useEffect } from 'react';
import { cn } from '../styles/theme';
import CardWrapper from '../components/CardWrapper';
import CardItem from '../components/CardItem';
import FilterBar from '../components/FilterBar';
import ContentWrapper from '../components/ContentWrapper';
import TextHeader1 from '../components/TextHeader1';
import { products } from '../db';

// Filter and sort options
const categories = [
  { id: 'all', label: 'All Products' },
  { id: 'electronics', label: 'Electronics' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'gaming', label: 'Gaming' },
];

const priceRanges = [
  { id: 'all', label: 'All Prices', range: { min: 0, max: Infinity } },
  { id: 'under-25', label: 'Under $25', range: { min: 0, max: 25 } },
  { id: '25-50', label: '$25 to $50', range: { min: 25, max: 50 } },
  { id: '50-100', label: '$50 to $100', range: { min: 50, max: 100 } },
  { id: 'over-100', label: 'Over $100', range: { min: 100, max: Infinity } },
];

const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'newest', label: 'Newest' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Highest Rated' },
];

export default function ShopPage() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedSort, setSelectedSort] = useState('featured');
  const [isLoading, setIsLoading] = useState(false);

  // Filter and sort products when selections change
  useEffect(() => {
    setIsLoading(true);

    // Simulate API call delay
    const timer = setTimeout(() => {
      let result = [...products];

      // Apply category filter
      if (selectedCategory !== 'all') {
        result = result.filter((product) => {
          // This is a simplified category check. In a real app,
          // you would have proper category assignments
          if (selectedCategory === 'electronics' && product.price > 100)
            return true;
          if (selectedCategory === 'accessories' && product.price < 50)
            return true;
          if (selectedCategory === 'gaming' && product.badge === 'Gaming')
            return true;
          return false;
        });
      }

      // Apply price filter
      const selectedPriceRange = priceRanges.find(
        (range) => range.id === selectedPrice
      );
      if (selectedPriceRange && selectedPrice !== 'all') {
        result = result.filter(
          (product) =>
            product.price >= selectedPriceRange.range.min &&
            product.price <= selectedPriceRange.range.max
        );
      }

      // Apply sorting
      switch (selectedSort) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        case 'newest':
          // In a real app, you would sort by date
          result.reverse();
          break;
        default:
          // 'featured' - no sorting needed
          break;
      }

      setFilteredProducts(result);
      setIsLoading(false);
    }, 500); // Simulate network delay

    return () => clearTimeout(timer);
  }, [selectedCategory, selectedPrice, selectedSort]);

  const handleQuickView = (product: any) => {
    // Handle quick view action
    console.log('Quick view:', product);
  };

  const handleAddToCart = (product: any) => {
    // Handle add to cart action
    console.log('Add to cart:', product);
  };

  return (
    <ContentWrapper variant="full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-gray-500">
            {filteredProducts.length} products
          </p>
        </div> */}

        {/* Filters */}
        <div className="mb-8">
          <FilterBar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            priceOptions={priceRanges}
            selectedPrice={selectedPrice}
            onPriceChange={setSelectedPrice}
            sortOptions={sortOptions}
            selectedSort={selectedSort}
            onSortChange={setSelectedSort}
          />
        </div>

        {/* Product Grid */}
        <CardWrapper
          columns={{ sm: 2, md: 3, lg: 4 }}
          gap="lg"
          loading={isLoading}
          loadingCount={8}
          orderBy="balanced"
        >
          {filteredProducts.map((product) => (
            <CardItem
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              originalPrice={product.originalPrice}
              currency={product.currency}
              image={product.image}
              imageAlt={product.imageAlt}
              isOnSale={product.isOnSale}
              isOutOfStock={product.isOutOfStock}
              onAddToCart={() => handleAddToCart(product)}
            />
          ))}
        </CardWrapper>

        {/* Empty State */}
        {filteredProducts.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No products match your filters</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedPrice('all');
                setSelectedSort('featured');
              }}
              className={cn(
                'px-4 py-2 text-sm font-medium text-gray-700',
                'bg-white border border-gray-300 rounded-md',
                'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
              )}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </ContentWrapper>
  );
}
