'use client';

import { createContext, useContext, useState } from 'react';

interface SearchContextProps {
  search: string;
  setSearch: (value: string) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error('useSearch must be used within SearchProvider');
  return context;
};

export const SearchProvider = ({
  initialSearch = '',
  children,
}: {
  initialSearch?: string;
  children: React.ReactNode;
}) => {
  const [search, setSearch] = useState(initialSearch);

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
