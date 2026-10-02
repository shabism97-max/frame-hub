import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { FeaturedCategories } from './components/FeaturedCategories';
import { FeaturedProducts } from './components/FeaturedProducts';
import { InteractiveCustomBuilder } from './components/InteractiveCustomBuilder';
import { HowItWorks } from './components/HowItWorks';
import { WhyChooseUs } from './components/WhyChooseUs';
import { GalleryView } from './components/GalleryView';
import { ShopPage } from './components/ShopPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { CartItem, Product } from './types';
import { MessageCircle, Search, X, Check, ArrowUp } from 'lucide-react';
import { DISPLAY_PHONE, PRODUCTS } from './data/storeData';
import { createGeneralWhatsAppUrl } from './utils/whatsapp';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    return ['home', 'shop', 'builder', 'gallery', 'about', 'contact'].includes(hash)
      ? hash
      : 'home';
  });

  const [pageHistory, setPageHistory] = useState<string[]>([currentPage]);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('framehub_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('framehub_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Scroll to top listener
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (quickViewProduct) {
        setQuickViewProduct(null);
        return;
      }

      if (e.state && e.state.page) {
        setCurrentPage(e.state.page);
        if (e.state.categorySlug) {
          setSelectedCategorySlug(e.state.categorySlug);
        }
      } else {
        const hash = window.location.hash.replace('#', '');
        if (['home', 'shop', 'builder', 'gallery', 'about', 'contact'].includes(hash)) {
          setCurrentPage(hash);
        } else {
          setCurrentPage('home');
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [quickViewProduct]);

  // Navigation handler that updates history
  const handleNavigate = (nextPage: string, categorySlug?: string) => {
    if (categorySlug) {
      setSelectedCategorySlug(categorySlug);
    }
    if (nextPage === currentPage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentPage(nextPage);
    setPageHistory((prev) => [...prev, nextPage]);
    window.history.pushState({ page: nextPage, categorySlug }, '', '#' + nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back button handler
  const handleBack = () => {
    if (quickViewProduct) {
      setQuickViewProduct(null);
      return;
    }

    if (pageHistory.length > 1) {
      const newHistory = pageHistory.slice(0, -1);
      const prevPage = newHistory[newHistory.length - 1];
      setPageHistory(newHistory);
      setCurrentPage(prevPage);
      window.history.pushState({ page: prevPage }, '', '#' + prevPage);
    } else if (window.history.length > 1) {
      window.history.back();
    } else {
      setCurrentPage('home');
      setPageHistory(['home']);
      window.history.pushState({ page: 'home' }, '', '#home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (product: Product, quantity = 1, notes?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity, customNotes: notes || item.customNotes }
            : item
        );
      }
      return [...prev, { product, quantity, customNotes: notes }];
    });

    showToast(`Added "${product.name}" to shopping bag!`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleSelectCategoryFromNav = (slug: string) => {
    handleNavigate('shop', slug);
  };

  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#111111] flex flex-col font-sans selection:bg-[#C8A96A] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#111111] text-white px-5 py-3 rounded-xl shadow-2xl border border-[#C8A96A] text-xs font-bold flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-[#C8A96A]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={handleNavigate}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onSelectCategory={handleSelectCategoryFromNav}
      />

      {/* Dynamic View Routing */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            <Hero
              onExplore={() => handleNavigate('shop')}
              onCustomBuilder={() => {
                const el = document.getElementById('custom-builder');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  handleNavigate('builder');
                }
              }}
            />
            <TrustBar />
            <FeaturedCategories onSelectCategory={handleSelectCategoryFromNav} />
            <FeaturedProducts
              onQuickView={(p) => setQuickViewProduct(p)}
              onAddToCart={(p) => handleAddToCart(p)}
              onViewAllShop={() => handleNavigate('shop')}
            />
            <InteractiveCustomBuilder />
            <HowItWorks />
            <WhyChooseUs />
            <GalleryView />
          </>
        )}

        {currentPage === 'shop' && (
          <ShopPage
            initialCategory={selectedCategorySlug}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={(p) => handleAddToCart(p)}
            onBack={handleBack}
          />
        )}

        {currentPage === 'builder' && (
          <InteractiveCustomBuilder onBack={handleBack} />
        )}

        {currentPage === 'gallery' && (
          <GalleryView onBack={handleBack} />
        )}

        {currentPage === 'about' && (
          <AboutPage onBack={handleBack} />
        )}

        {currentPage === 'contact' && (
          <ContactPage onBack={handleBack} />
        )}
      </main>

      {/* Footer */}
      <Footer
        setCurrentPage={handleNavigate}
        onSelectCategory={handleSelectCategoryFromNav}
      />

      {/* Floating Sticky WhatsApp Quick Action */}
      <a
        href={createGeneralWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#1faa51] text-white p-3.5 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 flex items-center justify-center group"
        aria-label="Contact Frame Hub on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold pl-0 group-hover:pl-2">
          Order on WhatsApp
        </span>
      </a>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-22 right-6 z-40 bg-[#111111] text-[#C8A96A] border border-[#C8A96A]/40 p-3 rounded-full shadow-lg transition-all hover:scale-105"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCart([])}
      />

      {/* Quick View Product Modal */}
      <ProductModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-4 sm:p-10 flex flex-col items-center justify-start pt-20">
          <button
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-6 right-6 text-gray-400 hover:text-white p-2 rounded-full"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="w-full max-w-2xl space-y-6">
            <div className="relative">
              <Search className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 text-[#C8A96A]" />
              <input
                type="text"
                autoFocus
                placeholder="Search MDF tiles, Islamic calligraphy, family frames..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#181818] border-2 border-[#C8A96A] rounded-2xl pl-14 pr-6 py-4 text-white text-base focus:outline-none shadow-2xl"
              />
            </div>

            {/* Results Grid */}
            <div className="max-h-[60vh] overflow-y-auto space-y-3">
              {searchQuery.trim() && searchResults.length === 0 && (
                <p className="text-gray-400 text-center py-8 text-sm">
                  No products found for "{searchQuery}". Try searching for "MDF", "Family", or "Islamic".
                </p>
              )}

              {searchResults.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setQuickViewProduct(p);
                    setIsSearchOpen(false);
                  }}
                  className="bg-[#181818] p-3 rounded-xl border border-gray-800 hover:border-[#C8A96A] flex items-center gap-4 cursor-pointer transition-colors"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-14 h-14 object-cover rounded-lg bg-black"
                  />
                  <div className="flex-1">
                    <h4 className="font-cinzel text-sm font-bold text-white">{p.name}</h4>
                    <p className="text-xs text-gray-400">{p.setSize} • {p.dimensions}</p>
                  </div>
                  <span className="font-bold text-[#C8A96A] text-sm">
                    Rs. {p.price.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating Sticky WhatsApp Button */}
      <a
        href={createGeneralWhatsAppUrl('Hi FRAME HUB! I need assistance with custom photo frames.')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#1faa51] text-white p-3.5 sm:p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center gap-2 border-2 border-white/20 group"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider pr-1">
          WhatsApp Us
        </span>
      </a>
    </div>
  );
}
