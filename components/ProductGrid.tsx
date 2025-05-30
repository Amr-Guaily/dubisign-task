'use client';

import type { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import LoadingSpinner from './LoadingSpinner';
import { useLoading } from '@/context/LoadingContext';

interface ProductGridProps {
  initialProducts: Product[];
}

export default function ProductGrid({ initialProducts }: ProductGridProps) {
  const { isLoading } = useLoading();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      {initialProducts.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-slate-900">
            Products ({initialProducts.length})
          </h2>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {initialProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {initialProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No products found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
