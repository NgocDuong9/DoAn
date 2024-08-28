import { Skeleton } from "@mantine/core";

const DetailSkeleton = () => {
  return (
    <div className="flex flex-col mb-10 ">
      <div className="flex-col mt-40 h-40">
        <Skeleton height={8} width="70%" mb={10} className="mx-auto" />
        <Skeleton height={8} width="70%" mb={10} className="mx-auto" />
        <Skeleton height={8} width="70%" mb={10} className="mx-auto" />
      </div>
      <div className="flex-col h-40">
        <Skeleton height={8} width="90%" mb={10} className="mx-auto" />
        <Skeleton height={8} width="90%" mb={10} className="mx-auto" />
        <Skeleton height={8} width="90%" mb={10} className="mx-auto" />
      </div>
      <div className="flex h-10 mb-10">
        <Skeleton height={8} width="30%" mb={10} className="mx-auto" />
        <Skeleton height={8} width="30%" mb={10} className="mx-auto" />
        <Skeleton height={8} width="30%" mb={10} className="mx-auto" />
      </div>
      <div className="flex h-10 mb-10">
        <Skeleton height={8} width="30%" mb={10} className="mx-auto" />
        <Skeleton height={8} width="30%" mb={10} className="mx-auto" />
        <Skeleton height={8} width="30%" mb={10} className="mx-auto" />
      </div>
      <div className="flex h-10 mb-10">
        <Skeleton height={8} width="30%" mb={10} className="mx-auto" />
        <Skeleton height={8} width="30%" mb={10} className="mx-auto" />
        <Skeleton height={8} width="30%" mb={10} className="mx-auto" />
      </div>
      <div className="flex-col h-40 mb-20">
        <Skeleton height={8} width="90%" mb={10} className="mx-auto" />
        <Skeleton height={8} width="90%" mb={10} className="mx-auto" />
        <Skeleton height={8} width="90%" mb={10} className="mx-auto" />
        <Skeleton height={8} width="90%" mb={10} className="mx-auto" />
      </div>
    </div>
  );
};

export default DetailSkeleton;
