import { promises as fs } from "fs";
import path from "path";
import {
  seedInstagram,
  seedOrders,
  seedProducts,
  seedReviews,
  siteSettings,
} from "@/data/seed";
import type {
  InstagramPost,
  Order,
  Product,
  Review,
  SiteSettings,
} from "@/lib/types";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "crm-store.json");

interface StoreData {
  products: Product[];
  reviews: Review[];
  instagram: InstagramPost[];
  orders: Order[];
  settings: SiteSettings;
}

const DEFAULT_STORE: StoreData = {
  products: seedProducts,
  reviews: seedReviews,
  instagram: seedInstagram,
  orders: seedOrders,
  settings: siteSettings,
};

/** In-memory store for serverless (Vercel) where FS is read-only. */
declare global {
  // eslint-disable-next-line no-var
  var __ssCrmStore: StoreData | undefined;
}

function cloneDefault(): StoreData {
  return structuredClone(DEFAULT_STORE);
}

function getMemory(): StoreData {
  if (!globalThis.__ssCrmStore) {
    globalThis.__ssCrmStore = cloneDefault();
  }
  return globalThis.__ssCrmStore;
}

function setMemory(data: StoreData): void {
  globalThis.__ssCrmStore = data;
}

async function canUseFilesystem(): Promise<boolean> {
  // Vercel / serverless: prefer memory for writes
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return false;
  }
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(DATA_DIR);
    return true;
  } catch {
    return false;
  }
}

async function ensureStore(): Promise<StoreData> {
  const useFs = await canUseFilesystem();
  if (!useFs) {
    return getMemory();
  }

  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<StoreData>;
    const merged: StoreData = {
      products: parsed.products ?? DEFAULT_STORE.products,
      reviews: parsed.reviews ?? DEFAULT_STORE.reviews,
      instagram: parsed.instagram ?? DEFAULT_STORE.instagram,
      orders: parsed.orders ?? DEFAULT_STORE.orders,
      settings: parsed.settings ?? DEFAULT_STORE.settings,
    };
    setMemory(merged);
    return merged;
  } catch {
    const data = cloneDefault();
    try {
      await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
    } catch {
      /* ignore write errors */
    }
    setMemory(data);
    return data;
  }
}

async function writeStore(data: StoreData): Promise<void> {
  setMemory(data);
  const useFs = await canUseFilesystem();
  if (!useFs) return;
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch {
    /* serverless / read-only FS — memory is source of truth */
  }
}

export async function getStore(): Promise<StoreData> {
  return ensureStore();
}

export async function getProducts(): Promise<Product[]> {
  const store = await ensureStore();
  return store.products;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.id === id);
}

export async function saveProducts(products: Product[]): Promise<Product[]> {
  const store = await ensureStore();
  store.products = products;
  await writeStore(store);
  return products;
}

export async function upsertProduct(product: Product): Promise<Product> {
  const store = await ensureStore();
  const idx = store.products.findIndex((p) => p.id === product.id);
  if (idx >= 0) store.products[idx] = product;
  else store.products.unshift(product);
  await writeStore(store);
  return product;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const store = await ensureStore();
  const before = store.products.length;
  store.products = store.products.filter((p) => p.id !== id);
  await writeStore(store);
  return store.products.length < before;
}

export async function getReviews(): Promise<Review[]> {
  const store = await ensureStore();
  return store.reviews;
}

export async function saveReviews(reviews: Review[]): Promise<Review[]> {
  const store = await ensureStore();
  store.reviews = reviews;
  await writeStore(store);
  return reviews;
}

export async function getInstagram(): Promise<InstagramPost[]> {
  const store = await ensureStore();
  return store.instagram;
}

export async function saveInstagram(posts: InstagramPost[]): Promise<InstagramPost[]> {
  const store = await ensureStore();
  store.instagram = posts;
  await writeStore(store);
  return posts;
}

export async function getOrders(): Promise<Order[]> {
  const store = await ensureStore();
  return store.orders;
}

export async function saveOrders(orders: Order[]): Promise<Order[]> {
  const store = await ensureStore();
  store.orders = orders;
  await writeStore(store);
  return orders;
}

export async function getSettings(): Promise<SiteSettings> {
  const store = await ensureStore();
  return store.settings;
}
