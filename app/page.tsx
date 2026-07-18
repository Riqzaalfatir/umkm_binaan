import { Store, CheckCircle2, ClipboardList, HandCoins } from "lucide-react";
import { getDashboardStats } from "@/lib/queries/dashboard";
import { getAllRiwayat } from "@/lib/queries/riwayat";
import { StatCard } from "@/components/StatCard";
import { PageHeader } from "@/components/PageHeader";
import { KategoriChart, PendaftaranChart } from "@/components/DashboardCharts";
import { StatusRiwayatPanel } from "@/components/StatusRiwayatPanel";

export const dynamic = "force-dynamic";

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function DashboardPage() {
  const [stats, riwayat] = await Promise.all([
    getDashboardStats(),
    getAllRiwayat(),
  ]);

  return (
    <div>
      <PageHeader
        title="Ringkasan"
        description="Gambaran umum data UMKM binaan dan aktivitas pembinaan."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total UMKM Binaan"
          value={String(stats.totalUmkm)}
          icon={Store}
        />
        <StatCard
          label="UMKM Aktif"
          value={String(stats.umkmAktif)}
          icon={CheckCircle2}
          hint={`dari ${stats.totalUmkm} total`}
        />
        <StatCard
          label="Program Pembinaan"
          value={String(stats.totalProgram)}
          icon={ClipboardList}
        />
        <StatCard
          label="Total Bantuan Disalurkan"
          value={formatRupiah(stats.totalBantuanRupiah)}
          icon={HandCoins}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="rounded-xl border border-border bg-surface p-5 lg:col-span-3">
          <h2 className="font-display text-sm font-semibold">
            Pendaftaran UMKM per Bulan
          </h2>
          <p className="mb-2 text-xs text-text-faint">
            Jumlah UMKM baru yang terdaftar setiap bulan.
          </p>
          <PendaftaranChart data={stats.pendaftaranPerBulan} />
        </div>
        <div className="rounded-xl border border-border bg-surface p-5 lg:col-span-2">
          <h2 className="font-display text-sm font-semibold">
            UMKM per Kategori Usaha
          </h2>
          <p className="mb-2 text-xs text-text-faint">
            Distribusi UMKM binaan menurut kategori.
          </p>
          <KategoriChart data={stats.perKategori} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface p-5">
          <h2 className="font-display text-sm font-semibold">
            Program dengan Peserta Terbanyak
          </h2>
          <div className="mt-3 space-y-2">
            {stats.programTeratas.length === 0 && (
              <p className="text-sm text-text-faint">Belum ada program.</p>
            )}
            {stats.programTeratas.map((p) => (
              <div
                key={p.nama_program}
                className="flex items-center justify-between border-b border-border py-2 text-sm last:border-0"
              >
                <span className="text-text">{p.nama_program}</span>
                <span className="font-mono text-text-muted">
                  {p.jumlah_peserta} peserta
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          <h2 className="font-display text-sm font-semibold">
            Status Riwayat Pembinaan
          </h2>
          <p className="mb-3 text-xs text-text-faint">
            Klik salah satu status untuk lihat daftarnya.
          </p>
          <StatusRiwayatPanel riwayat={riwayat} />
        </div>
      </div>
    </div>
  );
}