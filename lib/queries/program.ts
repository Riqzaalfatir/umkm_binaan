import { pool } from "@/lib/db";
import { ProgramPembinaan, JenisProgram } from "@/lib/types";

export interface ProgramInput {
  nama_program: string;
  jenis: JenisProgram;
  deskripsi?: string | null;
  tanggal_mulai: string;
  tanggal_selesai?: string | null;
}

export async function getAllProgram(): Promise<ProgramPembinaan[]> {
  const { rows } = await pool.query(`
    SELECT p.*, COUNT(r.id)::int AS jumlah_peserta
    FROM program_pembinaan p
    LEFT JOIN riwayat_pembinaan r ON r.program_id = p.id
    GROUP BY p.id
    ORDER BY p.tanggal_mulai DESC
  `);
  return rows;
}

export async function getProgramById(id: string): Promise<ProgramPembinaan | null> {
  const { rows } = await pool.query(
    `SELECT * FROM program_pembinaan WHERE id = $1`,
    [id]
  );
  return rows[0] ?? null;
}

export async function getProgramOptions(): Promise<
  { id: string; nama_program: string }[]
> {
  const { rows } = await pool.query(
    `SELECT id, nama_program FROM program_pembinaan ORDER BY tanggal_mulai DESC`
  );
  return rows;
}

export async function createProgram(input: ProgramInput): Promise<ProgramPembinaan> {
  const { rows } = await pool.query(
    `INSERT INTO program_pembinaan (nama_program, jenis, deskripsi, tanggal_mulai, tanggal_selesai)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [
      input.nama_program,
      input.jenis,
      input.deskripsi || null,
      input.tanggal_mulai,
      input.tanggal_selesai || null,
    ]
  );
  return rows[0];
}

export async function updateProgram(
  id: string,
  input: ProgramInput
): Promise<ProgramPembinaan> {
  const { rows } = await pool.query(
    `UPDATE program_pembinaan SET
       nama_program = $1, jenis = $2, deskripsi = $3,
       tanggal_mulai = $4, tanggal_selesai = $5
     WHERE id = $6 RETURNING *`,
    [
      input.nama_program,
      input.jenis,
      input.deskripsi || null,
      input.tanggal_mulai,
      input.tanggal_selesai || null,
      id,
    ]
  );
  return rows[0];
}

export async function deleteProgram(id: string): Promise<void> {
  await pool.query(`DELETE FROM program_pembinaan WHERE id = $1`, [id]);
}
