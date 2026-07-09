import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { hasSupabaseEnv } from "@/lib/supabase/env";

export async function requireAdminConfig() {
  if (hasSupabaseEnv() || process.env.NODE_ENV !== "production") return;

  const cookieStore = await cookies();
  if (cookieStore.get("resell_env_admin")?.value === "1") return;

  redirect("/admin/login?error=Intra%20cu%20emailul%20si%20parola%20de%20admin.");
}