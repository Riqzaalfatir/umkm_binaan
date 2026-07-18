import { pool } from "@/lib/db";
import { BantuanDiterima } from "@/lib/types";

export interface BantuanInput {
  riwayat_id: string;
  jenis_bantuan: string;
  nominal?: number | null;
  keterangan?: string | null;
  tanggal_salur: string;
}

const BASE_SELECT = `
  SELECT b.*, u.nama_usaha AS umkm_nama, p.nama_program AS program_nama
  FROM bantuan_diterima b
  JOIN riwayat_pembinaan r ON r.id = b.riwayat_id
  JOIN umkm u ON u.id = r.umkm_id
  JOIN program_pembinaan p ON p.id = r.program_id
`;

export async function getAllBantuan(): Promise<BantuanDiterima[]> {
  const { rows } = await pool.query(
    `${BASE_SELECT} ORDER BY b.tanggal_salur DESC`
  );
  return rows;
}

export async function createBantuan(input: BantuanInput): Promise<BantuanDiterima> {
  const { rows } = await pool.query(
    `INSERT INTO bantuan_diterima (riwayat_id, jenis_bantuan, nominal, keterangan, tanggal_salur)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [
      input.riwayat_id,
      input.jenis_bantuan,
      input.nominal ?? null,
      input.keterangan || null,
      input.tanggal_salur,
    ]
  );
  return rows[0];
}

export async function deleteBantuan(id: string): Promise<void> {
  await pool.query(`DELETE FROM bantuan_diterima WHERE id = $1`, [id]);
}

export async function getRiwayatOptionsForBantuan(): Promise<
  { id: string; label: string }[]
> {
  const { rows } = await pool.query(`
    SELECT r.id, (u.nama_usaha || ' — ' || p.nama_program) AS label
    FROM riwayat_pembinaan r
    JOIN umkm u ON u.id = r.umkm_id
    JOIN program_pembinaan p ON p.id = r.program_id
    ORDER BY u.nama_usaha ASC
  `);
  return rows;
}
