'use client';

import { useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import PriceRangeFilter from '@/components/PriceRangeFilter';
import { useLoading } from '@/context/LoadingContext';
import { SearchParams } from '@/types';

export default function Filters() {
  const router = useRouter();
  const { setIsLoading } = useLoading();
  const [isPending, startTransition] = useTransition();

  const handleFiltersChange = (key: keyof SearchParams, value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value) params.set(key, value);
    else params.delete(key);

    startTransition(() => {
      router.push(`${window.location.pathname}?${params.toString()}`);
    });
  };

  useEffect(() => {
    setIsLoading(isPending);
  }, [isPending]);

  return (
    <div className="md:sticky md:top-20 bg-white shadow-lg md:shadow-sm rounded-none md:rounded md:w-72 space-y-6 h-fit">
      <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center mb-0">
        <h2 className="text-xl font-semibold text-slate-800">Filters</h2>
      </div>

      <div className="p-4 flex flex-col gap-4">
        <SearchBar onChange={handleFiltersChange} />

        <CategoryFilter onChange={handleFiltersChange} />

        <PriceRangeFilter onChange={handleFiltersChange} maxPrice={500} />
      </div>

      <div className="px-4 py-3 border-t border-gray-200">
        {isPending ? (
          <div className="text-center text-gray-500">Applying filters...</div>
        ) : (
          <div className="text-center text-gray-500">
            Adjust filters to refine your search.
          </div>
        )}
      </div>
    </div>
  );
}
