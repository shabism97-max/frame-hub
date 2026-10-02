import React from 'react';
import { WHY_CHOOSE_US } from '../data/storeData';
import { ShieldCheck, Printer, Sparkles, Zap, MapPin, Palette, MessageCircle } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-7 h-7 text-[#C8A96A]" />;
      case 'Printer':
        return <Printer className="w-7 h-7 text-[#C8A96A]" />;
      case 'Sparkles':
        return <Sparkles className="w-7 h-7 text-[#C8A96A]" />;
      case 'Palette':
        return <Palette className="w-7 h-7 text-[#C8A96A]" />;
      case 'Zap':
        return <Zap className="w-7 h-7 text-[#C8A96A]" />;
      case 'MapPin':
        return <MapPin className="w-7 h-7 text-[#C8A96A]" />;
      case 'MessageCircle':
        return <MessageCircle className="w-7 h-7 text-[#25D366]" />;
      default:
        return <ShieldCheck className="w-7 h-7 text-[#C8A96A]" />;
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-[#111111] text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="text-[11px] uppercase tracking-[0.3em] text-[#C8A96A] font-bold">
            The FRAME HUB Standard
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-white">
            Why Choose FRAME HUB
          </h2>
          <div className="w-12 h-0.5 bg-[#C8A96A] mx-auto" />
          <p className="text-xs sm:text-sm text-gray-400">
            Engineered for longevity, elegance, and effortless installation in Pakistani homes.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {WHY_CHOOSE_US.map((item) => (
            <div
              key={item.title}
              className="bg-[#181818] p-6 rounded-2xl border border-gray-800 hover:border-[#C8A96A] shadow-xl transition-all duration-300 text-center flex flex-col items-center space-y-3 group hover:-translate-y-1"
            >
              <div className="p-4 bg-[#111111] rounded-xl border border-gray-800 group-hover:border-[#C8A96A] transition-colors shadow-md">
                {getIcon(item.icon)}
              </div>

              <h3 className="font-serif text-xs sm:text-sm font-bold text-white group-hover:text-[#E2CD9F] transition-colors pt-2">
                {item.title}
              </h3>

              <p className="text-xs text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
