import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatPrice(price: number) {
  return new Intl.NumberFormat("ro-RO", { style: "currency", currency: "RON", maximumFractionDigits: 0 }).format(price);
}
export function slugify(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}
export function totalStock(sizes: { stock: number }[]) {
  return sizes.reduce((sum, item) => sum + Number(item.stock || 0), 0);
}
export function firstImage(product: { product_images: { url: string }[] }) {
  return product.product_images[0]?.url || "/placeholder-product.svg";
}
