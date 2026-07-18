"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createProgram,
  updateProgram,
  deleteProgram,
  ProgramInput,
} from "@/lib/queries/program";
import { JenisProgram } from "@/lib/types";
import { FormState } from "./umkm";

function parseProgramForm(formData: FormData): ProgramInput | { error: string } {
  const nama_program = String(formData.get("nama_program") || "").trim();
  const jenis = String(formData.get("jenis") || "") as JenisProgram;
  const deskripsi = String(formData.get("deskripsi") || "").trim();
  const tanggal_mulai = String(formData.get("tanggal_mulai") || "").trim();
  const tanggal_selesai = String(formData.get("tanggal_selesai") || "").trim();

  if (!nama_program || !jenis || !tanggal_mulai) {
    return { error: "Nama program, jenis, dan tanggal mulai wajib diisi." };
  }

  return {
    nama_program,
    jenis,
    deskripsi: deskripsi || null,
    tanggal_mulai,
    tanggal_selesai: tanggal_selesai || null,
  };
}

export async function createProgramAction(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = parseProgramForm(formData);
  if ("error" in parsed) return { error: parsed.error };

  await createProgram(parsed);
  revalidatePath("/program");
  redirect("/program");
}

export async function updateProgramAction(
  id: string,
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = parseProgramForm(formData);
  if ("error" in parsed) return { error: parsed.error };

  await updateProgram(id, parsed);
  revalidatePath("/program");
  redirect("/program");
}

export async function deleteProgramAction(id: string): Promise<void> {
  await deleteProgram(id);
  revalidatePath("/program");
  redirect("/program");
}
