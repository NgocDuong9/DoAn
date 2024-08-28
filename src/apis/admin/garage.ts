"use server";

import { createClient } from "@/libs/supabase/server";
import { OptionQuery, TypeStatus } from "../interface/admin-filter-garage";

export async function adminGetGarage({ query }: { query: OptionQuery }) {
  const supabase = createClient();
  const get_from = (query?.page - 1) * query?.limit || 0;
  const get_to = get_from + (query.limit || 5) - 1;

  const queryGarage = supabase
    .from("garage")
    .select("*", { count: "estimated" });

  if (query.key) {
    queryGarage.or(`name.wfts.'${query.key}',code.wfts.'${query.key}'`);
  }

  if (query.status && query.status !== TypeStatus.ALL) {
    queryGarage.eq("status", query.status === TypeStatus.ACTIVE);
  }

  const dataGarage = await queryGarage.range(get_from, get_to);

  if (dataGarage.error) {
    return { error: dataGarage.error.message };
  }
  return { data: dataGarage.data };
}

export async function getGarageForAi() {
  const supabase = createClient();

  const queryGarage = supabase
    .from("garage")
    .select(
      "id, name, services, service_english, avatar, location, information, product!inner(), merchant!inner(), garage_sold(rating, count_rating)",
      { count: "estimated" }
    )
    .eq("status", true);

  const dataGarage = await queryGarage.range(0, 9);

  if (dataGarage.error) {
    return { error: dataGarage.error.message };
  }
  return { data: dataGarage.data, count: dataGarage.count };
}
