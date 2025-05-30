'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Cart from './Cart';
import { ToastProvider } from '@/context/ToastContext';
import ToastContainer from './ToastContainer';

interface SharedLayoutProps {
  children: React.ReactNode;
}

export default function SharedLayout({ children }: SharedLayoutProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isCartOpen]);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50">
        <Header onCartToggle={() => setIsCartOpen(!isCartOpen)} />

        <main>{children}</main>

        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>

      <ToastContainer />
    </ToastProvider>
  );
}
