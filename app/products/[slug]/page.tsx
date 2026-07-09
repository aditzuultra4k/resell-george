import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Instagram, MessageCircle, ShieldCheck } from "lucide-react";
import { OrderForm } from "@/components/order-form";
import { Badge } from "@/components/ui";
import { siteConfig } from "@/lib/constants";
import { getProductBySlug } from "@/lib/queries";
import { firstImage, formatPrice, totalStock } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  const image = firstImage(product);
  const title = product.seo_title || `${product.name} - ${formatPrice(product.price)}`;
  const description = product.seo_description || product.description.slice(0, 150);
  return { title, description, openGraph: { title, description, type: "website", url: `${siteConfig.siteUrl}/products/${product.slug}`, images: [{ url: image, width: 1200, height: 900, alt: product.name }] }, twitter: { card: "summary_large_image", title, description, images: [image] } };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const stock = totalStock(product.product_sizes);
  const soldOut = product.status === "sold_out" || stock === 0;
  const whatsappText = encodeURIComponent(`Salut! Vreau detalii despre ${product.name}.`);
  const whatsappHref = siteConfig.whatsappNumber ? `https://wa.me/${siteConfig.whatsappNumber}?text=${whatsappText}` : "#order";
  return (
    <main className="light-panel bg-bone py-10 text-ink">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div><div className="relative aspect-[4/5] overflow-hidden rounded border border-ink/10 bg-white"><Image src={firstImage(product)} alt={product.name} fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" /><Badge className={`absolute left-4 top-4 ${soldOut ? "bg-red-600 text-white" : "bg-emerald-400 text-ink"}`}>{soldOut ? "Sold out" : "Disponibil"}</Badge></div></div>
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-zinc-500">{product.brand}</p><h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">{product.name}</h1><p className="mt-4 text-3xl font-black">{formatPrice(product.price)}</p><p className="mt-5 text-base leading-7 text-zinc-700">{product.description}</p>
          <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">{[["Categorie", product.category], ["Stare", product.condition.replace("_", " ")], ["Stoc total", String(stock)], ["Status", soldOut ? "Sold out" : "Disponibil"]].map(([k, v]) => <div key={k} className="rounded border border-ink/10 bg-white p-4"><dt className="text-zinc-500">{k}</dt><dd className="mt-1 font-black capitalize">{v}</dd></div>)}</dl>
          <div className="mt-5 rounded border border-ink/10 bg-white p-4"><div className="flex items-center gap-2 font-black"><ShieldCheck className="h-5 w-5" />Autenticitate</div><p className="mt-2 text-sm leading-6 text-zinc-700">{product.authenticity_notes || "Produs verificat inainte de listare. Proof disponibil la cerere."}</p>{product.proof_url ? <a className="mt-2 inline-block text-sm font-bold underline" href={product.proof_url} target="_blank" rel="noreferrer">Vezi proof</a> : null}</div>
          <div className="mt-5 flex gap-3"><a href={whatsappHref} target={siteConfig.whatsappNumber ? "_blank" : undefined} className="flex flex-1 items-center justify-center gap-2 rounded bg-ink px-5 py-3 text-sm font-bold text-white"><MessageCircle className="h-4 w-4" />WhatsApp</a><a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center rounded border border-ink/10 bg-white px-5 py-3"><Instagram className="h-4 w-4" /></a></div>
          <div className="mt-5" id="order">{soldOut ? <div className="rounded border border-ink/10 bg-white p-5 font-bold">Produsul este sold out momentan.</div> : <OrderForm product={product} />}</div>
          <Link href="/#produse" className="mt-5 inline-block text-sm font-bold underline">Inapoi la catalog</Link>
        </div>
      </div>
    </main>
  );
}
