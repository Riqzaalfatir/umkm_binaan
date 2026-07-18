"use client";

import { Trash2 } from "lucide-react";

export function DeleteButton({
  action,
  confirmMessage = "Yakin ingin menghapus data ini? Tindakan ini tidak bisa dibatalkan.",
  label,
}: {
  action: () => void;
  confirmMessage?: string;
  label?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmMessage)) e.preventDefault();
      }}
    >
      <button
        type="submit"
        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-danger transition-colors hover:bg-danger-soft"
      >
        <Trash2 size={14} />
        {label ?? "Hapus"}
      </button>
    </form>
  );
}
