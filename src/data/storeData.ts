import { Category, Product, GalleryItem } from '../types';
import imgNurseryTiles from '../assets/images/baby/baby-001.jpg';
import imgFamilyMdfTiles from '../assets/images/family/family-001.jpg';
import imgFamilyGalleryWall from '../assets/images/family/family-002.jpg';
import imgWeddingFramesWall from '../assets/images/wedding/wedding-001.jpg';
import imgIslamicGoldFrames from '../assets/images/islamic/islamic-002.jpg';
import imgOfficeMotivational from '../assets/images/motivational/motivational-002.jpg';
import imgPhotoClipLights from '../assets/images/lights/lights-001.jpg';
import imgShowroomFrames from '../assets/images/mdf/mdf-002.jpg';

import imgMdfTilesLivingroom from '../assets/images/mdf/mdf-001.jpg';
import imgMdfTilesNursery from '../assets/images/baby/baby-003.jpg';
import imgMdfTilesWedding from '../assets/images/wedding/wedding-002.jpg';
import imgMdfTilesDecor from '../assets/images/family/family-003.jpg';

import imgIslamicWallArtSet from '../assets/images/islamic/islamic-001.jpg';
import imgMotivationalWallArtSet from '../assets/images/motivational/motivational-001.jpg';
import imgMotivationalDetail from '../assets/images/motivational/motivational-003.jpg';

export const WHATSAPP_NUMBER = '923298373793';
export const DISPLAY_PHONE = '03298373793';
export const CONTACT_EMAIL = 'shabi.sm97@gmail.com';
export const FULL_ADDRESS = 'House No.10-B, Hrdass Street, Bohra Pir, Near SIUT, Karachi, Pakistan';
export const LOCATION_CITY = 'Karachi, Pakistan';
export const WORKING_HOURS = 'Monday–Saturday 10:00 AM – 10:00 PM';

export const CATEGORIES: Category[] = [
  {
    id: 'mdf-photo-tiles',
    name: 'MDF Photo Tiles',
    slug: 'mdf-photo-tiles',
    image: imgMdfTilesLivingroom,
    description: 'Ultra-lightweight stick-and-re-stick 5mm MDF wall photo tiles. Zero wall damage.',
    itemCount: 14,
  },
  {
    id: 'family-frames',
    name: 'Family Frames',
    slug: 'family-frames',
    image: imgFamilyGalleryWall,
    description: 'Celebrate generation milestones with timeless multi-photo family collages.',
    itemCount: 18,
  },
  {
    id: 'wedding-frames',
    name: 'Wedding Frames',
    slug: 'wedding-frames',
    image: imgWeddingFramesWall,
    description: 'Gold-embossed and velvet-backed frames designed for royal wedding memories.',
    itemCount: 12,
  },
  {
    id: 'islamic-wall-art',
    name: 'Islamic Wall Art',
    slug: 'islamic-wall-art',
    image: imgIslamicWallArtSet,
    description: 'Spiritual Calligraphy verse sets featuring Allah, Muhammad ﷺ, Bismillah & Ayat-ul-Kursi on 5mm MDF.',
    itemCount: 29,
  },
  {
    id: 'motivational-wall-art',
    name: 'Motivational Wall Art',
    slug: 'motivational-wall-art',
    image: imgMotivationalWallArtSet,
    description: 'Inspiring office & workspace typographic quote sets printed on frameless 5mm MDF wall panels.',
    itemCount: 12,
  },
  {
    id: 'photo-clip-lights',
    name: 'Photo Clip String Lights',
    slug: 'photo-clip-lights',
    image: imgPhotoClipLights,
    description: 'Warm ambient LED copper fairy lights with custom printed photos included.',
    itemCount: 8,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'mdf-tiles-6x8-set6',
    name: 'MDF Photo Tiles (6×8)',
    category: 'MDF Photo Tiles',
    categorySlug: 'mdf-photo-tiles',
    price: 999,
    originalPrice: 1499,
    dimensions: '6 × 8 Inches',
    setSize: 'Set of 6 Custom Photos',
    description: 'Transform your favorite memories into premium frameless MDF Photo Tiles. Printed in vibrant HD quality on durable 5mm MDF with a smooth matte finish, perfect for decorating your living room, bedroom or office.',
    features: [
      'Premium 5mm High-Density MDF Board',
      'Ultra HD UV Matte Laminated Print',
      'Damage-Free Re-stickable Mounting Tabs Included',
      'Waterproof & Scratch-Resistant Surface',
      'Frameless Minimalist Scandinavian Aesthetic'
    ],
    image: imgMdfTilesLivingroom,
    galleryImages: [
      imgMdfTilesLivingroom,
      imgMdfTilesNursery,
      imgMdfTilesWedding,
      imgMdfTilesDecor,
      imgNurseryTiles,
      imgFamilyMdfTiles
    ],
    popular: true,
    rating: 4.9,
    reviewsCount: 142,
    badge: 'BEST SELLER'
  },
  {
    id: 'mdf-tiles-8x12-set6',
    name: 'MDF Photo Tiles (8×12)',
    category: 'MDF Photo Tiles',
    categorySlug: 'mdf-photo-tiles',
    price: 1499,
    originalPrice: 1999,
    dimensions: '8 × 12 Inches',
    setSize: 'Set of 6 Custom Photos',
    description: 'Transform your favorite memories into premium frameless MDF Photo Tiles. Printed in vibrant HD quality on durable 5mm MDF with a smooth matte finish, perfect for decorating your living room, bedroom or office.',
    features: [
      'Set of 6 Large 8×12 Frameless Portrait Tiles',
      'Durable 5mm High-Density MDF Board',
      'Fade-Proof HD Pigment UV Printing',
      'No Tools or Hammers Required (Damage-Free Mounting)',
      'Delivered in Gift-Ready Luxury Packaging'
    ],
    image: imgMdfTilesDecor,
    galleryImages: [
      imgMdfTilesDecor,
      imgMdfTilesLivingroom,
      imgMdfTilesWedding,
      imgMdfTilesNursery,
      imgFamilyMdfTiles,
      imgNurseryTiles
    ],
    popular: true,
    rating: 5.0,
    reviewsCount: 98,
    badge: 'HOT DEAL'
  },
  {
    id: 'photo-clip-lights-12',
    name: 'Photo Clip String Lights',
    category: 'Photo Clip String Lights',
    categorySlug: 'photo-clip-lights',
    price: 700,
    originalPrice: 1000,
    dimensions: '12 Custom Photos Included',
    setSize: '12 Custom Photos + String Lights',
    description: 'Warm ambient LED copper fairy string lights with photo clips. Includes 12 custom photo prints of your choice.',
    features: [
      'Warm LED string lights with photo clips',
      'Includes 12 custom printed photos',
      'Flexible copper wiring for easy mounting',
      'Safe low voltage battery operation',
      'Creates magical bedroom memory wall'
    ],
    image: imgPhotoClipLights,
    galleryImages: [
      imgPhotoClipLights
    ],
    popular: false,
    rating: 4.8,
    reviewsCount: 84,
    badge: 'TRENDING'
  },
  {
    id: 'family-frames-collection',
    name: 'Family Frames',
    category: 'Family Frames',
    categorySlug: 'family-frames',
    price: 349,
    startingPrice: true,
    dimensions: '4×6 (Rs.349) | 5×7 (Rs.449) | 6×8 (Rs.499) | 8×12 (Rs.650)',
    setSize: 'Available in 4 Sizes',
    description: 'Timeless custom family photo frames. Choose from 4×6 (Rs.349), 5×7 (Rs.449), 6×8 (Rs.499), or 8×12 (Rs.650).',
    features: [
      '4×6 Inches – Rs. 349',
      '5×7 Inches – Rs. 449',
      '6×8 Inches – Rs. 499',
      '8×12 Inches – Rs. 650',
      'Solid wooden border with crystal pane protection'
    ],
    image: imgFamilyGalleryWall,
    galleryImages: [
      imgFamilyGalleryWall,
      imgShowroomFrames
    ],
    popular: true,
    rating: 4.8,
    reviewsCount: 210,
    badge: 'POPULAR'
  },
  {
    id: 'wedding-frames-collection',
    name: 'Wedding Frames',
    category: 'Wedding Frames',
    categorySlug: 'wedding-frames',
    price: 349,
    startingPrice: true,
    dimensions: '4×6 (Rs.349) | 5×7 (Rs.449) | 6×8 (Rs.499) | 8×12 (Rs.650)',
    setSize: 'Available in 4 Sizes',
    description: 'Royal wedding memory frames with gold embossed accents. Sizes: 4×6 (Rs.349), 5×7 (Rs.449), 6×8 (Rs.499), 8×12 (Rs.650).',
    features: [
      '4×6 Inches – Rs. 349',
      '5×7 Inches – Rs. 449',
      '6×8 Inches – Rs. 499',
      '8×12 Inches – Rs. 650',
      'Gold foil embroidery and luxury velvet backing'
    ],
    image: imgWeddingFramesWall,
    galleryImages: [
      imgWeddingFramesWall
    ],
    popular: true,
    rating: 4.9,
    reviewsCount: 112,
    badge: 'LUXURY'
  },
  {
    id: 'islamic-wall-art-set4',
    name: 'Premium Islamic Wall Art Set',
    category: 'Islamic Wall Art',
    categorySlug: 'islamic-wall-art',
    price: 999,
    originalPrice: 1499,
    dimensions: '8 × 12 Inches (each)',
    setSize: 'Set of 4 Panels',
    description: 'Exquisite 4 panels set (8×12 Inches each) printed on 5mm MDF board featuring HD calligraphy artwork for Allah, Muhammad ﷺ, Bismillah, and Ayat-ul-Kursi.',
    features: [
      'Set of 4 Frameless 8×12 MDF Wall Panels',
      'Premium 5mm High-Density MDF Board',
      'HD Matte Print Calligraphy Artwork',
      'Includes Allah, Muhammad ﷺ, Bismillah & Ayat-ul-Kursi',
      'Damage-Free Re-stickable Mounting Tabs Included'
    ],
    image: imgIslamicWallArtSet,
    galleryImages: [
      imgIslamicWallArtSet,
      imgIslamicGoldFrames
    ],
    popular: true,
    rating: 4.9,
    reviewsCount: 184,
    badge: 'HOLY EDITION'
  },
  {
    id: 'motivational-wall-art-set4',
    name: 'Premium Motivational Wall Art Set',
    category: 'Motivational Wall Art',
    categorySlug: 'motivational-wall-art',
    price: 999,
    originalPrice: 1499,
    dimensions: '8 × 12 Inches (each)',
    setSize: 'Set of 4 Panels',
    description: 'Inspiring 4 panels set (8×12 Inches each) printed on 5mm MDF board featuring HD typographic quotes: Dream Big, Stay Focused, Never Give Up, Success Starts Today.',
    features: [
      'Set of 4 Frameless 8×12 MDF Wall Panels',
      'Premium 5mm High-Density MDF Board',
      'HD Matte Print Typographic Quotes',
      'Quotes: Dream Big, Stay Focused, Never Give Up & Success Starts Today',
      'Damage-Free Re-stickable Mounting Tabs Included'
    ],
    image: imgMotivationalWallArtSet,
    galleryImages: [
      imgOfficeMotivational,
      imgMotivationalDetail
    ],
    popular: true,
    rating: 4.9,
    reviewsCount: 142,
    badge: 'OFFICE FAVORITE'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Modern Living Room MDF Photo Grid',
    category: 'MDF Photo Tiles',
    roomType: 'Living Room',
    image: imgMdfTilesLivingroom,
    description: 'Set of 6 large frameless 5mm MDF photo tiles on a luxury wall in a high-end living room setup.',
    productIds: ['mdf-tiles-6x8-set6']
  },
  {
    id: 'g2',
    title: 'Scandinavian Cozy Nursery Room Tiles',
    category: 'MDF Photo Tiles',
    roomType: 'Baby',
    image: imgMdfTilesNursery,
    description: 'Frameless 5mm MDF photo tiles displaying precious baby milestones in a soft Scandinavian nursery room.',
    productIds: ['mdf-tiles-6x8-set6']
  },
  {
    id: 'g3',
    title: 'Executive Office Motivational Inspiration Set',
    category: 'Motivational Wall Art',
    roomType: 'Office',
    image: imgMotivationalWallArtSet,
    description: 'Sleek motivational quote panels mounted in a contemporary executive study and home workspace.',
    productIds: ['motivational-wall-art-set4']
  },
  {
    id: 'g4',
    title: 'Royal Islamic Calligraphy Prayer Corner Set',
    category: 'Islamic Wall Art',
    roomType: 'Prayer Corner',
    image: imgIslamicWallArtSet,
    description: 'Holy calligraphy wall art set featuring Allah, Muhammad ﷺ, Bismillah & Ayat-ul-Kursi in a serene prayer space.',
    productIds: ['islamic-wall-art-set4']
  },
  {
    id: 'g5',
    title: 'Royal Wedding Master Bedroom Gallery',
    category: 'Wedding Frames',
    roomType: 'Wedding',
    image: imgMdfTilesWedding,
    description: 'Luxury wedding memory photo tiles displayed symmetrically above the master bedroom bed.',
    productIds: ['wedding-frames-collection']
  },
  {
    id: 'g6',
    title: 'Grand Family Heritage Gallery Wall',
    category: 'Family Frames',
    roomType: 'Family',
    image: imgFamilyGalleryWall,
    description: 'Timeless wooden frames displaying precious family milestones and family tree memories.',
    productIds: ['family-frames-collection']
  },
  {
    id: 'g7',
    title: 'Warm LED Photo Clips Bedroom Corner',
    category: 'Photo Clip String Lights',
    roomType: 'Bedroom',
    image: imgPhotoClipLights,
    description: 'Cozy bedroom aesthetic with warm LED copper clips displaying personalized photo memories.',
    productIds: ['photo-clip-lights-12']
  },
  {
    id: 'g8',
    title: 'Designer Living Room MDF Decor Tiles',
    category: 'MDF Photo Tiles',
    roomType: 'Living Room',
    image: imgMdfTilesDecor,
    description: 'Luxury home decor layout featuring frameless 8×12 inch MDF photo tiles in a Scandinavian interior.',
    productIds: ['mdf-tiles-8x12-set6']
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Send Photos',
    description: 'Upload your high-res memories through our website or send them directly via WhatsApp.',
    icon: 'Upload'
  },
  {
    step: '02',
    title: 'We Design',
    description: 'Our digital frame artists enhance lighting, color balance, and prepare a 3D digital mockup.',
    icon: 'Palette'
  },
  {
    step: '03',
    title: 'Approve Design',
    description: 'Review the instant preview on WhatsApp and request any free adjustments before printing.',
    icon: 'CheckCircle'
  },
  {
    step: '04',
    title: 'Print & Deliver',
    description: 'Crafted with premium materials in Karachi and delivered safely anywhere across Pakistan.',
    icon: 'Truck'
  }
];

export const WHY_CHOOSE_US = [
  {
    title: 'Premium Materials',
    description: '8mm dense moisture-resistant MDF board backing, velvet finish, and real brass hanging hardware.',
    icon: 'ShieldCheck'
  },
  {
    title: 'HD Printing',
    description: 'Ultra-high definition archival printing providing vivid true-to-life color depth with matte anti-glare lamination.',
    icon: 'Printer'
  },
  {
    title: 'Ready To Hang',
    description: 'Includes damage-free re-stickable mounting strips and pre-installed hooks for effortless wall mounting.',
    icon: 'Sparkles'
  },
  {
    title: 'Elegant Designs',
    description: 'Scandinavian-inspired luxury aesthetics with gold foil accents, modern borders, and clean collage layouts.',
    icon: 'Palette'
  },
  {
    title: 'Nationwide Delivery',
    description: 'Safe shock-proof courier packaging delivered across all cities in Pakistan within 3 to 5 working days.',
    icon: 'MapPin'
  },
  {
    title: 'WhatsApp Ordering',
    description: 'Seamless ordering with instant photo uploading and free digital preview mockups directly on WhatsApp.',
    icon: 'MessageCircle'
  }
];

export const FAQS = [
  {
    q: 'How do I place an order via WhatsApp?',
    a: 'Simply click any "Order on WhatsApp" button on our website! It will automatically open WhatsApp with your chosen product details or photo customization specs pre-filled. You can then attach your photos.'
  },
  {
    q: 'Will MDF photo tiles damage my walls?',
    a: 'Not at all! Our MDF Photo Tiles come with special damage-free double-sided mounting adhesive strips. They hold strong on standard painted walls and can be easily peeled off or repositioned without leaving marks or pulling paint.'
  },
  {
    q: 'What is the delivery time across Pakistan?',
    a: 'Deliveries in Karachi usually take 2 to 3 working days. Deliveries to Lahore, Islamabad, Rawalpindi, and other major Pakistani cities take 3 to 5 working days.'
  },
  {
    q: 'Can I see a design preview before printing?',
    a: 'Yes! After you send your photos, our design team sends you a digital preview mockup on WhatsApp. Printing starts only after you give final approval.'
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept Cash on Delivery (COD) across Pakistan, as well as Bank Transfer, JazzCash, and EasyPaisa for convenience.'
  }
];
