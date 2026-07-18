import { createProgramAction } from "@/app/actions/program";
import { PageHeader } from "@/components/PageHeader";
import { ProgramForm } from "@/components/ProgramForm";

export const dynamic = "force-dynamic";

export default function ProgramBaruPage() {
  return (
    <div>
      <PageHeader
        title="Buat Program Pembinaan"
        description="Buat program baru untuk didaftarkan ke UMKM binaan."
      />
      <div className="max-w-2xl rounded-xl border border-border bg-surface p-6">
        <ProgramForm action={createProgramAction} />
      </div>
    </div>
  );
}
