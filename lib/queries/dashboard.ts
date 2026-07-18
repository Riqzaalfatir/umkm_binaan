import { pool } from "@/lib/db";

export interface DashboardStats {
  totalUmkm: number;
  umkmAktif: number;
  totalProgram: number;
  totalBantuanRupiah: number;
  perKategori: { kategori: string; jumlah: number }[];
  perStatusRiwayat: { status: string; jumlah: number }[];
  pendaftaranPerBulan: { bulan: string; jumlah: number }[];
  programTeratas: { nama_program: string; jumlah_peserta: number }[];
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const [
    totalUmkmRes,
    umkmAktifRes,
    totalProgramRes,
    totalBantuanRes,
    perKategoriRes,
    perStatusRiwayatRes,
    pendaftaranPerBulanRes,
    programTeratasRes,
  ] = await Promise.all([
    pool.query(`SELECT COUNT(*) FROM umkm`),
    pool.query(`SELECT COUNT(*) FROM umkm WHERE status = 'aktif'`),
    pool.query(`SELECT COUNT(*) FROM program_pembinaan`),
    pool.query(`SELECT COALESCE(SUM(nominal), 0) AS total FROM bantuan_diterima`),
    pool.query(`
      SELECT COALESCE(k.nama, 'Tanpa Kategori') AS kategori, COUNT(u.id)::int AS jumlah
      FROM umkm u
      LEFT JOIN kategori_usaha k ON k.id = u.kategori_id
      GROUP BY k.nama
      ORDER BY jumlah DESC
    `),
    pool.query(`
      SELECT status, COUNT(*)::int AS jumlah
      FROM riwayat_pembinaan
      GROUP BY status
    `),
    pool.query(`
      SELECT to_char(date_trunc('month', created_at), 'YYYY-MM') AS bulan, COUNT(*)::int AS jumlah
      FROM umkm
      GROUP BY 1
      ORDER BY 1 ASC
    `),
    pool.query(`
      SELECT p.nama_program, COUNT(r.id)::int AS jumlah_peserta
      FROM program_pembinaan p
      LEFT JOIN riwayat_pembinaan r ON r.program_id = p.id
      GROUP BY p.nama_program
      ORDER BY jumlah_peserta DESC
      LIMIT 5
    `),
  ]);

  return {
    totalUmkm: parseInt(totalUmkmRes.rows[0].count, 10),
    umkmAktif: parseInt(umkmAktifRes.rows[0].count, 10),
    totalProgram: parseInt(totalProgramRes.rows[0].count, 10),
    totalBantuanRupiah: parseFloat(totalBantuanRes.rows[0].total),
    perKategori: perKategoriRes.rows,
    perStatusRiwayat: perStatusRiwayatRes.rows,
    pendaftaranPerBulan: pendaftaranPerBulanRes.rows,
    programTeratas: programTeratasRes.rows,
  };
}
