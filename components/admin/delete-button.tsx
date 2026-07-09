"use client";
import { Trash2 } from "lucide-react";
export function DeleteButton() {
  return <button className="inline-flex items-center gap-2 rounded border border-red-200 px-3 py-2 text-sm font-bold text-red-700 hover:bg-red-50" onClick={(event) => { if (!confirm("Sigur stergi produsul? Actiunea nu poate fi anulata.")) event.preventDefault(); }}><Trash2 className="h-4 w-4" />Sterge</button>;
}
