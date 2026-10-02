import React from 'react';
import { Frame, MessageCircle, Mail, MapPin, Phone, ShieldCheck, Truck, Sparkles, CreditCard, Lock } from 'lucide-react';
import { DISPLAY_PHONE, CONTACT_EMAIL, FULL_ADDRESS } from '../data/storeData';
import { createGeneralWhatsAppUrl } from '../utils/whatsapp';

interface FooterProps {
  setCurrentPage: (page: string) => void;
  onSelectCategory?: (slug: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage, onSelectCategory }) => {
  const handleNav = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111111] text-gray-300 border-t border-[#C8A96A]/30 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-gray-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-[#C8A96A] text-[#111111] flex items-center justify-center font-bold shadow-lg">
                <Frame className="w-6 h-6" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-widest text-white">
                  FRAME<span className="text-[#C8A96A]">HUB</span>
                </span>
                <p className="text-[9px] uppercase tracking-[0.25em] text-[#C8A96A] font-bold">
                  Every Frame Tells a Story
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Pakistan's premier personalized wall décor atelier. Handcrafted MDF photo tiles, family frames, Islamic calligraphy sets, and wedding memory grids with zero wall damage technology.
            </p>
            <div className="pt-1">
              <a
                href={createGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1faa51] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-lg transition-transform hover:scale-105"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp: {DISPLAY_PHONE}</span>
              </a>
            </div>
          </div>

          {/* Column 2: Products */}
          <div className="space-y-3">
            <h3 className="font-serif text-white text-xs tracking-widest uppercase font-bold border-l-2 border-[#C8A96A] pl-3">
              Products
            </h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-[#C8A96A] transition-colors">
                  MDF Photo Tiles (6×8 &amp; 8×12)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-[#C8A96A] transition-colors">
                  Family Frames
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-[#C8A96A] transition-colors">
                  Wedding Frames
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-[#C8A96A] transition-colors">
                  Islamic &amp; Motivational Frame Set
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-[#C8A96A] transition-colors">
                  Photo Clip String Lights
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="space-y-3">
            <h3 className="font-serif text-white text-xs tracking-widest uppercase font-bold border-l-2 border-[#C8A96A] pl-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-[#C8A96A] transition-colors">
                  Home Page
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-[#C8A96A] transition-colors">
                  Shop Collection
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('builder')} className="hover:text-[#C8A96A] transition-colors flex items-center gap-1.5">
                  <span>Custom Builder</span>
                  <span className="bg-[#C8A96A] text-[#111111] text-[9px] font-bold px-1.5 py-0.2 rounded">LIVE</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('gallery')} className="hover:text-[#C8A96A] transition-colors">
                  Interior Gallery
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-[#C8A96A] transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-[#C8A96A] transition-colors">
                  Contact &amp; Map
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Policies & Payment Methods */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-serif text-white text-xs tracking-widest uppercase font-bold border-l-2 border-[#C8A96A] pl-3">
                Policies
              </h3>
              <ul className="space-y-1.5 text-xs text-gray-400">
                <li>3-5 Days Nationwide Delivery</li>
                <li>Shockproof Protection Guarantee</li>
                <li>Zero Wall Damage Tech</li>
                <li>Free Proof Mockups on WhatsApp</li>
              </ul>
            </div>

            {/* Payment Methods */}
            <div className="pt-2 space-y-2 border-t border-gray-800">
              <h4 className="text-[11px] font-bold text-[#E2CD9F] uppercase tracking-wider">
                Payment Methods
              </h4>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-bold">
                <span className="bg-[#181818] border border-gray-700 text-gray-200 px-2.5 py-1 rounded">
                  Cash on Delivery
                </span>
                <span className="bg-[#181818] border border-[#25D366]/40 text-[#25D366] px-2.5 py-1 rounded">
                  JazzCash
                </span>
                <span className="bg-[#181818] border border-[#25D366]/40 text-[#25D366] px-2.5 py-1 rounded">
                  EasyPaisa
                </span>
                <span className="bg-[#181818] border border-[#C8A96A]/40 text-[#C8A96A] px-2.5 py-1 rounded">
                  Bank Transfer
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Contact Info Row */}
        <div className="p-6 bg-[#181818] rounded-2xl border border-gray-800 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-300">
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
            <div>
              <span className="block font-bold text-white uppercase text-[10px] tracking-wider">WhatsApp Contact</span>
              <a href={`tel:${DISPLAY_PHONE}`} className="text-gray-300 hover:text-[#25D366]">
                {DISPLAY_PHONE}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-[#C8A96A] shrink-0 mt-0.5" />
            <div>
              <span className="block font-bold text-white uppercase text-[10px] tracking-wider">Email Inquiry</span>
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-gray-300 hover:text-[#C8A96A]">
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#C8A96A] shrink-0 mt-0.5" />
            <div>
              <span className="block font-bold text-white uppercase text-[10px] tracking-wider">Studio Workshop Address</span>
              <span className="text-gray-300">{FULL_ADDRESS}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-gray-400 uppercase tracking-widest">
          <div>
            © {new Date().getFullYear()} FRAME HUB Pakistan. All rights reserved.
          </div>
          <div className="flex items-center gap-3 text-gray-400">
            <span>Karachi Studio</span>
            <span className="text-[#C8A96A]">•</span>
            <span>All Pakistan Delivery</span>
            <span className="text-[#C8A96A]">•</span>
            <span>8mm MDF Finish</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
