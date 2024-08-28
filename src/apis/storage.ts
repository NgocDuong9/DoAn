"use client";
import { createClient } from "@/libs/supabase/client";
import * as nanoid from "nanoid";

export const genCode = nanoid.customAlphabet(
  "1234567890abcdefghijklmnopqrstuvwxyz"
);

export async function uploadFile(file: File) {
  // const supabase = createClient();
  const supabaseClient = createClient();

  const { data, error } = await supabaseClient.storage
    .from("images")
    .upload(`${genCode(16)}`, file);
  if (error?.message) {
    throw new Error(error.message);
  }
  return data;
}
