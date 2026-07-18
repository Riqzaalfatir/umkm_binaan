# Sistem CRUD UMKM Binaan

Aplikasi web admin dashboard untuk pendataan dan pemantauan UMKM binaan — mencatat data UMKM, program pembinaan, riwayat keikutsertaan, dan bantuan yang disalurkan.

**Stack:** Next.js 16 (App Router, TypeScript) + PostgreSQL + node-postgres (`pg`) — tanpa ORM, query SQL langsung agar portable di komputer mana pun tanpa perlu download binary tambahan.

## Fitur

- **Data UMKM** — CRUD lengkap (tambah/lihat/edit/hapus), pencarian, filter kategori & status
- **Program Pembinaan** — CRUD program (modal, pelatihan, alat, pemasaran)
- **Riwayat Pembinaan** — mencatat UMKM mana ikut program apa, status keikutsertaan
- **Bantuan Disalurkan** — catatan bantuan per peserta program
- **Kategori Usaha** — kelola kategori
- **Dashboard Ringkasan** — statistik total UMKM, grafik per kategori, grafik pendaftaran per bulan
- **Laporan** — rekap UMKM per kategori & hasil program pembinaan

## 1. Prasyarat

- Node.js 18+ dan npm
- PostgreSQL 14+ (lokal atau cloud seperti Supabase/Neon)

## 2. Instalasi

```bash
# 1. Ekstrak project, lalu masuk ke foldernya
cd umkm-binaan

# 2. Install dependencies
npm install

# 3. Buat database PostgreSQL kosong
createdb umkm_binaan
# atau lewat psql:
# psql -c "CREATE DATABASE umkm_binaan;"

# 4. Salin file environment
cp .env.example .env
# Edit .env, sesuaikan DATABASE_URL dengan kredensial PostgreSQL kamu

# 5. Import skema + data awal (pilih salah satu):

# Opsi A — pakai dump lengkap (skema + data contoh sekaligus, paling cepat)
psql -d umkm_binaan -f db/umkm_binaan_dump.sql

# Opsi B — bikin dari nol lalu isi data contoh (opsional)
psql -d umkm_binaan -f db/schema.sql
psql -d umkm_binaan -f db/seed.sql

# 6. Jalankan aplikasi
npm run dev
```

Buka **http://localhost:3000** di browser.

## 3. Build untuk Produksi

```bash
npm run build
npm start
```

## 4. Struktur Project

```
app/
  actions/          # Server Actions (create/update/delete tiap entitas)
  umkm/              # Halaman CRUD UMKM
  program/           # Halaman CRUD Program Pembinaan
  riwayat/           # Halaman CRUD Riwayat Pembinaan
  bantuan/           # Halaman CRUD Bantuan Disalurkan
  kategori/          # Halaman kelola Kategori Usaha
  laporan/           # Halaman laporan/rekap
  page.tsx           # Dashboard ringkasan
components/          # Komponen UI reusable (form, tabel, badge, dll)
lib/
  db.ts              # Koneksi pool PostgreSQL
  types.ts           # TypeScript types
  queries/           # Query SQL per entitas
db/
  schema.sql         # Skema database (CREATE TABLE)
  seed.sql           # Data contoh
  umkm_binaan_dump.sql  # Export database lengkap (skema + data)
```

## 5. Skema Database

- `kategori_usaha` — daftar kategori usaha (Kuliner, Kerajinan, dll)
- `umkm` — data UMKM binaan
- `program_pembinaan` — daftar program pembinaan yang tersedia
- `riwayat_pembinaan` — relasi UMKM ↔ Program (siapa ikut program apa)
- `bantuan_diterima` — bantuan yang disalurkan per riwayat pembinaan

## 6. Troubleshooting

- **Error koneksi database** — pastikan PostgreSQL sedang berjalan dan `DATABASE_URL` di `.env` sudah benar (user, password, host, port, nama database).
- **Port 3000 sudah dipakai** — jalankan `npm run dev -- -p 3001` untuk pakai port lain.
- **Font Google gagal dimuat saat build** — pastikan komputer terhubung internet saat pertama kali `npm run dev`/`npm run build` (font di-cache setelahnya).

## 7. Kredensial / Akses

Tidak ada sistem login pada versi ini — dashboard bisa diakses langsung setelah server jalan. Tidak ada akun/password yang perlu diberikan.
