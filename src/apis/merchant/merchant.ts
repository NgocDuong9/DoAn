"use server";

import { createClient } from "@/libs/supabase/server";
import { Database } from "../../../supabase/database";
export async function getDetailMerchant({ auth_id }: { auth_id: string }) {
  const supabase = await createClient();

  const dataMerchant = await supabase
    .from("merchant")
    .select()
    .eq("auth_id", auth_id)
    .single();

  if (dataMerchant.error) {
    return null;
  }

  return dataMerchant.data;
}

export async function updateMerchant({
  id,
  body,
}: {
  id: string;
  body: Database["public"]["Tables"]["merchant"]["Update"];
}) {
  const supabase = await createClient();

  const dataMerchant = await supabase
    .from("merchant")
    .update(body)
    .eq("id", id)
    .select();

  if (dataMerchant.error) {
    return { error: dataMerchant.error.message };
  }

  return dataMerchant.data;
}
