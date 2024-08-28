import { Grid, Skeleton } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import classNames from "classnames";

const SearchSkeleton = ({ className }: { className?: string }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div
      className={classNames(
        className
          ? className
          : "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-3",
        "w-full"
      )}
    >
      {Array.from(Array(9).keys()).map((_, index) => (
        <div key={index} className="mb-2">
          <Skeleton
            radius="xs"
            height={isMobile ? 200 : 300}
            className="aspect-square"
          />
          <Skeleton mt={10} height={8} radius="xs" />
          <Skeleton mt={2} height={8} radius="xs" />
        </div>
      ))}
    </div>
  );
};

export default SearchSkeleton;
