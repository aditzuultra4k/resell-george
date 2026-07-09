import type { Metadata } from "next";
import { RequestStatusForm } from "@/components/admin/request-status-form";
import { getOrderRequests } from "@/lib/queries";
export const metadata: Metadata = { title: "Comenzi" };
export default async function AdminRequestsPage() {
  const requests = await getOrderRequests();
  return <div><p className="text-sm font-black uppercase tracking-[0.18em] text-zinc-500">Cereri primite</p><h1 className="text-4xl font-black">Comenzi</h1><div className="mt-6 grid gap-4">{requests.map((request) => <article key={request.id} className="rounded border border-ink/10 bg-white p-5"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-start"><div><p className="text-sm text-zinc-500">{new Date(request.created_at).toLocaleString("ro-RO")}</p><h2 className="mt-1 text-xl font-black">{request.product_name}</h2><p className="mt-1 text-sm font-bold">Marime: {request.selected_size}</p></div><RequestStatusForm id={request.id} status={request.status} /></div><div className="mt-4 grid gap-3 text-sm md:grid-cols-3"><p><span className="font-black">Client:</span> {request.customer_name}</p><p><span className="font-black">Telefon:</span> {request.phone}</p><p><span className="font-black">Instagram:</span> {request.instagram || "-"}</p></div>{request.message ? <p className="mt-4 rounded bg-zinc-50 p-3 text-sm text-zinc-700">{request.message}</p> : null}</article>)}{requests.length === 0 ? <p className="rounded border border-ink/10 bg-white p-6 text-center font-bold text-zinc-500">Nu exista cereri inca.</p> : null}</div></div>;
}
