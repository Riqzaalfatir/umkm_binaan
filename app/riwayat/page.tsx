import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllRiwayat } from "@/lib/queries/riwayat";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/Badge";
import { DeleteButton } from "@/components/DeleteButton";
import { deleteRiwayatAction } from "@/app/actions/riwayat";

export const dynamic = "force-dynamic";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function RiwayatListPage() {
  const riwayat = await getAllRiwayat();

  return (
    <div>
      <PageHeader
        title="Riwayat Pembinaan"
        description={`${riwayat.length} pendaftaran UMKM ke program pembinaan.`}
        action={
          <Link
            href="/riwayat/baru"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-hover"
          >
            <Plus size={16} />
            Daftarkan UMKM
          </Link>
        }
      />

      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-bg/60 text-xs uppercase tracking-wide text-text-faint">
              <th className="px-4 py-3 font-medium">UMKM</th>
              <th className="px-4 py-3 font-medium">Program</th>
              <th className="px-4 py-3 font-medium">Tanggal Ikut</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {riwayat.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-text-faint">
                  Belum ada UMKM yang didaftarkan ke program pembinaan.
                </td>
              </tr>
            )}
            {riwayat.map((r) => (
              <tr key={r.id} className="border-b border-border last:border-0 hover:bg-bg/40">
                <td className="px-4 py-3 font-medium">
                  <Link href={`/umkm/${r.umkm_id}`} className="hover:underline">
                    {r.umkm_nama}
                  </Link>
                </td>
                <td className="px-4 py-3 text-text-muted">{r.program_nama}</td>
                <td className="px-4 py-3 text-text-muted">
                  {formatDate(r.tanggal_ikut)}
                </td>
                <td className="px-4 py-3">
                  <Badge value={r.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/riwayat/${r.id}/edit`}
                      className="rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-bg"
                    >
                      Edit
                    </Link>
                    <DeleteButton action={deleteRiwayatAction.bind(null, r.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
