"use client";
import { getProductsByProfileId } from "@/apis/products";
import { useAuth } from "@/components/context/auth.context";
import useProducts from "@/hooks/useProducts";
import { Fragment, ReactNode, useEffect } from "react";

const Home = () => {
  const { products, loading } = useProducts();

  return (
    <div>
      1Home page
      {loading ? (
        <div>loading...</div>
      ) : (
        <Fragment>
          {products.map((item, index) => (
            <div key={index}>{item.name}</div>
          ))}
        </Fragment>
      )}
    </div>
  );
};

export default Home;
