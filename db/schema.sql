-- Skema Database: Sistem UMKM Binaan
-- Jalankan file ini pertama kali untuk membuat semua tabel

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS kategori_usaha (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama        VARCHAR(100) NOT NULL UNIQUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS umkm (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama_usaha     VARCHAR(150) NOT NULL,
  nama_pemilik   VARCHAR(150) NOT NULL,
  nib            VARCHAR(50),
  kategori_id    UUID REFERENCES kategori_usaha(id) ON DELETE SET NULL,
  alamat         TEXT NOT NULL,
  telepon        VARCHAR(30),
  status         VARCHAR(20) NOT NULL DEFAULT 'aktif' CHECK (status IN ('aktif','nonaktif')),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS program_pembinaan (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama_program VARCHAR(150) NOT NULL,
  jenis        VARCHAR(20) NOT NULL CHECK (jenis IN ('modal','pelatihan','alat','pemasaran')),
  deskripsi    TEXT,
  tanggal_mulai DATE NOT NULL,
  tanggal_selesai DATE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS riwayat_pembinaan (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  umkm_id      UUID NOT NULL REFERENCES umkm(id) ON DELETE CASCADE,
  program_id   UUID NOT NULL REFERENCES program_pembinaan(id) ON DELETE CASCADE,
  status       VARCHAR(20) NOT NULL DEFAULT 'terdaftar' CHECK (status IN ('terdaftar','aktif','selesai','dibatalkan')),
  catatan      TEXT,
  tanggal_ikut DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(umkm_id, program_id)
);

CREATE TABLE IF NOT EXISTS bantuan_diterima (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  riwayat_id     UUID NOT NULL REFERENCES riwayat_pembinaan(id) ON DELETE CASCADE,
  jenis_bantuan  VARCHAR(100) NOT NULL,
  nominal        NUMERIC(14,2),
  keterangan     TEXT,
  tanggal_salur  DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_umkm_kategori ON umkm(kategori_id);
CREATE INDEX IF NOT EXISTS idx_riwayat_umkm ON riwayat_pembinaan(umkm_id);
CREATE INDEX IF NOT EXISTS idx_riwayat_program ON riwayat_pembinaan(program_id);
CREATE INDEX IF NOT EXISTS idx_bantuan_riwayat ON bantuan_diterima(riwayat_id);
