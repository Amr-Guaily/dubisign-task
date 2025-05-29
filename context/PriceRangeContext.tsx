'use client';

import { createContext, useContext, useState } from 'react';
import { PriceRange } from '@/types';

interface PriceRangeContextProps {
  priceRange: PriceRange;
  setPriceRange: (value: PriceRange) => void;
}

const PriceRangeContext = createContext<PriceRangeContextProps | undefined>(
  undefined
);

export const usePriceRange = () => {
  const context = useContext(PriceRangeContext);
  if (!context)
    throw new Error('usePriceRange must be used within PriceRangeProvider');
  return context;
};

export const PriceRangeProvider = ({
  initialPriceRange = { min: 0, max: 0 },
  children,
}: {
  initialPriceRange?: PriceRange;
  children: React.ReactNode;
}) => {
  const [priceRange, setPriceRange] = useState<PriceRange>(initialPriceRange);

  return (
    <PriceRangeContext.Provider value={{ priceRange, setPriceRange }}>
      {children}
    </PriceRangeContext.Provider>
  );
};
