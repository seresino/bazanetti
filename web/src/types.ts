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
  description: string;
  inStock: boolean;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  coverImage: string;
  heroImage: string;
  description: string;
  detailImages: string[];
  tags: string[];
  aspectRatio?: 'tall' | 'square' | 'wide' | 'portrait';
}

export interface VaultItem {
  id: string;
  code: string;
  title: string;
  year: string;
  material: string;
  image: string;
  edition: string;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface OrderFormData {
  fullName: string;
  email: string;
  metal: string;
  ringSize: string;
  projectDescription: string;
}

export type ActiveTab = 'landing' | 'home' | 'shop' | 'works' | 'vault' | 'info' | 'project';
