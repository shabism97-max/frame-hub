import React from 'react';
import { CATEGORIES } from '../data/storeData';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ImageWithSkeleton } from './ImageWithSkeleton';

interface FeaturedCategoriesProps {
  onSelectCategory: (slug: string) => void;
}

export const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5] text-[#111111] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="text-[11px] uppercase tracking-[0.3em] text-[#C8A96A] font-bold">
            Featured Collections
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-[#111111]">
            Curated Wall Décor
          </h2>
          <div className="w-12 h-0.5 bg-[#C8A96A] mx-auto" />
          <p className="text-sm text-gray-500 leading-relaxed">
            Choose from our premium range of damage-free MDF photo tiles, gold-embossed Islamic calligraphy, family collages &amp; custom photo frames.
          </p>
        </div>

        {/* Categories Grid (6 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className="group cursor-pointer bg-white overflow-hidden shadow-sm hover:shadow-2xl border border-gray-200 hover:border-[#C8A96A] transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
            >
              {/* Category Image */}
              <div className="relative h-64 overflow-hidden bg-[#111111]">
                <ImageWithSkeleton
                  src={cat.image}
                  alt={cat.name}
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/30 to-transparent pointer-events-none" />
                
                {/* Item Count Badge */}
                <div className="absolute top-4 right-4 bg-[#111111] text-[#C8A96A] text-[10px] uppercase tracking-widest font-semibold px-3 py-1 border border-[#C8A96A] z-10">
                  {cat.itemCount}+ Designs
                </div>

                {/* Overlaid Category Title */}
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1 z-10">
                  <h3 className="font-serif text-lg font-bold tracking-wider uppercase group-hover:text-[#C8A96A] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-gray-300 line-clamp-1">
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* Bottom Footer Button */}
              <div className="p-4 bg-white flex items-center justify-between border-t border-gray-100 text-[11px] uppercase tracking-widest font-bold text-[#111111] group-hover:bg-[#111111] group-hover:text-[#C8A96A] transition-colors">
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 text-[#C8A96A] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
