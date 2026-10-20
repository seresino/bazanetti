export interface ProductVariant {
  id: string; // numeric Shopify variant id, used in cart permalinks
  title: string;
  availableForSale: boolean;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  altImage?: string;
  material: string;
  gemstones: string;
  sizes: string[];
  variantLabel?: string;
  description: string;
  inStock: boolean;
  variants?: ProductVariant[];
}

export interface GalleryMedia {
  type: "image" | "video";
  url: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  client: string;
  year: string;
  coverImage: string;
  heroImage: string;
  description: string;
  detailMedia: GalleryMedia[];
  tags: string[];
  aspectRatio?: "tall" | "square" | "wide" | "portrait";
}

export interface VaultItem {
  id: string;
  code: string;
  title: string;
  year: string;
  material: string;
  image: string;
  edition: string;
  model3dUrl?: string;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
  variantId?: string;
}

export interface OrderFormData {
  fullName: string;
  email: string;
  metal: string;
  ringSize: string;
  projectDescription: string;
}

export type ActiveTab =
  | "landing"
  | "home"
  | "shop"
  | "works"
  | "vault"
  | "info"
  | "project";
