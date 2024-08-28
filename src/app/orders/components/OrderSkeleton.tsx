import { Skeleton } from "@mantine/core";
import { Fragment } from "react";

const OrderSkeleton = () => {
  return (
    <div
      className="md:rounded-2xl rounded-xl md:p-5 md:my-4 p-3 my-2"
      style={{
        boxShadow: "rgb(178 178 178 / 20%) 0px 0px 20px 0px",
      }}
    >
      <div className="mt-2">
        <Skeleton height={8} width={240} mb={10} />
        <Skeleton height={8} width={200} mb={10} />
        <Skeleton height={8} width={200} mb={10} />
        <Skeleton height={8} radius="xl" />
        <Skeleton height={8} mt={10} radius="xl" />
        <Skeleton height={8} mt={10} width="70%" radius="xl" />
      </div>

      <div className="flex gap-x-2 mt-2 justify-end">
        <Skeleton height={12} width={100} mb={10} />
        <Skeleton height={12} width={100} mb={10} />
      </div>
    </div>
  );
};

export default OrderSkeleton;
