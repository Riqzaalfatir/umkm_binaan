const STYLES: Record<string, string> = {
  aktif: "bg-primary-soft text-primary",
  selesai: "bg-primary-soft text-primary",
  nonaktif: "bg-bg text-text-muted border border-border-strong",
  dibatalkan: "bg-danger-soft text-danger",
  terdaftar: "bg-slate-soft text-slate",
  modal: "bg-accent-soft text-accent",
  pelatihan: "bg-slate-soft text-slate",
  alat: "bg-primary-soft text-primary",
  pemasaran: "bg-accent-soft text-accent",
};

const LABELS: Record<string, string> = {
  aktif: "Aktif",
  nonaktif: "Nonaktif",
  selesai: "Selesai",
  dibatalkan: "Dibatalkan",
  terdaftar: "Terdaftar",
  modal: "Modal",
  pelatihan: "Pelatihan",
  alat: "Alat",
  pemasaran: "Pemasaran",
};

export function Badge({ value }: { value: string }) {
  const style = STYLES[value] ?? "bg-bg text-text-muted";
  const label = LABELS[value] ?? value;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${style}`}
    >
      {label}
    </span>
  );
}
