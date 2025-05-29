'use client';

import SearchBar from '@/components/SearchBar';
import { SearchParams } from '@/types';
import { useRouter } from 'next/navigation';
import CategoryFilter from './CategoryFilter';
import PriceRangeFilter from './PriceRangeFilter';

export default function Filters({
  initialFilters,
}: {
  initialFilters: SearchParams;
}) {
  const router = useRouter();

  const handleFiltersChange = (key: keyof SearchParams, value: string) => {
    console.log(`Filter changed: ${key} = ${value}`);
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <div className="md:sticky md:top-20 bg-white shadow-lg md:shadow-sm rounded-none md:rounded md:w-72 space-y-6 h-fit">
      <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center mb-0">
        <h2 className="text-xl font-semibold text-slate-800">Filters</h2>
      </div>

      <div className="p-4 flex flex-col gap-4">
        <SearchBar
          search={initialFilters.search}
          onChange={handleFiltersChange}
        />

        <CategoryFilter
          selectedCategory={initialFilters.category || ''}
          onChange={handleFiltersChange}
        />

        <PriceRangeFilter
          selectedRange={{
            min: Number(initialFilters.minPrice ?? 0),
            max: Number(initialFilters.maxPrice ?? 0),
          }}
          onChange={handleFiltersChange}
          maxPrice={500}
        />
      </div>
    </div>
  );
}
