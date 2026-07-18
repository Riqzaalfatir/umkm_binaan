import { pool } from "@/lib/db";
import { Umkm, StatusUmkm } from "@/lib/types";

export interface UmkmFilter {
  search?: string;
  kategori_id?: string;
  status?: StatusUmkm | "";
  page?: number;
  perPage?: number;
}

export interface UmkmInput {
  nama_usaha: string;
  nama_pemilik: string;
  nib?: string | null;
  kategori_id?: string | null;
  alamat: string;
  telepon?: string | null;
  status: StatusUmkm;
}

const BASE_SELECT = `
  SELECT u.*, k.nama AS kategori_nama
  FROM umkm u
  LEFT JOIN kategori_usaha k ON k.id = u.kategori_id
`;

export async function getUmkmList(
  filter: UmkmFilter
): Promise<{ data: Umkm[]; total: number }> {
  const { search = "", kategori_id = "", status = "", page = 1, perPage = 10 } =
    filter;

  const conditions: string[] = [];
  const params: unknown[] = [];

  if (search) {
    params.push(`%${search}%`);
    conditions.push(
      `(u.nama_usaha ILIKE $${params.length} OR u.nama_pemilik ILIKE $${params.length})`
    );
  }
  if (kategori_id) {
    params.push(kategori_id);
    conditions.push(`u.kategori_id = $${params.length}`);
  }
  if (status) {
    params.push(status);
    conditions.push(`u.status = $${params.length}`);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

  const countResult = await pool.query(
    `SELECT COUNT(*) FROM umkm u ${whereClause}`,
    params
  );
  const total = parseInt(countResult.rows[0].count, 10);

  const offset = (page - 1) * perPage;
  params.push(perPage, offset);
  const { rows } = await pool.query(
    `${BASE_SELECT} ${whereClause} ORDER BY u.created_at DESC LIMIT $${params.length - 1} OFFSET $${params.length}`,
    params
  );

  return { data: rows, total };
}

export async function getUmkmById(id: string): Promise<Umkm | null> {
  const { rows } = await pool.query(`${BASE_SELECT} WHERE u.id = $1`, [id]);
  return rows[0] ?? null;
}

export async function createUmkm(input: UmkmInput): Promise<Umkm> {
  const { rows } = await pool.query(
    `INSERT INTO umkm (nama_usaha, nama_pemilik, nib, kategori_id, alamat, telepon, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [
      input.nama_usaha,
      input.nama_pemilik,
      input.nib || null,
      input.kategori_id || null,
      input.alamat,
      input.telepon || null,
      input.status,
    ]
  );
  return rows[0];
}

export async function updateUmkm(id: string, input: UmkmInput): Promise<Umkm> {
  const { rows } = await pool.query(
    `UPDATE umkm SET
       nama_usaha = $1, nama_pemilik = $2, nib = $3, kategori_id = $4,
       alamat = $5, telepon = $6, status = $7, updated_at = now()
     WHERE id = $8 RETURNING *`,
    [
      input.nama_usaha,
      input.nama_pemilik,
      input.nib || null,
      input.kategori_id || null,
      input.alamat,
      input.telepon || null,
      input.status,
      id,
    ]
  );
  return rows[0];
}

export async function deleteUmkm(id: string): Promise<void> {
  await pool.query(`DELETE FROM umkm WHERE id = $1`, [id]);
}

export async function getUmkmOptions(): Promise<
  { id: string; nama_usaha: string }[]
> {
  const { rows } = await pool.query(
    `SELECT id, nama_usaha FROM umkm ORDER BY nama_usaha ASC`
  );
  return rows;
}
