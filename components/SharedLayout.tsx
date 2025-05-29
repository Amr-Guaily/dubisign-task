'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { CartItem } from '@/types';
import { CART_KEY } from '@/utils/constants';
import Cart from './Cart';

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

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePurchase = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    alert(`Purchase successful! Total: $${getTotalPrice().toFixed(2)}`);
    setCart([]);
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onCartToggle={() => setIsCartOpen(!isCartOpen)}
        cartItemCount={cart.length}
      />

      <main>{children}</main>

      <Cart
        isOpen={isCartOpen}
        items={cart}
        cartTotal={getTotalPrice()}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onPurchase={handlePurchase}
      />
    </div>
  );
}
