'use client';

interface HeaderProps {
  onCartToggle: () => void;
  cartItemCount: number;
}

export default function Header({ onCartToggle, cartItemCount }: HeaderProps) {
  return (
    <header className="bg-white sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <div className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
            ShopHub
          </div>

          <button
            onClick={onCartToggle}
            className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
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
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
