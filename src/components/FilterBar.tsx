import { useState } from 'react';
import { cn } from '../styles/theme';

interface FilterOption {
  id: string;
  label: string;
}

interface PriceOption {
  id: string;
  label: string;
  range: { min: number; max: number };
}

interface FilterBarProps {
  categories: FilterOption[];
  selectedCategory?: string;
  onCategoryChange: (category: string) => void;

  priceOptions: PriceOption[];
  selectedPrice?: string;
  onPriceChange: (priceId: string) => void;

  sortOptions: FilterOption[];
  selectedSort?: string;
  onSortChange: (sort: string) => void;

  className?: string;
}

type DropdownProps = {
  label: string;
  options: FilterOption[] | PriceOption[];
  selected?: string;
  onChange: (value: string) => void;
};

export default function FilterBar({
  categories,
  selectedCategory,
  onCategoryChange,

  priceOptions,
  selectedPrice,
  onPriceChange,

  sortOptions,
  selectedSort,
  onSortChange,

  className = '',
}: FilterBarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdownClick = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const Dropdown = ({ label, options, selected, onChange }: DropdownProps) => {
    const selectedLabel =
      options.find((opt) => opt.id === selected)?.label || 'All';

    return (
      <div className="relative">
        <button
          onClick={() => handleDropdownClick(label)}
          className={cn(
            'px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300',
            'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500',
            'inline-flex items-center gap-2'
          )}
        >
          <span>
            {label}: {selectedLabel}
          </span>
          <svg
            className={cn(
              'h-4 w-4 text-gray-500 transition-transform',
              openDropdown === label && 'transform rotate-180'
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {openDropdown === label && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setOpenDropdown(null)}
            />
            <div
              className={cn(
                'absolute z-20 mt-1 w-56 shadow-lg',
                'bg-white ring-1 ring-black ring-opacity-5'
              )}
            >
              <div className="py-1">
                <button
                  onClick={() => {
                    onChange('');
                    setOpenDropdown(null);
                  }}
                  className={cn(
                    'w-full text-left px-4 py-2 text-sm',
                    !selected
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-700 hover:bg-gray-50'
                  )}
                >
                  All
                </button>
                {options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      onChange(option.id);
                      setOpenDropdown(null);
                    }}
                    className={cn(
                      'w-full text-left px-4 py-2 text-sm',
                      option.id === selected
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-700 hover:bg-gray-50'
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className={cn('flex items-center gap-4 bg-white', className)}>
      <Dropdown
        label="Category"
        options={categories}
        selected={selectedCategory}
        onChange={onCategoryChange}
      />

      <Dropdown
        label="Price"
        options={priceOptions}
        selected={selectedPrice}
        onChange={onPriceChange}
      />

      <Dropdown
        label="Sort by"
        options={sortOptions}
        selected={selectedSort}
        onChange={onSortChange}
      />
    </div>
  );
}
