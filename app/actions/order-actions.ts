"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";

export async function createOrderRequest(formData: FormData) {
  const payload = {
    product_id: String(formData.get("product_id") || ""),
    product_name: String(formData.get("product_name") || ""),
    selected_size: String(formData.get("selected_size") || ""),
    customer_name: String(formData.get("customer_name") || ""),
    phone: String(formData.get("phone") || ""),
    instagram: String(formData.get("instagram") || "") || null,
    message: String(formData.get("message") || "") || null
  };

  if (!payload.product_name || !payload.selected_size || !payload.customer_name || !payload.phone) {
    return { ok: false, message: "Completeaza numele, telefonul si marimea." };
  }
  if (!hasSupabaseEnv()) return { ok: true, message: "Demo local: cererea ar fi trimisa cand configurezi Supabase." };

  const supabase = await createClient();
  const { error } = await supabase.from("order_requests").insert(payload);
  if (error) return { ok: false, message: "Cererea nu a putut fi trimisa. Incearca din nou." };
  revalidatePath("/admin/requests");
  return { ok: true, message: "Cererea a fost trimisa. Te contactam rapid pentru confirmare." };
}
