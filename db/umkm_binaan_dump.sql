--
-- PostgreSQL database dump
--


-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

-- Started on 2026-07-18 19:46:55

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 17580)
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- TOC entry 5106 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 224 (class 1259 OID 17699)
-- Name: bantuan_diterima; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bantuan_diterima (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    riwayat_id uuid NOT NULL,
    jenis_bantuan character varying(100) NOT NULL,
    nominal numeric(14,2),
    keterangan text,
    tanggal_salur date DEFAULT CURRENT_DATE NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.bantuan_diterima OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 17618)
-- Name: kategori_usaha; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.kategori_usaha (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    nama character varying(100) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.kategori_usaha OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 17654)
-- Name: program_pembinaan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.program_pembinaan (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    nama_program character varying(150) NOT NULL,
    jenis character varying(20) NOT NULL,
    deskripsi text,
    tanggal_mulai date NOT NULL,
    tanggal_selesai date,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT program_pembinaan_jenis_check CHECK (((jenis)::text = ANY ((ARRAY['modal'::character varying, 'pelatihan'::character varying, 'alat'::character varying, 'pemasaran'::character varying])::text[])))
);


ALTER TABLE public.program_pembinaan OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 17669)
-- Name: riwayat_pembinaan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.riwayat_pembinaan (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    umkm_id uuid NOT NULL,
    program_id uuid NOT NULL,
    status character varying(20) DEFAULT 'terdaftar'::character varying NOT NULL,
    catatan text,
    tanggal_ikut date DEFAULT CURRENT_DATE NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT riwayat_pembinaan_status_check CHECK (((status)::text = ANY ((ARRAY['terdaftar'::character varying, 'aktif'::character varying, 'selesai'::character varying, 'dibatalkan'::character varying])::text[])))
);


ALTER TABLE public.riwayat_pembinaan OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 17630)
-- Name: umkm; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.umkm (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    nama_usaha character varying(150) NOT NULL,
    nama_pemilik character varying(150) NOT NULL,
    nib character varying(50),
    kategori_id uuid,
    alamat text NOT NULL,
    telepon character varying(30),
    status character varying(20) DEFAULT 'aktif'::character varying NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT umkm_status_check CHECK (((status)::text = ANY ((ARRAY['aktif'::character varying, 'nonaktif'::character varying])::text[])))
);


ALTER TABLE public.umkm OWNER TO postgres;

--
-- TOC entry 5100 (class 0 OID 17699)
-- Dependencies: 224
-- Data for Name: bantuan_diterima; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bantuan_diterima (id, riwayat_id, jenis_bantuan, nominal, keterangan, tanggal_salur, created_at) FROM stdin;
36fa7816-3985-4b29-b954-6fadafbcbebf	65b2f42c-123b-428c-8f99-2738bea012f0	Fasilitasi Pameran UMKM	2500000.00	Bantuan biaya stan pameran dan promosi produk pertanian.	2026-08-18	2026-07-18 11:37:39.642863+07
cd80881e-a1fb-452e-8cbb-1ecb35ac009f	c858287b-b90c-4576-939c-418466da726b	Mesin Sealer & Alat Pengemasan	4000000.00	Bantuan mesin pengemasan untuk meningkatkan kualitas produk kerajinan.	2026-07-18	2026-07-18 11:38:02.528701+07
2e998e2c-23df-4567-88de-4d607ce9c0de	08eb956b-c106-41bd-afd5-38931b029a79	Pelatihan Pengelolaan Keuangan	500000.00	Mengikuti pelatihan pencatatan keuangan dan penyusunan laporan usaha.	2026-07-18	2026-07-18 11:38:41.165261+07
35bfe809-9df6-44d1-9d2b-bdee003f57d9	d2144748-bd86-430a-88b0-f622b1f32fe9	Alat Anyaman Set	2500000.00	Bantuan alat produksi untuk meningkatkan kapasitas usaha anyaman rotan.	2026-07-18	2026-07-18 11:39:01.758458+07
2b89b87f-e57f-4d76-85f1-6dac239596b0	db056fbb-38bb-4793-a8d6-e5d728d2feac	Modal Usaha	15000000.00	Bantuan modal untuk pembangunan greenhouse dan pembelian bibit sayuran.	2026-05-20	2026-07-18 19:25:19.080027+07
00bdbdc1-7d3f-422a-bb15-fd4721d95116	9c2bf68d-1349-4110-a79a-5750b8beed57	Modal Usaha	10000000.00	Penambahan peralatan dapur dan pembelian bahan baku.	2026-06-02	2026-07-18 19:26:31.03111+07
\.


--
-- TOC entry 5096 (class 0 OID 17618)
-- Dependencies: 220
-- Data for Name: kategori_usaha; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.kategori_usaha (id, nama, created_at) FROM stdin;
6d162098-ea1c-48b9-9222-3e9c5e71b397	Kuliner	2026-07-18 08:33:45.598348+07
ab23255b-1a8b-40ac-a6da-0cb4e29d63da	Kerajinan	2026-07-18 08:33:45.598348+07
e94342d4-9328-4a0a-9bcd-f960f6c1f016	Fashion	2026-07-18 08:33:45.598348+07
730f543e-8c65-4acf-81db-29bf0e104b06	Jasa	2026-07-18 08:33:45.598348+07
4e9d733e-458e-41ad-be5c-cb76133c2941	Pertanian	2026-07-18 08:33:45.598348+07
e5eae8e9-1338-469b-b074-db40c43398fb	Teknologi	2026-07-18 09:02:35.658894+07
7eb2013f-a9c2-4bab-93e1-dda517025b29	Kesehatan	2026-07-18 09:02:39.730524+07
18ed1a96-cfa2-4524-b2ad-8c8ae399c9fb	Pariwisata	2026-07-18 09:02:43.262712+07
5341aa0e-465c-4a41-89f4-07168fab7831	Pendampingan	2026-07-18 09:03:53.030339+07
6b6d7869-7095-42d6-a03b-3979a2e265bf	Pelatihan	2026-07-18 09:04:04.023112+07
\.


--
-- TOC entry 5098 (class 0 OID 17654)
-- Dependencies: 222
-- Data for Name: program_pembinaan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.program_pembinaan (id, nama_program, jenis, deskripsi, tanggal_mulai, tanggal_selesai, created_at) FROM stdin;
23df3222-306a-430f-8940-7759a739f5a2	Bantuan Modal Usaha Tahap 1	modal	Penyaluran modal usaha untuk UMKM tahap awal	2026-01-10	2026-03-10	2026-07-18 08:33:45.598348+07
05439ebb-7b0f-47e6-b874-37a3f150d2c2	Pelatihan Digital Marketing	pelatihan	Pelatihan pemasaran digital untuk pelaku UMKM	2026-02-05	2026-02-07	2026-07-18 08:33:45.598348+07
71a6165e-e76e-492b-a723-d9ec2b8f4458	Bantuan Alat Produksi	alat	Penyaluran alat produksi untuk usaha kerajinan & kuliner	2026-03-01	\N	2026-07-18 08:33:45.598348+07
ab60f156-1be2-4997-a5be-ea0856e616da	Fasilitasi Pameran & Pemasaran	pemasaran	Pendampingan UMKM ikut pameran lokal	2026-04-15	2026-04-20	2026-07-18 08:33:45.598348+07
615c1cce-48d9-4fdb-aa86-384f8e3d9702	Workshop Pengelolan Keuangan UMKM	pelatihan	Pelatihan pencatatan keuangan sederhana, penyusunan laporan laba rugi, dan pengelolaan arus kas untuk pelaku UMKM.	2026-08-18	2026-08-20	2026-07-18 11:26:50.676784+07
f5b30b6b-2da7-44da-aa7b-f9b25698f136	Bantuan Mesin Pengemasan Produk	alat	Bantuan mesin pengemasan untuk meningkatkan kualitas kemasan dan efisiensi proses produksi UMKM.	2026-10-01	2026-10-15	2026-07-18 11:27:32.545623+07
5a8ddf1d-eb59-409e-8764-54fbce99f8e1	Bantuan Modal Pengembangan Usaha	modal	Bantuan modal bagi UMKM yang ingin meningkatkan kapasitas produksi dan memperluas usahanya.	2026-05-05	2026-06-30	2026-07-18 19:10:37.077266+07
8ebd59c7-79c8-4cab-9d00-09bde88af3f3	Pelatihan Pengelolaan Stok Barang	pelatihan	Pelatihan pengelolaan persediaan barang, pencatatan stok, dan perencanaan kebutuhan bahan baku secara efisien.	2026-07-14	2026-07-16	2026-07-18 19:11:07.638227+07
36a0d648-437d-4a2f-b544-a48a5b43a11a	Bantuan Peralatan Kasir Digital	alat	Penyaluran perangkat kasir digital untuk membantu UMKM dalam transaksi dan pencatatan penjualan.	2026-09-09	2026-08-20	2026-07-18 19:11:46.13546+07
7d359cdb-515f-4b92-85de-065c6971cae5	Promosi Produk melalui Marketplace	pemasaran	Pendampingan promosi produk di marketplace dan media sosial untuk meningkatkan jangkauan pasar serta penjualan UMKM.	2026-11-03	2027-12-05	2026-07-18 19:12:25.737156+07
\.


--
-- TOC entry 5099 (class 0 OID 17669)
-- Dependencies: 223
-- Data for Name: riwayat_pembinaan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.riwayat_pembinaan (id, umkm_id, program_id, status, catatan, tanggal_ikut, created_at) FROM stdin;
8b7a86b3-fe37-41fe-b034-e34fcec33f14	a92d9a93-cab0-47f7-af76-2249b2b31a38	23df3222-306a-430f-8940-7759a739f5a2	terdaftar	Menunggu verifikasi berkas	2026-03-10	2026-07-18 08:33:45.598348+07
dc06a074-53eb-460a-869e-ae047ecf020a	db2eafaa-b3cc-4f75-9829-1f81526da471	05439ebb-7b0f-47e6-b874-37a3f150d2c2	selesai	Sudah punya toko online	2026-02-05	2026-07-18 08:33:45.598348+07
f30e4f78-59a3-4d75-afad-34c63ff136d9	2ed8124a-ce00-4301-b089-e7e5c50d5f21	71a6165e-e76e-492b-a723-d9ec2b8f4458	aktif	Menunggu pengiriman alat cap batik	2026-03-02	2026-07-18 08:33:45.598348+07
d2144748-bd86-430a-88b0-f622b1f32fe9	bb27a374-41db-4336-b9f2-3b34e03509c2	71a6165e-e76e-492b-a723-d9ec2b8f4458	selesai	Alat sudah diterima dan digunakan	2026-03-05	2026-07-18 08:33:45.598348+07
08eb956b-c106-41bd-afd5-38931b029a79	cb6666e6-fc49-4287-a800-d90f9ae5235e	615c1cce-48d9-4fdb-aa86-384f8e3d9702	terdaftar	Mengikuti pelatihan untuk meningkatkan kemampuan pencatatan keuangan usaha.	2026-07-18	2026-07-18 11:31:55.101059+07
c858287b-b90c-4576-939c-418466da726b	ba9105c2-d036-471a-84f0-16d6c2a658fd	f5b30b6b-2da7-44da-aa7b-f9b25698f136	terdaftar	Terdaftar sebagai calon penerima bantuan mesin pengemasan produk.	2026-07-18	2026-07-18 11:32:16.648867+07
65b2f42c-123b-428c-8f99-2738bea012f0	ceba36d4-8ff3-46c4-820a-4b57f1fae436	ab60f156-1be2-4997-a5be-ea0856e616da	terdaftar	Akan mengikuti pameran produk UMKM tingkat kabupaten untuk memperluas pemasaran.	2026-07-18	2026-07-18 11:32:37.567258+07
9c2bf68d-1349-4110-a79a-5750b8beed57	4d7cda3a-658d-433a-a81d-2431c0e8ca85	615c1cce-48d9-4fdb-aa86-384f8e3d9702	terdaftar	Mengikuti pelatihan pencatatan keuangan untuk usaha kuliner.	2026-08-05	2026-07-18 19:21:16.945661+07
dfbad8ff-7c0d-46e4-8368-b4eb9776d0e8	c8cd9900-5e93-428e-bde7-2f1a72b1f96a	36a0d648-437d-4a2f-b544-a48a5b43a11a	aktif	Peralatan kasir digital telah diterima dan mulai digunakan.	2026-09-12	2026-07-18 19:21:47.67733+07
db056fbb-38bb-4793-a8d6-e5d728d2feac	93417e36-5fd1-45e6-8a38-f580121bb1ec	5a8ddf1d-eb59-409e-8764-54fbce99f8e1	aktif	Modal dimanfaatkan untuk pembangunan greenhouse dan pembelian bibit.	2026-03-10	2026-07-18 19:22:40.972138+07
cd94b1c2-a3d8-462e-964d-918d1264e671	d378291b-c10d-4f27-848b-9ebad45a6d70	7d359cdb-515f-4b92-85de-065c6971cae5	selesai	Berhasil membuka toko di marketplace dan meningkatkan jumlah pelanggan.	2026-11-05	2026-07-18 19:23:19.680153+07
54664278-02d0-4f4d-baf7-07cad7f2fa3e	93425bf6-87fc-4a8d-acd2-9e53d33d52c7	ab60f156-1be2-4997-a5be-ea0856e616da	dibatalkan	Berpartisipasi dalam pameran UMKM tingkat Kota Bandung untuk memperluas pemasaran produk.	2026-07-14	2026-07-18 19:23:53.774346+07
\.


--
-- TOC entry 5097 (class 0 OID 17630)
-- Dependencies: 221
-- Data for Name: umkm; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.umkm (id, nama_usaha, nama_pemilik, nib, kategori_id, alamat, telepon, status, created_at, updated_at) FROM stdin;
18eef014-b564-4406-8823-67001ff03383	Laundry Kilat	Rina Marlina	\N	730f543e-8c65-4acf-81db-29bf0e104b06	Jl. Gajah Mada No. 5, Jakarta	081234567808	aktif	2026-04-03 00:00:00+07	2026-02-21 00:00:00+07
50fd3f16-b85b-404f-be40-9fedce1a66fa	Roti Bunda	Siti Fatimah	1234567890126	6d162098-ea1c-48b9-9222-3e9c5e71b397	Jl. Ahmad Yani No. 17, Malang	081234567806	aktif	2026-02-03 00:00:00+07	2026-02-17 00:00:00+07
2ed8124a-ce00-4301-b089-e7e5c50d5f21	Batik Alam Sari	Sutrisno	1234567890124	ab23255b-1a8b-40ac-a6da-0cb4e29d63da	Jl. Kaliurang No. 45, Yogyakarta	081234567802	aktif	2026-05-09 00:00:00+07	2026-02-01 00:00:00+07
a92d9a93-cab0-47f7-af76-2249b2b31a38	Sayur Segar Tani	Ny. Sumiati	\N	4e9d733e-458e-41ad-be5c-cb76133c2941	Jl. Raya Lembang No. 3, Bandung	081234567805	aktif	2026-03-12 00:00:00+07	2026-03-22 00:00:00+07
bb27a374-41db-4336-b9f2-3b34e03509c2	Anyaman Rotan Jaya	Bambang Wijaya	\N	ab23255b-1a8b-40ac-a6da-0cb4e29d63da	Jl. Cihampelas No. 90, Bandung	081234567807	aktif	2026-02-06 00:00:00+07	2026-03-27 00:00:00+07
b83fde62-f1c8-4fa6-97f8-45788abf59a1	Bengkel Berkah	Agus Salim	1234567890125	730f543e-8c65-4acf-81db-29bf0e104b06	Jl. Diponegoro No. 21, Semarang	081234567804	nonaktif	2026-05-24 00:00:00+07	2026-03-19 00:00:00+07
ba9105c2-d036-471a-84f0-16d6c2a658fd	Kreativa Craft	Dian Puspitasari	9120304513789	ab23255b-1a8b-40ac-a6da-0cb4e29d63da	Jl. Setiabudi No. 145, Kota Bandung	082145678901	aktif	2026-03-11 00:00:00+07	2026-04-22 00:00:00+07
db2eafaa-b3cc-4f75-9829-1f81526da471	Rumah Jahit Mega	Megawati Putri	\N	e94342d4-9328-4a0a-9bcd-f960f6c1f016	Jl. Sudirman No. 8, Surabaya	081234567803	aktif	2026-03-24 00:00:00+07	2026-04-22 00:00:00+07
cb6666e6-fc49-4287-a800-d90f9ae5235e	Kopi Nusantara	Fajar Hidayat	9120304512456	6d162098-ea1c-48b9-9222-3e9c5e71b397	Jl. Buah Batu No. 98, Kota Bandung	081356789012	aktif	2026-02-12 00:00:00+07	2026-04-01 00:00:00+07
c8cd9900-5e93-428e-bde7-2f1a72b1f96a	Mebel Jati Sejahtera	Hendra Gunawan	9126031845202	ab23255b-1a8b-40ac-a6da-0cb4e29d63da	Jl. Raya Rancaekek No. 102, Rancaekek, Kabupaten Bandung	0812-3456-7802	aktif	2026-02-14 00:00:00+07	2026-05-22 00:00:00+07
4d7cda3a-658d-433a-a81d-2431c0e8ca85	Dapur Rempah Ibusari	Sari Wulandari	9126031845201	6d162098-ea1c-48b9-9222-3e9c5e71b397	Jl. Terusan Buah Batu No. 88, Bojongsoang, Kabupaten Bandung	0812-3456-7801	aktif	2026-07-26 00:00:00+07	2026-05-24 00:00:00+07
ceba36d4-8ff3-46c4-820a-4b57f1fae436	Agro Hijau Mandiri	Wahyu Saputra	9120304514962	4e9d733e-458e-41ad-be5c-cb76133c2941	Jl. Raya Lembang No. 88, Kabupaten Bandung Barat	085234567890	aktif	2026-02-25 00:00:00+07	2026-05-14 00:00:00+07
d378291b-c10d-4f27-848b-9ebad45a6d70	Glow Beauty Studio	Lestari Ayu	9126031845204	730f543e-8c65-4acf-81db-29bf0e104b06	Jl. Gegerkalong Hilir No. 45, Sukasari, Kota Bandung	0812-3456-7804	nonaktif	2026-03-21 00:00:00+07	2026-06-23 00:00:00+07
95fa54c3-c317-4d8d-87b9-49084fc64c33	Aneka Frozen Food Barokah	Nur Aisyah	9126031845205	6d162098-ea1c-48b9-9222-3e9c5e71b397	Jl. Cibiru Hilir No. 31, Cibiru, Kota Bandung	0812-3456-7805	aktif	2026-03-19 00:00:00+07	2026-06-19 00:00:00+07
93417e36-5fd1-45e6-8a38-f580121bb1ec	Fresh Farm Organik	Andi Prasetyo	9126031845203	4e9d733e-458e-41ad-be5c-cb76133c2941	Jl. Maribaya No. 24, Lembang, Kabupaten Bandung Barat	0812-3456-7803	aktif	2026-02-19 00:00:00+07	2026-06-24 00:00:00+07
238329b5-f11b-4f1f-a59a-e8b0f5bfeb11	Tani Makmur Hidroponik	Rudi Hartono	9126031845206	4e9d733e-458e-41ad-be5c-cb76133c2941	Jl. Kolonel Masturi No. 67, Parongpong, Kabupaten Bandung Barat	0812-3456-7806	aktif	2026-04-18 00:00:00+07	2026-07-13 00:00:00+07
0a5be00e-ab39-4b09-bd42-4d126a89d9d9	Service Elektronik Prima	Budi Kurniawan	9126031845208	730f543e-8c65-4acf-81db-29bf0e104b06	Jl. Soekarno Hatta No. 512, Kiaracondong, Kota Bandung	0812-3456-7808	aktif	2026-04-07 00:00:00+07	2026-07-15 00:00:00+07
93425bf6-87fc-4a8d-acd2-9e53d33d52c7	Rajut Cantika	Intan Permata	9126031845207	ab23255b-1a8b-40ac-a6da-0cb4e29d63da	Jl. Arcamanik Endah No. 12, Arcamanik, Kota Bandung	0812-3456-7807	aktif	2026-06-23 00:00:00+07	2026-07-27 00:00:00+07
\.


--
-- TOC entry 4943 (class 2606 OID 17713)
-- Name: bantuan_diterima bantuan_diterima_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bantuan_diterima
    ADD CONSTRAINT bantuan_diterima_pkey PRIMARY KEY (id);


--
-- TOC entry 4928 (class 2606 OID 17629)
-- Name: kategori_usaha kategori_usaha_nama_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kategori_usaha
    ADD CONSTRAINT kategori_usaha_nama_key UNIQUE (nama);


--
-- TOC entry 4930 (class 2606 OID 17627)
-- Name: kategori_usaha kategori_usaha_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kategori_usaha
    ADD CONSTRAINT kategori_usaha_pkey PRIMARY KEY (id);


--
-- TOC entry 4935 (class 2606 OID 17668)
-- Name: program_pembinaan program_pembinaan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program_pembinaan
    ADD CONSTRAINT program_pembinaan_pkey PRIMARY KEY (id);


--
-- TOC entry 4939 (class 2606 OID 17686)
-- Name: riwayat_pembinaan riwayat_pembinaan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riwayat_pembinaan
    ADD CONSTRAINT riwayat_pembinaan_pkey PRIMARY KEY (id);


--
-- TOC entry 4941 (class 2606 OID 17688)
-- Name: riwayat_pembinaan riwayat_pembinaan_umkm_id_program_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riwayat_pembinaan
    ADD CONSTRAINT riwayat_pembinaan_umkm_id_program_id_key UNIQUE (umkm_id, program_id);


--
-- TOC entry 4933 (class 2606 OID 17648)
-- Name: umkm umkm_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.umkm
    ADD CONSTRAINT umkm_pkey PRIMARY KEY (id);


--
-- TOC entry 4944 (class 1259 OID 17722)
-- Name: idx_bantuan_riwayat; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_bantuan_riwayat ON public.bantuan_diterima USING btree (riwayat_id);


--
-- TOC entry 4936 (class 1259 OID 17721)
-- Name: idx_riwayat_program; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_riwayat_program ON public.riwayat_pembinaan USING btree (program_id);


--
-- TOC entry 4937 (class 1259 OID 17720)
-- Name: idx_riwayat_umkm; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_riwayat_umkm ON public.riwayat_pembinaan USING btree (umkm_id);


--
-- TOC entry 4931 (class 1259 OID 17719)
-- Name: idx_umkm_kategori; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_umkm_kategori ON public.umkm USING btree (kategori_id);


--
-- TOC entry 4948 (class 2606 OID 17714)
-- Name: bantuan_diterima bantuan_diterima_riwayat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bantuan_diterima
    ADD CONSTRAINT bantuan_diterima_riwayat_id_fkey FOREIGN KEY (riwayat_id) REFERENCES public.riwayat_pembinaan(id) ON DELETE CASCADE;


--
-- TOC entry 4946 (class 2606 OID 17694)
-- Name: riwayat_pembinaan riwayat_pembinaan_program_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riwayat_pembinaan
    ADD CONSTRAINT riwayat_pembinaan_program_id_fkey FOREIGN KEY (program_id) REFERENCES public.program_pembinaan(id) ON DELETE CASCADE;


--
-- TOC entry 4947 (class 2606 OID 17689)
-- Name: riwayat_pembinaan riwayat_pembinaan_umkm_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.riwayat_pembinaan
    ADD CONSTRAINT riwayat_pembinaan_umkm_id_fkey FOREIGN KEY (umkm_id) REFERENCES public.umkm(id) ON DELETE CASCADE;


--
-- TOC entry 4945 (class 2606 OID 17649)
-- Name: umkm umkm_kategori_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.umkm
    ADD CONSTRAINT umkm_kategori_id_fkey FOREIGN KEY (kategori_id) REFERENCES public.kategori_usaha(id) ON DELETE SET NULL;


-- Completed on 2026-07-18 19:46:56

--
-- PostgreSQL database dump complete
--


