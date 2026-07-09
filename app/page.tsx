import Link from "next/link";
import { ArrowRight, PackageCheck, ShieldCheck } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { ProductFilters } from "@/components/product-filters";
import { categories } from "@/lib/constants";
import { getBrands, getProducts } from "@/lib/queries";
import type { ProductFilters as ProductFiltersType } from "@/lib/types";

type Props = { searchParams: Promise<ProductFiltersType> };

export default async function HomePage({ searchParams }: Props) {
  const filters = await searchParams;
  const [products, brands] = await Promise.all([getProducts(filters), getBrands()]);
  return (
    <main>
      <section className="relative overflow-hidden bg-ink">
        <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-mint">Streetwear resell verificat</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">Piese premium cu stoc real pe marimi.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">Sneakers, hanorace si item-uri streetwear autentificate, listate transparent cu poze mari, stare clara si comenzi rapide fara plata online.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link href="#produse" className="flex items-center gap-2 rounded bg-bone px-5 py-3 text-sm font-bold text-ink">Vezi produsele <ArrowRight className="h-4 w-4" /></Link><Link href="/contact" className="rounded border border-white/15 px-5 py-3 text-sm font-bold text-white hover:bg-white hover:text-ink">Contact</Link></div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {["Autenticitate", "Stoc pe marimi", "Comenzi rapide", "Resell curat"].map((title) => <div key={title} className="rounded border border-white/10 bg-white/[0.04] p-5"><ShieldCheck className="h-5 w-5 text-mint" /><h2 className="mt-5 text-lg font-black">{title}</h2><p className="mt-2 text-sm leading-6 text-zinc-400">Proces clar, detalii reale si produse gestionate direct din admin.</p></div>)}
          </div>
        </div>
      </section>
      <section className="light-panel bg-bone py-16" id="produse">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div><p className="text-sm font-black uppercase tracking-[0.18em] text-zinc-500">Catalog live</p><h2 className="mt-2 text-4xl font-black tracking-tight text-ink">Produse disponibile</h2></div>
            <div className="grid grid-cols-3 gap-2 text-sm sm:grid-cols-6">{categories.map((category) => <span key={category.value} className="rounded border border-ink/10 bg-white px-3 py-2 text-center font-bold">{category.label}</span>)}</div>
          </div>
          <div className="mt-8"><ProductFilters brands={brands} /></div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
          {products.length === 0 ? <div className="mt-8 rounded border border-ink/10 bg-white p-8 text-center"><PackageCheck className="mx-auto h-8 w-8 text-zinc-400" /><p className="mt-3 font-bold">Nu exista produse pentru filtrele selectate.</p></div> : null}
        </div>
      </section>
    </main>
  );
}
