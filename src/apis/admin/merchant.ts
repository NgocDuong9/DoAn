"use server";

import { createClient } from "@/libs/supabase/server";
import { OptionQuery, TypeStatus } from "../interface/admin-filter-garage";

export async function adminGetMerchant({ query }: { query: OptionQuery }) {
  const supabase = createClient();
  const get_from = (query?.page - 1) * query?.limit || 0;
  const get_to = get_from + (query.limit || 5) - 1;

  const queryMerchant = supabase
    .from("merchant")
    .select("*, garage(name)", { count: "estimated" });

  if (query.key) {
    queryMerchant.or(`name.wfts.'${query.key}',code.wfts.'${query.key}'`);
  }

  if (query.status && query.status !== TypeStatus.ALL) {
    queryMerchant.eq("status", query.status === TypeStatus.ACTIVE);
  }

  const dataMerchant = await queryMerchant
    .order("created_at", { ascending: query.sort_created_at })
    .range(get_from, get_to);

  if (dataMerchant.error) {
    return { error: dataMerchant.error.message };
  }
  return { data: dataMerchant.data };
}
