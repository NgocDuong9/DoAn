import { Skeleton } from "@mantine/core";

const ProductDetailSkeleton = () => {
  return (
    <div className="w-[100vw] max-w-main  bg-white gap-4 pt-[120px] px-[60px] mx-auto">
      <Skeleton height={12} width={100} className="mb-[20px]" />

      <div className="flex gap-x-5">
        <Skeleton height={500} />
        <Skeleton height={500} />
      </div>

      <div className="flex gap-x-5 mt-5">
        <div className="flex gap-x-2 flex-1">
          <Skeleton height={100} width={100} />
          <Skeleton height={100} />
        </div>
        <div className="flex gap-x-2 flex-1">
          <Skeleton height={100} width={100} />
          <Skeleton height={100} />
        </div>
      </div>

      <div className="mt-5">
        <Skeleton height={20} />
        <div className="mt-2">
          <Skeleton height={20} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
