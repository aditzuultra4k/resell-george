import { Search } from "lucide-react";
import { categories } from "@/lib/constants";

export function ProductFilters({ brands }: { brands: string[] }) {
  return (
    <form action="/#produse" className="light-panel grid gap-3 rounded border border-ink/10 bg-white p-4 shadow-sm md:grid-cols-6">
      <label className="relative md:col-span-2"><Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-zinc-400" /><input name="q" placeholder="Cauta produs sau brand" className="h-11 w-full rounded border border-zinc-200 bg-white pl-10 pr-3 text-sm outline-none focus:border-ink" /></label>
      <select name="category" className="h-11 rounded border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-ink"><option value="">Categorie</option>{categories.map((category) => <option key={category.value} value={category.value}>{category.label}</option>)}</select>
      <select name="brand" className="h-11 rounded border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-ink"><option value="">Brand</option>{brands.map((brand) => <option key={brand} value={brand}>{brand}</option>)}</select>
      <input name="size" placeholder="Marime" className="h-11 rounded border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-ink" />
      <select name="availability" className="h-11 rounded border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-ink"><option value="">Disponibilitate</option><option value="available">Disponibil</option><option value="sold_out">Sold out</option></select>
      <div className="grid grid-cols-2 gap-3 md:col-span-2"><input name="minPrice" type="number" placeholder="Pret min" className="h-11 rounded border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-ink" /><input name="maxPrice" type="number" placeholder="Pret max" className="h-11 rounded border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-ink" /></div>
      <button className="h-11 rounded bg-ink px-5 text-sm font-bold text-white md:col-span-4">Filtreaza</button>
    </form>
  );
}
