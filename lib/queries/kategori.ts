import { pool } from "@/lib/db";
import { KategoriUsaha } from "@/lib/types";

export async function getAllKategori(): Promise<KategoriUsaha[]> {
  const { rows } = await pool.query(
    `SELECT * FROM kategori_usaha ORDER BY nama ASC`
  );
  return rows;
}

export async function createKategori(nama: string): Promise<KategoriUsaha> {
  const { rows } = await pool.query(
    `INSERT INTO kategori_usaha (nama) VALUES ($1) RETURNING *`,
    [nama]
  );
  return rows[0];
}

export async function deleteKategori(id: string): Promise<void> {
  await pool.query(`DELETE FROM kategori_usaha WHERE id = $1`, [id]);
}
