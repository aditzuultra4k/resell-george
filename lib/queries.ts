import { cache } from "react";
import { demoProducts, demoRequests } from "@/lib/demo";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import type { OrderRequest, Product, ProductFilters } from "@/lib/types";

const productSelect = "*, product_images (*), product_sizes (*)";

function filterProducts(products: Product[], filters: ProductFilters = {}) {
  return products.filter((product) => {
    const q = filters.q?.toLowerCase();
    if (q && !`${product.name} ${product.brand} ${product.description}`.toLowerCase().includes(q)) return false;
    if (filters.category && product.category !== filters.category) return false;
    if (filters.brand && product.brand.toLowerCase() !== filters.brand.toLowerCase()) return false;
    if (filters.size && !product.product_sizes.some((item) => item.size.toLowerCase() === filters.size?.toLowerCase())) return false;
    if (filters.availability === "available" && product.status !== "disponibil") return false;
    if (filters.availability === "sold_out" && product.status !== "sold_out") return false;
    if (filters.minPrice && product.price < Number(filters.minPrice)) return false;
    if (filters.maxPrice && product.price > Number(filters.maxPrice)) return false;
    return true;
  });
}

export const getProducts = cache(async (filters: ProductFilters = {}) => {
  if (!hasSupabaseEnv()) return filterProducts(demoProducts, filters);
  const supabase = await createClient();
  let query = supabase.from("products").select(productSelect).order("created_at", { ascending: false });
  if (filters.q) query = query.or(`name.ilike.%${filters.q}%,brand.ilike.%${filters.q}%,description.ilike.%${filters.q}%`);
  if (filters.category) query = query.eq("category", filters.category);
  if (filters.brand) query = query.ilike("brand", filters.brand);
  if (filters.availability === "available") query = query.eq("status", "disponibil");
  if (filters.availability === "sold_out") query = query.eq("status", "sold_out");
  if (filters.minPrice) query = query.gte("price", Number(filters.minPrice));
  if (filters.maxPrice) query = query.lte("price", Number(filters.maxPrice));
  const { data, error } = await query;
  if (error) throw error;
  return filterProducts((data || []) as Product[], { size: filters.size });
});

export const getProductBySlug = cache(async (slug: string) => {
  if (!hasSupabaseEnv()) return demoProducts.find((product) => product.slug === slug) || null;
  const supabase = await createClient();
  const { data, error } = await supabase.from("products").select(productSelect).eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data as Product | null;
});

export async function getProductById(id: string) {
  if (!hasSupabaseEnv()) return demoProducts.find((product) => product.id === id) || null;
  const supabase = await createClient();
  const { data, error } = await supabase.from("products").select(productSelect).eq("id", id).maybeSingle();
  if (error) throw error;
  return data as Product | null;
}

export async function getBrands() {
  const products = await getProducts({});
  return Array.from(new Set(products.map((item) => item.brand))).sort();
}

export async function getOrderRequests() {
  if (!hasSupabaseEnv()) return demoRequests;
  const supabase = await createClient();
  const { data, error } = await supabase.from("order_requests").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []) as OrderRequest[];
}
