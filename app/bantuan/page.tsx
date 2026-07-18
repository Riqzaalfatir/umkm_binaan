import { getAllBantuan, getRiwayatOptionsForBantuan } from "@/lib/queries/bantuan";
import { createBantuanAction, deleteBantuanAction } from "@/app/actions/bantuan";
import { PageHeader } from "@/components/PageHeader";
import { DeleteButton } from "@/components/DeleteButton";
import { BantuanForm } from "@/components/BantuanForm";

export const dynamic = "force-dynamic";

function formatRupiah(value: number | null) {
  if (value === null) return "—";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function BantuanPage() {
  const [bantuan, riwayatOptions] = await Promise.all([
    getAllBantuan(),
    getRiwayatOptionsForBantuan(),
  ]);

  const totalDisalurkan = bantuan.reduce((sum, b) => sum + (b.nominal || 0), 0);

  return (
    <div>
      <PageHeader
        title="Bantuan Disalurkan"
        description={`Total ${formatRupiah(totalDisalurkan)} tersalurkan ke ${bantuan.length} penyaluran.`}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-xl border border-border bg-surface">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-bg/60 text-xs uppercase tracking-wide text-text-faint">
                  <th className="px-4 py-3 font-medium">UMKM</th>
                  <th className="px-4 py-3 font-medium">Jenis Bantuan</th>
                  <th className="px-4 py-3 font-medium">Nominal</th>
                  <th className="px-4 py-3 font-medium">Tanggal</th>
                  <th className="px-4 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {bantuan.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-text-faint">
                      Belum ada bantuan yang disalurkan.
                    </td>
                  </tr>
                )}
                {bantuan.map((b) => (
                  <tr key={b.id} className="border-b border-border last:border-0 hover:bg-bg/40">
                    <td className="px-4 py-3 font-medium">{b.umkm_nama}</td>
                    <td className="px-4 py-3 text-text-muted">{b.jenis_bantuan}</td>
                    <td className="px-4 py-3 font-mono text-text-muted">
                      {formatRupiah(b.nominal)}
                    </td>
                    <td className="px-4 py-3 text-text-muted">
                      {formatDate(b.tanggal_salur)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <DeleteButton action={deleteBantuanAction.bind(null, b.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          <h2 className="font-display text-sm font-semibold">
            Catat Bantuan Baru
          </h2>
          <p className="mb-4 mt-1 text-xs text-text-faint">
            Pilih UMKM yang sudah terdaftar di suatu program.
          </p>
          <BantuanForm action={createBantuanAction} riwayatOptions={riwayatOptions} />
        </div>
      </div>
    </div>
  );
}
