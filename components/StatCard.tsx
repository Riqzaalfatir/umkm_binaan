import { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  icon: Icon,
  hint,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-text-muted">{label}</p>
          <p className="mt-2 font-display text-3xl font-semibold tracking-tight">
            {value}
          </p>
          {hint && <p className="mt-1 text-xs text-text-faint">{hint}</p>}
        </div>
        <div className="rounded-lg bg-primary-soft p-2 text-primary">
          <Icon size={18} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}
