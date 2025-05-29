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
  const [loading, setLoading] = useState(false);

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
        <div className="bg-white py-3 px-4 rounded shadow-sm mb-4 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            {products.length} {products.length === 1 ? 'product' : 'products'}{' '}
            found
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No products found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
