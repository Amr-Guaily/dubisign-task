'use client';

import ReactDOM from 'react-dom';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } =
    useCart();

  const handlePurchase = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    alert(`Purchase successful! Total: $${getTotalPrice().toFixed(2)}`);
    clearCart();
    onClose();
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Cart Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold text-slate-800">
              Shopping Cart
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg">Your cart is empty</p>
                <p className="text-gray-400 text-sm mt-1">
                  Add some products to get started
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg"
                  >
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.image || '/placeholder.svg'}
                        alt={item.name}
                        fill
                        className="rounded-md object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors"
                        >
                          -
                        </button>
                        <span className="text-sm font-medium min-w-[20px] text-center text-slate-700">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-700">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold text-slate-700">
                <span>Total:</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <button
                onClick={handlePurchase}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors font-medium"
              >
                Purchase Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
