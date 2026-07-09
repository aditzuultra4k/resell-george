"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { slugify } from "@/lib/utils";

type ActionResult = { ok: boolean; message: string };
export async function envAdminLogin(formData: FormData) {
  const expectedEmail = process.env.ADMIN_EMAIL;
  const expectedPassword = process.env.ADMIN_PASSWORD;
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!expectedEmail || !expectedPassword) {
    return { ok: false, message: "Adminul nu este configurat in Vercel." };
  }

  if (email !== expectedEmail.toLowerCase() || password !== expectedPassword) {
    return { ok: false, message: "Email sau parola incorecta." };
  }

  const cookieStore = await cookies();
  cookieStore.set("resell_env_admin", "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });

  return { ok: true, message: "Autentificat." };
}
function required(formData: FormData, key: string) {
  const value = String(formData.get(key) || "").trim();
  if (!value) throw new Error(`Campul ${key} este obligatoriu.`);
  return value;
}

async function uploadImages(files: File[], slug: string) {
  const supabase = await createClient();
  const urls: string[] = [];
  for (const file of files) {
    if (!file.size) continue;
    const extension = file.name.split(".").pop() || "jpg";
    const path = `${slug}/${crypto.randomUUID()}.${extension}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file, { cacheControl: "3600" });
    if (error) throw error;
    urls.push(supabase.storage.from("product-images").getPublicUrl(path).data.publicUrl);
  }
  return urls;
}

async function saveRelations(productId: string, slug: string, formData: FormData) {
  const supabase = await createClient();
  const sizes = JSON.parse(String(formData.get("sizes_json") || "[]")) as { size: string; stock: number }[];
  const imageUrls = JSON.parse(String(formData.get("image_urls_json") || "[]")) as string[];
  const files = formData.getAll("images").filter((value): value is File => value instanceof File);
  const uploadedUrls = await uploadImages(files, slug);

  await supabase.from("product_sizes").delete().eq("product_id", productId);
  if (sizes.length) {
    const { error } = await supabase.from("product_sizes").insert(sizes.filter((item) => item.size.trim()).map((item, index) => ({ product_id: productId, size: item.size.trim(), stock: Math.max(0, Number(item.stock || 0)), sort_order: index })));
    if (error) throw error;
  }
  await supabase.from("product_images").delete().eq("product_id", productId);
  const images = [...imageUrls.filter(Boolean), ...uploadedUrls];
  if (images.length) {
    const { error } = await supabase.from("product_images").insert(images.map((url, index) => ({ product_id: productId, url, alt: String(formData.get("name") || ""), sort_order: index })));
    if (error) throw error;
  }
}

export async function createProduct(_: ActionResult, formData: FormData): Promise<ActionResult> {
  if (!hasSupabaseEnv()) return { ok: false, message: "Configureaza Supabase in .env.local pentru a salva produse." };
  try {
    const supabase = await createClient();
    const name = required(formData, "name");
    const slug = slugify(String(formData.get("slug") || name));
    const { data, error } = await supabase.from("products").insert({
      name, slug, brand: required(formData, "brand"), category: required(formData, "category"), price: Number(required(formData, "price")),
      description: required(formData, "description"), condition: required(formData, "condition"), status: required(formData, "status"),
      authenticity_notes: String(formData.get("authenticity_notes") || "") || null, proof_url: String(formData.get("proof_url") || "") || null,
      seo_title: String(formData.get("seo_title") || "") || null, seo_description: String(formData.get("seo_description") || "") || null
    }).select("id").single();
    if (error) throw error;
    await saveRelations(data.id, slug, formData);
    revalidatePath("/");
    revalidatePath("/admin");
    return { ok: true, message: "Produsul a fost adaugat." };
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "Produsul nu a putut fi salvat." };
  }
}

export async function updateProduct(_: ActionResult, formData: FormData): Promise<ActionResult> {
  if (!hasSupabaseEnv()) return { ok: false, message: "Configureaza Supabase in .env.local pentru a salva produse." };
  try {
    const supabase = await createClient();
    const id = required(formData, "id");
    const name = required(formData, "name");
    const slug = slugify(String(formData.get("slug") || name));
    const { error } = await supabase.from("products").update({
      name, slug, brand: required(formData, "brand"), category: required(formData, "category"), price: Number(required(formData, "price")),
      description: required(formData, "description"), condition: required(formData, "condition"), status: required(formData, "status"),
      authenticity_notes: String(formData.get("authenticity_notes") || "") || null, proof_url: String(formData.get("proof_url") || "") || null,
      seo_title: String(formData.get("seo_title") || "") || null, seo_description: String(formData.get("seo_description") || "") || null
    }).eq("id", id);
    if (error) throw error;
    await saveRelations(id, slug, formData);
    revalidatePath("/");
    revalidatePath("/admin");
    return { ok: true, message: "Produsul a fost actualizat." };
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "Produsul nu a putut fi actualizat." };
  }
}

export async function deleteProduct(formData: FormData) {
  if (!hasSupabaseEnv()) return;
  const supabase = await createClient();
  await supabase.from("products").delete().eq("id", required(formData, "id"));
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateRequestStatus(formData: FormData) {
  if (!hasSupabaseEnv()) return;
  const supabase = await createClient();
  await supabase.from("order_requests").update({ status: required(formData, "status") }).eq("id", required(formData, "id"));
  revalidatePath("/admin/requests");
}

export async function signOutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("resell_env_admin");
  if (hasSupabaseEnv()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect("/admin/login");
}
