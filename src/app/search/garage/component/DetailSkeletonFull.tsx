import { Skeleton } from "@mantine/core";

const DetailSkeletonFull = () => {
  return (
    <div className="flex flex-col mb-10 ">
      <div className="flex-col mt-10 mb-10 h-30">
        <Skeleton height={8} width="90%" mb={10} className="mx-auto" />
        <Skeleton height={8} width="90%" mb={10} className="mx-auto" />
        <Skeleton height={8} width="90%" mb={10} className="mx-auto" />
      </div>
      <div className="flex-col mb-10 h-30">
        <Skeleton height={8} width="90%" mb={10} className="mx-auto" />
        <Skeleton height={8} width="90%" mb={10} className="mx-auto" />
        <Skeleton height={8} width="90%" mb={10} className="mx-auto" />
      </div>
      <div className="flex-col mb-10 h-30">
        <Skeleton height={8} width="90%" mb={10} className="mx-auto" />
        <Skeleton height={8} width="90%" mb={10} className="mx-auto" />
        <Skeleton height={8} width="90%" mb={10} className="mx-auto" />
      </div>
      <div className="flex-col mb-10 h-30">
        <Skeleton height={8} width="90%" mb={10} className="mx-auto" />
        <Skeleton height={8} width="90%" mb={10} className="mx-auto" />
        <Skeleton height={8} width="90%" mb={10} className="mx-auto" />
      </div>
      <div className="flex-col mb-10 h-30">
        <Skeleton height={8} width="90%" mb={10} className="mx-auto" />
        <Skeleton height={8} width="90%" mb={10} className="mx-auto" />
        <Skeleton height={8} width="90%" mb={10} className="mx-auto" />
      </div>
    </div>
  );
};

export default DetailSkeletonFull;
