'use client';

import { useMemo } from 'react';
import type { SearchParams } from '@/types';

import { debounce } from '@/utils/debounce';
import { usePriceRange } from '@/context/PriceRangeContext';

interface PriceRangeFilterProps {
  onChange: (key: keyof SearchParams, value: string) => void;
  maxPrice?: number;
}

export default function PriceRangeFilter({
  onChange,
  maxPrice = 500,
}: PriceRangeFilterProps) {
  const { priceRange, setPriceRange } = usePriceRange();
  const debouncedOnChange = useMemo(() => debounce(onChange, 300), []);

  const handleSliderChange = (type: 'min' | 'max', value: number) => {
    const newRange = { ...priceRange, [type]: value };
    if (type === 'min') {
      if (value > priceRange.max) newRange.min = priceRange.max;
      debouncedOnChange('minPrice', String(newRange.min));
    }
    if (type === 'max') {
      if (value < priceRange.min) newRange.max = priceRange.min;
      debouncedOnChange('maxPrice', String(newRange.max));
    }

    setPriceRange(newRange);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label>
          Price Range: ${priceRange.min} - ${priceRange.max}
        </label>
      </div>

      <div className="space-y-2">
        <div>
          <small className="block text-gray-500 mb-1">
            Min: ${priceRange.min}
          </small>
          <input
            type="range"
            min="0"
            max={maxPrice}
            value={priceRange.min}
            onChange={(e) => handleSliderChange('min', Number(e.target.value))}
            className="w-full accent-blue-600"
          />
        </div>
        <div>
          <small className="block text-gray-500 mb-1">
            Max: ${priceRange.max}
          </small>
          <input
            type="range"
            min="0"
            max={maxPrice}
            value={priceRange.max}
            onChange={(e) => handleSliderChange('max', Number(e.target.value))}
            className="w-full accent-blue-600"
          />
        </div>
      </div>
    </div>
  );
}
