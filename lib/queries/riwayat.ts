import { pool } from "@/lib/db";
import { RiwayatPembinaan, StatusRiwayat } from "@/lib/types";

export interface RiwayatInput {
  umkm_id: string;
  program_id: string;
  status: StatusRiwayat;
  catatan?: string | null;
  tanggal_ikut: string;
}

const BASE_SELECT = `
  SELECT r.*, u.nama_usaha AS umkm_nama, p.nama_program AS program_nama
  FROM riwayat_pembinaan r
  JOIN umkm u ON u.id = r.umkm_id
  JOIN program_pembinaan p ON p.id = r.program_id
`;

export async function getAllRiwayat(): Promise<RiwayatPembinaan[]> {
  const { rows } = await pool.query(
    `${BASE_SELECT} ORDER BY r.tanggal_ikut DESC`
  );
  return rows;
}

export async function getRiwayatByUmkm(umkmId: string): Promise<RiwayatPembinaan[]> {
  const { rows } = await pool.query(
    `${BASE_SELECT} WHERE r.umkm_id = $1 ORDER BY r.tanggal_ikut DESC`,
    [umkmId]
  );
  return rows;
}

export async function getRiwayatById(id: string): Promise<RiwayatPembinaan | null> {
  const { rows } = await pool.query(`${BASE_SELECT} WHERE r.id = $1`, [id]);
  return rows[0] ?? null;
}

export async function createRiwayat(input: RiwayatInput): Promise<RiwayatPembinaan> {
  const { rows } = await pool.query(
    `INSERT INTO riwayat_pembinaan (umkm_id, program_id, status, catatan, tanggal_ikut)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [
      input.umkm_id,
      input.program_id,
      input.status,
      input.catatan || null,
      input.tanggal_ikut,
    ]
  );
  return rows[0];
}

export async function updateRiwayat(
  id: string,
  input: RiwayatInput
): Promise<RiwayatPembinaan> {
  const { rows } = await pool.query(
    `UPDATE riwayat_pembinaan SET
       umkm_id = $1, program_id = $2, status = $3, catatan = $4, tanggal_ikut = $5
     WHERE id = $6 RETURNING *`,
    [
      input.umkm_id,
      input.program_id,
      input.status,
      input.catatan || null,
      input.tanggal_ikut,
      id,
    ]
  );
  return rows[0];
}

export async function deleteRiwayat(id: string): Promise<void> {
  await pool.query(`DELETE FROM riwayat_pembinaan WHERE id = $1`, [id]);
}
