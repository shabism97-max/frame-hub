import React from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/storeData';
import { MessageCircle, ShoppingBag, Eye, Star, Sparkles, Check } from 'lucide-react';
import { createProductWhatsAppUrl } from '../utils/whatsapp';
import { ImageWithSkeleton } from './ImageWithSkeleton';

interface FeaturedProductsProps {
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onViewAllShop: () => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  onQuickView,
  onAddToCart,
  onViewAllShop,
}) => {
  return (
    <section className="py-16 sm:py-24 bg-[#111111] text-white font-sans relative overflow-hidden">
      {/* Background Accent Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#C8A96A_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-gray-800 pb-8">
          <div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-[#C8A96A] font-bold mb-2">
              Customer Favorites
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-white">
              Featured Wall Frames
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-xl">
              Handcrafted in Pakistan with ultra-dense MDF backing, high-definition print clarity, and damage-free hanging accessories.
            </p>
          </div>

          <button
            onClick={onViewAllShop}
            className="self-start md:self-auto bg-[#C8A96A] hover:bg-[#A28243] text-white font-semibold text-[11px] uppercase tracking-[0.2em] px-6 py-3 rounded-none border border-[#C8A96A] shadow-md transition-all hover:scale-105"
          >
            Explore Full Catalog
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product) => {
            const isStartingPrice = product.startingPrice;
            const priceLabel = isStartingPrice
              ? `Starting from Rs. ${product.price.toLocaleString()}`
              : `Rs. ${product.price.toLocaleString()}`;

            return (
              <div
                key={product.id}
                className="bg-[#181818] rounded-none overflow-hidden border border-gray-800 hover:border-[#C8A96A] shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-black/40">
                  <ImageWithSkeleton
                    src={product.image}
                    alt={product.name}
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-3 left-3 z-10 bg-[#111111] text-[#E2CD9F] text-[9px] font-bold uppercase px-2.5 py-1 tracking-widest border border-[#C8A96A]">
                      {product.badge}
                    </span>
                  )}

                  {/* Quick Action Overlay */}
                  <div className="absolute inset-0 z-10 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-xs">
                    <button
                      onClick={() => onQuickView(product)}
                      className="p-3 bg-white text-[#111111] rounded-none hover:bg-[#C8A96A] hover:text-white transition-colors shadow-lg"
                      title="Quick View Details"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Size & Spec */}
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                      <span className="bg-[#111111] text-[#C8A96A] px-2 py-0.5 text-[10px] uppercase tracking-widest font-semibold border border-gray-800">
                        {product.setSize}
                      </span>
                      <span className="text-[11px] text-[#C8A96A] font-medium">
                        {product.dimensions}
                      </span>
                    </div>

                    {/* Product Name */}
                    <h3
                      onClick={() => onQuickView(product)}
                      className="font-serif text-sm font-bold text-white uppercase tracking-wider hover:text-[#C8A96A] cursor-pointer transition-colors line-clamp-2 leading-snug"
                    >
                      {product.name}
                    </h3>

                    {/* Dimensions */}
                    <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                      <Check className="w-3 h-3 text-[#C8A96A]" />
                      <span>{product.dimensions}</span>
                    </p>
                  </div>

                  {/* Pricing & CTA Actions */}
                  <div className="pt-3 border-t border-gray-800 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-base font-bold text-[#C8A96A]">
                          {priceLabel}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-500 line-through ml-2">
                            Rs. {product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Buttons Row */}
                    <div className="grid grid-cols-2 gap-2">
                      {/* WhatsApp Quick Order */}
                      <a
                        href={createProductWhatsAppUrl(product)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1 bg-[#25D366] hover:bg-[#1faa51] text-white text-[10px] uppercase tracking-wider font-bold py-2.5 rounded-none shadow transition-all border border-[#25D366]"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        <span>WhatsApp</span>
                      </a>

                      {/* Add to Cart */}
                      <button
                        onClick={() => onAddToCart(product)}
                        className="flex items-center justify-center gap-1 bg-transparent hover:bg-white hover:text-[#111111] text-white text-[10px] uppercase tracking-wider font-bold py-2.5 rounded-none border border-white/30 transition-all"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-[#C8A96A]" />
                        <span>Add Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
