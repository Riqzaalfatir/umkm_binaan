"use client";

import { useActionState } from "react";
import { Field, Select, Input, Textarea } from "@/components/Field";
import { SubmitButton } from "@/components/SubmitButton";
import { FormState } from "@/app/actions/umkm";
import { RiwayatPembinaan } from "@/lib/types";

export function RiwayatForm({
  action,
  umkmOptions,
  programOptions,
  initialData,
  defaultUmkmId,
}: {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  umkmOptions: { id: string; nama_usaha: string }[];
  programOptions: { id: string; nama_program: string }[];
  initialData?: RiwayatPembinaan;
  defaultUmkmId?: string;
}) {
  const [state, formAction] = useActionState(action, {});

  return (
    <form action={formAction} className="space-y-5">
      {state.error && (
        <div className="rounded-lg border border-danger bg-danger-soft px-4 py-3 text-sm text-danger">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="UMKM" htmlFor="umkm_id" required>
          <Select
            id="umkm_id"
            name="umkm_id"
            defaultValue={initialData?.umkm_id ?? defaultUmkmId ?? ""}
            required
          >
            <option value="">Pilih UMKM</option>
            {umkmOptions.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nama_usaha}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Program Pembinaan" htmlFor="program_id" required>
          <Select
            id="program_id"
            name="program_id"
            defaultValue={initialData?.program_id ?? ""}
            required
          >
            <option value="">Pilih Program</option>
            {programOptions.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nama_program}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Status" htmlFor="status" required>
          <Select
            id="status"
            name="status"
            defaultValue={initialData?.status ?? "terdaftar"}
            required
          >
            <option value="terdaftar">Terdaftar</option>
            <option value="aktif">Aktif</option>
            <option value="selesai">Selesai</option>
            <option value="dibatalkan">Dibatalkan</option>
          </Select>
        </Field>
        <Field label="Tanggal Ikut" htmlFor="tanggal_ikut" required>
          <Input
            type="date"
            id="tanggal_ikut"
            name="tanggal_ikut"
            defaultValue={
              initialData?.tanggal_ikut?.slice(0, 10) ??
              new Date().toISOString().slice(0, 10)
            }
            required
          />
        </Field>
      </div>

      <Field label="Catatan" htmlFor="catatan">
        <Textarea
          id="catatan"
          name="catatan"
          defaultValue={initialData?.catatan ?? ""}
          placeholder="Catatan progres pembinaan (opsional)"
        />
      </Field>

      <div className="flex items-center gap-3 pt-2">
        <SubmitButton>
          {initialData ? "Simpan Perubahan" : "Daftarkan"}
        </SubmitButton>
      </div>
    </form>
  );
}
