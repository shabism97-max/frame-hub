import React from 'react';
import { Truck, ShieldCheck, Sparkles, MessageCircle } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const trustItems = [
    {
      title: 'All Pakistan Delivery',
      subtitle: 'Fast dispatch to 200+ cities',
      icon: <Truck className="w-5 h-5 text-[#C8A96A]" />,
    },
    {
      title: 'Premium Quality',
      subtitle: '8mm MDF & HD UV print finish',
      icon: <ShieldCheck className="w-5 h-5 text-[#C8A96A]" />,
    },
    {
      title: 'Custom Made',
      subtitle: 'Personalized frames & sizes',
      icon: <Sparkles className="w-5 h-5 text-[#C8A96A]" />,
    },
    {
      title: 'WhatsApp Support',
      subtitle: 'Instant design mockups & queries',
      icon: <MessageCircle className="w-5 h-5 text-[#25D366]" />,
    },
  ];

  return (
    <section className="bg-[#181818] text-white border-y border-[#C8A96A]/30 py-6 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {trustItems.map((item) => (
            <div key={item.title} className="flex items-center gap-3 justify-center md:justify-start">
              <div className="p-2.5 bg-[#111111] border border-[#C8A96A]/40 shrink-0">
                {item.icon}
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                  {item.title}
                </h4>
                <p className="text-[10px] sm:text-xs text-gray-400 font-normal">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
