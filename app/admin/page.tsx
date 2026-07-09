import Link from "next/link";
import { Edit, Plus } from "lucide-react";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteProduct } from "@/app/actions/admin-actions";
import { ProductFilters } from "@/components/product-filters";
import { getBrands, getProducts } from "@/lib/queries";
import { formatPrice, totalStock } from "@/lib/utils";
import type { ProductFilters as ProductFiltersType } from "@/lib/types";
import { requireAdminConfig } from "@/lib/admin-guard";

type Props = { searchParams: Promise<ProductFiltersType> };
export default async function AdminProductsPage({ searchParams }: Props) {
  await requireAdminConfig();
  const filters = await searchParams;
  const [products, brands] = await Promise.all([getProducts(filters), getBrands()]);
  return <div><div className="flex flex-col justify-between gap-4 md:flex-row md:items-center"><div><p className="text-sm font-black uppercase tracking-[0.18em] text-zinc-500">Dashboard</p><h1 className="text-4xl font-black">Produse</h1></div><Link href="/admin/products/new" className="flex items-center justify-center gap-2 rounded bg-ink px-5 py-3 text-sm font-bold text-white"><Plus className="h-4 w-4" />Produs nou</Link></div><div className="mt-6"><ProductFilters brands={brands} /></div><div className="mt-6 overflow-hidden rounded border border-ink/10 bg-white"><div className="hidden grid-cols-[1.4fr_1fr_1fr_120px_180px] gap-4 border-b border-ink/10 px-4 py-3 text-xs font-black uppercase tracking-wide text-zinc-500 md:grid"><span>Produs</span><span>Brand</span><span>Pret</span><span>Stoc</span><span>Actiuni</span></div>{products.map((product) => <div key={product.id} className="grid gap-3 border-b border-ink/10 px-4 py-4 md:grid-cols-[1.4fr_1fr_1fr_120px_180px] md:items-center"><div><p className="font-black">{product.name}</p><p className="text-sm text-zinc-500">/{product.slug}</p></div><p>{product.brand}</p><p className="font-bold">{formatPrice(product.price)}</p><p>{totalStock(product.product_sizes)}</p><div className="flex gap-2"><Link href={`/admin/products/${product.id}/edit`} className="inline-flex items-center gap-2 rounded border border-ink/10 px-3 py-2 text-sm font-bold hover:bg-zinc-100"><Edit className="h-4 w-4" />Edit</Link><form action={deleteProduct}><input type="hidden" name="id" value={product.id} /><DeleteButton /></form></div></div>)}{products.length === 0 ? <p className="p-6 text-center font-bold text-zinc-500">Nu exista produse.</p> : null}</div></div>;
}
