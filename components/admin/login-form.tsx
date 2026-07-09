"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/browser";
import { envAdminLogin } from "@/app/actions/admin-actions";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState(searchParams.get("error") || "");
  const [isPending, startTransition] = useTransition();
  return (
    <form className="light-panel mx-auto w-full max-w-md rounded border border-ink/10 bg-white p-6 shadow-sm" onSubmit={(event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      startTransition(async () => {
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
          const result = await envAdminLogin(formData);
          if (!result.ok) {
            setError(result.message);
            return;
          }
          router.push("/admin");
          router.refresh();
          return;
        }
        const supabase = createClient();
        const { error: signInError } = await supabase.auth.signInWithPassword({ email: String(formData.get("email")), password: String(formData.get("password")) });
        if (signInError) return setError("Email sau parola incorecta.");
        router.push("/admin");
        router.refresh();
      });
    }}>
      <div className="flex h-11 w-11 items-center justify-center rounded bg-ink text-white"><Lock className="h-5 w-5" /></div>
      <h1 className="mt-5 text-3xl font-black">Admin login</h1>
      <div className="mt-5 grid gap-3"><input required name="email" type="email" placeholder="Email" className="h-11 rounded border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-ink" /><input required name="password" type="password" placeholder="Parola" className="h-11 rounded border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-ink" /></div>
      {error ? <p className="mt-3 text-sm font-bold text-red-600">{error}</p> : null}
      <button className="mt-5 w-full rounded bg-ink px-5 py-3 text-sm font-bold text-white" disabled={isPending}>{isPending ? "Se verifica..." : "Intra in admin"}</button>
      <p className="mt-3 text-xs text-zinc-500">Admin demo: foloseste emailul si parola configurate.</p>
    </form>
  );
}
