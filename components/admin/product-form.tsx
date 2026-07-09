"use client";

import { useActionState, useMemo, useState } from "react";
import { Plus, Save, X } from "lucide-react";
import { createProduct, updateProduct } from "@/app/actions/admin-actions";
import { categories, conditions, productStatuses } from "@/lib/constants";
import type { Product } from "@/lib/types";
import { slugify } from "@/lib/utils";

const initialState = { ok: false, message: "" };

export function ProductForm({ product }: { product?: Product }) {
  const action = product ? updateProduct : createProduct;
  const [state, formAction, isPending] = useActionState(action, initialState);
  const [sizes, setSizes] = useState(product?.product_sizes.map((item) => ({ size: item.size, stock: item.stock })) || [{ size: "", stock: 1 }]);
  const [imageUrls, setImageUrls] = useState(product?.product_images.map((item) => item.url) || [""]);
  const [name, setName] = useState(product?.name || "");
  const [slug, setSlug] = useState(product?.slug || "");
  const sizesJson = useMemo(() => JSON.stringify(sizes), [sizes]);
  const imageUrlsJson = useMemo(() => JSON.stringify(imageUrls.filter((url) => url.trim())), [imageUrls]);
  return (
    <form action={formAction} className="grid gap-6">
      {product ? <input type="hidden" name="id" value={product.id} /> : null}
      <input type="hidden" name="sizes_json" value={sizesJson} /><input type="hidden" name="image_urls_json" value={imageUrlsJson} />
      <div className="grid gap-4 rounded border border-ink/10 bg-white p-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold">Nume produs<input required name="name" value={name} onChange={(event) => { setName(event.target.value); if (!product) setSlug(slugify(event.target.value)); }} className="h-11 rounded border border-zinc-200 bg-white px-3 font-normal outline-none focus:border-ink" /></label>
        <label className="grid gap-2 text-sm font-bold">URL slug<input required name="slug" value={slug} onChange={(event) => setSlug(slugify(event.target.value))} className="h-11 rounded border border-zinc-200 bg-white px-3 font-normal outline-none focus:border-ink" /></label>
        <label className="grid gap-2 text-sm font-bold">Brand<input required name="brand" defaultValue={product?.brand} className="h-11 rounded border border-zinc-200 bg-white px-3 font-normal outline-none focus:border-ink" /></label>
        <label className="grid gap-2 text-sm font-bold">Pret<input required name="price" type="number" step="0.01" min="0" defaultValue={product?.price} className="h-11 rounded border border-zinc-200 bg-white px-3 font-normal outline-none focus:border-ink" /></label>
        <label className="grid gap-2 text-sm font-bold">Categorie<select required name="category" defaultValue={product?.category || "adidasi"} className="h-11 rounded border border-zinc-200 bg-white px-3 font-normal outline-none focus:border-ink">{categories.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
        <label className="grid gap-2 text-sm font-bold">Stare<select required name="condition" defaultValue={product?.condition || "foarte_buna"} className="h-11 rounded border border-zinc-200 bg-white px-3 font-normal outline-none focus:border-ink">{conditions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
        <label className="grid gap-2 text-sm font-bold">Status<select required name="status" defaultValue={product?.status || "disponibil"} className="h-11 rounded border border-zinc-200 bg-white px-3 font-normal outline-none focus:border-ink">{productStatuses.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
        <label className="grid gap-2 text-sm font-bold md:col-span-2">Descriere<textarea required name="description" rows={5} defaultValue={product?.description} className="rounded border border-zinc-200 bg-white px-3 py-3 font-normal outline-none focus:border-ink" /></label>
      </div>
      <div className="rounded border border-ink/10 bg-white p-5"><div className="flex items-center justify-between gap-3"><h2 className="text-lg font-black">Marimi si stoc</h2><button type="button" onClick={() => setSizes([...sizes, { size: "", stock: 0 }])} className="flex items-center gap-2 rounded border border-ink/10 px-3 py-2 text-sm font-bold"><Plus className="h-4 w-4" />Adauga</button></div><div className="mt-4 grid gap-3">{sizes.map((item, index) => <div key={index} className="grid grid-cols-[1fr_120px_44px] gap-2"><input placeholder="Marime" value={item.size} onChange={(event) => setSizes(sizes.map((row, rowIndex) => rowIndex === index ? { ...row, size: event.target.value } : row))} className="h-11 rounded border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-ink" /><input type="number" min="0" value={item.stock} onChange={(event) => setSizes(sizes.map((row, rowIndex) => rowIndex === index ? { ...row, stock: Number(event.target.value) } : row))} className="h-11 rounded border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-ink" /><button type="button" onClick={() => setSizes(sizes.filter((_, rowIndex) => rowIndex !== index))} className="flex h-11 items-center justify-center rounded border border-ink/10"><X className="h-4 w-4" /></button></div>)}</div></div>
      <div className="rounded border border-ink/10 bg-white p-5"><div className="flex items-center justify-between gap-3"><h2 className="text-lg font-black">Imagini</h2><button type="button" onClick={() => setImageUrls([...imageUrls, ""])} className="flex items-center gap-2 rounded border border-ink/10 px-3 py-2 text-sm font-bold"><Plus className="h-4 w-4" />URL</button></div><div className="mt-4 grid gap-3">{imageUrls.map((url, index) => <div key={index} className="grid grid-cols-[1fr_44px] gap-2"><input placeholder="https://..." value={url} onChange={(event) => setImageUrls(imageUrls.map((row, rowIndex) => rowIndex === index ? event.target.value : row))} className="h-11 rounded border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-ink" /><button type="button" onClick={() => setImageUrls(imageUrls.filter((_, rowIndex) => rowIndex !== index))} className="flex h-11 items-center justify-center rounded border border-ink/10"><X className="h-4 w-4" /></button></div>)}<input name="images" type="file" accept="image/*" multiple className="rounded border border-dashed border-zinc-300 bg-zinc-50 px-3 py-4 text-sm" /></div></div>
      <div className="grid gap-4 rounded border border-ink/10 bg-white p-5 md:grid-cols-2"><label className="grid gap-2 text-sm font-bold md:col-span-2">Note autenticitate<textarea name="authenticity_notes" rows={3} defaultValue={product?.authenticity_notes || ""} className="rounded border border-zinc-200 bg-white px-3 py-3 font-normal outline-none focus:border-ink" /></label><label className="grid gap-2 text-sm font-bold">Proof URL<input name="proof_url" defaultValue={product?.proof_url || ""} className="h-11 rounded border border-zinc-200 bg-white px-3 font-normal outline-none focus:border-ink" /></label><label className="grid gap-2 text-sm font-bold">SEO title<input name="seo_title" defaultValue={product?.seo_title || ""} className="h-11 rounded border border-zinc-200 bg-white px-3 font-normal outline-none focus:border-ink" /></label><label className="grid gap-2 text-sm font-bold md:col-span-2">SEO description<textarea name="seo_description" rows={3} defaultValue={product?.seo_description || ""} className="rounded border border-zinc-200 bg-white px-3 py-3 font-normal outline-none focus:border-ink" /></label></div>
      {state.message ? <p className={state.ok ? "font-bold text-emerald-700" : "font-bold text-red-700"}>{state.message}</p> : null}
      <button disabled={isPending} className="flex w-full items-center justify-center gap-2 rounded bg-ink px-5 py-3 text-sm font-bold text-white md:w-auto md:justify-self-start"><Save className="h-4 w-4" />{isPending ? "Se salveaza..." : "Salveaza produs"}</button>
    </form>
  );
}
