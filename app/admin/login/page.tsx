import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = { title: "Admin login" };
export default function AdminLoginPage() {
  return <main className="light-panel flex min-h-[calc(100vh-73px)] items-center bg-bone px-4 py-12 text-ink"><Suspense><LoginForm /></Suspense></main>;
}
