"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Store,
  ClipboardList,
  History,
  HandCoins,
  Tags,
  FileBarChart,
} from "lucide-react";

const NAV = [
  { href: "/", label: "Ringkasan", icon: LayoutGrid },
  { href: "/umkm", label: "Data UMKM", icon: Store },
  { href: "/program", label: "Program Pembinaan", icon: ClipboardList },
  { href: "/riwayat", label: "Riwayat Pembinaan", icon: History },
  { href: "/bantuan", label: "Bantuan Disalurkan", icon: HandCoins },
  { href: "/kategori", label: "Kategori Usaha", icon: Tags },
  { href: "/laporan", label: "Laporan", icon: FileBarChart },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-surface">
  <div className="flex items-center gap-2.5 px-6 py-6">
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
      <svg width="18" height="18" viewBox="0 0 64 64" fill="none">
        <path d="M16 30 L32 14 L48 30 Z" fill="#ffffff" />
        <rect x="18" y="30" width="28" height="18" fill="#ffffff" />
        <rect x="27" y="36" width="10" height="12" fill="#1d5f3e" />
        <path
          d="M32 6 L38 14 L34.5 14 L34.5 19 L29.5 19 L29.5 14 L26 14 Z"
          fill="#d99a3f"
        />
      </svg>
    </div>
        <div>
          <p className="font-display text-sm font-semibold leading-none">
            UMKM Binaan
          </p>
          <p className="mt-1 text-[11px] leading-none text-text-faint">
            Sistem Pembinaan
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 px-3">
        {NAV.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-primary-soft text-primary"
                  : "text-text-muted hover:bg-bg hover:text-text"
              }`}
            >
              <Icon size={16} strokeWidth={2} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border px-6 py-4">
        <p className="text-[11px] leading-relaxed text-text-faint">
          Program pembinaan UMKM lokal — pendataan, pemantauan, dan
          penyaluran bantuan.
        </p>
      </div>
    </aside>
  );
}
