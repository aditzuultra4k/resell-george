"use client";

import { useMemo, useState, useTransition } from "react";
import { Send } from "lucide-react";
import { createOrderRequest } from "@/app/actions/order-actions";
import type { Product } from "@/lib/types";

export function OrderForm({ product }: { product: Product }) {
  const firstAvailable = useMemo(() => product.product_sizes.find((item) => item.stock > 0)?.size || "", [product.product_sizes]);
  const [selectedSize, setSelectedSize] = useState(firstAvailable);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  return (
    <form className="light-panel rounded border border-ink/10 bg-white p-5 shadow-sm" action={(formData) => startTransition(async () => setMessage((await createOrderRequest(formData)).message))}>
      <input type="hidden" name="product_id" value={product.id} /><input type="hidden" name="product_name" value={product.name} /><input type="hidden" name="selected_size" value={selectedSize} />
      <p className="text-sm font-black uppercase tracking-[0.16em] text-zinc-500">Cerere comanda</p>
      <div className="mt-4"><p className="mb-2 text-sm font-bold">Alege marimea</p><div className="grid grid-cols-4 gap-2">{product.product_sizes.map((item) => <button key={item.id} type="button" disabled={item.stock === 0} onClick={() => setSelectedSize(item.size)} className={`h-11 rounded border text-sm font-bold ${selectedSize === item.size ? "border-ink bg-ink text-white" : "border-zinc-200 bg-white text-ink"} disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-400 disabled:line-through`}>{item.size}</button>)}</div></div>
      <div className="mt-5 grid gap-3"><input required name="customer_name" placeholder="Nume" className="h-11 rounded border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-ink" /><input required name="phone" placeholder="Telefon" className="h-11 rounded border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-ink" /><input name="instagram" placeholder="Instagram" className="h-11 rounded border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-ink" /><textarea name="message" placeholder="Mesaj optional" rows={4} className="rounded border border-zinc-200 bg-white px-3 py-3 text-sm outline-none focus:border-ink" /></div>
      <button disabled={!selectedSize || isPending} className="mt-4 flex w-full items-center justify-center gap-2 rounded bg-ink px-5 py-3 text-sm font-bold text-white hover:bg-zinc-700 disabled:opacity-50"><Send className="h-4 w-4" />{isPending ? "Se trimite..." : "Trimite cererea"}</button>
      {message ? <p className="mt-3 text-sm font-semibold text-zinc-700">{message}</p> : null}
    </form>
  );
}
