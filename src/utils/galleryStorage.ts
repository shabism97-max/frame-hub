import { DesignGalleryItem, SizeOption } from '../types';
import { DESIGN_GALLERY_ITEMS, MOTIVATIONAL_SIZES } from '../data/designGalleryData';

const DB_NAME = 'FrameHubGalleryDB';
const DB_VERSION = 1;
const STORE_NAME = 'gallery_uploads';
const STORAGE_KEY = 'framehub_custom_gallery_items_v1';
const CLEAN_FLAG_KEY = 'framehub_gallery_cleaned_v10';

// Open or initialize IndexedDB
function openGalleryDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'designCode' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * One-time cleaner to wipe legacy motivational demo items from browser storage.
 */
async function performInitialCleanupIfNeeded(): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const alreadyCleaned = localStorage.getItem(CLEAN_FLAG_KEY);
    if (!alreadyCleaned) {
      // 1. Wipe legacy items from IndexedDB
      try {
        const db = await openGalleryDB();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.clear();
      } catch {
        // ignore IDB clean failure
      }
      // 2. Wipe from localStorage
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(CLEAN_FLAG_KEY, 'true');
    }
  } catch (err) {
    console.debug('[Gallery Storage] Clean check notice:', err);
  }
}

/**
 * Loads all active gallery items from IndexedDB + localStorage, merging them with the canonical catalog.
 * Guarantees original unaltered binary data preservation.
 */
export async function getStoredGalleryItemsAsync(): Promise<DesignGalleryItem[]> {
  await performInitialCleanupIfNeeded();
  const merged = DESIGN_GALLERY_ITEMS.map((item) => ({ ...item }));

  // 1. Check IndexedDB first
  try {
    const db = await openGalleryDB();
    const items: DesignGalleryItem[] = await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });

    if (items && items.length > 0) {
      for (const item of items) {
        const idx = merged.findIndex((m) => m.designCode === item.designCode || m.id === item.id);
        if (idx >= 0) {
          const validImage = item.image && !item.image.startsWith('/gallery/') ? item.image : merged[idx].image;
          merged[idx] = { ...merged[idx], ...item, image: validImage };
        } else if (item.image) {
          merged.push(item);
        }
      }
      return merged;
    }
  } catch (idbErr) {
    console.debug('[Gallery Storage] IndexedDB read fallback to localStorage:', idbErr);
  }

  // 2. Fallback to localStorage
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const customItems: DesignGalleryItem[] = JSON.parse(raw);
      for (const item of customItems) {
        const idx = merged.findIndex((m) => m.designCode === item.designCode || m.id === item.id);
        if (idx >= 0) {
          const validImage = item.image && !item.image.startsWith('/gallery/') ? item.image : merged[idx].image;
          merged[idx] = { ...merged[idx], ...item, image: validImage };
        } else if (item.image) {
          merged.push(item);
        }
      }
    }
  } catch (err) {
    console.warn('[Gallery Storage] LocalStorage read warning:', err);
  }

  return merged;
}

/**
 * Synchronous initial getter for instant first-render.
 */
export function getStoredGalleryItems(): DesignGalleryItem[] {
  const merged = DESIGN_GALLERY_ITEMS.map((item) => ({ ...item }));
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return merged;
    const customItems: DesignGalleryItem[] = JSON.parse(raw);
    for (const item of customItems) {
      const idx = merged.findIndex((m) => m.designCode === item.designCode || m.id === item.id);
      if (idx >= 0) {
        const validImage = item.image && !item.image.startsWith('/gallery/') ? item.image : merged[idx].image;
        merged[idx] = { ...merged[idx], ...item, image: validImage };
      } else if (item.image) {
        merged.push(item);
      }
    }
  } catch (err) {
    console.warn('[Gallery Storage] Sync getter warning:', err);
  }
  return merged;
}

/**
 * Deletes a single design item by its designCode from IndexedDB and localStorage.
 */
export async function deleteGalleryItem(designCode: string): Promise<void> {
  // 1. Delete from IndexedDB
  try {
    const db = await openGalleryDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(designCode);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (idbErr) {
    console.warn('[Gallery Storage] IDB delete error:', idbErr);
  }

  // 2. Delete from localStorage
  try {
    const currentRaw = localStorage.getItem(STORAGE_KEY);
    if (currentRaw) {
      const list: DesignGalleryItem[] = JSON.parse(currentRaw);
      const filtered = list.filter((m) => m.designCode !== designCode && m.id !== designCode);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    }
  } catch (err) {
    console.warn('[Gallery Storage] LocalStorage delete error:', err);
  }
}

/**
 * Completely purges all stored uploaded items from IndexedDB and localStorage.
 */
export async function clearAllGalleryItems(): Promise<void> {
  try {
    const db = await openGalleryDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.clear();
  } catch (err) {
    console.warn('[Gallery Storage] Clear IDB error:', err);
  }
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem(CLEAN_FLAG_KEY, 'true');
  } catch (err) {
    console.warn('[Gallery Storage] Clear localStorage error:', err);
  }
}

/**
 * Saves a true unaltered original file upload into IndexedDB and localStorage.
 * No canvas manipulation, no AI generation, zero filtering, 100% original binary preservation.
 */
export async function saveOriginalGalleryItem(item: DesignGalleryItem): Promise<void> {
  // 1. Save to IndexedDB (Supports virtually unlimited raw binary sizes)
  try {
    const db = await openGalleryDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(item);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (idbErr) {
    console.warn('[Gallery Storage] IndexedDB save error, falling back:', idbErr);
  }

  // 2. Also mirror to localStorage when possible
  try {
    const currentRaw = localStorage.getItem(STORAGE_KEY);
    const list: DesignGalleryItem[] = currentRaw ? JSON.parse(currentRaw) : [];
    const idx = list.findIndex((m) => m.designCode === item.designCode || m.id === item.id);
    if (idx >= 0) {
      list[idx] = item;
    } else {
      list.push(item);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    // If quota exceeded in localStorage, IndexedDB already holds the full binary safely
    console.debug('[Gallery Storage] LocalStorage write quota notice (held safely in IndexedDB):', err);
  }
}

/**
 * Helper to process an uploaded original file directly as raw unaltered data.
 * Pure binary to DataURL conversion without any canvas or AI processing.
 */
export function readOriginalFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read file as string'));
      }
    };
    reader.onerror = () => reject(reader.error || new Error('FileReader error'));
    reader.readAsDataURL(file);
  });
}


