"use client";

import { useActionState } from "react";
import { Field, Select, Input, Textarea } from "@/components/Field";
import { SubmitButton } from "@/components/SubmitButton";
import { FormState } from "@/app/actions/umkm";

export function BantuanForm({
  action,
  riwayatOptions,
}: {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  riwayatOptions: { id: string; label: string }[];
}) {
  const [state, formAction] = useActionState(action, {});

  return (
    <form action={formAction} className="space-y-4">
      {state.error && (
        <div className="rounded-lg border border-danger bg-danger-soft px-3 py-2.5 text-xs text-danger">
          {state.error}
        </div>
      )}

      <Field label="UMKM & Program" htmlFor="riwayat_id" required>
        <Select id="riwayat_id" name="riwayat_id" defaultValue="" required>
          <option value="">Pilih peserta program</option>
          {riwayatOptions.map((r) => (
            <option key={r.id} value={r.id}>
              {r.label}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Jenis Bantuan" htmlFor="jenis_bantuan" required>
        <Input
          id="jenis_bantuan"
          name="jenis_bantuan"
          placeholder="cth. Dana Modal Usaha"
          required
        />
      </Field>

      <Field label="Nominal (Rp, opsional)" htmlFor="nominal">
        <Input id="nominal" name="nominal" type="number" min="0" step="1000" placeholder="0" />
      </Field>

      <Field label="Tanggal Salur" htmlFor="tanggal_salur" required>
        <Input
          type="date"
          id="tanggal_salur"
          name="tanggal_salur"
          defaultValue={new Date().toISOString().slice(0, 10)}
          required
        />
      </Field>

      <Field label="Keterangan" htmlFor="keterangan">
        <Textarea id="keterangan" name="keterangan" placeholder="Opsional" rows={2} />
      </Field>

      <SubmitButton>Catat Bantuan</SubmitButton>
    </form>
  );
}
