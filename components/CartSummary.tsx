'use client';

import { useCart } from '@/context/CartContext';

interface CartSummaryProps {
  onCartToggle: () => void;
}
export default function CartSummary({ onCartToggle }: CartSummaryProps) {
  const { cart } = useCart();

  return (
    <button
      onClick={onCartToggle}
      className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors flex gap-1 justify-center"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8"
        />
      </svg>
      {cart.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {cart.length}
        </span>
      )}
    </button>
  );
}
