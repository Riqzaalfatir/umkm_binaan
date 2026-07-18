import { getAllKategori } from "@/lib/queries/kategori";
import { createUmkmAction } from "@/app/actions/umkm";
import { PageHeader } from "@/components/PageHeader";
import { UmkmForm } from "@/components/UmkmForm";

export const dynamic = "force-dynamic";

export default async function UmkmBaruPage() {
  const kategoriList = await getAllKategori();

  return (
    <div>
      <PageHeader
        title="Tambah UMKM"
        description="Daftarkan UMKM baru ke dalam program pembinaan."
      />
      <div className="max-w-2xl rounded-xl border border-border bg-surface p-6">
        <UmkmForm action={createUmkmAction} kategoriList={kategoriList} />
      </div>
    </div>
  );
}
