import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, Truck, Check } from 'lucide-react';
import { createCartWhatsAppUrl } from '../utils/whatsapp';
import { ImageWithSkeleton } from './ImageWithSkeleton';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('Karachi');
  const [address, setAddress] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 2999;
  const isFreeDelivery = subtotal >= freeShippingThreshold;
  const deliveryFee = cart.length === 0 ? 0 : isFreeDelivery ? 0 : 300;
  const finalTotal = subtotal + deliveryFee;
  const progressPercent = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const amountNeeded = Math.max(freeShippingThreshold - subtotal, 0);

  const handleCheckoutWhatsApp = () => {
    const url = createCartWhatsAppUrl(cart, subtotal, deliveryFee, finalTotal, { name, city, address });
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#111111] text-white h-full flex flex-col justify-between shadow-2xl border-l border-[#C8A96A]/30">
        {/* Drawer Header */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C8A96A]" />
            <h2 className="font-cinzel text-xl font-bold text-white">Your Shopping Bag</h2>
            <span className="text-xs bg-[#C8A96A] text-[#111111] font-bold px-2 py-0.5 rounded-full">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Free Shipping Bar */}
        <div className="bg-[#181818] p-4 border-b border-gray-800 space-y-1.5 text-xs">
          <div className="flex items-center justify-between text-gray-300">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#C8A96A]" />
              {subtotal >= freeShippingThreshold ? (
                <span className="text-green-400 font-bold">You unlocked FREE Nationwide Delivery!</span>
              ) : (
                <span>
                  Add <strong className="text-[#C8A96A]">Rs. {amountNeeded.toLocaleString()}</strong> for Free Delivery
                </span>
              )}
            </span>
            <span className="font-bold text-[#C8A96A]">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#C8A96A] to-green-400 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <ShoppingBag className="w-12 h-12 text-gray-600 mx-auto" />
              <p className="text-gray-400 text-sm">Your shopping bag is empty.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="bg-[#181818] p-3.5 rounded-xl border border-gray-800 flex gap-3 items-center"
              >
                <ImageWithSkeleton
                  src={item.product.image}
                  alt={item.product.name}
                  containerClassName="w-16 h-16 rounded-lg bg-gray-900 border border-gray-800 shrink-0"
                  className="w-16 h-16 object-cover rounded-lg"
                />

                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between">
                    <h3 className="font-cinzel text-xs font-bold text-white line-clamp-1">
                      {item.product.name}
                    </h3>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-gray-500 hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[11px] text-gray-400">{item.product.dimensions}</p>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center border border-gray-700 rounded bg-black/40">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="px-2 py-0.5 text-gray-400 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-white">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="px-2 py-0.5 text-gray-400 hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-sm font-bold text-[#C8A96A]">
                      Rs. {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout Inputs */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-800 bg-[#181818] space-y-4">
            {/* Customer Inputs */}
            <div className="space-y-2 text-xs">
              <span className="text-gray-400 font-bold block">Delivery Details (Optional for WhatsApp):</span>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-black/50 border border-gray-700 rounded p-2 text-xs text-white focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="bg-black/50 border border-gray-700 rounded p-2 text-xs text-white focus:outline-none"
                />
              </div>
              <input
                type="text"
                placeholder="Delivery Address (Optional)"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-black/50 border border-gray-700 rounded p-2 text-xs text-white focus:outline-none"
              />
            </div>

            {/* Price Breakdown */}
            <div className="space-y-1.5 pt-2 border-t border-gray-800 text-xs">
              <div className="flex items-center justify-between text-gray-300">
                <span>Subtotal:</span>
                <span className="font-semibold text-white">Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-gray-300">
                <span>Standard Delivery:</span>
                <span className={isFreeDelivery ? 'text-green-400 font-bold' : 'text-gray-300 font-semibold'}>
                  {isFreeDelivery ? 'FREE (Above Rs. 2,999)' : `Rs. ${deliveryFee.toLocaleString()}`}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-700/60">
                <span className="text-white font-bold">Final Total:</span>
                <span className="font-bold text-xl text-[#C8A96A]">
                  Rs. {finalTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* WhatsApp Checkout CTA */}
            <button
              onClick={handleCheckoutWhatsApp}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1faa51] text-white font-bold text-sm py-3.5 rounded-xl shadow-lg transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Checkout Order on WhatsApp</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
