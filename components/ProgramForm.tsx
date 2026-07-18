"use client";

import { useActionState } from "react";
import { Field, Input, Select, Textarea } from "@/components/Field";
import { SubmitButton } from "@/components/SubmitButton";
import { FormState } from "@/app/actions/umkm";
import { ProgramPembinaan } from "@/lib/types";

export function ProgramForm({
  action,
  initialData,
}: {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  initialData?: ProgramPembinaan;
}) {
  const [state, formAction] = useActionState(action, {});

  return (
    <form action={formAction} className="space-y-5">
      {state.error && (
        <div className="rounded-lg border border-danger bg-danger-soft px-4 py-3 text-sm text-danger">
          {state.error}
        </div>
      )}

      <Field label="Nama Program" htmlFor="nama_program" required>
        <Input
          id="nama_program"
          name="nama_program"
          defaultValue={initialData?.nama_program}
          placeholder="cth. Bantuan Modal Usaha Tahap 1"
          required
        />
      </Field>

      <Field label="Jenis Program" htmlFor="jenis" required>
        <Select id="jenis" name="jenis" defaultValue={initialData?.jenis ?? "modal"} required>
          <option value="modal">Modal</option>
          <option value="pelatihan">Pelatihan</option>
          <option value="alat">Alat</option>
          <option value="pemasaran">Pemasaran</option>
        </Select>
      </Field>

      <Field label="Deskripsi" htmlFor="deskripsi">
        <Textarea
          id="deskripsi"
          name="deskripsi"
          defaultValue={initialData?.deskripsi ?? ""}
          placeholder="Deskripsi singkat program"
        />
      </Field>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Tanggal Mulai" htmlFor="tanggal_mulai" required>
          <Input
            type="date"
            id="tanggal_mulai"
            name="tanggal_mulai"
            defaultValue={initialData?.tanggal_mulai?.slice(0, 10)}
            required
          />
        </Field>
        <Field label="Tanggal Selesai (opsional)" htmlFor="tanggal_selesai">
          <Input
            type="date"
            id="tanggal_selesai"
            name="tanggal_selesai"
            defaultValue={initialData?.tanggal_selesai?.slice(0, 10) ?? ""}
          />
        </Field>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <SubmitButton>
          {initialData ? "Simpan Perubahan" : "Buat Program"}
        </SubmitButton>
      </div>
    </form>
  );
}
