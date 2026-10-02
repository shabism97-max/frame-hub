import React, { useState } from 'react';
import {
  MessageCircle,
  Upload,
  Sparkles,
  Check,
  Plus,
  Minus,
  X,
  ShieldCheck,
  Truck,
  Image as ImageIcon,
  User,
  Phone,
  MapPin,
  FileText
} from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data/storeData';
import { BackButton } from './BackButton';
import imgNurseryTiles from '../assets/images/baby/baby-001.jpg';
import imgFamilyMdfTiles from '../assets/images/family/family-001.jpg';
import imgFamilyGalleryWall from '../assets/images/family/family-002.jpg';
import imgWeddingFramesWall from '../assets/images/wedding/wedding-001.jpg';
import imgIslamicGoldFrames from '../assets/images/islamic/islamic-002.jpg';
import imgOfficeMotivational from '../assets/images/motivational/motivational-002.jpg';
import imgPhotoClipLights from '../assets/images/lights/lights-001.jpg';

import imgMdfTilesLivingroom from '../assets/images/mdf/mdf-001.jpg';
import imgMdfTilesNursery from '../assets/images/baby/baby-003.jpg';
import imgMdfTilesWedding from '../assets/images/wedding/wedding-002.jpg';
import imgMdfTilesDecor from '../assets/images/family/family-003.jpg';

import imgIslamicWallArtSet from '../assets/images/islamic/islamic-001.jpg';
import imgMotivationalWallArtSet from '../assets/images/motivational/motivational-001.jpg';

interface CustomProductOption {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  image: string;
  isFramed: boolean;
  defaultSize: string;
}

const PRODUCTS: CustomProductOption[] = [
  {
    id: 'mdf-6x8-set6',
    name: 'MDF Photo Tiles (6×8 Inches – Set of 6)',
    description: '6 Stick & Re-stick frameless 5mm MDF photo tiles. Zero wall damage.',
    basePrice: 999,
    image: imgMdfTilesLivingroom,
    isFramed: false,
    defaultSize: '6×8 Set of 6',
  },
  {
    id: 'mdf-8x12-set4',
    name: 'MDF Photo Tiles (8×12 Inches – Set of 4)',
    description: '4 Large HD Matte frameless 5mm MDF tiles with re-stickable mounting tabs.',
    basePrice: 999,
    image: imgMdfTilesDecor,
    isFramed: false,
    defaultSize: '8×12 Set of 4',
  },
  {
    id: 'family-frames',
    name: 'Family Photo Frames',
    description: 'Classic wooden memory frames tailored for living room family walls.',
    basePrice: 349,
    image: imgFamilyGalleryWall,
    isFramed: true,
    defaultSize: '4×6',
  },
  {
    id: 'wedding-frames',
    name: 'Wedding Photo Frames',
    description: 'Elegant handcrafted wooden gallery frames for wedding memories & milestones.',
    basePrice: 349,
    image: imgWeddingFramesWall,
    isFramed: true,
    defaultSize: '4×6',
  },
  {
    id: 'islamic-frames',
    name: 'Islamic Wall Art Set (5mm MDF)',
    description: 'HD Calligraphic verse sets on 5mm frameless MDF photo tiles.',
    basePrice: 999,
    image: imgIslamicWallArtSet,
    isFramed: false,
    defaultSize: '8×12 Set of 4',
  },
  {
    id: 'motivational-frames',
    name: 'Motivational Wall Art Set (5mm MDF)',
    description: 'Inspiring typographic quote sets on 5mm frameless MDF photo tiles.',
    basePrice: 999,
    image: imgMotivationalWallArtSet,
    isFramed: false,
    defaultSize: '8×12 Set of 4',
  },
  {
    id: 'string-lights',
    name: 'Photo Clip String Lights',
    description: 'Cozy warm LED fairy lights with 12 custom printed photos included.',
    basePrice: 699,
    image: imgPhotoClipLights,
    isFramed: false,
    defaultSize: '12 Printed Photos + Lights',
  },
];

const FRAMED_SIZES = [
  { name: '4×6', priceAdder: 0 },
  { name: '5×7', priceAdder: 150 },
  { name: '6×8', priceAdder: 250 },
  { name: '8×12', priceAdder: 450 },
];

const FRAME_COLORS = [
  { id: 'Black', name: 'Black', bgClass: 'bg-black border-gray-600', ringColor: '#000000' },
  { id: 'White', name: 'White', bgClass: 'bg-white border-gray-300', ringColor: '#FFFFFF' },
  { id: 'Walnut', name: 'Walnut', bgClass: 'bg-[#5C4033] border-[#705040]', ringColor: '#5C4033' },
  { id: 'Golden', name: 'Golden', bgClass: 'bg-[#C8A96A] border-[#E2CD9F]', ringColor: '#C8A96A' },
];

const INSTRUCTION_EXAMPLES = [
  'Birthday Theme',
  'Wedding Date',
  'Collage Layout',
  'Black Background',
  'Gift Wrapping',
];

interface InteractiveCustomBuilderProps {
  onBack?: () => void;
}

export const InteractiveCustomBuilder: React.FC<InteractiveCustomBuilderProps> = ({ onBack }) => {
  // Configurator state
  const [selectedProduct, setSelectedProduct] = useState<CustomProductOption>(PRODUCTS[0]);
  const [selectedSize, setSelectedSize] = useState<string>(PRODUCTS[0].defaultSize);
  const [quantity, setQuantity] = useState<number>(1);
  const [frameColor, setFrameColor] = useState<string>('Black');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  
  // Customer Details
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerCity, setCustomerCity] = useState<string>('');

  // Uploaded Photos
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  // When product changes, reset default size
  const handleProductSelect = (product: CustomProductOption) => {
    setSelectedProduct(product);
    setSelectedSize(product.defaultSize);
  };

  // Multiple File Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileList: File[] = Array.from(files);
      const newPhotoUrls: string[] = [];
      fileList.forEach((file: File) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            newPhotoUrls.push(event.target.result as string);
            if (newPhotoUrls.length === fileList.length) {
              setUploadedPhotos((prev) => [...prev, ...newPhotoUrls]);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removePhoto = (indexToRemove: number) => {
    setUploadedPhotos((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    if (activePhotoIndex >= indexToRemove && activePhotoIndex > 0) {
      setActivePhotoIndex(activePhotoIndex - 1);
    }
  };

  // Price Calculation
  let sizePriceAdder = 0;
  if (selectedProduct.isFramed) {
    const foundSize = FRAMED_SIZES.find((s) => s.name === selectedSize);
    if (foundSize) sizePriceAdder = foundSize.priceAdder;
  }
  const unitPrice = selectedProduct.basePrice + sizePriceAdder;
  const grandTotal = unitPrice * quantity;

  // Append instruction tag
  const addInstructionTag = (tag: string) => {
    if (!specialInstructions.includes(tag)) {
      setSpecialInstructions((prev) => (prev ? `${prev}, ${tag}` : tag));
    }
  };

  // Generate WhatsApp URL
  const handleWhatsAppOrder = () => {
    const frameColorText = selectedProduct.isFramed ? selectedProduct.isFramed && frameColor ? frameColor : 'Black' : 'Frameless MDF Photo Tile';
    const instructionsText = specialInstructions.trim() || 'None';

    const message = `Hi FRAME HUB! I want to place a custom order:

*Customer Details:*
Name: ${customerName || 'Not specified'}
Phone: ${customerPhone || 'Not specified'}
City: ${customerCity || 'Not specified'}

*Order Summary:*
Product: ${selectedProduct.name}
Size: ${selectedSize}
Quantity: ${quantity}
${selectedProduct.isFramed ? `Frame Color: ${frameColorText}\n` : ''}Special Instructions: ${instructionsText}

*Total Price:* Rs. ${grandTotal.toLocaleString()}

I will share my photo attachment(s) here. Please confirm my custom order!`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Determine active preview photo
  const currentPreviewPhoto =
    uploadedPhotos.length > 0 ? uploadedPhotos[activePhotoIndex] || uploadedPhotos[0] : selectedProduct.image;

  return (
    <section id="custom-builder" className="py-16 sm:py-24 bg-[#111111] text-white font-sans min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <BackButton onBack={onBack} isLightBg={false} />
        
        {/* SECTION TITLE & SUBTITLE */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-[#C8A96A] text-xs font-extrabold uppercase tracking-[0.2em] bg-[#1A1A1A] px-4 py-1.5 rounded-full border border-[#C8A96A]/30">
            <Sparkles className="w-4 h-4 text-[#C8A96A]" />
            <span>Custom Wall Décor Configurator</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-white">
            Build Your <span className="font-bold italic text-[#E2CD9F]">Custom Order</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
            Create your personalized wall décor in just a few simple steps. Select your product, upload photos, specify dimensions &amp; order directly on WhatsApp.
          </p>
          <div className="w-16 h-0.5 bg-[#C8A96A] mx-auto pt-1" />
        </div>

        {/* MAIN LAYOUT: Form Steps (7 Cols) + Live Room Stage & Summary (5 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: STEPS 1 TO 7 */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* STEP 1 – SELECT PRODUCT */}
            <div className="bg-[#181818] p-6 sm:p-8 rounded-3xl border border-gray-800 shadow-2xl space-y-5">
              <div className="flex items-center gap-3 border-b border-gray-800 pb-4">
                <span className="w-7 h-7 rounded-full bg-[#C8A96A] text-[#111111] font-bold text-xs flex items-center justify-center shrink-0">
                  1
                </span>
                <div>
                  <h2 className="font-serif text-lg font-bold text-white">Select Product</h2>
                  <p className="text-xs text-gray-400">Choose your preferred wall art category</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PRODUCTS.map((prod) => {
                  const isSelected = selectedProduct.id === prod.id;
                  return (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => handleProductSelect(prod)}
                      className={`p-4 rounded-2xl border text-left transition-all relative flex items-start gap-3.5 group hover:-translate-y-0.5 ${
                        isSelected
                          ? 'bg-[#1F1B14] border-[#C8A96A] shadow-xl ring-1 ring-[#C8A96A]/50'
                          : 'bg-[#111111] border-gray-800 hover:border-gray-700'
                      }`}
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-gray-800"
                      />
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <h3 className="font-serif text-xs sm:text-sm font-bold text-white group-hover:text-[#E2CD9F] truncate">
                            {prod.name}
                          </h3>
                        </div>
                        <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
                          {prod.description}
                        </p>
                        <div className="text-xs font-bold text-[#C8A96A] pt-1">
                          Rs. {prod.basePrice.toLocaleString()}
                        </div>
                      </div>

                      {isSelected && (
                        <div className="absolute top-3 right-3 bg-[#C8A96A] text-[#111111] rounded-full p-1 shadow">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 2 – UPLOAD PHOTOS */}
            <div className="bg-[#181818] p-6 sm:p-8 rounded-3xl border border-gray-800 shadow-2xl space-y-5">
              <div className="flex items-center gap-3 border-b border-gray-800 pb-4">
                <span className="w-7 h-7 rounded-full bg-[#C8A96A] text-[#111111] font-bold text-xs flex items-center justify-center shrink-0">
                  2
                </span>
                <div>
                  <h2 className="font-serif text-lg font-bold text-white">Upload Photos</h2>
                  <p className="text-xs text-gray-400">Upload your memories for HD printing</p>
                </div>
              </div>

              {/* Large Drag & Drop Upload Area */}
              <label className="border-2 border-dashed border-gray-700 hover:border-[#C8A96A] bg-[#111111] rounded-2xl p-6 sm:p-8 text-center flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors group">
                <div className="w-12 h-12 rounded-2xl bg-[#C8A96A]/10 border border-[#C8A96A]/30 text-[#C8A96A] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">
                    Click or Drag &amp; Drop Photos Here
                  </span>
                  <span className="text-[11px] text-gray-400 block mt-0.5">
                    Supported formats: <strong className="text-gray-300">JPG, PNG, HEIC</strong> (Max 10MB per image)
                  </span>
                </div>
                <span className="mt-1 inline-flex items-center gap-2 bg-[#C8A96A] hover:bg-[#E2CD9F] text-[#111111] font-bold text-xs py-2.5 px-6 rounded-full shadow-lg transition-transform hover:scale-105">
                  <ImageIcon className="w-4 h-4" />
                  <span>Choose Photo Files</span>
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/heic,image/webp"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {/* Uploaded Photos Grid */}
              {uploadedPhotos.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-gray-300 block">
                    Uploaded Photos ({uploadedPhotos.length}):
                  </span>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {uploadedPhotos.map((photo, idx) => (
                      <div
                        key={idx}
                        onClick={() => setActivePhotoIndex(idx)}
                        className={`relative rounded-xl overflow-hidden h-20 cursor-pointer border-2 transition-all ${
                          activePhotoIndex === idx
                            ? 'border-[#C8A96A] ring-2 ring-[#C8A96A]/50 scale-105'
                            : 'border-gray-800 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={photo} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removePhoto(idx);
                          }}
                          className="absolute top-1 right-1 bg-black/80 hover:bg-red-600 text-white p-1 rounded-full transition-colors"
                          title="Remove photo"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* STEP 3 – SELECT SIZE */}
            <div className="bg-[#181818] p-6 sm:p-8 rounded-3xl border border-gray-800 shadow-2xl space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-800 pb-4">
                <span className="w-7 h-7 rounded-full bg-[#C8A96A] text-[#111111] font-bold text-xs flex items-center justify-center shrink-0">
                  3
                </span>
                <div>
                  <h2 className="font-serif text-lg font-bold text-white">Select Size</h2>
                  <p className="text-xs text-gray-400">Dimensions tailored to your selected product</p>
                </div>
              </div>

              {!selectedProduct.isFramed ? (
                /* MDF Photo Tiles Fixed Sizes */
                <div className="bg-[#111111] border border-[#C8A96A]/40 p-4 rounded-2xl flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#C8A96A] block text-sm">{selectedProduct.defaultSize}</span>
                    <span className="text-gray-400 text-[11px]">Frameless MDF Photo Tile Set</span>
                  </div>
                  <span className="bg-[#C8A96A]/10 text-[#C8A96A] font-bold px-3 py-1 rounded-full text-[11px] border border-[#C8A96A]/30">
                    Fixed Set Size
                  </span>
                </div>
              ) : (
                /* Framed Product Size Options: 4x6, 5x7, 6x8, 8x12 */
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {FRAMED_SIZES.map((sz) => {
                    const isSelected = selectedSize === sz.name;
                    return (
                      <button
                        key={sz.name}
                        type="button"
                        onClick={() => setSelectedSize(sz.name)}
                        className={`p-3.5 rounded-2xl border text-center transition-all ${
                          isSelected
                            ? 'bg-[#C8A96A] text-[#111111] border-[#C8A96A] font-bold shadow-lg'
                            : 'bg-[#111111] text-gray-300 border-gray-800 hover:border-gray-700'
                        }`}
                      >
                        <div className="text-xs font-bold">{sz.name} Inches</div>
                        <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-[#111111]/80' : 'text-gray-400'}`}>
                          {sz.priceAdder > 0 ? `+Rs. ${sz.priceAdder}` : 'Base Size'}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* STEP 4 – QUANTITY */}
            <div className="bg-[#181818] p-6 sm:p-8 rounded-3xl border border-gray-800 shadow-2xl space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-800 pb-4">
                <span className="w-7 h-7 rounded-full bg-[#C8A96A] text-[#111111] font-bold text-xs flex items-center justify-center shrink-0">
                  4
                </span>
                <div>
                  <h2 className="font-serif text-lg font-bold text-white">Quantity</h2>
                  <p className="text-xs text-gray-400">Select how many sets/frames you need</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-[#111111] border border-gray-800 p-3 rounded-2xl w-fit">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-xl bg-[#181818] hover:bg-gray-800 text-white flex items-center justify-center transition-colors disabled:opacity-40"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-serif font-bold text-lg text-white w-8 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-xl bg-[#181818] hover:bg-gray-800 text-white flex items-center justify-center transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* STEP 5 – FRAME COLOR (ONLY DISPLAYED FOR FRAMED PRODUCTS!) */}
            {selectedProduct.isFramed && (
              <div className="bg-[#181818] p-6 sm:p-8 rounded-3xl border border-gray-800 shadow-2xl space-y-4">
                <div className="flex items-center gap-3 border-b border-gray-800 pb-4">
                  <span className="w-7 h-7 rounded-full bg-[#C8A96A] text-[#111111] font-bold text-xs flex items-center justify-center shrink-0">
                    5
                  </span>
                  <div>
                    <h2 className="font-serif text-lg font-bold text-white">Frame Color</h2>
                    <p className="text-xs text-gray-400">Choose border finishing color</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {FRAME_COLORS.map((fc) => {
                    const isSelected = frameColor === fc.id;
                    return (
                      <button
                        key={fc.id}
                        type="button"
                        onClick={() => setFrameColor(fc.id)}
                        className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all ${
                          isSelected
                            ? 'bg-[#1F1B14] border-[#C8A96A] ring-1 ring-[#C8A96A]'
                            : 'bg-[#111111] border-gray-800 hover:border-gray-700'
                        }`}
                      >
                        <span className={`w-6 h-6 rounded-full border shadow-md ${fc.bgClass}`} />
                        <span className="text-xs font-bold text-white">{fc.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-[#C8A96A] ml-auto" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 6 – SPECIAL INSTRUCTIONS */}
            <div className="bg-[#181818] p-6 sm:p-8 rounded-3xl border border-gray-800 shadow-2xl space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-800 pb-4">
                <span className="w-7 h-7 rounded-full bg-[#C8A96A] text-[#111111] font-bold text-xs flex items-center justify-center shrink-0">
                  {selectedProduct.isFramed ? '6' : '5'}
                </span>
                <div>
                  <h2 className="font-serif text-lg font-bold text-white">Special Instructions</h2>
                  <p className="text-xs text-gray-400">Custom family names, wedding dates, or theme requests</p>
                </div>
              </div>

              {/* Helper Tag Chips */}
              <div className="flex flex-wrap gap-2 text-xs">
                {INSTRUCTION_EXAMPLES.map((example) => (
                  <button
                    key={example}
                    type="button"
                    onClick={() => addInstructionTag(example)}
                    className="px-3 py-1.5 rounded-full bg-[#111111] border border-gray-800 text-gray-300 hover:border-[#C8A96A] hover:text-[#C8A96A] transition-colors"
                  >
                    + {example}
                  </button>
                ))}
              </div>

              <textarea
                rows={3}
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="e.g. Birthday Theme, Add family name 'The Khan Family', Wedding Date 12-12-2025..."
                className="w-full bg-[#111111] border border-gray-800 rounded-2xl p-4 text-xs text-white focus:border-[#C8A96A] focus:outline-none"
              />
            </div>

            {/* STEP 7 – CUSTOMER INFORMATION */}
            <div className="bg-[#181818] p-6 sm:p-8 rounded-3xl border border-gray-800 shadow-2xl space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-800 pb-4">
                <span className="w-7 h-7 rounded-full bg-[#C8A96A] text-[#111111] font-bold text-xs flex items-center justify-center shrink-0">
                  {selectedProduct.isFramed ? '7' : '6'}
                </span>
                <div>
                  <h2 className="font-serif text-lg font-bold text-white">Customer Information</h2>
                  <p className="text-xs text-gray-400">Required for WhatsApp delivery confirmation</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Ali Ahmed"
                    className="w-full bg-[#111111] border border-gray-800 rounded-xl p-3 text-xs text-white focus:border-[#C8A96A] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider block">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. 0300 1234567"
                    className="w-full bg-[#111111] border border-gray-800 rounded-xl p-3 text-xs text-white focus:border-[#C8A96A] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider block">
                    City
                  </label>
                  <input
                    type="text"
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    placeholder="Karachi, Lahore..."
                    className="w-full bg-[#111111] border border-gray-800 rounded-xl p-3 text-xs text-white focus:border-[#C8A96A] focus:outline-none"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: SCANDINAVIAN REALISTIC WALL MOCKUP & ORDER SUMMARY (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 sticky top-24">
            
            {/* SCANDINAVIAN LIVING ROOM WALL STAGE */}
            <div className="bg-[#181818] p-6 rounded-3xl border border-gray-800 shadow-2xl space-y-4 overflow-hidden relative">
              <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                <span className="font-serif text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C8A96A]" />
                  <span>Scandinavian Wall Preview</span>
                </span>
                <span className="text-[10px] bg-[#C8A96A]/20 text-[#C8A96A] border border-[#C8A96A]/40 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {!selectedProduct.isFramed ? 'Frameless MDF Tile' : `${frameColor} Frame`}
                </span>
              </div>

              {/* LIVING ROOM WALL CANVAS MOCKUP */}
              <div className="relative min-h-[300px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#1C1C1E] via-[#2A2A2E] to-[#18181A] flex flex-col justify-between p-6 shadow-inner border border-gray-800">
                {/* Ceiling Spotlight Ambient Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#C8A96A]/10 blur-3xl pointer-events-none rounded-full" />

                {/* Wall Display Area */}
                <div className="relative z-10 my-auto flex flex-col items-center justify-center pt-2 pb-4">
                  
                  {/* WALL TILES / FRAME DISPLAY */}
                  {!selectedProduct.isFramed ? (
                    /* MDF PHOTO TILES DISPLAY (FRAMELESS, NO BORDER, NO GLASS - Sleek 8mm MDF with shadow) */
                    <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                      {(uploadedPhotos.length > 0 ? uploadedPhotos.slice(0, 4) : [selectedProduct.image]).map(
                        (imgSrc, idx) => (
                          <div
                            key={idx}
                            className="relative overflow-hidden bg-[#111111] rounded-md transition-all duration-300 hover:scale-105"
                            style={{
                              boxShadow: '0 12px 24px -6px rgba(0, 0, 0, 0.8), 0 4px 6px -2px rgba(0, 0, 0, 0.5)',
                            }}
                          >
                            <img
                              src={imgSrc}
                              alt="MDF Frameless Tile"
                              className="w-28 h-28 object-cover"
                            />
                            {/* 8mm MDF Edge Depth Effect */}
                            <div className="absolute inset-0 border border-white/10 rounded-md pointer-events-none" />
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    /* FRAMED PRODUCT DISPLAY (With Selected Frame Color Border) */
                    <div
                      className="relative transition-all duration-300 max-w-xs mx-auto p-2 rounded-lg"
                      style={{
                        backgroundColor:
                          frameColor === 'White'
                            ? '#FFFFFF'
                            : frameColor === 'Walnut'
                            ? '#5C4033'
                            : frameColor === 'Golden'
                            ? '#C8A96A'
                            : '#000000',
                        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.9)',
                      }}
                    >
                      <div className="overflow-hidden bg-black rounded">
                        <img
                          src={currentPreviewPhoto}
                          alt="Framed Photo Preview"
                          className="w-56 h-56 object-cover"
                        />
                      </div>
                    </div>
                  )}

                  {/* Floor Shadow */}
                  <div className="w-48 h-3 bg-black/80 blur-lg rounded-full mt-4" />
                </div>

                {/* Minimal Sofa Silhouette Ambient Bottom Bar */}
                <div className="relative z-10 bg-[#111111]/80 backdrop-blur-md p-2.5 rounded-xl border border-gray-800 text-[11px] text-gray-300 text-center">
                  <span className="text-[#E2CD9F] font-bold">{selectedProduct.name}</span>
                  <span className="text-gray-400 block text-[10px]">
                    {!selectedProduct.isFramed ? '5mm Premium Frameless MDF Board' : `${frameColor} Wooden Border`}
                  </span>
                </div>
              </div>
            </div>

            {/* ORDER SUMMARY CARD */}
            <div className="bg-[#181818] p-6 rounded-3xl border border-gray-800 shadow-2xl space-y-4">
              <h3 className="font-serif text-base font-bold text-white border-b border-gray-800 pb-3 flex items-center justify-between">
                <span>Order Summary</span>
                <span className="text-xs text-[#C8A96A] font-sans font-bold">FRAME HUB</span>
              </h3>

              <div className="space-y-2.5 text-xs text-gray-300 font-sans">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Selected Product:</span>
                  <span className="font-bold text-white text-right max-w-[200px] truncate">
                    {selectedProduct.name}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Selected Size:</span>
                  <span className="font-bold text-white">{selectedSize}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Quantity:</span>
                  <span className="font-bold text-white">{quantity}</span>
                </div>

                {selectedProduct.isFramed && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Frame Color:</span>
                    <span className="font-bold text-[#C8A96A]">{frameColor}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Delivery:</span>
                  <span className="font-bold text-[#25D366]">Nationwide COD</span>
                </div>

                <div className="pt-3 border-t border-gray-800 flex justify-between items-baseline">
                  <span className="font-bold text-white text-sm">Grand Total:</span>
                  <span className="font-serif text-2xl font-bold text-[#C8A96A]">
                    Rs. {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* LARGE WHATSAPP ORDER BUTTON */}
              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full bg-[#25D366] hover:bg-[#1faa51] text-white font-bold text-xs uppercase tracking-[0.15em] py-4 rounded-2xl shadow-2xl flex items-center justify-center gap-2.5 transition-transform hover:scale-[1.02] border border-[#25D366]"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>ORDER ON WHATSAPP</span>
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] text-gray-400 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C8A96A]" /> Free Digital Proof
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#C8A96A]" /> 3-5 Days Delivery
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
