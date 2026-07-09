import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("inline-flex items-center rounded border border-white/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wide", className)}>{children}</span>;
}
