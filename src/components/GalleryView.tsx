import React, { useState, useEffect, useRef } from 'react';
import { DESIGN_GALLERY_ITEMS, MOTIVATIONAL_SIZES, ISLAMIC_SIZES, FAMILY_SIZES, BABY_SIZES, WEDDING_SIZES, LIGHTS_SIZES } from '../data/designGalleryData';
import { DesignGalleryItem, SizeOption } from '../types';
import { 
  Sparkles, 
  MessageCircle, 
  Eye, 
  X, 
  Check, 
  Copy, 
  Search, 
  ArrowLeft, 
  CheckCircle2, 
  Upload, 
  FileImage, 
  ShieldCheck,
  Plus,
  Trash2,
  RotateCcw
} from 'lucide-react';
import { createDesignCodeWhatsAppUrl, createGeneralWhatsAppUrl } from '../utils/whatsapp';
import { ImageWithSkeleton } from './ImageWithSkeleton';
import { BackButton } from './BackButton';
import { 
  getStoredGalleryItems, 
  getStoredGalleryItemsAsync, 
  saveOriginalGalleryItem, 
  readOriginalFileAsDataUrl,
  deleteGalleryItem,
  clearAllGalleryItems
} from '../utils/galleryStorage';

interface GalleryViewProps {
  onBack?: () => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ onBack }) => {
  const [items, setItems] = useState<DesignGalleryItem[]>(() => getStoredGalleryItems());
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lightboxItem, setLightboxItem] = useState<DesignGalleryItem | null>(null);
  const [selectedSize, setSelectedSize] = useState<SizeOption | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Admin original file upload state
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreviewUrl, setUploadPreviewUrl] = useState<string | null>(null);
  const [uploadDesignCode, setUploadDesignCode] = useState<string>('FH-ISL-001');
  const [uploadTitle, setUploadTitle] = useState<string>('');
  const [uploadCategory, setUploadCategory] = useState<'Motivational' | 'Family' | 'Baby' | 'Wedding' | 'Islamic' | 'Photo Clip Lights'>('Islamic');
  const [uploadDescription, setUploadDescription] = useState<string>('8×12 inch high-density MDF wall-art frameless tile with UV matte protective finish.');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgressMsg, setUploadProgressMsg] = useState<string>('');
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load items from durable storage on mount
  useEffect(() => {
    getStoredGalleryItemsAsync().then((loaded) => {
      setItems(loaded);
    });
  }, []);

  // Prevent background scroll only when upload modal is open
  useEffect(() => {
    if (showUploadModal) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [showUploadModal]);

  // Six specified categories + All
  const CATEGORIES = [
    { label: 'All Designs', slug: 'All' },
    { label: 'Motivational', slug: 'motivational' },
    { label: 'Family', slug: 'family' },
    { label: 'Baby', slug: 'baby' },
    { label: 'Wedding', slug: 'wedding' },
    { label: 'Islamic', slug: 'islamic' },
    { label: 'Photo Clip Lights', slug: 'lights' },
  ];

  const handleOpenLightbox = (item: DesignGalleryItem) => {
    setLightboxItem(item);
    if (item.sizeOptions && item.sizeOptions.length > 0) {
      setSelectedSize(item.sizeOptions[0]);
    } else {
      setSelectedSize(null);
    }
    setCopiedCode(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Handle local original file selection (Byte-for-byte unchanged)
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles: File[] = e.target.files ? Array.from(e.target.files) : [];
    if (selectedFiles.length === 0) return;

    if (selectedFiles.length > 1) {
      setUploadFiles(selectedFiles);
      setUploadFile(selectedFiles[0]);
      try {
        const preview = await readOriginalFileAsDataUrl(selectedFiles[0]);
        setUploadPreviewUrl(preview);
      } catch (err) {
        console.error('Error previewing first file:', err);
      }
      if (selectedFiles.some((f) => f.name.toLowerCase().includes('isl'))) {
        setUploadCategory('Islamic');
      }
    } else {
      const file = selectedFiles[0];
      setUploadFiles([file]);
      setUploadFile(file);
      try {
        // Pure data URL reading without canvas, filters, or AI
        const dataUrl = await readOriginalFileAsDataUrl(file);
        setUploadPreviewUrl(dataUrl);

        // Auto-populate Design Code if filename has pattern (e.g. FT-ISL-001 or FH-ISL-001)
        const codeMatch = file.name.match(/(FT|FH)-[A-Z]+-\d+/i);
        if (codeMatch) {
          setUploadDesignCode(codeMatch[0].toUpperCase());
        } else {
          setUploadDesignCode(file.name.replace(/\.[^/.]+$/, '').toUpperCase());
        }

        if (file.name.toLowerCase().includes('isl')) {
          setUploadCategory('Islamic');
        }

        // Auto-populate Title if empty based on file name
        if (!uploadTitle) {
          const cleanName = file.name
            .replace(/\.[^/.]+$/, '')
            .replace(/[-_]/g, ' ')
            .replace(/^(FT|FH)\s+[A-Z]+\s+\d+\s*/i, '');
          if (cleanName.trim()) {
            setUploadTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
          }
        }
      } catch (err) {
        console.error('Error reading original file:', err);
      }
    }
  };

  // Submit original files directly to gallery storage
  const handleSaveOriginalUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadFiles.length === 0 && (!uploadFile || !uploadPreviewUrl)) return;

    setIsUploading(true);
    setUploadProgressMsg('');
    try {
      if (uploadFiles.length > 1) {
        // Bulk upload: process all files preserving exact bytes
        let count = 0;
        for (const file of uploadFiles) {
          count++;
          setUploadProgressMsg(`Saving ${count} of ${uploadFiles.length}: ${file.name}...`);
          const dataUrl = await readOriginalFileAsDataUrl(file);
          const codeMatch = file.name.match(/(FT|FH)-[A-Z]+-\d+/i);
          const fileCode = codeMatch
            ? codeMatch[0].toUpperCase()
            : file.name.replace(/\.[^/.]+$/, '').toUpperCase();

          const cleanTitle = file.name
            .replace(/\.[^/.]+$/, '')
            .replace(/[-_]/g, ' ')
            .replace(/^(FT|FH)\s+[A-Z]+\s+\d+\s*/i, '');
          const title = cleanTitle.trim()
            ? cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1)
            : fileCode;

          const isIslamic = file.name.toLowerCase().includes('isl') || uploadCategory === 'Islamic';
          const cat = isIslamic ? 'Islamic' : uploadCategory;

          const newItem: DesignGalleryItem = {
            id: `gallery-custom-${Date.now()}-${count}`,
            code: fileCode,
            designCode: fileCode,
            originalFilename: file.name,
            title: title,
            category: cat,
            categorySlug: (cat === 'Photo Clip Lights' ? 'lights' : cat.toLowerCase()) as any,
            image: dataUrl,
            description: isIslamic
              ? 'Exquisite 8×12 inch frameless 5mm MDF spiritual wall art panel.'
              : uploadDescription.trim() || '8×12 inch wall-art MDF frame design.',
            badge: 'Official',
            sizeOptions: isIslamic ? ISLAMIC_SIZES : MOTIVATIONAL_SIZES,
          };
          await saveOriginalGalleryItem(newItem);
        }
        const updated = await getStoredGalleryItemsAsync();
        setItems(updated);
        setUploadSuccessMsg(`Successfully uploaded and published all ${uploadFiles.length} original artworks!`);
        setTimeout(() => {
          setUploadSuccessMsg('');
          setUploadProgressMsg('');
          setShowUploadModal(false);
          setUploadFiles([]);
          setUploadFile(null);
          setUploadPreviewUrl(null);
        }, 1800);
      } else {
        const fileToSave = uploadFiles[0] || uploadFile;
        const previewToSave = uploadPreviewUrl || (fileToSave ? await readOriginalFileAsDataUrl(fileToSave) : null);
        if (!fileToSave || !previewToSave) return;

        const isIslamic = uploadCategory === 'Islamic' || fileToSave.name.toLowerCase().includes('isl');
        const isBaby = uploadCategory === 'Baby' || fileToSave.name.toLowerCase().includes('bby') || fileToSave.name.toLowerCase().includes('baby');
        const isWedding = uploadCategory === 'Wedding' || fileToSave.name.toLowerCase().includes('wed');
        const isLights = uploadCategory === 'Photo Clip Lights' || fileToSave.name.toLowerCase().includes('light') || fileToSave.name.toLowerCase().includes('clip');
        const isFamily = uploadCategory === 'Family' || fileToSave.name.toLowerCase().includes('fam') || fileToSave.name.toLowerCase().includes('suggestion');
        const newItem: DesignGalleryItem = {
          id: `gallery-custom-${Date.now()}`,
          code: uploadDesignCode.trim().toUpperCase(),
          designCode: uploadDesignCode.trim().toUpperCase(),
          originalFilename: fileToSave.name,
          title: uploadTitle.trim() || uploadDesignCode.trim().toUpperCase(),
          category: uploadCategory,
          categorySlug: (uploadCategory === 'Photo Clip Lights' ? 'lights' : uploadCategory.toLowerCase()) as any,
          image: previewToSave, // raw unaltered original file data
          description: uploadDescription.trim() || (isLights ? 'Warm fairy LED light string with photo clips for polaroid memory displays.' : isWedding ? 'Exquisite 8×12 inch frameless 5mm MDF wedding portrait wall art panel.' : isBaby ? 'Delightful 4×6 inch frameless 5mm MDF baby milestone photo tile.' : isFamily ? 'Premium 4×6 inch frameless 5mm MDF family photo tile.' : isIslamic ? 'Exquisite 8×12 inch frameless 5mm MDF spiritual wall art panel.' : '8×12 inch wall-art MDF frame design.'),
          badge: 'Official',
          sizeOptions: isLights ? LIGHTS_SIZES : isWedding ? WEDDING_SIZES : isBaby ? BABY_SIZES : isFamily ? FAMILY_SIZES : isIslamic ? ISLAMIC_SIZES : MOTIVATIONAL_SIZES,
        };

        await saveOriginalGalleryItem(newItem);
        const updated = await getStoredGalleryItemsAsync();
        setItems(updated);

        setUploadSuccessMsg(`Successfully stored original file ${fileToSave.name} as ${newItem.designCode}!`);
        setTimeout(() => {
          setUploadSuccessMsg('');
          setShowUploadModal(false);
          setUploadFiles([]);
          setUploadFile(null);
          setUploadPreviewUrl(null);
          setUploadTitle('');
        }, 1500);
      }
    } catch (err) {
      console.error('Failed to save original gallery item:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteItem = async (designCode: string, title?: string) => {
    const ok = window.confirm(`Are you sure you want to delete ${designCode} (${title || 'Artwork'}) from the gallery?`);
    if (!ok) return;

    try {
      await deleteGalleryItem(designCode);
      const updated = await getStoredGalleryItemsAsync();
      setItems(updated);
      if (lightboxItem && lightboxItem.designCode === designCode) {
        setLightboxItem(null);
      }
    } catch (err) {
      console.error('Failed to delete item:', err);
    }
  };

  const handleClearAllUploads = async () => {
    const ok = window.confirm('Are you sure you want to clean the entire gallery? All uploaded gallery pictures will be permanently removed so you can upload afresh.');
    if (!ok) return;

    try {
      await clearAllGalleryItems();
      const updated = await getStoredGalleryItemsAsync();
      setItems(updated);
      setLightboxItem(null);
      setShowUploadModal(false);
    } catch (err) {
      console.error('Failed to clear gallery:', err);
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.categorySlug === selectedCategory;

    const rawQuery = searchQuery.trim().toLowerCase();
    if (!rawQuery) return matchesCategory;

    // Direct match check
    const codeMatch = item.designCode.toLowerCase().includes(rawQuery);
    const titleMatch = item.title.toLowerCase().includes(rawQuery);
    const catMatch = item.category.toLowerCase().includes(rawQuery) || item.categorySlug.toLowerCase().includes(rawQuery);
    const descMatch = item.description.toLowerCase().includes(rawQuery);

    // Numeric code match (e.g. user typed "15" or "015" matching "FH-MOT-015")
    const queryDigits = rawQuery.replace(/[^0-9]/g, '');
    const itemDigits = item.designCode.replace(/[^0-9]/g, '');
    const digitMatch = queryDigits.length > 0 && itemDigits.includes(queryDigits);

    return matchesCategory && (codeMatch || titleMatch || catMatch || descMatch || digitMatch);
  });

  // If a design is selected, render the Design Detail View in normal document flow below the main website header
  if (lightboxItem) {
    return (
      <section
        id="gallery-design-detail-page"
        className="py-6 sm:py-10 bg-[#111111] text-white font-sans min-h-[calc(100vh-140px)] relative overflow-x-hidden"
      >
        {/* Background Luxury Ambient Gold Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#C8A96A]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10 space-y-6 sm:space-y-8">
          
          {/* Gallery Detail Navigation Row - Dedicated toolbar below Main Website Header */}
          <div
            id="gallery-detail-navigation"
            className="flex items-center justify-between gap-3 border-b border-gray-800 pb-4"
          >
            <button
              id="gallery-detail-back-button"
              type="button"
              onClick={() => {
                setLightboxItem(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-[#181818] hover:bg-[#222222] active:bg-[#2a2a2a] text-[#C8A96A] hover:text-white px-4 py-2.5 border border-[#C8A96A]/60 hover:border-[#C8A96A] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md cursor-pointer min-h-[44px] touch-manipulation"
              title="Return to Gallery"
            >
              <ArrowLeft className="w-4 h-4 text-[#C8A96A]" />
              <span>← Back to Gallery</span>
            </button>

            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-[11px] uppercase font-mono tracking-widest text-[#E2CD9F] bg-[#181818] px-3 py-1.5 border border-gray-800">
                {lightboxItem.designCode}
              </span>
              <span className="text-[11px] uppercase font-semibold tracking-wider text-[#C8A96A] hidden xs:inline">
                {lightboxItem.category} Wall Art
              </span>
              <button
                type="button"
                onClick={() => {
                  setLightboxItem(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-[#181818] hover:bg-[#222222] text-gray-400 hover:text-white p-2 border border-gray-800 hover:border-gray-700 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center sm:hidden"
                title="Close"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-[#C8A96A]" />
              </button>
            </div>
          </div>

          {/* Main Detail Area - Desktop Two-Column / Mobile Single-Column */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
            
            {/* Artwork Area (Lg: col-span-7) - Full original artwork with object-contain & zero top cropping */}
            <div className="lg:col-span-7 bg-[#161616] border border-gray-800 p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center min-h-[340px] sm:min-h-[460px] lg:min-h-[580px] shadow-2xl">
              <div className="w-full flex items-center justify-center py-2 sm:py-4">
                <ImageWithSkeleton
                  src={
                    lightboxItem.image || DESIGN_GALLERY_ITEMS.find((d) => d.designCode === lightboxItem.designCode)?.image
                  }
                  fallbackSrc={DESIGN_GALLERY_ITEMS.find((d) => d.designCode === lightboxItem.designCode)?.image || lightboxItem.image}
                  alt={lightboxItem.title}
                  containerClassName="w-full flex items-center justify-center"
                  className="max-h-[50vh] sm:max-h-[60vh] lg:max-h-[540px] w-auto max-w-full object-contain mx-auto shadow-2xl block"
                />
              </div>
              <div className="mt-4 pt-3 border-t border-gray-800/80 w-full flex items-center justify-center gap-2 text-[11px] font-mono text-gray-400">
                <ShieldCheck className="w-4 h-4 text-[#C8A96A]" />
                <span>High-Definition Official Artwork &bull; 8&times;12 Inch Standard</span>
              </div>
            </div>

            {/* Product Information (Lg: col-span-5) */}
            <div className="lg:col-span-5 bg-[#181818] border border-[#C8A96A]/40 p-5 sm:p-7 lg:p-8 space-y-5 shadow-2xl flex flex-col justify-between">
              <div className="space-y-4">
                {/* Top Category & Copy Code */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-[0.2em] text-[#C8A96A] bg-[#111111] px-3 py-1 border border-gray-800">
                    {lightboxItem.category} Wall Art
                  </span>

                  <button
                    type="button"
                    onClick={() => handleCopyCode(lightboxItem.designCode)}
                    className="text-[10px] sm:text-[11px] uppercase font-mono tracking-wider text-gray-300 hover:text-[#C8A96A] flex items-center gap-1.5 bg-[#111111] px-2.5 py-1 border border-gray-800 transition-colors whitespace-nowrap min-h-[32px] touch-manipulation cursor-pointer"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#25D366]" />
                        <span className="text-[#25D366]">Code Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#C8A96A]" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Title & Design Code */}
                <div className="space-y-1 pt-1">
                  <div className="flex flex-wrap items-center justify-between gap-1 text-xs font-mono text-[#E2CD9F]">
                    <span>Design Code: <strong className="text-white bg-[#111111] px-2 py-0.5 border border-gray-800">{lightboxItem.designCode}</strong></span>
                    {lightboxItem.originalFilename && (
                      <span className="text-gray-400 text-[11px]">Original: <strong className="text-gray-300">{lightboxItem.originalFilename}</strong></span>
                    )}
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-light text-white leading-tight pt-1">
                    {lightboxItem.title}
                  </h2>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {lightboxItem.description}
                </p>

                {/* Product Specifications for 8x12 MDF Frameless Photo Tile */}
                <div className="space-y-2.5 bg-[#111111] p-4 border border-gray-800">
                  <div className="text-[10px] uppercase tracking-wider text-[#C8A96A] font-bold">
                    Product Specifications:
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-gray-400 block">Size:</span>
                      <span className="font-mono text-white font-semibold">8×12 Inches (20×30 cm)</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-gray-400 block">Type:</span>
                      <span className="text-white font-medium">Frameless MDF Wall Tile</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-gray-400 block">Material:</span>
                      <span className="text-white font-medium">5mm High-Density MDF</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-gray-400 block">Finish:</span>
                      <span className="text-white font-medium">UV Matte Laminated</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-gray-800/80 flex items-center gap-2 text-[11px] text-[#E2CD9F]">
                    <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                    <span>Damage-Free Re-stickable Tape Included (Zero Nails / Zero Wall Damage)</span>
                  </div>
                </div>
              </div>

              {/* Primary WhatsApp Action Button */}
              <div className="pt-4 border-t border-gray-800 space-y-2.5">
                <a
                  id="gallery-detail-whatsapp-order"
                  href={createDesignCodeWhatsAppUrl(
                    lightboxItem.designCode,
                    lightboxItem.title,
                    lightboxItem.category,
                    lightboxItem.sizeOptions[0]
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1faa51] text-white font-bold text-xs uppercase tracking-[0.15em] py-3.5 sm:py-4 shadow-xl transition-all border border-[#25D366] min-h-[48px] touch-manipulation cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Order on WhatsApp</span>
                </a>
                <p className="text-[11px] text-center text-gray-400 leading-tight">
                  Opens WhatsApp with pre-filled order text: <span className="text-[#E2CD9F] italic">"I want Motivational Design {lightboxItem.designCode}, size 8×12 inches."</span>
                </p>

                {/* Delete Artwork Option */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(lightboxItem.designCode, lightboxItem.title)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 text-[11px] text-red-400 hover:text-red-300 hover:bg-red-950/20 border border-red-900/30 transition-colors uppercase tracking-wider"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete this Artwork</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 sm:py-20 bg-[#111111] text-white font-sans min-h-screen relative overflow-hidden">
      {/* Background Luxury Ambient Gold Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#C8A96A]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-10">
        <div className="flex items-center justify-between">
          <BackButton onBack={onBack} isLightBg={false} />
        </div>

        {/* Header - Luxury Lookbook */}
        <div className="text-center max-w-3xl mx-auto space-y-3 px-2">
          <div className="inline-flex items-center gap-2 text-[#C8A96A] text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.3em] bg-[#1A1A1A] px-3 sm:px-4 py-1.5 border border-[#C8A96A]/30 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A96A] animate-pulse" />
            <span>Design Code Catalog</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-white leading-tight">
            Design <span className="font-bold italic text-[#E2CD9F]">Gallery</span>
          </h1>
          <div className="w-16 h-0.5 bg-[#C8A96A] mx-auto" />
          <p className="text-xs sm:text-sm text-gray-400 font-normal leading-relaxed max-w-2xl mx-auto">
            Browse our curated collection of motivational wall art, photo tiles, Islamic calligraphy &amp; clip lights. Click any design to preview and order directly via WhatsApp using its unique <strong className="text-[#C8A96A]">Design Code</strong>.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#181818] p-3 sm:p-4 border border-gray-800 shadow-2xl">
          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full md:w-auto">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase transition-all duration-200 border ${
                    isActive
                      ? 'bg-[#C8A96A] text-[#111111] border-[#C8A96A] shadow-lg scale-105'
                      : 'bg-[#111111] text-gray-300 border-gray-800 hover:text-white hover:border-[#C8A96A]/60'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input for Design Code or Title */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#C8A96A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search code (e.g. FH-MOT-001, 015)..."
              className="w-full bg-[#111111] text-white text-xs pl-10 pr-8 py-2.5 border border-gray-800 focus:border-[#C8A96A] focus:outline-none placeholder-gray-500 font-sans tracking-wide"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Active Category Header Count */}
        <div className="flex items-center justify-between text-xs text-gray-400 border-b border-gray-800 pb-3 px-1">
          <div className="flex items-center gap-2">
            <span className="text-[#C8A96A] font-bold uppercase tracking-wider">
              {selectedCategory === 'All'
                ? 'Showing All Designs'
                : CATEGORIES.find((c) => c.slug === selectedCategory)?.label}
            </span>
            <span>({filteredItems.length} Designs Available)</span>
          </div>
          <span className="text-[11px] text-gray-500 hidden sm:inline">
            Click any image for full preview &amp; WhatsApp ordering
          </span>
        </div>

        {/* Gallery Grid - Responsive: 2 cols on mobile, 2 on sm, 3 on md, 4 on lg */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 px-6 bg-[#181818] border border-[#C8A96A]/30 shadow-2xl space-y-5 max-w-3xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8A96A]/5 rounded-full blur-2xl pointer-events-none" />
            <div className="w-14 h-14 bg-[#111111] text-[#C8A96A] border border-[#C8A96A]/40 flex items-center justify-center mx-auto shadow-lg">
              <Sparkles className="w-7 h-7 text-[#C8A96A]" />
            </div>
            
            <div className="space-y-2">
              <div className="inline-block text-[#C8A96A] text-[10px] font-bold uppercase tracking-[0.25em] bg-[#111111] px-3 py-1 border border-[#C8A96A]/20">
                {selectedCategory === 'All'
                  ? 'Catalog Updating'
                  : `${CATEGORIES.find((c) => c.slug === selectedCategory)?.label || selectedCategory} Collection`}
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#E2CD9F]">
                {searchQuery
                  ? 'No Matching Designs Found'
                  : selectedCategory === 'motivational'
                  ? 'Motivational Gallery Cleaned & Ready'
                  : 'Gallery Cleaned & Ready for New Artworks'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto leading-relaxed">
                {searchQuery ? (
                  <>No design found matching "{searchQuery}". Try searching for another design code or clearing your search.</>
                ) : (
                  <>
                    The gallery is cleaned and ready for your fresh uploads. You can click{' '}
                    <strong className="text-[#C8A96A] font-semibold">"Upload Artwork"</strong> to add your photos directly with your chosen design codes and titles, or request custom printing on WhatsApp!
                  </>
                )}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  className="bg-[#C8A96A] text-[#111111] text-xs uppercase tracking-widest font-bold px-6 py-3 transition-colors hover:bg-[#E2CD9F]"
                >
                  Clear Search
                </button>
              ) : (
                <a
                  href={createGeneralWhatsAppUrl(
                      `Hi FRAME HUB! I want to inquire about custom ${
                        selectedCategory === 'All'
                          ? 'wall art'
                          : CATEGORIES.find((c) => c.slug === selectedCategory)?.label
                      } designs.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1faa51] text-white text-xs uppercase tracking-widest font-bold px-6 py-3 transition-colors shadow-lg border border-[#25D366]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Request on WhatsApp</span>
                  </a>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleOpenLightbox(item)}
                className="group cursor-pointer bg-[#181818] border border-gray-800 hover:border-[#C8A96A] shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-black flex items-center justify-center">
                  <ImageWithSkeleton
                    src={item.image}
                    fallbackSrc={DESIGN_GALLERY_ITEMS.find((d) => d.designCode === item.designCode)?.image}
                    alt={`${item.designCode} - ${item.title}`}
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Info & Details Box */}
                <div className="p-2.5 sm:p-4 space-y-2 sm:space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-gray-400 font-mono">
                      <span className="text-[#C8A96A] font-semibold uppercase">{item.category}</span>
                      <span className="text-[#E2CD9F] font-bold bg-[#111111] px-2 py-0.5 border border-gray-800">{item.designCode}</span>
                    </div>
                    <h3 className="font-serif text-xs sm:text-sm font-bold text-white group-hover:text-[#C8A96A] transition-colors line-clamp-1 leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  {/* Size & Spec Badge */}
                  <div className="bg-[#111111]/80 p-1.5 sm:p-2 border border-gray-800/80 flex items-center justify-between text-[9px] sm:text-[10px] text-gray-300">
                    <span className="text-gray-400">Size:</span>
                    <span className="font-mono text-[#E2CD9F] font-semibold">8×12 Inches</span>
                  </div>

                  {/* Product Buttons: Quick View & Order on WhatsApp */}
                  <div className="pt-1 sm:pt-2 border-t border-gray-800/80 grid grid-cols-2 gap-1.5 sm:gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenLightbox(item);
                      }}
                      className="w-full py-1.5 sm:py-2 bg-[#111111] hover:bg-[#222222] text-gray-200 hover:text-[#C8A96A] text-[9px] sm:text-[10px] font-bold uppercase tracking-wider border border-gray-700 flex items-center justify-center gap-1 transition-colors"
                    >
                      <Eye className="w-3 h-3 text-[#C8A96A]" />
                      <span className="hidden sm:inline">Quick View</span>
                      <span className="sm:hidden">View</span>
                    </button>

                    <a
                      href={createDesignCodeWhatsAppUrl(
                        item.designCode,
                        item.title,
                        item.category,
                        item.sizeOptions[0]
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-full py-1.5 sm:py-2 bg-[#25D366] hover:bg-[#1faa51] text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider border border-[#25D366] flex items-center justify-center gap-1 transition-colors shadow-md"
                    >
                      <MessageCircle className="w-3 h-3 fill-current" />
                      <span>Order</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Custom Order Callout Section */}
        <div className="mt-12 sm:mt-16 bg-[#181818] p-6 sm:p-10 border border-[#C8A96A]/40 text-center shadow-2xl space-y-4 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-2">
            <span className="text-[#C8A96A] text-[10px] font-bold uppercase tracking-[0.3em]">
              Custom Motivational Prints
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-white">
              Have Your Own Quote or Custom Photo?
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Send your personal favorite quotes, wallpapers, or photos directly to our team on WhatsApp. We provide free preview mockups on 8×12 inch 5mm MDF photo tiles before printing!
            </p>
          </div>

          <div>
            <a
              href={createGeneralWhatsAppUrl('Hi FRAME HUB! I have custom photos/quotes and would like to order custom 8x12 MDF Photo Tiles.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1faa51] text-white font-bold text-xs uppercase tracking-[0.2em] px-6 sm:px-8 py-3.5 shadow-xl transition-all border border-[#25D366]"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat Custom Design on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Admin Original File Direct Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <div className="bg-[#181818] border border-[#C8A96A] max-w-xl w-full p-5 sm:p-7 shadow-2xl relative space-y-5 my-auto">
              <button
                onClick={() => setShowUploadModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#C8A96A] text-[10px] font-bold uppercase tracking-widest">
                  <ShieldCheck className="w-4 h-4 text-[#C8A96A]" />
                  <span>True Original File Upload</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-white font-light">
                  Upload Original Gallery Artwork
                </h3>
                <p className="text-xs text-gray-400">
                  Preview original artwork locally. Permanent catalog designs for all published website visitors are deployed directly from the repository&apos;s <code className="text-[#C8A96A] bg-[#111111] px-1 py-0.5 border border-gray-800">/public/gallery/</code> directory.
                </p>
              </div>

              {uploadSuccessMsg && (
                <div className="p-3 bg-[#25D366]/10 border border-[#25D366] text-[#25D366] text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{uploadSuccessMsg}</span>
                </div>
              )}

              {uploadProgressMsg && (
                <div className="p-3 bg-[#C8A96A]/10 border border-[#C8A96A] text-[#C8A96A] text-xs flex items-center gap-2 animate-pulse">
                  <Sparkles className="w-4 h-4 shrink-0 animate-spin" />
                  <span>{uploadProgressMsg}</span>
                </div>
              )}

              <form onSubmit={handleSaveOriginalUpload} className="space-y-4">
                {/* File Dropzone */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-700 hover:border-[#C8A96A] p-6 text-center cursor-pointer bg-[#111111] transition-colors group"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    className="hidden"
                    onChange={handleFileChange}
                  />

                  {uploadFiles.length > 1 ? (
                    <div className="space-y-3">
                      <div className="w-10 h-10 bg-[#C8A96A]/20 text-[#C8A96A] rounded-full flex items-center justify-center mx-auto border border-[#C8A96A]/40">
                        <FileImage className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-white font-bold tracking-wide">
                          {uploadFiles.length} Original Artworks Selected for Bulk Upload
                        </p>
                        <p className="text-[11px] text-gray-400">
                          Total size: {(uploadFiles.reduce((acc, f) => acc + f.size, 0) / (1024 * 1024)).toFixed(2)} MB • Byte-for-byte exact preservation
                        </p>
                      </div>
                      <div className="max-h-28 overflow-y-auto p-2 bg-[#181818] border border-gray-800 text-left text-[11px] font-mono text-gray-300 space-y-1">
                        {uploadFiles.map((f, i) => (
                          <div key={i} className="flex items-center justify-between py-0.5 border-b border-gray-800/40 last:border-0">
                            <span className="truncate pr-2 text-[#C8A96A]">{f.name}</span>
                            <span className="text-gray-500 shrink-0">{(f.size / 1024).toFixed(0)} KB</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-[11px] text-[#C8A96A] underline">Click to choose different files</p>
                    </div>
                  ) : uploadPreviewUrl ? (
                    <div className="space-y-2">
                      <img
                        src={uploadPreviewUrl}
                        alt="Preview"
                        className="max-h-48 mx-auto object-contain border border-gray-800 shadow-md"
                      />
                      <div className="text-xs text-gray-300 font-mono flex items-center justify-center gap-2">
                        <FileImage className="w-3.5 h-3.5 text-[#C8A96A]" />
                        <span>{uploadFile?.name} ({(uploadFile!.size / 1024).toFixed(1)} KB)</span>
                      </div>
                      <p className="text-[11px] text-[#C8A96A] underline">Click to change or select multiple files</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 text-[#C8A96A] mx-auto group-hover:scale-110 transition-transform" />
                      <p className="text-xs text-white font-semibold">
                        Click or drag &amp; drop original images here (Single or Multiple)
                      </p>
                      <p className="text-[10px] text-gray-400">
                        Select all 29 images at once to bulk upload into Islamic Gallery with zero quality loss
                      </p>
                    </div>
                  )}
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {uploadFiles.length > 1 ? (
                    <>
                      <div className="space-y-1">
                        <label className="text-gray-400 font-mono uppercase text-[10px]">Batch Target Category</label>
                        <select
                          value={uploadCategory}
                          onChange={(e) => setUploadCategory(e.target.value as any)}
                          className="w-full bg-[#111111] text-white p-2.5 border border-gray-800 focus:border-[#C8A96A] focus:outline-none"
                        >
                          <option value="Islamic">Islamic</option>
                          <option value="Motivational">Motivational</option>
                          <option value="Family">Family</option>
                          <option value="Baby">Baby</option>
                          <option value="Wedding">Wedding</option>
                          <option value="Photo Clip Lights">Photo Clip Lights</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-gray-400 font-mono uppercase text-[10px]">Automatic Naming</label>
                        <input
                          type="text"
                          disabled
                          value="Auto-detect codes (FH-ISL-001 ... 029)"
                          className="w-full bg-[#111111] text-gray-400 p-2.5 border border-gray-800 cursor-not-allowed"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-1">
                        <label className="text-gray-400 font-mono uppercase text-[10px]">Design Code</label>
                        <input
                          type="text"
                          value={uploadDesignCode}
                          onChange={(e) => setUploadDesignCode(e.target.value)}
                          placeholder="e.g. FH-ISL-001"
                          className="w-full bg-[#111111] text-white p-2.5 border border-gray-800 focus:border-[#C8A96A] focus:outline-none font-mono uppercase"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-gray-400 font-mono uppercase text-[10px]">Artwork Title</label>
                        <input
                          type="text"
                          value={uploadTitle}
                          onChange={(e) => setUploadTitle(e.target.value)}
                          placeholder="e.g. Ayat-ul-Kursi Royal Gold"
                          className="w-full bg-[#111111] text-white p-2.5 border border-gray-800 focus:border-[#C8A96A] focus:outline-none"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-gray-400 font-mono uppercase text-[10px]">Category</label>
                        <select
                          value={uploadCategory}
                          onChange={(e) => setUploadCategory(e.target.value as any)}
                          className="w-full bg-[#111111] text-white p-2.5 border border-gray-800 focus:border-[#C8A96A] focus:outline-none"
                        >
                          <option value="Islamic">Islamic</option>
                          <option value="Motivational">Motivational</option>
                          <option value="Family">Family</option>
                          <option value="Baby">Baby</option>
                          <option value="Wedding">Wedding</option>
                          <option value="Photo Clip Lights">Photo Clip Lights</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-gray-400 font-mono uppercase text-[10px]">Frame Dimensions</label>
                        <input
                          type="text"
                          disabled
                          value="8×12 Inches (Frameless MDF Tile)"
                          className="w-full bg-[#111111] text-gray-400 p-2.5 border border-gray-800 cursor-not-allowed"
                        />
                      </div>
                    </>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={(!uploadFile && uploadFiles.length === 0) || isUploading}
                  className="w-full py-3 bg-[#C8A96A] hover:bg-[#E2CD9F] disabled:opacity-50 text-[#111111] font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <Upload className="w-4 h-4" />
                  <span>
                    {isUploading
                      ? 'Publishing Original Artworks...'
                      : uploadFiles.length > 1
                      ? `Save & Publish All ${uploadFiles.length} Original Artworks`
                      : 'Save Original File to Gallery'}
                  </span>
                </button>

                {items.length > 0 && (
                  <div className="pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs">
                    <span className="text-gray-400 text-[11px]">{items.length} artwork(s) in gallery</span>
                    <button
                      type="button"
                      onClick={handleClearAllUploads}
                      className="inline-flex items-center gap-1.5 text-[11px] text-red-400 hover:text-red-300 hover:underline"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clean / Wipe All Uploads</span>
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
