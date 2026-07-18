"use client";

import { useState } from "react";
import { Store, ClipboardList, Calendar } from "lucide-react";
import { Badge } from "./Badge";
import { RiwayatPembinaan, StatusRiwayat } from "@/lib/types";

const STATUS_ORDER: StatusRiwayat[] = [
  "terdaftar",
  "aktif",
  "selesai",
  "dibatalkan",
];

const ACCENT: Record<StatusRiwayat, string> = {
  terdaftar: "#3a5a78",
  aktif: "#1d5f3e",
  selesai: "#1d5f3e",
  dibatalkan: "#b3261e",
};

function formatTanggal(value: string) {
  return new Date(value).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function StatusRiwayatPanel({
  riwayat,
}: {
  riwayat: RiwayatPembinaan[];
}) {
  const [selected, setSelected] = useState<StatusRiwayat | null>(null);

  const groups = STATUS_ORDER.map((status) => ({
    status,
    items: riwayat.filter((r) => r.status === status),
  })).filter((g) => g.items.length > 0);

  if (groups.length === 0) {
    return <p className="text-sm text-text-faint">Belum ada riwayat.</p>;
  }

  const activeGroup = groups.find((g) => g.status === selected);
  const total = riwayat.length;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {groups.map((g) => {
          const isActive = selected === g.status;
          const pct = total > 0 ? Math.round((g.items.length / total) * 100) : 0;
          return (
            <button
              key={g.status}
              type="button"
              onClick={() => setSelected(isActive ? null : g.status)}
              className={`group relative overflow-hidden rounded-lg border px-3 py-2 text-left transition-colors ${
                isActive
                  ? "border-primary bg-primary-soft"
                  : "border-border hover:border-border-strong hover:bg-bg"
              }`}
            >
              <div className="flex items-center gap-2">
                <Badge value={g.status} />
                <span className="font-mono text-sm text-text-muted">
                  {g.items.length}
                </span>
              </div>
              <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-bg">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${pct}%`, background: ACCENT[g.status] }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {activeGroup && (
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {activeGroup.items.map((item) => (
            <div
              key={item.id}
              className="relative overflow-hidden rounded-lg border border-border bg-bg/40 py-2.5 pl-3.5 pr-3"
              style={{ borderLeftWidth: 3, borderLeftColor: ACCENT[activeGroup.status] }}
            >
              <div className="flex items-center gap-1.5 text-sm font-medium text-text">
                <Store size={13} className="shrink-0 text-text-faint" />
                {item.umkm_nama}
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-text-muted">
                <ClipboardList size={12} className="shrink-0 text-text-faint" />
                {item.program_nama}
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-text-faint">
                <Calendar size={12} className="shrink-0" />
                {formatTanggal(item.tanggal_ikut)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}