--
-- PostgreSQL database dump
--


-- Dumped from database version 16.14 (Ubuntu 16.14-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.14 (Ubuntu 16.14-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: bantuan_diterima; Type: TABLE; Schema: public; Owner: -
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


--
-- Name: kategori_usaha; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.kategori_usaha (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    nama character varying(100) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: program_pembinaan; Type: TABLE; Schema: public; Owner: -
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


--
-- Name: riwayat_pembinaan; Type: TABLE; Schema: public; Owner: -
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


--
-- Name: umkm; Type: TABLE; Schema: public; Owner: -
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


--
-- Data for Name: bantuan_diterima; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.bantuan_diterima (id, riwayat_id, jenis_bantuan, nominal, keterangan, tanggal_salur, created_at) FROM stdin;
d2bbe80a-527b-4f88-80a8-7d40a9dab4b8	07436278-c31a-466c-b679-b2571e5be781	Dana Modal Usaha	5000000.00	Transfer bank tahap 1	2026-01-20	2026-07-17 11:50:09.911465+00
e6eb09b1-f331-45c5-a672-fbd7738cb8a8	d8fe0eb1-e8e4-45a7-8738-8d2161b6263b	Alat Anyaman Set	2500000.00	Diserahkan langsung	2026-03-08	2026-07-17 11:50:09.911465+00
\.


--
-- Data for Name: kategori_usaha; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.kategori_usaha (id, nama, created_at) FROM stdin;
79fa8d05-cb61-44db-a13c-648157dd7f0d	Kuliner	2026-07-17 11:50:09.891753+00
64189171-8057-48f2-8b15-eb103e82648f	Kerajinan	2026-07-17 11:50:09.891753+00
c8dfd8a9-dc6f-4ea7-be59-d3b57555aaf2	Fashion	2026-07-17 11:50:09.891753+00
11aaae54-4b7c-443f-9da8-4c4a02f0abb5	Jasa	2026-07-17 11:50:09.891753+00
4569dc86-c378-4cbf-aca5-5044b4865fc0	Pertanian	2026-07-17 11:50:09.891753+00
\.


--
-- Data for Name: program_pembinaan; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.program_pembinaan (id, nama_program, jenis, deskripsi, tanggal_mulai, tanggal_selesai, created_at) FROM stdin;
d6895faa-25c8-4d6d-85c8-4922db60ab4b	Bantuan Modal Usaha Tahap 1	modal	Penyaluran modal usaha untuk UMKM tahap awal	2026-01-10	2026-03-10	2026-07-17 11:50:09.906227+00
fc7bd921-9f27-4482-8862-538d0d3b4685	Pelatihan Digital Marketing	pelatihan	Pelatihan pemasaran digital untuk pelaku UMKM	2026-02-05	2026-02-07	2026-07-17 11:50:09.906227+00
96eed753-a1ad-477c-9bcb-71c5af73f5c8	Bantuan Alat Produksi	alat	Penyaluran alat produksi untuk usaha kerajinan & kuliner	2026-03-01	\N	2026-07-17 11:50:09.906227+00
9774358f-d7a6-4899-845d-a278ceb2cd9a	Fasilitasi Pameran & Pemasaran	pemasaran	Pendampingan UMKM ikut pameran lokal	2026-04-15	2026-04-20	2026-07-17 11:50:09.906227+00
\.


--
-- Data for Name: riwayat_pembinaan; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.riwayat_pembinaan (id, umkm_id, program_id, status, catatan, tanggal_ikut, created_at) FROM stdin;
b7796f8c-8ce7-40d4-a965-6c0c19dda0b1	077fc7c7-878b-423f-929e-c322b03fc248	d6895faa-25c8-4d6d-85c8-4922db60ab4b	terdaftar	Menunggu verifikasi berkas	2026-03-10	2026-07-17 11:50:09.908225+00
07436278-c31a-466c-b679-b2571e5be781	3caedf1a-e91c-4164-8006-536988b926be	d6895faa-25c8-4d6d-85c8-4922db60ab4b	selesai	Modal cair penuh, omzet naik 20%	2026-01-15	2026-07-17 11:50:09.908225+00
644caddd-bb7c-43de-9b2e-7af09e88cac7	0edb2cdb-6608-434b-a3c7-d7626cd27727	fc7bd921-9f27-4482-8862-538d0d3b4685	selesai	Sudah punya toko online	2026-02-05	2026-07-17 11:50:09.908225+00
2d1cea93-94cd-48b1-964a-6dc5b5bc8f04	3caedf1a-e91c-4164-8006-536988b926be	fc7bd921-9f27-4482-8862-538d0d3b4685	aktif	Sedang mengikuti sesi ke-2	2026-02-05	2026-07-17 11:50:09.908225+00
7124c5e1-806c-4d75-a3d5-b95fcd2f1dda	1e3a9431-8fce-4154-9570-878e19cb9358	96eed753-a1ad-477c-9bcb-71c5af73f5c8	aktif	Menunggu pengiriman alat cap batik	2026-03-02	2026-07-17 11:50:09.908225+00
d8fe0eb1-e8e4-45a7-8738-8d2161b6263b	0bb4fead-3d34-436c-a559-876097b1a5ae	96eed753-a1ad-477c-9bcb-71c5af73f5c8	selesai	Alat sudah diterima dan digunakan	2026-03-05	2026-07-17 11:50:09.908225+00
a843b84d-974d-4b8a-a03a-d2a260339f94	92f97df2-8d7b-426b-a1b7-f48d993a6340	9774358f-d7a6-4899-845d-a278ceb2cd9a	terdaftar	Sudah daftar, menunggu jadwal	2026-04-01	2026-07-17 11:50:09.908225+00
\.


--
-- Data for Name: umkm; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.umkm (id, nama_usaha, nama_pemilik, nib, kategori_id, alamat, telepon, status, created_at, updated_at) FROM stdin;
92f97df2-8d7b-426b-a1b7-f48d993a6340	Roti Bunda	Siti Fatimah	1234567890126	79fa8d05-cb61-44db-a13c-648157dd7f0d	Jl. Ahmad Yani No. 17, Malang	081234567806	aktif	2026-07-17 11:50:09.898525+00	2026-07-17 11:50:09.898525+00
3caedf1a-e91c-4164-8006-536988b926be	Kopi Senja	Dewi Anggraini	1234567890123	79fa8d05-cb61-44db-a13c-648157dd7f0d	Jl. Merdeka No. 12, Bandung	081234567801	aktif	2026-07-17 11:50:09.898525+00	2026-07-17 11:50:09.898525+00
0bb4fead-3d34-436c-a559-876097b1a5ae	Anyaman Rotan Jaya	Bambang Wijaya	\N	64189171-8057-48f2-8b15-eb103e82648f	Jl. Cihampelas No. 90, Bandung	081234567807	aktif	2026-07-17 11:50:09.898525+00	2026-07-17 11:50:09.898525+00
1e3a9431-8fce-4154-9570-878e19cb9358	Batik Alam Sari	Sutrisno	1234567890124	64189171-8057-48f2-8b15-eb103e82648f	Jl. Kaliurang No. 45, Yogyakarta	081234567802	aktif	2026-07-17 11:50:09.898525+00	2026-07-17 11:50:09.898525+00
0edb2cdb-6608-434b-a3c7-d7626cd27727	Rumah Jahit Mega	Megawati Putri	\N	c8dfd8a9-dc6f-4ea7-be59-d3b57555aaf2	Jl. Sudirman No. 8, Surabaya	081234567803	aktif	2026-07-17 11:50:09.898525+00	2026-07-17 11:50:09.898525+00
857b5110-9c53-4b1d-97c0-0d30cddc8276	Laundry Kilat	Rina Marlina	\N	11aaae54-4b7c-443f-9da8-4c4a02f0abb5	Jl. Gajah Mada No. 5, Jakarta	081234567808	aktif	2026-07-17 11:50:09.898525+00	2026-07-17 11:50:09.898525+00
61c78389-1382-48f1-94f8-3eb1e202db84	Bengkel Berkah	Agus Salim	1234567890125	11aaae54-4b7c-443f-9da8-4c4a02f0abb5	Jl. Diponegoro No. 21, Semarang	081234567804	nonaktif	2026-07-17 11:50:09.898525+00	2026-07-17 11:50:09.898525+00
077fc7c7-878b-423f-929e-c322b03fc248	Sayur Segar Tani	Ny. Sumiati	\N	4569dc86-c378-4cbf-aca5-5044b4865fc0	Jl. Raya Lembang No. 3, Bandung	081234567805	aktif	2026-07-17 11:50:09.898525+00	2026-07-17 11:50:09.898525+00
\.


--
-- Name: bantuan_diterima bantuan_diterima_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bantuan_diterima
    ADD CONSTRAINT bantuan_diterima_pkey PRIMARY KEY (id);


--
-- Name: kategori_usaha kategori_usaha_nama_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.kategori_usaha
    ADD CONSTRAINT kategori_usaha_nama_key UNIQUE (nama);


--
-- Name: kategori_usaha kategori_usaha_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.kategori_usaha
    ADD CONSTRAINT kategori_usaha_pkey PRIMARY KEY (id);


--
-- Name: program_pembinaan program_pembinaan_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.program_pembinaan
    ADD CONSTRAINT program_pembinaan_pkey PRIMARY KEY (id);


--
-- Name: riwayat_pembinaan riwayat_pembinaan_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.riwayat_pembinaan
    ADD CONSTRAINT riwayat_pembinaan_pkey PRIMARY KEY (id);


--
-- Name: riwayat_pembinaan riwayat_pembinaan_umkm_id_program_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.riwayat_pembinaan
    ADD CONSTRAINT riwayat_pembinaan_umkm_id_program_id_key UNIQUE (umkm_id, program_id);


--
-- Name: umkm umkm_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.umkm
    ADD CONSTRAINT umkm_pkey PRIMARY KEY (id);


--
-- Name: idx_bantuan_riwayat; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_bantuan_riwayat ON public.bantuan_diterima USING btree (riwayat_id);


--
-- Name: idx_riwayat_program; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_riwayat_program ON public.riwayat_pembinaan USING btree (program_id);


--
-- Name: idx_riwayat_umkm; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_riwayat_umkm ON public.riwayat_pembinaan USING btree (umkm_id);


--
-- Name: idx_umkm_kategori; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_umkm_kategori ON public.umkm USING btree (kategori_id);


--
-- Name: bantuan_diterima bantuan_diterima_riwayat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bantuan_diterima
    ADD CONSTRAINT bantuan_diterima_riwayat_id_fkey FOREIGN KEY (riwayat_id) REFERENCES public.riwayat_pembinaan(id) ON DELETE CASCADE;


--
-- Name: riwayat_pembinaan riwayat_pembinaan_program_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.riwayat_pembinaan
    ADD CONSTRAINT riwayat_pembinaan_program_id_fkey FOREIGN KEY (program_id) REFERENCES public.program_pembinaan(id) ON DELETE CASCADE;


--
-- Name: riwayat_pembinaan riwayat_pembinaan_umkm_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.riwayat_pembinaan
    ADD CONSTRAINT riwayat_pembinaan_umkm_id_fkey FOREIGN KEY (umkm_id) REFERENCES public.umkm(id) ON DELETE CASCADE;


--
-- Name: umkm umkm_kategori_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.umkm
    ADD CONSTRAINT umkm_kategori_id_fkey FOREIGN KEY (kategori_id) REFERENCES public.kategori_usaha(id) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--


