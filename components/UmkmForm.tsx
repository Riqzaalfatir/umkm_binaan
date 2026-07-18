"use client";

import { useActionState } from "react";
import { Field, Input, Select, Textarea } from "@/components/Field";
import { SubmitButton } from "@/components/SubmitButton";
import { FormState } from "@/app/actions/umkm";
import { Umkm, KategoriUsaha } from "@/lib/types";

export function UmkmForm({
  action,
  kategoriList,
  initialData,
}: {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  kategoriList: KategoriUsaha[];
  initialData?: Umkm;
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
        <Field label="Nama Usaha" htmlFor="nama_usaha" required>
          <Input
            id="nama_usaha"
            name="nama_usaha"
            defaultValue={initialData?.nama_usaha}
            placeholder="cth. Kopi Senja"
            required
          />
        </Field>
        <Field label="Nama Pemilik" htmlFor="nama_pemilik" required>
          <Input
            id="nama_pemilik"
            name="nama_pemilik"
            defaultValue={initialData?.nama_pemilik}
            placeholder="cth. Dewi Anggraini"
            required
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="NIB (opsional)" htmlFor="nib">
          <Input
            id="nib"
            name="nib"
            defaultValue={initialData?.nib ?? ""}
            placeholder="Nomor Induk Berusaha"
          />
        </Field>
        <Field label="Telepon" htmlFor="telepon">
          <Input
            id="telepon"
            name="telepon"
            defaultValue={initialData?.telepon ?? ""}
            placeholder="08xxxxxxxxxx"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Kategori Usaha" htmlFor="kategori_id">
          <Select
            id="kategori_id"
            name="kategori_id"
            defaultValue={initialData?.kategori_id ?? ""}
          >
            <option value="">Tanpa Kategori</option>
            {kategoriList.map((k) => (
              <option key={k.id} value={k.id}>
                {k.nama}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Status" htmlFor="status" required>
          <Select
            id="status"
            name="status"
            defaultValue={initialData?.status ?? "aktif"}
            required
          >
            <option value="aktif">Aktif</option>
            <option value="nonaktif">Nonaktif</option>
          </Select>
        </Field>
      </div>

      <Field label="Alamat" htmlFor="alamat" required>
        <Textarea
          id="alamat"
          name="alamat"
          defaultValue={initialData?.alamat}
          placeholder="Alamat lengkap usaha"
          required
        />
      </Field>

      <div className="flex items-center gap-3 pt-2">
        <SubmitButton>{initialData ? "Simpan Perubahan" : "Tambah UMKM"}</SubmitButton>
      </div>
    </form>
  );
}
