"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createUmkm,
  updateUmkm,
  deleteUmkm,
  UmkmInput,
} from "@/lib/queries/umkm";
import { StatusUmkm } from "@/lib/types";

export interface FormState {
  error?: string;
  success?: boolean;
}

function parseUmkmForm(formData: FormData): UmkmInput | { error: string } {
  const nama_usaha = String(formData.get("nama_usaha") || "").trim();
  const nama_pemilik = String(formData.get("nama_pemilik") || "").trim();
  const alamat = String(formData.get("alamat") || "").trim();
  const nib = String(formData.get("nib") || "").trim();
  const telepon = String(formData.get("telepon") || "").trim();
  const kategori_id = String(formData.get("kategori_id") || "").trim();
  const status = String(formData.get("status") || "aktif") as StatusUmkm;

  if (!nama_usaha || !nama_pemilik || !alamat) {
    return { error: "Nama usaha, nama pemilik, dan alamat wajib diisi." };
  }

  return {
    nama_usaha,
    nama_pemilik,
    alamat,
    nib: nib || null,
    telepon: telepon || null,
    kategori_id: kategori_id || null,
    status,
  };
}

export async function createUmkmAction(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = parseUmkmForm(formData);
  if ("error" in parsed) return { error: parsed.error };

  await createUmkm(parsed);
  revalidatePath("/umkm");
  redirect("/umkm");
}

export async function updateUmkmAction(
  id: string,
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = parseUmkmForm(formData);
  if ("error" in parsed) return { error: parsed.error };

  await updateUmkm(id, parsed);
  revalidatePath("/umkm");
  revalidatePath(`/umkm/${id}`);
  redirect(`/umkm/${id}`);
}

export async function deleteUmkmAction(id: string): Promise<void> {
  await deleteUmkm(id);
  revalidatePath("/umkm");
  redirect("/umkm");
}
