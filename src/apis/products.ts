'use server'
import { OptionSelect } from "@/types/base-type";
import { Profile } from "./../types/profiles";
import { createClient } from "@/libs/supabase/server";

export const getProductsByProfileId = async <T>(userId: string) => {
  if (!userId)
    return {
      data: null,
    };

  const supabase = createClient();
  return supabase
    .from("product")
    .select("id, name, profiles (id, first_name, last_name)")
    .eq("profile_id", userId);
};

