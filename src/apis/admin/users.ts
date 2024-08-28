"use server";

import { createClient } from "@/libs/supabase/server";
import { OptionQuery, TypeStatus } from "../interface/admin-filter-garage";

export async function adminGetUser({ query }: { query: OptionQuery }) {
  const supabase = createClient();
  const get_from = (query?.page - 1) * query?.limit || 0;
  const get_to = get_from + (query.limit || 5) - 1;

  const queryUser = supabase
    .from("users")
    .select("*, car(*)", { count: "estimated" });

  if (query.key) {
    queryUser.or(`name.wfts.'${query.key}',username.wfts.'${query.key}'`);
  }

  const dataUser = await queryUser
    .order("created_at", { ascending: query.sort_created_at })
    .range(get_from, get_to);

  if (dataUser.error) {
    return { error: dataUser.error.message };
  }
  return { data: dataUser.data };
}
