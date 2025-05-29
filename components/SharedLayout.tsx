'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Cart from './Cart';

interface SharedLayoutProps {
  children: React.ReactNode;
}

export default function SharedLayout({ children }: SharedLayoutProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCartToggle={() => setIsCartOpen(!isCartOpen)} />

      <main>{children}</main>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
