import Link from "next/link";
import { LogOut, Package, Plus, ShoppingBag } from "lucide-react";
import { signOutAdmin } from "@/app/actions/admin-actions";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return <main className="light-panel min-h-[calc(100vh-73px)] bg-bone text-ink"><div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8"><aside className="h-fit rounded border border-ink/10 bg-white p-4"><p className="px-3 text-xs font-black uppercase tracking-[0.18em] text-zinc-500">Admin</p><nav className="mt-4 grid gap-2 text-sm font-bold"><Link className="flex items-center gap-2 rounded px-3 py-2 hover:bg-zinc-100" href="/admin"><Package className="h-4 w-4" />Produse</Link><Link className="flex items-center gap-2 rounded px-3 py-2 hover:bg-zinc-100" href="/admin/products/new"><Plus className="h-4 w-4" />Produs nou</Link><Link className="flex items-center gap-2 rounded px-3 py-2 hover:bg-zinc-100" href="/admin/requests"><ShoppingBag className="h-4 w-4" />Comenzi</Link></nav><form action={signOutAdmin} className="mt-4 border-t border-ink/10 pt-4"><button className="flex w-full items-center gap-2 rounded px-3 py-2 text-sm font-bold text-red-700 hover:bg-red-50"><LogOut className="h-4 w-4" />Logout</button></form></aside><section>{children}</section></div></main>;
}
