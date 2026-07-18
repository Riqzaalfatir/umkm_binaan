"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createRiwayat,
  updateRiwayat,
  deleteRiwayat,
  RiwayatInput,
} from "@/lib/queries/riwayat";
import { StatusRiwayat } from "@/lib/types";
import { FormState } from "./umkm";

function parseRiwayatForm(formData: FormData): RiwayatInput | { error: string } {
  const umkm_id = String(formData.get("umkm_id") || "").trim();
  const program_id = String(formData.get("program_id") || "").trim();
  const status = String(formData.get("status") || "terdaftar") as StatusRiwayat;
  const catatan = String(formData.get("catatan") || "").trim();
  const tanggal_ikut = String(formData.get("tanggal_ikut") || "").trim();

  if (!umkm_id || !program_id || !tanggal_ikut) {
    return { error: "UMKM, program, dan tanggal ikut wajib diisi." };
  }

  return { umkm_id, program_id, status, catatan: catatan || null, tanggal_ikut };
}

export async function createRiwayatAction(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = parseRiwayatForm(formData);
  if ("error" in parsed) return { error: parsed.error };

  try {
    await createRiwayat(parsed);
  } catch (e: unknown) {
    if (e instanceof Error && e.message.includes("unique")) {
      return { error: "UMKM ini sudah terdaftar di program yang sama." };
    }
    throw e;
  }
  revalidatePath("/riwayat");
  redirect("/riwayat");
}

export async function updateRiwayatAction(
  id: string,
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = parseRiwayatForm(formData);
  if ("error" in parsed) return { error: parsed.error };

  await updateRiwayat(id, parsed);
  revalidatePath("/riwayat");
  redirect("/riwayat");
}

export async function deleteRiwayatAction(id: string): Promise<void> {
  await deleteRiwayat(id);
  revalidatePath("/riwayat");
  redirect("/riwayat");
}
