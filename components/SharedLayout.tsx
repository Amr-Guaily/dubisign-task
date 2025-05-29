'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { CartItem } from '@/types';
import { CART_KEY } from '@/utils/constants';

interface SharedLayoutProps {
  children: React.ReactNode;
}

export default function SharedLayout({ children }: SharedLayoutProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem(CART_KEY);
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onCartToggle={() => setIsCartOpen(!isCartOpen)}
        cartItemCount={cart.length}
      />

      <main>{children}</main>
    </div>
  );
}
