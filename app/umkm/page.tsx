import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { getUmkmList } from "@/lib/queries/umkm";
import { getAllKategori } from "@/lib/queries/kategori";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/Badge";
import { Select } from "@/components/Field";

export const dynamic = "force-dynamic";

export default async function UmkmListPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    kategori?: string;
    status?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10) || 1;
  const perPage = 8;

  const [{ data, total }, kategoriList] = await Promise.all([
    getUmkmList({
      search: params.q || "",
      kategori_id: params.kategori || "",
      status: (params.status as "aktif" | "nonaktif") || "",
      page,
      perPage,
    }),
    getAllKategori(),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / perPage));

  return (
    <div>
      <PageHeader
        title="Data UMKM"
        description={`${total} UMKM terdaftar dalam program pembinaan.`}
        action={
          <Link
            href="/umkm/baru"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-hover"
          >
            <Plus size={16} />
            Tambah UMKM
          </Link>
        }
      />

      <form className="mb-4 flex flex-wrap gap-3" method="get">
        <div className="relative min-w-[220px] flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-faint"
          />
          <input
            type="text"
            name="q"
            defaultValue={params.q}
            placeholder="Cari nama usaha atau pemilik..."
            className="w-full rounded-lg border border-border bg-surface py-2.5 pl-9 pr-3 text-sm placeholder:text-text-faint focus:border-primary"
          />
        </div>
        <Select name="kategori" defaultValue={params.kategori || ""} className="w-48">
          <option value="">Semua Kategori</option>
          {kategoriList.map((k) => (
            <option key={k.id} value={k.id}>
              {k.nama}
            </option>
          ))}
        </Select>
        <Select name="status" defaultValue={params.status || ""} className="w-40">
          <option value="">Semua Status</option>
          <option value="aktif">Aktif</option>
          <option value="nonaktif">Nonaktif</option>
        </Select>
        <button
          type="submit"
          className="rounded-lg border border-border-strong px-4 py-2.5 text-sm font-medium hover:bg-bg"
        >
          Terapkan
        </button>
      </form>

      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-bg/60 text-xs uppercase tracking-wide text-text-faint">
              <th className="px-4 py-3 font-medium">Nama Usaha</th>
              <th className="px-4 py-3 font-medium">Pemilik</th>
              <th className="px-4 py-3 font-medium">Kategori</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-text-faint">
                  Tidak ada UMKM yang cocok dengan pencarian.
                </td>
              </tr>
            )}
            {data.map((u) => (
              <tr key={u.id} className="border-b border-border last:border-0 hover:bg-bg/40">
                <td className="px-4 py-3 font-medium">{u.nama_usaha}</td>
                <td className="px-4 py-3 text-text-muted">{u.nama_pemilik}</td>
                <td className="px-4 py-3 text-text-muted">
                  {u.kategori_nama || "—"}
                </td>
                <td className="px-4 py-3">
                  <Badge value={u.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/umkm/${u.id}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm text-text-muted">
          <span>
            Halaman {page} dari {totalPages}
          </span>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={`/umkm?page=${page - 1}`}
                className="rounded-lg border border-border px-3 py-1.5 hover:bg-bg"
              >
                Sebelumnya
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={`/umkm?page=${page + 1}`}
                className="rounded-lg border border-border px-3 py-1.5 hover:bg-bg"
              >
                Berikutnya
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
