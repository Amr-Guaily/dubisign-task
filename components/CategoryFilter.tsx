'use client';

import { SearchParams } from '@/types';
import { CATEGORIES } from '@/data/products';
import { useCategory } from '@/context/CategoryContext';

interface CategoryFilterProps {
  onChange: (key: keyof SearchParams, value: string) => void;
}

export default function CategoryFilter({ onChange }: CategoryFilterProps) {
  const { category, setCategory } = useCategory();
  return (
    <div>
      <label>Category</label>
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          onChange('category', e.target.value);
        }}
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
