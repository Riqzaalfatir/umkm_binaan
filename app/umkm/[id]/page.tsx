import Link from "next/link";
import { notFound } from "next/navigation";
import { Pencil, Phone, MapPin, FileText } from "lucide-react";
import { getUmkmById } from "@/lib/queries/umkm";
import { getRiwayatByUmkm } from "@/lib/queries/riwayat";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/Badge";
import { DeleteButton } from "@/components/DeleteButton";
import { deleteUmkmAction } from "@/app/actions/umkm";

export const dynamic = "force-dynamic";

export default async function UmkmDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const umkm = await getUmkmById(id);
  if (!umkm) notFound();

  const riwayat = await getRiwayatByUmkm(id);

  return (
    <div>
      <PageHeader
        title={umkm.nama_usaha}
        description={`Dikelola oleh ${umkm.nama_pemilik}`}
        action={
          <div className="flex gap-2">
            <Link
              href={`/umkm/${umkm.id}/edit`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border-strong px-4 py-2.5 text-sm font-medium hover:bg-bg"
            >
              <Pencil size={14} />
              Edit
            </Link>
            <DeleteButton action={deleteUmkmAction.bind(null, umkm.id)} />
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-surface p-5 lg:col-span-1">
          <h2 className="font-display text-sm font-semibold">Informasi Usaha</h2>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-text-muted">Status</span>
              <Badge value={umkm.status} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-muted">Kategori</span>
              <span>{umkm.kategori_nama || "—"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-muted">NIB</span>
              <span className="font-mono text-xs">{umkm.nib || "—"}</span>
            </div>
            <div className="flex items-start gap-2 border-t border-border pt-3">
              <Phone size={14} className="mt-0.5 text-text-faint" />
              <span>{umkm.telepon || "Belum ada nomor telepon"}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 shrink-0 text-text-faint" />
              <span className="text-text-muted">{umkm.alamat}</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-sm font-semibold">
              Riwayat Pembinaan
            </h2>
            <Link
              href={`/riwayat/baru?umkm=${umkm.id}`}
              className="text-sm font-medium text-primary hover:underline"
            >
              + Daftarkan ke Program
            </Link>
          </div>

          {riwayat.length === 0 ? (
            <div className="mt-6 flex flex-col items-center justify-center py-8 text-center">
              <FileText size={24} className="mb-2 text-text-faint" />
              <p className="text-sm text-text-faint">
                UMKM ini belum mengikuti program pembinaan apa pun.
              </p>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {riwayat.map((r) => (
                <div
                  key={r.id}
                  className="rounded-lg border border-border p-3.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {r.program_nama}
                    </span>
                    <Badge value={r.status} />
                  </div>
                  <p className="mt-1 text-xs text-text-faint">
                    Bergabung {new Date(r.tanggal_ikut).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  {r.catatan && (
                    <p className="mt-2 text-sm text-text-muted">{r.catatan}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
