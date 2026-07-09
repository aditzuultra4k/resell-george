import Link from "next/link";
import { Instagram, MessageCircle, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/constants";

export function Navbar() {
  const whatsappHref = siteConfig.whatsappNumber ? `https://wa.me/${siteConfig.whatsappNumber}` : "/contact";
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded bg-bone text-ink"><ShieldCheck className="h-5 w-5" /></span>
          <span className="text-sm font-black uppercase tracking-[0.18em]">{siteConfig.name}</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-zinc-300 md:flex">
          <Link href="/#produse" className="hover:text-white">Produse</Link>
          <Link href="/about" className="hover:text-white">About</Link>
          <Link href="/contact" className="hover:text-white">Contact</Link>
          <Link href="/admin" className="hover:text-white">Admin</Link>
        </nav>
        <div className="flex items-center gap-2">
          <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded border border-white/10 text-zinc-200 hover:bg-white hover:text-ink"><Instagram className="h-4 w-4" /></a>
          <a href={whatsappHref} target={siteConfig.whatsappNumber ? "_blank" : undefined} className="hidden items-center gap-2 rounded bg-mint px-4 py-2 text-sm font-bold text-ink hover:bg-white sm:flex"><MessageCircle className="h-4 w-4" />WhatsApp</a>
        </div>
      </div>
    </header>
  );
}
