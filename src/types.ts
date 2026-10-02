export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  itemCount: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  price: number; // in PKR (Rs.)
  originalPrice?: number;
  startingPrice?: boolean;
  dimensions: string;
  setSize: string;
  description: string;
  features: string[];
  image: string;
  galleryImages?: string[];
  popular?: boolean;
  rating: number;
  reviewsCount: number;
  badge?: string;
}

export interface SizeOption {
  id: string;
  label: string;
  dimensions: string;
  setSize?: string;
  price: number;
}

export interface DesignGalleryItem {
  id: string;
  designCode: string;
  code?: string; // Standard alias for designCode
  storagePath?: string; // Firebase Storage path (e.g. 'gallery/motivational/FH-MOT-001.png')
  originalFilename?: string;
  title: string;
  category: 'Family' | 'Baby' | 'Wedding' | 'Islamic' | 'Motivational' | 'Photo Clip Lights';
  categorySlug: 'family' | 'baby' | 'wedding' | 'islamic' | 'motivational' | 'lights';
  image: string;
  description: string;
  badge?: string;
  sizeOptions: SizeOption[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  roomType: string;
  image: string;
  description: string;
  productIds: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  customPhotoUrl?: string;
  customNotes?: string;
}

export interface CustomFrameOrder {
  frameType: string;
  size: string;
  borderStyle: string;
  quantity: number;
  price: number;
  photoUrl: string;
  customText: string;
  customerName: string;
  customerPhone: string;
  customerCity: string;
}
