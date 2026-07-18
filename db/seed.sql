-- Data dummy untuk demo

INSERT INTO kategori_usaha (nama) VALUES
  ('Kuliner'), ('Kerajinan'), ('Fashion'), ('Jasa'), ('Pertanian')
ON CONFLICT (nama) DO NOTHING;

INSERT INTO umkm (nama_usaha, nama_pemilik, nib, kategori_id, alamat, telepon, status)
SELECT v.nama_usaha, v.nama_pemilik, v.nib, k.id, v.alamat, v.telepon, v.status
FROM (VALUES
  ('Kopi Senja', 'Dewi Anggraini', '1234567890123', 'Kuliner', 'Jl. Merdeka No. 12, Bandung', '081234567801', 'aktif'),
  ('Batik Alam Sari', 'Sutrisno', '1234567890124', 'Kerajinan', 'Jl. Kaliurang No. 45, Yogyakarta', '081234567802', 'aktif'),
  ('Rumah Jahit Mega', 'Megawati Putri', NULL, 'Fashion', 'Jl. Sudirman No. 8, Surabaya', '081234567803', 'aktif'),
  ('Bengkel Berkah', 'Agus Salim', '1234567890125', 'Jasa', 'Jl. Diponegoro No. 21, Semarang', '081234567804', 'nonaktif'),
  ('Sayur Segar Tani', 'Ny. Sumiati', NULL, 'Pertanian', 'Jl. Raya Lembang No. 3, Bandung', '081234567805', 'aktif'),
  ('Roti Bunda', 'Siti Fatimah', '1234567890126', 'Kuliner', 'Jl. Ahmad Yani No. 17, Malang', '081234567806', 'aktif'),
  ('Anyaman Rotan Jaya', 'Bambang Wijaya', NULL, 'Kerajinan', 'Jl. Cihampelas No. 90, Bandung', '081234567807', 'aktif'),
  ('Laundry Kilat', 'Rina Marlina', NULL, 'Jasa', 'Jl. Gajah Mada No. 5, Jakarta', '081234567808', 'aktif')
) AS v(nama_usaha, nama_pemilik, nib, kategori_nama, alamat, telepon, status)
JOIN kategori_usaha k ON k.nama = v.kategori_nama;

INSERT INTO program_pembinaan (nama_program, jenis, deskripsi, tanggal_mulai, tanggal_selesai)
VALUES
  ('Bantuan Modal Usaha Tahap 1', 'modal', 'Penyaluran modal usaha untuk UMKM tahap awal', '2026-01-10', '2026-03-10'),
  ('Pelatihan Digital Marketing', 'pelatihan', 'Pelatihan pemasaran digital untuk pelaku UMKM', '2026-02-05', '2026-02-07'),
  ('Bantuan Alat Produksi', 'alat', 'Penyaluran alat produksi untuk usaha kerajinan & kuliner', '2026-03-01', NULL),
  ('Fasilitasi Pameran & Pemasaran', 'pemasaran', 'Pendampingan UMKM ikut pameran lokal', '2026-04-15', '2026-04-20');

INSERT INTO riwayat_pembinaan (umkm_id, program_id, status, catatan, tanggal_ikut)
SELECT u.id, p.id, v.status, v.catatan, v.tanggal_ikut::date
FROM (VALUES
  ('Kopi Senja', 'Bantuan Modal Usaha Tahap 1', 'selesai', 'Modal cair penuh, omzet naik 20%', '2026-01-15'),
  ('Kopi Senja', 'Pelatihan Digital Marketing', 'aktif', 'Sedang mengikuti sesi ke-2', '2026-02-05'),
  ('Batik Alam Sari', 'Bantuan Alat Produksi', 'aktif', 'Menunggu pengiriman alat cap batik', '2026-03-02'),
  ('Rumah Jahit Mega', 'Pelatihan Digital Marketing', 'selesai', 'Sudah punya toko online', '2026-02-05'),
  ('Sayur Segar Tani', 'Bantuan Modal Usaha Tahap 1', 'terdaftar', 'Menunggu verifikasi berkas', '2026-03-10'),
  ('Roti Bunda', 'Fasilitasi Pameran & Pemasaran', 'terdaftar', 'Sudah daftar, menunggu jadwal', '2026-04-01'),
  ('Anyaman Rotan Jaya', 'Bantuan Alat Produksi', 'selesai', 'Alat sudah diterima dan digunakan', '2026-03-05')
) AS v(umkm_nama, program_nama, status, catatan, tanggal_ikut)
JOIN umkm u ON u.nama_usaha = v.umkm_nama
JOIN program_pembinaan p ON p.nama_program = v.program_nama;

INSERT INTO bantuan_diterima (riwayat_id, jenis_bantuan, nominal, keterangan, tanggal_salur)
SELECT r.id, v.jenis_bantuan, v.nominal, v.keterangan, v.tanggal_salur::date
FROM (VALUES
  ('Kopi Senja', 'Bantuan Modal Usaha Tahap 1', 'Dana Modal Usaha', 5000000, 'Transfer bank tahap 1', '2026-01-20'),
  ('Anyaman Rotan Jaya', 'Bantuan Alat Produksi', 'Alat Anyaman Set', 2500000, 'Diserahkan langsung', '2026-03-08')
) AS v(umkm_nama, program_nama, jenis_bantuan, nominal, keterangan, tanggal_salur)
JOIN umkm u ON u.nama_usaha = v.umkm_nama
JOIN program_pembinaan p ON p.nama_program = v.program_nama
JOIN riwayat_pembinaan r ON r.umkm_id = u.id AND r.program_id = p.id;
