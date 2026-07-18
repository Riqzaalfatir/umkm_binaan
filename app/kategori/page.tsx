import { getAllKategori } from "@/lib/queries/kategori";
import { PageHeader } from "@/components/PageHeader";
import { KategoriForm } from "@/components/KategoriForm";
import { DeleteButton } from "@/components/DeleteButton";
import { deleteKategoriAction } from "@/app/actions/kategori";

export const dynamic = "force-dynamic";

export default async function KategoriPage() {
  const kategoriList = await getAllKategori();

  return (
    <div>
      <PageHeader
        title="Kategori Usaha"
        description="Kelola kategori yang digunakan untuk mengelompokkan UMKM."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-xl border border-border bg-surface">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-bg/60 text-xs uppercase tracking-wide text-text-faint">
                  <th className="px-4 py-3 font-medium">Nama Kategori</th>
                  <th className="px-4 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {kategoriList.length === 0 && (
                  <tr>
                    <td colSpan={2} className="px-4 py-10 text-center text-text-faint">
                      Belum ada kategori.
                    </td>
                  </tr>
                )}
                {kategoriList.map((k) => (
                  <tr key={k.id} className="border-b border-border last:border-0 hover:bg-bg/40">
                    <td className="px-4 py-3 font-medium">{k.nama}</td>
                    <td className="px-4 py-3 text-right">
                      <DeleteButton
                        action={deleteKategoriAction.bind(null, k.id)}
                        confirmMessage="Hapus kategori ini? UMKM yang memakainya akan jadi 'Tanpa Kategori'."
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          <h2 className="font-display text-sm font-semibold">
            Tambah Kategori
          </h2>
          <div className="mt-4">
            <KategoriForm />
          </div>
        </div>
      </div>
    </div>
  );
}
