import { redirect } from "next/navigation";
import { hasSupabaseEnv } from "@/lib/supabase/env";

export function requireAdminConfig() {
  if (!hasSupabaseEnv() && process.env.NODE_ENV === "production") {
    redirect("/admin/login?error=Configureaza%20Supabase%20in%20Vercel%20pentru%20admin.");
  }
}