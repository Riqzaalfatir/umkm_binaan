import { pool } from "@/lib/db";
import { PageHeader } from "@/components/PageHeader";

export const dynamic = "force-dynamic";

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

async function getLaporanKategori() {
  const { rows } = await pool.query(`
    SELECT
      COALESCE(k.nama, 'Tanpa Kategori') AS kategori,
      COUNT(u.id)::int AS total_umkm,
      COUNT(u.id) FILTER (WHERE u.status = 'aktif')::int AS umkm_aktif
    FROM umkm u
    LEFT JOIN kategori_usaha k ON k.id = u.kategori_id
    GROUP BY k.nama
    ORDER BY total_umkm DESC
  `);
  return rows;
}

async function getLaporanProgram() {
  const { rows } = await pool.query(`
    SELECT
      p.nama_program,
      p.jenis,
      COUNT(r.id)::int AS total_peserta,
      COUNT(r.id) FILTER (WHERE r.status = 'selesai')::int AS selesai,
      COALESCE(SUM(b.nominal), 0) AS total_bantuan
    FROM program_pembinaan p
    LEFT JOIN riwayat_pembinaan r ON r.program_id = p.id
    LEFT JOIN bantuan_diterima b ON b.riwayat_id = r.id
    GROUP BY p.id, p.nama_program, p.jenis
    ORDER BY p.tanggal_mulai DESC
  `);
  return rows;
}

export default async function LaporanPage() {
  const [laporanKategori, laporanProgram] = await Promise.all([
    getLaporanKategori(),
    getLaporanProgram(),
  ]);

  return (
    <div>
      <PageHeader
        title="Laporan"
        description="Rekap UMKM per kategori dan hasil program pembinaan."
      />

      <div className="space-y-6">
        <div className="rounded-xl border border-border bg-surface p-5">
          <h2 className="font-display text-sm font-semibold">
            Rekap UMKM per Kategori
          </h2>
          <table className="mt-4 w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wide text-text-faint">
                <th className="py-2 font-medium">Kategori</th>
                <th className="py-2 font-medium">Total UMKM</th>
                <th className="py-2 font-medium">UMKM Aktif</th>
              </tr>
            </thead>
            <tbody>
              {laporanKategori.map((row) => (
                <tr key={row.kategori} className="border-b border-border last:border-0">
                  <td className="py-2.5">{row.kategori}</td>
                  <td className="py-2.5 font-mono text-text-muted">{row.total_umkm}</td>
                  <td className="py-2.5 font-mono text-text-muted">{row.umkm_aktif}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          <h2 className="font-display text-sm font-semibold">
            Rekap Hasil Program Pembinaan
          </h2>
          <table className="mt-4 w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wide text-text-faint">
                <th className="py-2 font-medium">Program</th>
                <th className="py-2 font-medium">Jenis</th>
                <th className="py-2 font-medium">Peserta</th>
                <th className="py-2 font-medium">Selesai</th>
                <th className="py-2 font-medium">Total Bantuan</th>
              </tr>
            </thead>
            <tbody>
              {laporanProgram.map((row) => (
                <tr key={row.nama_program} className="border-b border-border last:border-0">
                  <td className="py-2.5">{row.nama_program}</td>
                  <td className="py-2.5 capitalize text-text-muted">{row.jenis}</td>
                  <td className="py-2.5 font-mono text-text-muted">{row.total_peserta}</td>
                  <td className="py-2.5 font-mono text-text-muted">{row.selesai}</td>
                  <td className="py-2.5 font-mono text-text-muted">
                    {formatRupiah(parseFloat(row.total_bantuan))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
