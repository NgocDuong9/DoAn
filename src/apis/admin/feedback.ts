"use server";

import { createClient } from "@/libs/supabase/server";
import { Database } from "../../../supabase/database";
import { OptionQuery } from "../interface/admin-filter-garage";

export async function userCreateFeedback({
  body,
}: {
  body: Database["public"]["Tables"]["feedback"]["Insert"];
}) {
  const supabase = createClient();

  const newFeedback = await supabase
    .from("feedback")
    .insert(body)
    .select()
    .single();

  if (newFeedback.error) {
    return { error: newFeedback.error.message };
  }
  return { data: newFeedback.data };
}

export async function adminGetFeedback({ query }: { query: OptionQuery }) {
  const supabase = createClient();

  const get_from = (query?.page - 1) * query?.limit || 0;
  const get_to = get_from + (query.limit || 5) - 1;

  const queryFeedback = supabase
    .from("feedback")
    .select("*")
    .order("created_at", { ascending: false });

  if (query.key) {
    // queryFeedback.or(`name.wfts.'${query.key}',code.wfts.'${query.key}'`);
    // queryFeedback.textSearch('ti')
  }
  const dataFeedback = await queryFeedback.range(get_from, get_to);

  if (dataFeedback.error) {
    return { error: dataFeedback.error.message };
  }
  return { data: dataFeedback.data };
}
