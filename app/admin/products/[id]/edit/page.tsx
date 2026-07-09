import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { getProductById } from "@/lib/queries";
type Props = { params: Promise<{ id: string }> };
export const metadata: Metadata = { title: "Editeaza produs" };
export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();
  return <div><Link href="/admin" className="text-sm font-bold underline">Inapoi</Link><h1 className="mt-3 text-4xl font-black">Editeaza produs</h1><div className="mt-6"><ProductForm product={product} /></div></div>;
}
