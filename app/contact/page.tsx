import type { Metadata } from "next";
import { Instagram, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = { title: "Contact", description: "Contact pentru comenzi rapide de haine si adidasi resell." };
export default function ContactPage() {
  return <main className="light-panel bg-bone py-16 text-ink" id="contact"><section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"><p className="text-sm font-black uppercase tracking-[0.18em] text-zinc-500">Contact</p><h1 className="mt-3 text-5xl font-black tracking-tight">Hai sa confirmam piesa.</h1><p className="mt-5 text-lg leading-8 text-zinc-700">Pentru intrebari, poze extra, proof sau rezervari rapide, scrie-ne pe WhatsApp sau Instagram.</p><div className="mt-8 flex flex-wrap gap-3"><a href={siteConfig.whatsappNumber ? `https://wa.me/${siteConfig.whatsappNumber}` : "#"} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded bg-ink px-5 py-3 text-sm font-bold text-white"><MessageCircle className="h-4 w-4" />WhatsApp</a><a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded border border-ink/10 bg-white px-5 py-3 text-sm font-bold"><Instagram className="h-4 w-4" />Instagram</a></div></section></main>;
}
