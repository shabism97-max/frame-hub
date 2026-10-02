import React from 'react';
import { MessageCircle, ArrowRight, Star, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { DISPLAY_PHONE } from '../data/storeData';
import { createGeneralWhatsAppUrl } from '../utils/whatsapp';
import { ImageWithSkeleton } from './ImageWithSkeleton';
import heroUploadedTiles from '../assets/images/baby/baby-001.jpg';

interface HeroProps {
  onExplore: () => void;
  onCustomBuilder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onCustomBuilder }) => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-[#111111] overflow-hidden text-white font-sans">
      {/* Background Image with Dark & Gold Luxury Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithSkeleton
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury living room wall frame decor"
          containerClassName="w-full h-full"
          className="w-full h-full object-cover object-center opacity-35 scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Gradients for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/70 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/90 via-[#111111]/60 to-[#111111]/80 pointer-events-none" />
      </div>

      {/* Decorative Gold Accent Flares */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#C8A96A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#C8A96A]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Text Column */}
        <div className="lg:w-7/12 space-y-6">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 bg-[#111111]/80 border border-[#C8A96A] px-4 py-1.5 rounded-none backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-[#C8A96A] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#C8A96A]">
              Pakistan's Premier Wall Frame Brand
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[0.95]">
            Every Frame <br className="hidden sm:inline" />
            <span className="italic text-[#C8A96A]">
              Tells a Story
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-gray-300 font-normal max-w-xl leading-relaxed mx-auto lg:mx-0">
            Premium custom photo frames, MDF photo tiles, Islamic &amp; Motivational frame sets and personalized wall décor delivered across Pakistan.
          </p>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            {/* Primary Button: Order on WhatsApp */}
            <a
              href={createGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1faa51] text-white uppercase text-[12px] tracking-[0.2em] font-bold px-8 py-4 rounded-none shadow-2xl transition-all group border border-[#25D366]"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Order on WhatsApp</span>
            </a>

            {/* Secondary Button: Explore Collection */}
            <button
              onClick={onExplore}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white hover:text-[#111111] text-white uppercase text-[12px] tracking-[0.2em] font-semibold px-8 py-4 rounded-none border border-white transition-all group"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 text-[#C8A96A] group-hover:text-[#111111] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Trust Highlights Row */}
          <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-center lg:text-left">
            <div>
              <div className="flex items-center justify-center lg:justify-start gap-1 text-[#C8A96A] font-bold text-base uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>HD Print Quality</span>
              </div>
              <p className="text-[11px] uppercase tracking-wider text-gray-400 mt-1">Waterproof Matte Finish</p>
            </div>

            <div>
              <div className="flex items-center justify-center lg:justify-start gap-1 text-[#C8A96A] font-bold text-base uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Damage</span>
              </div>
              <p className="text-[11px] uppercase tracking-wider text-gray-400 mt-1">MDF Sticky Wall Tiles</p>
            </div>

            <div>
              <div className="flex items-center justify-center lg:justify-start gap-1 text-[#C8A96A] font-bold text-base uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>Nationwide</span>
              </div>
              <p className="text-[11px] uppercase tracking-wider text-gray-400 mt-1">Fast Delivery Across PK</p>
            </div>
          </div>
        </div>

        {/* Right Preview Card / Interactive Frame Showcase */}
        <div className="lg:w-5/12 w-full max-w-md mx-auto">
          <div className="relative group p-3 bg-white shadow-2xl border border-[#C8A96A] text-[#111111]">
            {/* Interactive Card Canvas */}
            <div className="bg-[#FAF8F5] p-4 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#111111]">
                  Featured Series
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8A96A] font-bold">
                  RS. 999
                </span>
              </div>

              {/* Product Frame Image */}
              <div className="relative overflow-hidden border border-[#C8A96A] shadow-md group">
                <ImageWithSkeleton
                  src={heroUploadedTiles}
                  alt="MDF Photo Tile Set of 6"
                  containerClassName="w-full h-56 sm:h-64"
                  className="w-full h-56 sm:h-64 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 z-10 bg-[#111111] text-[#E2CD9F] text-[9px] font-bold px-2.5 py-1 uppercase tracking-widest border border-[#C8A96A]">
                  Best Seller
                </div>
              </div>

              {/* Frame Specs & Title */}
              <div>
                <h3 className="font-serif text-lg font-bold text-[#111111] uppercase tracking-wider">
                  MDF Photo Tiles (Set of 6)
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  6×8 inches each • Waterproof HD Matte Coating
                </p>
                <div className="mt-4 flex items-center justify-between pt-2 border-t border-gray-200">
                  <div>
                    <span className="text-xl font-bold text-[#C8A96A]">Rs. 999</span>
                    <span className="text-xs text-gray-400 line-through ml-2">Rs. 1,499</span>
                  </div>
                  <button
                    onClick={onCustomBuilder}
                    className="bg-[#111111] hover:bg-[#C8A96A] text-white uppercase text-[10px] tracking-widest font-semibold px-4 py-2.5 transition-colors flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C8A96A]" />
                    <span>Visualizer</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
