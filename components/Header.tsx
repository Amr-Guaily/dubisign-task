'use client';

import CartSummary from '@/components/CartSummary';

interface HeaderProps {
  onCartToggle: () => void;
}

export default function Header({ onCartToggle }: HeaderProps) {
  return (
    <header className="bg-white sticky top-0 z-50 border-b-2 border-gray-400">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <div className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
            ShopHub
          </div>

          <CartSummary onCartToggle={onCartToggle} />
        </div>
      </div>
    </header>
  );
}
