import type { Metadata } from "next";
import { BadgeCheck, ShieldCheck, Truck } from "lucide-react";

export const metadata: Metadata = { title: "About", description: "Despre procesul nostru de resell streetwear si verificare a autenticitatii." };
export default function AboutPage() {
  return <main className="light-panel bg-bone py-16 text-ink"><section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"><p className="text-sm font-black uppercase tracking-[0.18em] text-zinc-500">About</p><h1 className="mt-3 text-5xl font-black tracking-tight">Resell facut transparent.</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-700">Selectam piese relevante de streetwear si sneakers, verificam starea si autenticitatea, apoi listam fiecare produs cu informatii clare despre marimi, stoc si proof.</p><div className="mt-10 grid gap-4 md:grid-cols-3">{[[ShieldCheck, "Verificare"], [BadgeCheck, "Stoc real"], [Truck, "Confirmare rapida"]].map(([Icon, title]) => <div key={String(title)} className="rounded border border-ink/10 bg-white p-6"><Icon className="h-6 w-6" /><h2 className="mt-5 text-xl font-black">{String(title)}</h2><p className="mt-2 text-sm leading-6 text-zinc-700">Proces clar pentru incredere, comenzi si livrare.</p></div>)}</div></section></main>;
}
