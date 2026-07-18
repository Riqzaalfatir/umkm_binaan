import { notFound } from "next/navigation";
import { getProgramById } from "@/lib/queries/program";
import { updateProgramAction, deleteProgramAction } from "@/app/actions/program";
import { PageHeader } from "@/components/PageHeader";
import { ProgramForm } from "@/components/ProgramForm";
import { DeleteButton } from "@/components/DeleteButton";

export const dynamic = "force-dynamic";

export default async function ProgramEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const program = await getProgramById(id);
  if (!program) notFound();

  const action = updateProgramAction.bind(null, id);

  return (
    <div>
      <PageHeader
        title={`Edit ${program.nama_program}`}
        description="Perbarui detail program pembinaan."
        action={<DeleteButton action={deleteProgramAction.bind(null, id)} />}
      />
      <div className="max-w-2xl rounded-xl border border-border bg-surface p-6">
        <ProgramForm action={action} initialData={program} />
      </div>
    </div>
  );
}
