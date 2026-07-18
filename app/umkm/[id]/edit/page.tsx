import { notFound } from "next/navigation";
import { getUmkmById } from "@/lib/queries/umkm";
import { getAllKategori } from "@/lib/queries/kategori";
import { updateUmkmAction } from "@/app/actions/umkm";
import { PageHeader } from "@/components/PageHeader";
import { UmkmForm } from "@/components/UmkmForm";

export const dynamic = "force-dynamic";

export default async function UmkmEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [umkm, kategoriList] = await Promise.all([
    getUmkmById(id),
    getAllKategori(),
  ]);
  if (!umkm) notFound();

  const action = updateUmkmAction.bind(null, id);

  return (
    <div>
      <PageHeader
        title={`Edit ${umkm.nama_usaha}`}
        description="Perbarui data UMKM binaan."
      />
      <div className="max-w-2xl rounded-xl border border-border bg-surface p-6">
        <UmkmForm action={action} kategoriList={kategoriList} initialData={umkm} />
      </div>
    </div>
  );
}
