import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../data/storeData';
import { Upload, Palette, CheckCircle, Truck, Sparkles, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Upload':
        return <Upload className="w-6 h-6 text-[#C8A96A]" />;
      case 'Palette':
        return <Palette className="w-6 h-6 text-[#C8A96A]" />;
      case 'CheckCircle':
        return <CheckCircle className="w-6 h-6 text-[#C8A96A]" />;
      case 'Truck':
        return <Truck className="w-6 h-6 text-[#C8A96A]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#C8A96A]" />;
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-[#111111] text-white font-sans relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="text-[11px] uppercase tracking-[0.3em] text-[#C8A96A] font-bold">
            How It Works
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-white">
            Simple 4-Step Process
          </h2>
          <div className="w-12 h-0.5 bg-[#C8A96A] mx-auto" />
          <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider">
            From gallery upload to your living room wall.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {HOW_IT_WORKS_STEPS.map((item, index) => (
            <div
              key={item.step}
              className="bg-[#181818] p-8 border border-gray-800 hover:border-[#C8A96A] transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div>
                {/* Step Number Tag */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 bg-[#111111] border border-[#C8A96A] flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getIcon(item.icon)}
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#C8A96A]">
                    STEP {item.step}
                  </span>
                </div>

                <h3 className="font-serif text-base font-bold text-white uppercase tracking-wider mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Connecting Arrow for desktop */}
              {index < HOW_IT_WORKS_STEPS.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-20 text-gray-600">
                  <ArrowRight className="w-5 h-5 text-[#C8A96A]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
