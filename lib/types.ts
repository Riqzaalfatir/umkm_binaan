export type StatusUmkm = "aktif" | "nonaktif";
export type JenisProgram = "modal" | "pelatihan" | "alat" | "pemasaran";
export type StatusRiwayat = "terdaftar" | "aktif" | "selesai" | "dibatalkan";

export interface KategoriUsaha {
  id: string;
  nama: string;
  created_at: string;
}

export interface Umkm {
  id: string;
  nama_usaha: string;
  nama_pemilik: string;
  nib: string | null;
  kategori_id: string | null;
  kategori_nama?: string | null;
  alamat: string;
  telepon: string | null;
  status: StatusUmkm;
  created_at: string;
  updated_at: string;
}

export interface ProgramPembinaan {
  id: string;
  nama_program: string;
  jenis: JenisProgram;
  deskripsi: string | null;
  tanggal_mulai: string;
  tanggal_selesai: string | null;
  created_at: string;
  jumlah_peserta?: number;
}

export interface RiwayatPembinaan {
  id: string;
  umkm_id: string;
  umkm_nama?: string;
  program_id: string;
  program_nama?: string;
  status: StatusRiwayat;
  catatan: string | null;
  tanggal_ikut: string;
  created_at: string;
}

export interface BantuanDiterima {
  id: string;
  riwayat_id: string;
  jenis_bantuan: string;
  nominal: number | null;
  keterangan: string | null;
  tanggal_salur: string;
  created_at: string;
  umkm_nama?: string;
  program_nama?: string;
}
