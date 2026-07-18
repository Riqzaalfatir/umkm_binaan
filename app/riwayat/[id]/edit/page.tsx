import { notFound } from "next/navigation";
import { getRiwayatById } from "@/lib/queries/riwayat";
import { getUmkmOptions } from "@/lib/queries/umkm";
import { getProgramOptions } from "@/lib/queries/program";
import { updateRiwayatAction } from "@/app/actions/riwayat";
import { PageHeader } from "@/components/PageHeader";
import { RiwayatForm } from "@/components/RiwayatForm";

export const dynamic = "force-dynamic";

export default async function RiwayatEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [riwayat, umkmOptions, programOptions] = await Promise.all([
    getRiwayatById(id),
    getUmkmOptions(),
    getProgramOptions(),
  ]);
  if (!riwayat) notFound();

  const action = updateRiwayatAction.bind(null, id);

  return (
    <div>
      <PageHeader
        title="Edit Riwayat Pembinaan"
        description={`${riwayat.umkm_nama} — ${riwayat.program_nama}`}
      />
      <div className="max-w-2xl rounded-xl border border-border bg-surface p-6">
        <RiwayatForm
          action={action}
          umkmOptions={umkmOptions}
          programOptions={programOptions}
          initialData={riwayat}
        />
      </div>
    </div>
  );
}
