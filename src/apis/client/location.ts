'use server'

import { createClient } from '@/libs/supabase/server'

export async function locationGarage() {
  const supabase = createClient()

  //   const location = await supabase
  //     .from("location")
  //     .insert([
  //       {
  //         name: "Triều khúc",
  //         location: `POINT(105.802612 20.9801219)`,
  //       },
  //       {
  //         name: "Giảng võ",
  //         location: `POINT(105.8194896 21.0270609)`,
  //       },
  //       {
  //         name: "Long biên",
  //         location: `POINT(105.8884966 21.0548635)`,
  //       },
  //       {
  //         name: "Trần Duy Hưng",
  //         location: `POINT(105.8020217 21.0129238)`,
  //       },
  //     ])
  //     .select();21.1034969,106.804131

  //   const update = await supabase
  //     .from("garage")
  //     .update({ location: `POINT(105.802612 20.9801219)` })
  //     .eq("id", "ad6685b9-81b6-4f43-b911-a35807dd0f3c")
  //     .select();

  const location = await supabase.rpc('order_geo_location', {
    lat: 21.011866,
    long: 105.8087227
  })

  //   const dddddd = await supabase.from("users").select("*");
}
