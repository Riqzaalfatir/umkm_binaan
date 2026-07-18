"use server";

import { revalidatePath } from "next/cache";
import { createKategori, deleteKategori } from "@/lib/queries/kategori";
import { FormState } from "./umkm";

export async function createKategoriAction(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const nama = String(formData.get("nama") || "").trim();
  if (!nama) return { error: "Nama kategori wajib diisi." };

  try {
    await createKategori(nama);
  } catch (e: unknown) {
    if (e instanceof Error && e.message.includes("unique")) {
      return { error: "Kategori dengan nama ini sudah ada." };
    }
    throw e;
  }
  revalidatePath("/kategori");
  return { success: true };
}

export async function deleteKategoriAction(id: string): Promise<void> {
  await deleteKategori(id);
  revalidatePath("/kategori");
}
