"use client";

import { useActionState, useRef, useEffect } from "react";
import { Field, Input } from "@/components/Field";
import { SubmitButton } from "@/components/SubmitButton";
import { createKategoriAction } from "@/app/actions/kategori";

export function KategoriForm() {
  const [state, formAction] = useActionState(createKategoriAction, {});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      {state.error && (
        <div className="rounded-lg border border-danger bg-danger-soft px-3 py-2.5 text-xs text-danger">
          {state.error}
        </div>
      )}
      <Field label="Nama Kategori" htmlFor="nama" required>
        <Input id="nama" name="nama" placeholder="cth. Kuliner" required />
      </Field>
      <SubmitButton>Tambah Kategori</SubmitButton>
    </form>
  );
}
