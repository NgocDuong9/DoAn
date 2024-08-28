import { useEffect, useState } from "react";

import { getProductsByProfileId } from "@/apis/products";
import { useAuth } from "@/components/context/auth.context";

// this hook only call in client doesn't run in server
const useProducts = () => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      setProducts([]);
      return;
    }

    setLoading(true);
    getProductsByProfileId(user.id)
      .then((res) => {
        setProducts(res?.data ?? []);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  return { loading, products };
};

export default useProducts;
