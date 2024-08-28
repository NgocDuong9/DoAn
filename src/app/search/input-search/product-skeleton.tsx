import { Skeleton } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

const ProductSkeleton = () => {
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 md:gap-y-0 gap-x-2">
      {Array.from(Array(4).keys()).map((_, index) => (
        <div key={index} className="mb-2">
          <Skeleton
            radius="xs"
            height={isMobile ? 150 : 200}
            className="aspect-square"
          />
          <Skeleton mt={10} height={8} radius="xs" />
          <Skeleton mt={2} height={8} radius="xs" />
        </div>
      ))}
    </div>
  )
}

export default ProductSkeleton
