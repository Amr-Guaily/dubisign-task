'use client';

import Image from 'next/image';
import type { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          priority={true}
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{product.category}</p>
        <p className="text-lg font-bold text-gray-900 mb-3">
          ${product.price.toFixed(2)}
        </p>
        <button
          onClick={() => addToCart({ ...product, quantity: 1 })}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
