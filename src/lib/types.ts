export type ProductCategory =
  | "Sourdough Bread"
  | "pastry"
  | "buns"
  | "subscription"
  | "other";

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  shortDescription: string;
  description: string;
  ingredients?: string;
  allergens?: string;
  images: string[];
  category: ProductCategory | string;
  featured: boolean;
  inStock: boolean;
  variants?: ProductVariant[];
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  source: "google" | "website";
  featured: boolean;
  avatarInitials?: string;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  permalink: string;
  featured: boolean;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone?: string;
  items: { productId: string; name: string; quantity: number; price: number }[];
  total: number;
  status: "pending" | "confirmed" | "ready" | "completed" | "cancelled";
  createdAt: string;
  notes?: string;
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variantId?: string;
  variantName?: string;
}

export interface SiteSettings {
  businessName: string;
  tagline: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  city: string;
  hours: string;
  instagramUrl: string;
  facebookUrl: string;
  googleReviewsUrl: string;
  aboutStory: string;
}
