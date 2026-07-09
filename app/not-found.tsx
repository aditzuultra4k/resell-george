import Link from "next/link";

export default function NotFound() {
  return <main className="light-panel bg-bone px-4 py-20 text-center text-ink"><h1 className="text-4xl font-black">Pagina nu exista</h1><Link href="/" className="mt-6 inline-block rounded bg-ink px-5 py-3 text-sm font-bold text-white">Inapoi acasa</Link></main>;
}
