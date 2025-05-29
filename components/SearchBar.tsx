'use client';

import { useMemo } from 'react';
import { debounce } from '@/utils/debounce';
import { SearchParams } from '@/types';
import { useSearch } from '@/context/SearchContext';

interface SearchBarProps {
  onChange: (key: keyof SearchParams, value: string) => void;
}

export default function SearchBar({ onChange }: SearchBarProps) {
  const { search, setSearch } = useSearch();

  const debouncedOnChange = useMemo(() => debounce(onChange, 300), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearch(newValue);
    debouncedOnChange('search', newValue);
  };

  return (
    <div>
      <label htmlFor="search">Search Products</label>
      <div className="relative">
        <input
          type="text"
          id="search"
          name="search"
          value={search}
          onChange={handleChange}
          placeholder="Search by name..."
        />
        {search && (
          <button
            onClick={() => {
              setSearch('');
              onChange('search', '');
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
        )}
      </div>
    </div>
  );
}
