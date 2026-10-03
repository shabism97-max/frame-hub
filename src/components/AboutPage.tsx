import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Heart,
  Truck,
  Award,
  ChevronDown,
  MessageCircle,
  MapPin,
  Check,
  Palette,
  Layers,
  HelpCircle
} from 'lucide-react';
import { createGeneralWhatsAppUrl } from '../utils/whatsapp';
import { ImageWithSkeleton } from './ImageWithSkeleton';
import { BackButton } from './BackButton';
import imgNurseryTiles from '../assets/images/baby/baby-002.jpg';
import imgFamilyGalleryWall from '../assets/images/family/family-002.jpg';
import imgShowroomFrames from '../assets/images/mdf/mdf-002.jpg';

interface AboutPageProps {
  onBack?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  // Luxury FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const FAQS = [
    {
      id: 'ordering',
      category: 'Ordering',
      question: 'How do I place an order with FRAME HUB?',
      answer:
        'Ordering is effortless! You can select your frame styles on our website and click "Order on WhatsApp", or message us directly on WhatsApp with your selected photos, dimensions, and delivery address.'
    },
    {
      id: 'whatsapp',
      category: 'WhatsApp',
      question: 'How does WhatsApp design consultation work?',
      answer:
        'When you contact us on WhatsApp, our design team reviews your photos, suggests frame arrangements or grid layouts, and sends a digital preview mockup for your approval before printing.'
    },
    {
      id: 'delivery',
      category: 'Delivery',
      question: 'What is the delivery timeline and charges across Pakistan?',
      answer:
        'We deliver nationwide to over 200+ cities in Pakistan. Standard delivery is Rs. 300, and delivery is 100% FREE on all orders of Rs. 2,999 or above. Production takes 1 to 2 business days, and courier delivery typically arrives within 3 to 5 working days in shockproof protective packaging.'
    },
    {
      id: 'customization',
      category: 'Customization',
      question: 'Can I request custom sizes, collage layouts, or names?',
      answer:
        'Yes! We specialize in bespoke customization. You can customize dimensions, photo frame borders, family names, marriage dates, or custom Islamic calligraphy typography.'
    },
    {
      id: 'frame-colors',
      category: 'Frame Colors',
      question: 'What frame border color options are available?',
      answer:
        'Our custom frames and MDF tile borders come in Classic Matte Black, Luxury Gold Foil Accent, Scandinavian Warm Wood Walnut, and Minimal White.'
    },
    {
      id: 'payment',
      category: 'Payment',
      question: 'What payment methods do you accept?',
      answer:
        'We accept Cash on Delivery (COD) nationwide across Pakistan, as well as EasyPaisa, JazzCash, and direct Bank Transfer for custom pre-orders.'
    },
    {
      id: 'ready-to-hang',
      category: 'Ready To Hang',
      question: 'How do I hang the frames on my wall?',
      answer:
        'All MDF photo tiles come with pre-applied re-stickable mounting strips that hold firmly without drilling or damaging wall paint. Traditional frames come equipped with ready-to-hang brass hooks.'
    },
    {
      id: 'premium-materials',
      category: 'Premium Materials',
      question: 'What materials are used to manufacture FRAME HUB products?',
      answer:
        'We craft our products using 8mm dense moisture-resistant MDF board backing, ultra-HD archival UV photo inks, and protective matte anti-glare lamination to prevent fading over time.'
    }
  ];

  const CORE_VALUES = [
    {
      title: 'Our Mission',
      description:
        'To elevate every living space across Pakistan by turning personal memories, family milestones, and spiritual calligraphy into timeless, accessible wall art.',
      icon: <Heart className="w-6 h-6 text-[#C8A96A]" />
    },
    {
      title: 'Our Vision',
      description:
        'To become Pakistan’s premier destination for custom home decor, setting new standards in craft, zero-damage wall mounting, and personalized customer care.',
      icon: <Award className="w-6 h-6 text-[#C8A96A]" />
    },
    {
      title: 'Uncompromised Quality',
      description:
        'Every frame undergoes meticulous multi-stage quality checks—from high-resolution photo optimization to velvet backing and scratch-proof matte lamination.',
      icon: <ShieldCheck className="w-6 h-6 text-[#C8A96A]" />
    },
    {
      title: 'Artisanal Craftsmanship',
      description:
        'Hand-finished borders, precision laser-cut MDF tiles, and gold-embroidered calligraphy details tailored with Scandinavian interior aesthetics.',
      icon: <Layers className="w-6 h-6 text-[#C8A96A]" />
    },
    {
      title: 'Bespoke Custom Designs',
      description:
        'We don’t just print; we design. Enjoy free photo retouching, custom family collage grids, and digital proofing before final printing.',
      icon: <Palette className="w-6 h-6 text-[#C8A96A]" />
    },
    {
      title: 'Nationwide Safe Delivery',
      description:
        'Specially engineered shockproof bubble wrapping ensures your delicate custom frames arrive flawless anywhere in Pakistan.',
      icon: <Truck className="w-6 h-6 text-[#C8A96A]" />
    }
  ];

  return (
    <div className="py-16 sm:py-24 bg-[#111111] text-white font-sans min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <BackButton onBack={onBack} isLightBg={false} />
        
        {/* Story & Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-[#C8A96A] text-xs font-extrabold uppercase tracking-[0.2em] bg-[#1A1A1A] px-4 py-1.5 rounded-full border border-[#C8A96A]/30">
              <Sparkles className="w-4 h-4 text-[#C8A96A]" />
              <span>Personalized Wall Décor Atelier</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-white leading-tight">
              FRAME HUB creates premium personalized wall décor that{' '}
              <span className="font-bold italic text-[#E2CD9F]">
                transforms memories into timeless art.
              </span>
            </h1>

            <p className="font-serif italic text-base sm:text-lg text-[#C8A96A] border-l-2 border-[#C8A96A] pl-4">
              "Every Frame Tells a Story"
            </p>

            <div className="space-y-4 text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
              <p>
                A house becomes a home when its walls reflect the stories, smiles, and spiritual peace of the people who live inside. At FRAME HUB, we believe your cherished moments—a baby’s first smile, wedding vows, family reunions, and sacred calligraphic verses—deserve more than staying hidden inside digital screens.
              </p>
              <p>
                Crafted with Scandinavian-inspired minimalism and Apple-grade precision, our custom MDF photo tiles and luxury frames are designed to seamlessly integrate into modern Pakistani interiors. With our zero-damage re-stickable technology, you can curate your wall story without drill bits, nails, or paint damage.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href={createGeneralWhatsAppUrl('Hi FRAME HUB! I want to discuss a custom wall frame story.')}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#1faa51] text-white font-bold text-xs uppercase tracking-[0.15em] py-4 px-8 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-3 border border-[#25D366]"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Talk to Design Team on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <ImageWithSkeleton
                  src={imgNurseryTiles}
                  alt="FRAME HUB MDF Photo Tiles"
                  containerClassName="h-60 w-full rounded-2xl overflow-hidden border border-gray-800"
                  className="rounded-2xl shadow-2xl object-cover h-60 w-full hover:scale-105 transition-transform duration-500"
                />
                <div className="bg-[#181818] border border-[#C8A96A]/40 p-5 rounded-2xl space-y-1">
                  <div className="font-serif text-lg font-bold text-[#C8A96A]">Zero Wall Damage</div>
                  <div className="text-xs text-gray-400">Re-stickable Mounting Tabs</div>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="bg-[#181818] border border-[#C8A96A]/40 p-5 rounded-2xl space-y-1">
                  <div className="font-serif text-lg font-bold text-[#C8A96A]">8mm Solid MDF</div>
                  <div className="text-xs text-gray-400">HD Matte Finish</div>
                </div>
                <ImageWithSkeleton
                  src={imgFamilyGalleryWall}
                  alt="FRAME HUB Family Gallery Wall"
                  containerClassName="h-60 w-full rounded-2xl overflow-hidden border border-gray-800"
                  className="rounded-2xl shadow-2xl object-cover h-60 w-full hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pillars & Storytelling Grid */}
        <div className="space-y-10 pt-10 border-t border-gray-800">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[#C8A96A] text-xs font-extrabold uppercase tracking-[0.2em]">
              The FRAME HUB Commitment
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-white">
              Built on Craft, Built for Memories
            </h2>
            <div className="w-12 h-0.5 bg-[#C8A96A] mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_VALUES.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-[#181818] p-8 rounded-2xl border border-gray-800 hover:border-[#C8A96A]/60 shadow-xl transition-all duration-300 space-y-4 hover:-translate-y-1 group"
              >
                <div className="p-3 bg-[#111111] border border-gray-800 rounded-xl inline-block group-hover:border-[#C8A96A]/50 transition-colors">
                  {pillar.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#E2CD9F] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quality & Craftsmanship Spotlight */}
        <div className="bg-gradient-to-br from-[#181818] to-[#202020] rounded-3xl p-8 sm:p-12 border border-[#C8A96A]/30 space-y-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[#C8A96A] text-xs font-extrabold uppercase tracking-[0.2em]">
                Materials &amp; Engineering
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-light text-white leading-tight">
                Anatomy of a Luxury Frame
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Unlike mass-market flimsy photo prints, every FRAME HUB creation uses solid 8mm dense MDF wood backing, anti-reflective matte UV film coatings, and velvet edge protection designed to stay vibrant for years.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-xs text-gray-300">
                  <div className="p-1 bg-[#C8A96A] text-[#111111] rounded font-bold shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block font-semibold">8mm Moisture-Resistant MDF</strong>
                    Engineered density board that stays flat and warp-free in Pakistani humidity.
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-gray-300">
                  <div className="p-1 bg-[#C8A96A] text-[#111111] rounded font-bold shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block font-semibold">Archival UV Matte Lamination</strong>
                    Eliminates glare from room lights while guarding against dust and fingerprints.
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-gray-300">
                  <div className="p-1 bg-[#C8A96A] text-[#111111] rounded font-bold shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-white block font-semibold">Damage-Free Re-Stickable Tabs</strong>
                    Stick, peel, and reposition without tools or removing paint from walls.
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <ImageWithSkeleton
                src={imgShowroomFrames}
                alt="FRAME HUB Craftsmanship"
                containerClassName="h-80 w-full rounded-2xl overflow-hidden border border-gray-800"
                className="rounded-2xl shadow-2xl object-cover h-80 w-full"
              />
            </div>
          </div>
        </div>

        {/* Luxury Accordion FAQ Section */}
        <div className="space-y-10 pt-10 border-t border-gray-800 max-w-4xl mx-auto">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 text-[#C8A96A] text-xs font-extrabold uppercase tracking-[0.2em] bg-[#1A1A1A] px-4 py-1.5 rounded-full border border-[#C8A96A]/30">
              <HelpCircle className="w-4 h-4 text-[#C8A96A]" />
              <span>Got Questions?</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-white">
              Frequently Asked Questions
            </h2>
            <div className="w-12 h-0.5 bg-[#C8A96A] mx-auto" />
            <p className="text-xs sm:text-sm text-gray-400">
              Everything you need to know about ordering, frame colors, customization &amp; nationwide delivery.
            </p>
          </div>

          {/* Luxury Accordion List */}
          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.id}
                  className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-[#1A1A1A] border-[#C8A96A]/60 shadow-2xl'
                      : 'bg-[#181818] border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4 font-serif text-base sm:text-lg font-bold text-white focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#C8A96A] bg-[#111111] px-3 py-1 rounded-md border border-[#C8A96A]/30">
                        {faq.category}
                      </span>
                      <span>{faq.question}</span>
                    </div>
                    <div
                      className={`p-2 rounded-full bg-[#111111] border border-gray-800 text-[#C8A96A] transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-[#C8A96A] text-[#111111]' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-gray-800/60 font-sans">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick WhatsApp Support Callout */}
          <div className="bg-[#181818] p-6 rounded-2xl border border-[#C8A96A]/30 text-center space-y-3">
            <h4 className="font-serif text-base font-bold text-white">
              Have a question not listed here?
            </h4>
            <p className="text-xs text-gray-400">
              Our team is online on WhatsApp to answer your custom frame inquiries instantly.
            </p>
            <a
              href={createGeneralWhatsAppUrl('Hi FRAME HUB! I have a question about my custom frame order.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#25D366] font-bold text-xs uppercase tracking-wider hover:underline"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Ask us on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
