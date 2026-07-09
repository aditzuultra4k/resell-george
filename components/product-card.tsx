import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui";
import type { Product } from "@/lib/types";
import { firstImage, formatPrice, totalStock } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const stock = totalStock(product.product_sizes);
  const soldOut = product.status === "sold_out" || stock === 0;
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <article className="overflow-hidden rounded border border-ink/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-glow">
        <div className="relative aspect-[4/5] bg-zinc-100">
          <Image src={firstImage(product)} alt={product.product_images[0]?.alt || product.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />
          <Badge className={`absolute left-3 top-3 ${soldOut ? "bg-red-600 text-white" : "bg-emerald-400 text-ink"}`}>{soldOut ? "Sold out" : "Disponibil"}</Badge>
        </div>
        <div className="light-panel p-4">
          <div className="flex items-start justify-between gap-4">
            <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">{product.brand}</p><h3 className="mt-1 line-clamp-2 text-lg font-black text-ink">{product.name}</h3></div>
            <p className="whitespace-nowrap text-base font-black">{formatPrice(product.price)}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-600">
            {product.product_sizes.map((size) => <span key={size.id} className={size.stock > 0 ? "rounded bg-zinc-100 px-2 py-1" : "rounded bg-zinc-100 px-2 py-1 line-through opacity-45"}>{size.size}</span>)}
          </div>
        </div>
      </article>
    </Link>
  );
}
