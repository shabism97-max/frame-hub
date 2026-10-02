import React, { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES } from '../data/storeData';
import { Product } from '../types';
import { Search, SlidersHorizontal, MessageCircle, ShoppingBag, Eye, Star, Check } from 'lucide-react';
import { createProductWhatsAppUrl } from '../utils/whatsapp';
import { ImageWithSkeleton } from './ImageWithSkeleton';
import { BackButton } from './BackButton';

interface ShopPageProps {
  initialCategory?: string;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onBack?: () => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  initialCategory = 'all',
  onQuickView,
  onAddToCart,
  onBack,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'lowToHigh' | 'highToLow'>('featured');

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.categorySlug === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    if (sortBy === 'lowToHigh') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'highToLow') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="py-12 sm:py-20 bg-[#FAF8F5] text-[#111111] font-sans min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onBack={onBack} isLightBg={true} />

        {/* Page Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="text-[11px] uppercase tracking-[0.3em] text-[#C8A96A] font-bold">
            Catalog &amp; Collections
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-[#111111]">
            Shop Wall Frame Collections
          </h1>
          <div className="w-12 h-0.5 bg-[#C8A96A] mx-auto" />
          <p className="text-xs sm:text-sm text-gray-600 uppercase tracking-wider">
            Browse our catalog of MDF photo tiles, royal Islamic calligraphy sets, family photo collages &amp; custom photo frames.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-200 mb-10 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search MDF tiles, family frames, Islamic calligraphy..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-xs text-gray-800 focus:ring-2 focus:ring-[#C8A96A] focus:outline-none"
              />
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <SlidersHorizontal className="w-4 h-4 text-[#C8A96A]" />
              <span className="text-xs font-semibold text-gray-600">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 font-medium focus:ring-2 focus:ring-[#C8A96A] focus:outline-none"
              >
                <option value="featured">Featured Favorites</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
            {[
              { label: `All (${PRODUCTS.length})`, slug: 'all' },
              { label: 'MDF Tiles', slug: 'mdf-photo-tiles' },
              { label: 'Family', slug: 'family-frames' },
              { label: 'Wedding', slug: 'wedding-frames' },
              { label: 'Islamic', slug: 'islamic-wall-art' },
              { label: 'Motivational', slug: 'motivational-wall-art' },
              { label: 'Lights', slug: 'photo-clip-lights' },
            ].map((tab) => (
              <button
                key={tab.slug}
                onClick={() => setSelectedCategory(tab.slug)}
                className={`px-4 py-2 rounded-none text-[11px] uppercase tracking-widest font-bold transition-all ${
                  selectedCategory === tab.slug || (tab.slug === 'islamic-wall-art' && selectedCategory === 'islamic-motivational')
                    ? 'bg-[#C8A96A] text-white shadow'
                    : selectedCategory === 'all' && tab.slug === 'all'
                    ? 'bg-[#111111] text-white shadow'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <p className="text-base text-gray-500">No frames found matching your search query.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 bg-[#C8A96A] text-[#111111] font-bold text-xs px-6 py-2.5 rounded shadow"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const priceLabel = product.startingPrice
                ? `Starting from Rs. ${product.price.toLocaleString()}`
                : `Rs. ${product.price.toLocaleString()}`;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#C8A96A] shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col group relative"
                >
                  {/* Large Image */}
                  <div className="relative h-64 sm:h-72 overflow-hidden bg-gray-100 border-b border-gray-100">
                    <ImageWithSkeleton
                      src={product.image}
                      alt={product.name}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {product.badge && (
                      <span className="absolute top-3.5 left-3.5 z-10 bg-[#111111] text-[#C8A96A] text-[10px] font-extrabold uppercase px-3 py-1 rounded-none border border-[#C8A96A]/40 tracking-widest shadow-md">
                        {product.badge}
                      </span>
                    )}

                    {/* Quick View Overlay */}
                    <div className="absolute inset-0 z-10 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => onQuickView(product)}
                        className="inline-flex items-center gap-2 bg-[#111111] text-[#E2CD9F] hover:bg-[#C8A96A] hover:text-white font-bold text-xs px-5 py-2.5 rounded-none border border-[#C8A96A] transition-all shadow-xl"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      {/* Set size & Spec tag */}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="bg-[#111111] text-[#C8A96A] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border border-[#C8A96A]/20">
                          {product.setSize}
                        </span>
                        <span className="text-[11px] text-[#C8A96A] font-semibold">
                          {product.dimensions}
                        </span>
                      </div>

                      {/* Product Name */}
                      <h3
                        onClick={() => onQuickView(product)}
                        className="font-serif text-lg font-bold text-[#111111] hover:text-[#C8A96A] cursor-pointer transition-colors leading-snug"
                      >
                        {product.name}
                      </h3>

                      {/* Price */}
                      <div className="flex items-baseline gap-2 pt-1">
                        <span className="text-xl font-extrabold text-[#111111]">
                          {priceLabel}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            Rs. {product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* Short Description */}
                      <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed pt-1">
                        {product.description}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 border-t border-gray-100 space-y-2.5">
                      <div className="grid grid-cols-2 gap-2">
                        {/* View Details */}
                        <button
                          onClick={() => onQuickView(product)}
                          className="w-full inline-flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-[#111111] font-bold text-xs py-3 transition-colors border border-gray-200"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#C8A96A]" />
                          <span>View Details</span>
                        </button>

                        {/* Order on WhatsApp */}
                        <a
                          href={createProductWhatsAppUrl(product)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#1faa51] text-white font-bold text-xs py-3 transition-colors border border-[#25D366] shadow-sm"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-current" />
                          <span>Order on WhatsApp</span>
                        </a>
                      </div>

                      {/* Add to Cart secondary button */}
                      <button
                        onClick={() => onAddToCart(product)}
                        className="w-full inline-flex items-center justify-center gap-2 bg-[#111111] hover:bg-[#222222] text-white font-semibold text-xs py-2.5 transition-colors border border-[#111111]"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-[#C8A96A]" />
                        <span>Add to Cart Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
