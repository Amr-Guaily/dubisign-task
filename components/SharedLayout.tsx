'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Cart from './Cart';
import { ToastProvider } from '@/context/ToastContext';
import ToastContainer from './ToastContainer';
import { LoadingProvider } from '@/context/LoadingContext';

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

        <LoadingProvider>
          <main>{children}</main>
        </LoadingProvider>

        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>

      <ToastContainer />
    </ToastProvider>
  );
}
