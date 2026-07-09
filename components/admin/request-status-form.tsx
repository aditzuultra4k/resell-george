"use client";
import { updateRequestStatus } from "@/app/actions/admin-actions";
import { requestStatuses } from "@/lib/constants";
import type { RequestStatus } from "@/lib/types";
export function RequestStatusForm({ id, status }: { id: string; status: RequestStatus }) {
  return <form action={updateRequestStatus}><input type="hidden" name="id" value={id} /><select name="status" defaultValue={status} onChange={(event) => event.currentTarget.form?.requestSubmit()} className="h-11 rounded border border-zinc-200 bg-white px-3 text-sm font-bold outline-none focus:border-ink">{requestStatuses.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></form>;
}
