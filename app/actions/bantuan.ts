"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createBantuan, deleteBantuan, BantuanInput } from "@/lib/queries/bantuan";
import { FormState } from "./umkm";

function parseBantuanForm(formData: FormData): BantuanInput | { error: string } {
  const riwayat_id = String(formData.get("riwayat_id") || "").trim();
  const jenis_bantuan = String(formData.get("jenis_bantuan") || "").trim();
  const nominalRaw = String(formData.get("nominal") || "").trim();
  const keterangan = String(formData.get("keterangan") || "").trim();
  const tanggal_salur = String(formData.get("tanggal_salur") || "").trim();

  if (!riwayat_id || !jenis_bantuan || !tanggal_salur) {
    return { error: "Peserta program, jenis bantuan, dan tanggal salur wajib diisi." };
  }

  return {
    riwayat_id,
    jenis_bantuan,
    nominal: nominalRaw ? parseFloat(nominalRaw) : null,
    keterangan: keterangan || null,
    tanggal_salur,
  };
}

export async function createBantuanAction(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = parseBantuanForm(formData);
  if ("error" in parsed) return { error: parsed.error };

  await createBantuan(parsed);
  revalidatePath("/bantuan");
  redirect("/bantuan");
}

export async function deleteBantuanAction(id: string): Promise<void> {
  await deleteBantuan(id);
  revalidatePath("/bantuan");
  redirect("/bantuan");
}
