import type { Metadata } from "next";
import Link from "next/link";
import { ProductForm } from "@/components/admin/product-form";
export const metadata: Metadata = { title: "Produs nou" };
export default function NewProductPage() {
  return <div><Link href="/admin" className="text-sm font-bold underline">Inapoi</Link><h1 className="mt-3 text-4xl font-black">Adauga produs</h1><div className="mt-6"><ProductForm /></div></div>;
}
