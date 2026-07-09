import Link from "next/link";
import { Instagram, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-bone py-12 text-ink">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em]">{siteConfig.name}</p>
          <p className="mt-4 max-w-md text-sm leading-6 text-zinc-700">Piese streetwear, sneakers si accesorii verificate, prezentate transparent cu stoc real pe marimi.</p>
        </div>
        <div className="grid gap-3 text-sm"><Link href="/#produse">Produse</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/admin">Admin</Link></div>
        <div className="flex items-start gap-3">
          <a className="rounded border border-ink/10 p-3 hover:bg-white" href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
          <a className="rounded border border-ink/10 p-3 hover:bg-white" href={siteConfig.whatsappNumber ? `https://wa.me/${siteConfig.whatsappNumber}` : "/contact"} aria-label="WhatsApp"><MessageCircle className="h-5 w-5" /></a>
        </div>
      </div>
    </footer>
  );
}
