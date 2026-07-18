import { getUmkmOptions } from "@/lib/queries/umkm";
import { getProgramOptions } from "@/lib/queries/program";
import { createRiwayatAction } from "@/app/actions/riwayat";
import { PageHeader } from "@/components/PageHeader";
import { RiwayatForm } from "@/components/RiwayatForm";

export const dynamic = "force-dynamic";

export default async function RiwayatBaruPage({
  searchParams,
}: {
  searchParams: Promise<{ umkm?: string }>;
}) {
  const { umkm } = await searchParams;
  const [umkmOptions, programOptions] = await Promise.all([
    getUmkmOptions(),
    getProgramOptions(),
  ]);

  return (
    <div>
      <PageHeader
        title="Daftarkan UMKM ke Program"
        description="Catat keikutsertaan UMKM dalam program pembinaan."
      />
      <div className="max-w-2xl rounded-xl border border-border bg-surface p-6">
        <RiwayatForm
          action={createRiwayatAction}
          umkmOptions={umkmOptions}
          programOptions={programOptions}
          defaultUmkmId={umkm}
        />
      </div>
    </div>
  );
}
