'use client';

import SearchBar from '@/components/SearchBar';
import { SearchParams } from '@/types';
import { useRouter } from 'next/navigation';
import CategoryFilter from './CategoryFilter';

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
    <div className="bg-white shadow-lg md:shadow-sm rounded-none md:rounded md:w-72 space-y-6">
      <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-800">Filters</h2>
      </div>

      <div className="p-4 flex flex-col gap-3">
        <SearchBar
          search={initialFilters.search}
          onChange={handleFiltersChange}
        />

        <CategoryFilter
          selectedCategory={initialFilters.category || ''}
          onChange={handleFiltersChange}
        />
      </div>
    </div>
  );
}
