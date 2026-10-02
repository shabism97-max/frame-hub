import React, { useState, useEffect } from 'react';
import { ShoppingBag, MessageCircle, Menu, X, Frame, Sparkles, Phone, Search } from 'lucide-react';
import { DISPLAY_PHONE } from '../data/storeData';
import { createGeneralWhatsAppUrl } from '../utils/whatsapp';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onSelectCategory?: (slug: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  cartCount,
  onOpenCart,
  onOpenSearch,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Shop', id: 'shop' },
    { name: 'Custom Builder', id: 'builder', highlight: true },
    { name: 'Gallery', id: 'gallery' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    setCurrentPage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full font-sans transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-[#111111] text-[#E2CD9F] text-xs py-2 px-4 border-b border-[#C8A96A]/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2 font-medium tracking-wide">
            <span className="bg-[#C8A96A]/20 text-[#C8A96A] text-[10px] uppercase font-semibold px-2 py-0.5 rounded tracking-widest">
              PAKISTAN WIDE
            </span>
            <span>FREE DELIVERY ACROSS PAKISTAN ON ORDERS OVER RS. 2,999/-</span>
          </div>
          <div className="flex items-center gap-4 text-gray-300 text-[11px]">
            <a
              href={`tel:${DISPLAY_PHONE}`}
              className="hover:text-[#C8A96A] transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-[#C8A96A]" />
              <span>{DISPLAY_PHONE}</span>
            </a>
            <span className="hidden md:inline text-gray-600">|</span>
            <span className="hidden md:inline text-gray-400">Karachi, Pakistan</span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#111111]/95 backdrop-blur-md text-white shadow-xl py-3 border-b border-[#C8A96A]/30'
            : 'bg-[#111111] text-white py-4 border-b border-gray-800'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded-none bg-gradient-to-br from-[#C8A96A] via-[#E2CD9F] to-[#A28243] p-[1.5px] shadow-lg group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#111111] rounded-none flex items-center justify-center">
                <Frame className="w-5 h-5 text-[#C8A96A]" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.2em] uppercase text-white">
                FRAME <span className="text-[#C8A96A]">HUB</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#C8A96A] -mt-1 font-medium">
                Every Frame Tells a Story
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-2 lg:gap-6 text-[11px] uppercase tracking-widest font-medium">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-2 py-2 transition-all relative ${
                    isActive
                      ? 'text-[#C8A96A]'
                      : 'text-gray-300 hover:text-[#C8A96A]'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {link.highlight && (
                      <Sparkles className="w-3.5 h-3.5 text-[#C8A96A] animate-pulse" />
                    )}
                    {link.name}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C8A96A]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              aria-label="Search items"
              className="p-2 text-gray-300 hover:text-[#C8A96A] hover:bg-white/5 rounded-full transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Icon Button */}
            <button
              onClick={onOpenCart}
              aria-label="Open Shopping Bag"
              className="p-2 text-gray-300 hover:text-[#C8A96A] hover:bg-white/5 rounded-full transition-colors relative"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#C8A96A] text-[#111111] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Order on WhatsApp Primary CTA */}
            <a
              href={createGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1faa51] text-white text-[11px] uppercase tracking-widest font-semibold px-5 py-2.5 rounded-none shadow-md border border-[#25D366] hover:border-[#1faa51] transition-all hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Order on WhatsApp</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#111111] border-t border-gray-800 px-4 pt-3 pb-6 space-y-2 mt-2 shadow-2xl">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-4 py-2.5 rounded-md text-sm font-medium flex items-center justify-between transition-colors ${
                  currentPage === link.id
                    ? 'bg-[#C8A96A]/10 text-[#C8A96A] border-l-2 border-[#C8A96A]'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <span>{link.name}</span>
                {link.highlight && (
                  <span className="text-[10px] uppercase bg-[#C8A96A] text-[#111111] font-bold px-2 py-0.5 rounded">
                    NEW
                  </span>
                )}
              </button>
            ))}

            <div className="pt-3 border-t border-gray-800 flex flex-col gap-2">
              <a
                href={createGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white text-sm font-bold py-3 rounded-md shadow"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Order on WhatsApp ({DISPLAY_PHONE})</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
