import Link from "next/link";
import { Plus, Users } from "lucide-react";
import { getAllProgram } from "@/lib/queries/program";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/Badge";

export const dynamic = "force-dynamic";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function ProgramListPage() {
  const programs = await getAllProgram();

  return (
    <div>
      <PageHeader
        title="Program Pembinaan"
        description={`${programs.length} program telah dibuat.`}
        action={
          <Link
            href="/program/baru"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-hover"
          >
            <Plus size={16} />
            Buat Program
          </Link>
        }
      />

      {programs.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface p-10 text-center text-text-faint">
          Belum ada program pembinaan. Buat program pertama untuk mulai
          mendaftarkan UMKM.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {programs.map((p) => (
            <Link
              key={p.id}
              href={`/program/${p.id}/edit`}
              className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-border-strong"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-medium">{p.nama_program}</h3>
                <Badge value={p.jenis} />
              </div>
              {p.deskripsi && (
                <p className="mt-2 line-clamp-2 text-sm text-text-muted">
                  {p.deskripsi}
                </p>
              )}
              <div className="mt-4 flex items-center justify-between text-xs text-text-faint">
                <span>
                  {formatDate(p.tanggal_mulai)}
                  {p.tanggal_selesai ? ` — ${formatDate(p.tanggal_selesai)}` : ""}
                </span>
                <span className="flex items-center gap-1">
                  <Users size={12} />
                  {p.jumlah_peserta ?? 0} peserta
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
