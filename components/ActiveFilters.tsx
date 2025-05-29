'use client';

import { useCategory } from '@/context/CategoryContext';
import { usePriceRange } from '@/context/PriceRangeContext';
import { useSearch } from '@/context/SearchContext';
import { useRouter } from 'next/navigation';
import { SearchParams } from '@/types';

export default function ActiveFilters() {
  const router = useRouter();
  const { category, setCategory } = useCategory();
  const { priceRange, setPriceRange } = usePriceRange();
  const { search, setSearch } = useSearch();

  console.log(category);
  const hasActiveFilters =
    search ||
    (!!category && category !== 'All') ||
    priceRange.min > 0 ||
    priceRange.max < 500;

  console.log(hasActiveFilters);
  if (!hasActiveFilters) return null;

  const resetAllFilters = () => {
    setCategory('All');
    setPriceRange({ min: 0, max: 500 });
    setSearch('');

    router.push(window.location.pathname);
  };

  const cancelFilter = (key: keyof SearchParams) => {
    const params = new URLSearchParams(window.location.search);
    if (key === 'minPrice' || key === 'maxPrice') {
      params.delete('minPrice');
      params.delete('maxPrice');
    }
    params.delete(key);

    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-gray-700">
          Active Filters:
        </span>

        {/* Search filter chip */}
        {search && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
            Search: {search}
            <button
              onClick={() => {
                cancelFilter('search');
                setSearch('');
              }}
              className="ml-1 text-blue-600 hover:text-blue-800"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </span>
        )}

        {/* Category filter chip */}
        {category && category !== 'All' && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
            Category: {category}
            <button
              onClick={() => {
                cancelFilter('category');
                setCategory('All');
              }}
              className="ml-1 text-green-600 hover:text-green-800"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </span>
        )}

        {/* Price range filter chip */}
        {(priceRange.min > 0 || priceRange.max < 500) && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
            Price: ${priceRange.min} - ${priceRange.max}
            <button
              onClick={() => {
                cancelFilter('minPrice');
                setPriceRange({ min: 0, max: 500 });
              }}
              className="ml-1 text-purple-600 hover:text-purple-800"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </span>
        )}

        {/* Reset all button */}
        <button
          onClick={resetAllFilters}
          className="ml-2 px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:underline flex items-center"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Reset All
        </button>
      </div>
    </div>
  );
}
