import type { categories, conditions, productStatuses, requestStatuses } from "@/lib/constants";

export type Category = (typeof categories)[number]["value"];
export type ProductCondition = (typeof conditions)[number]["value"];
export type ProductStatus = (typeof productStatuses)[number]["value"];
export type RequestStatus = (typeof requestStatuses)[number]["value"];

export type ProductImage = { id: string; product_id: string; url: string; alt: string | null; sort_order: number };
export type ProductSize = { id: string; product_id: string; size: string; stock: number; sort_order: number };
export type Product = {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: Category;
  price: number;
  description: string;
  condition: ProductCondition;
  status: ProductStatus;
  authenticity_notes: string | null;
  proof_url: string | null;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
  product_images: ProductImage[];
  product_sizes: ProductSize[];
};
export type OrderRequest = {
  id: string;
  product_id: string | null;
  product_name: string;
  selected_size: string;
  customer_name: string;
  phone: string;
  instagram: string | null;
  message: string | null;
  status: RequestStatus;
  created_at: string;
  updated_at: string;
};
export type ProductFilters = { q?: string; category?: string; brand?: string; size?: string; availability?: string; minPrice?: string; maxPrice?: string };
