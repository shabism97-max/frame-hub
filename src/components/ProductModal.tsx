import React, { useState } from 'react';
import { Product } from '../types';
import { X, Star, Check, MessageCircle, ShoppingBag, Plus, Minus, ShieldCheck, Sparkles, ArrowLeft } from 'lucide-react';
import { createProductWhatsAppUrl } from '../utils/whatsapp';
import { ImageWithSkeleton } from './ImageWithSkeleton';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, notes?: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [customNote, setCustomNote] = useState('');

  const isPhotoClipLights = product.id === 'photo-clip-lights-12' || product.categorySlug === 'photo-clip-lights' || product.name.toLowerCase().includes('photo clip');
  const isTraditionalGlassFrame =
    product.id === 'family-frames-collection' ||
    product.id === 'wedding-frames-collection' ||
    product.categorySlug === 'family-frames' ||
    product.categorySlug === 'wedding-frames' ||
    product.name.toLowerCase().includes('family frame') ||
    product.name.toLowerCase().includes('wedding frame');
  const allImages = Array.from(new Set([product.image, ...(product.galleryImages || [])])).filter(Boolean);

  const handleAdd = () => {
    onAddToCart(product, quantity, customNote);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#181818] text-white border border-[#C8A96A]/40 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative my-8">
        {/* Top Header Navigation Bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-800 bg-[#111111]">
          <button
            onClick={onClose}
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#181818] text-[#C8A96A] hover:text-white border border-[#C8A96A]/30 hover:border-[#C8A96A] text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
            aria-label="Back to store"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#C8A96A]" />
            <span>← Back to Store</span>
          </button>
          <button
            onClick={onClose}
            className="bg-black/70 hover:bg-black text-gray-400 hover:text-white p-2 rounded-full transition-colors"
            aria-label="Close product view"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column Image Showcase */}
          <div className="p-6 bg-black flex flex-col justify-between space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-gray-800 h-72 sm:h-80">
              <ImageWithSkeleton
                src={selectedImage}
                alt={product.name}
                containerClassName="w-full h-full"
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 z-10 bg-[#C8A96A] text-[#111111] text-[10px] font-bold uppercase px-2.5 py-1 rounded shadow">
                  {product.badge}
                </span>
              )}
              {isPhotoClipLights && (
                <span className="absolute bottom-3 right-3 z-10 bg-black/75 text-gray-300 text-[10px] font-semibold px-2.5 py-1 rounded backdrop-blur-xs border border-white/10 shadow">
                  Sample Image
                </span>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === img ? 'border-[#C8A96A]' : 'border-gray-800 opacity-60'
                    }`}
                  >
                    <ImageWithSkeleton src={img} alt="" containerClassName="w-full h-full" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column Product Specs */}
          <div className="p-6 sm:p-8 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-[#C8A96A]">
                <span className="bg-[#111111] text-[#C8A96A] px-2 py-0.5 text-[10px] uppercase tracking-widest font-semibold border border-gray-800">
                  {product.setSize}
                </span>
                <span>•</span>
                <span className="text-gray-300">{product.dimensions}</span>
              </div>

              <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white leading-snug">
                {product.name}
              </h2>

              <div>
                <span className="text-2xl font-bold text-[#C8A96A]">
                  Rs. {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-gray-500 line-through ml-2">
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <p className="text-xs text-gray-300 leading-relaxed">
                {product.categorySlug === 'mdf-photo-tiles' || product.category === 'MDF Photo Tiles' || product.name.includes('MDF')
                  ? 'Transform your favorite memories into premium frameless MDF Photo Tiles. Printed in vibrant HD quality on durable 5mm MDF with a smooth matte finish, perfect for decorating your living room, bedroom or office.'
                  : product.description}
              </p>

              {/* Specs List */}
              <div className="space-y-1.5 pt-2 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C8A96A]" />
                  <span><strong>Dimensions:</strong> {product.dimensions}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C8A96A]" />
                  <span><strong>Set Configuration:</strong> {product.setSize}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C8A96A]" />
                  {isPhotoClipLights ? (
                    <span><strong>Material:</strong> Lightweight Photo Cards (No MDF Board) + Fairy String</span>
                  ) : isTraditionalGlassFrame ? (
                    <span><strong>Frame Build:</strong> Solid Wooden Border &amp; Real Front Glass</span>
                  ) : (
                    <span><strong>Backing:</strong> Premium 5mm High-Density MDF Board</span>
                  )}
                </div>
                {isTraditionalGlassFrame && (
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#C8A96A]" />
                    <span><strong>Display Option:</strong> Dual Wall Hanging Hooks &amp; Tabletop Stand</span>
                  </div>
                )}
              </div>

              {/* Custom Note input */}
              <div className="pt-2">
                <label className="text-[11px] font-bold text-gray-400 block mb-1">
                  Custom Names or Special Request (Optional):
                </label>
                <input
                  type="text"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="Add a name, date, quote or any special instructions (Optional)"
                  className="w-full bg-black/60 border border-gray-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#C8A96A]"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 font-semibold">Quantity:</span>
                <div className="flex items-center border border-gray-700 rounded bg-black">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-gray-400 hover:text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-gray-400 hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={createProductWhatsAppUrl(product, quantity, undefined, customNote)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#1faa51] text-white font-bold text-xs py-3 rounded-lg shadow"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Order on WA</span>
                </a>

                <button
                  onClick={handleAdd}
                  className="flex items-center justify-center gap-1.5 bg-[#C8A96A] hover:bg-[#A28243] text-[#111111] font-bold text-xs py-3 rounded-lg shadow"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
