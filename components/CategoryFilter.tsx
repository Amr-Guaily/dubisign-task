'use client';

import { SearchParams } from '@/types';
import { CATEGORIES } from '@/data/products';

interface CategoryFilterProps {
  selectedCategory: string;
  onChange: (key: keyof SearchParams, value: string) => void;
}

export default function CategoryFilter({
  selectedCategory,
  onChange,
}: CategoryFilterProps) {
  return (
    <div>
      <label>Category</label>
      <select
        value={selectedCategory}
        onChange={(e) => onChange('category', e.target.value)}
      >
        {CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
