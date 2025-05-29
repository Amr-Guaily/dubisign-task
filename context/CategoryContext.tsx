'use client';

import { createContext, useContext, useState } from 'react';

interface CategoryContextProps {
  category: string;
  setCategory: (value: string) => void;
}

const CategoryContext = createContext<CategoryContextProps | undefined>(
  undefined
);

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context)
    throw new Error('useCategory must be used within CategoryProvider');
  return context;
};

export const CategoryProvider = ({
  initialCategory = '',
  children,
}: {
  initialCategory?: string;
  children: React.ReactNode;
}) => {
  const [category, setCategory] = useState(initialCategory);

  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};
