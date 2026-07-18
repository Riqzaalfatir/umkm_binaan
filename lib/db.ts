import { Pool, types } from "pg";

// Kolom DATE (bukan TIMESTAMP) dikembalikan pg sebagai objek Date secara default,
// yang bisa menyebabkan pergeseran tanggal akibat timezone dan error saat kode
// memanggil .slice() pada nilai tanggal. Di sini kita kembalikan sebagai string
// mentah "YYYY-MM-DD" apa adanya.
types.setTypeParser(1082, (val) => val);

// Satu pool koneksi dipakai ulang di seluruh app (best practice Next.js server-side)
declare global {
  var _pgPool: Pool | undefined;
}

export const pool =
  global._pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== "production") {
  global._pgPool = pool;
}
