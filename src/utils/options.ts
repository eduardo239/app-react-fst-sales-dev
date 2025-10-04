// Filter and sort options
export const categories = [
  { id: 'all', label: 'All Products' },
  { id: 'electronics', label: 'Electronics' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'gaming', label: 'Gaming' },
];

export const priceRanges = [
  { id: 'all', label: 'All Prices', range: { min: 0, max: Infinity } },
  { id: 'under-25', label: 'Under $25', range: { min: 0, max: 25 } },
  { id: '25-50', label: '$25 to $50', range: { min: 25, max: 50 } },
  { id: '50-100', label: '$50 to $100', range: { min: 50, max: 100 } },
  { id: 'over-100', label: 'Over $100', range: { min: 100, max: Infinity } },
];

export const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'newest', label: 'Newest' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Highest Rated' },
];