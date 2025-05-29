'use client';

import type { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProducts } from '@/utils/getProducts';
import LoadingSpinner from './LoadingSpinner';

export default function ProductGrid() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const params = Object.fromEntries(searchParams.entries());
        const res = await getProducts(params);
        setProducts(res.products);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      {products.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-slate-900">
            Products ({products.length})
          </h2>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {!loading && products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No products found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
