import { Rating, Text } from '@mantine/core'

import { formatCurrency } from '@/app/search/search-result/components/price-range-slider'
import { getFileUrl, onErrorHandler } from '@/utils/images'

interface TagProps {
  url?: string
  type?: string
  title: string
  price: string
  rate: string
  countRate: number
  sold: number
  onClick?: () => void
}
function TagProduct({
  url,
  type,
  title,
  price,
  rate,
  countRate,
  sold,
  onClick
}: TagProps) {
  console.log(url, 'xxxxxaaa')

  return (
    <div
      onClick={onClick}
      className=" h-full w-full md:rounded-lg rounded-md mr-2 cursor-pointer flex flex-col justify-between"
    >
      <div className="w-full h-full aspect-square rounded-t-xl flex items-center justify-center">
        <img
          //  md:min-w-[300px] md:min-h-[300px] max-w-[160px] max-h-[160px]
          className="object-cover md:rounded-lg border  rounded-md aspect-square h-full"
          src={getFileUrl(url ?? '')}
          onError={onErrorHandler}
        />
      </div>
      <div className="px-1 pt-2">
        <Text className="text-[12px] font-medium line-clamp-2 min-h-[35px]">
          {title}
        </Text>
        <Text className=" text-[#91929D] text-[10px] font-normal">
          {type === 'SAN_PHAM' ? 'Sản phẩm' : 'Dịch vụ'}
        </Text>
        <div className="flex gap-2 items-center">
          <Rating
            value={Number(rate) ?? 5}
            fractions={2}
            readOnly
            size={'10px'}
            color="yellow"
          />
          {/* <Text className="text-[10px]">({countRate ? countRate : 0})</Text> */}
          <Text className="text-[10px]">Đã bán {sold ? sold : 0}</Text>
        </div>
        <Text className="text-base font-bold">{formatCurrency(price)}</Text>
      </div>
    </div>
  )
}

export default TagProduct
