"use server";

import { createClient } from "@/libs/supabase/server";
import { Database } from "../../../supabase/database";
import { ProductType } from "./interface";

export async function userCreateWarranty({
  body,
}: {
  body: Database["public"]["Tables"]["warranty"]["Insert"];
}) {
  const supabase = createClient();

  const newWarranty = await supabase
    .from("warranty")
    .insert(body)
    .select()
    .single();

  if (newWarranty.error) {
    return { error: newWarranty.error.message };
  }
  return { data: newWarranty.data };
}

export async function userGetWarranty({
  car_id,
  type,
}: {
  car_id: string;
  type: ProductType;
}) {
  const supabase = createClient();

  const dataWarranty = await supabase
    .from("warranty")
    .select("*")
    .eq("car_id", car_id)
    .eq("product_type", type)
    .order("created_at", { ascending: false });

  if (dataWarranty.error) {
    return { error: dataWarranty.error.message };
  }
  return { data: dataWarranty.data };
}

export async function userDeleteWarranty({ id }: { id: string }) {
  const supabase = createClient();

  const deleteWarranty = await supabase
    .from("warranty")
    .delete()
    .eq("id", id)
    .select();

  if (deleteWarranty.error) {
    return { error: deleteWarranty.error.message };
  }
  return { data: deleteWarranty.data };
}
