import SearchResult from "./search-result/SearchResult";
import { Suspense } from "react";
import { createClient } from "@/libs/supabase/server";
import { redirect } from "next/navigation";

async function Product() {
  // const supabase = await createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (!user) {
  //   return redirect("/login");
  // }

  return (
    <Suspense>
      <div className="flex-col w-[100vw] h-[100vh] justify-center">
        <div className="h-full">
          <SearchResult />
        </div>
      </div>
    </Suspense>
  );
}

export default Product;
