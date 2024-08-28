import { Grid, Text } from '@mantine/core'

import Link from 'next/link'
import TagProduct from '@/components/custom/tag/tag-product'
import classNames from 'classnames'
import { getProductPriceWithDiscount } from '@/utils/formatPrice'

interface ListProductProps {
  title: string
  size?: string
  data: any
}
function ListProduct({ title, size, data }: ListProductProps) {
  return (
    <div className="w-full">
      <Text
        className={`text-main font-medium ${
          size === 'large' ? 'text-2xl' : 'text-xl'
        }`}
      >
        {title}
      </Text>
      <div className="grid grid-cols-2 md:grid-cols-4 md:py-5 py-3">
        {data.slice(0, 4)?.map((item: any, index: number) => (
          <div
            key={index}
            className={classNames(
              index === 0 ? 'pr-2' : index === 3 ? 'pl-2' : 'px-2'
            )}
          >
            <Link
              href={`/detail/${item?.slug?.toLocaleLowerCase()}?product_id=${item.id}`}
            >
              <TagProduct
                url={item?.detail_info?.images[0] || item?.url}
                countRate={0}
                rate={item.product_sold?.rating}
                price={
                  item?.sell_info?.classifies
                    ? getProductPriceWithDiscount(
                        item?.sell_info?.classifies[0]
                      ).promotePrice
                    : getProductPriceWithDiscount(item?.sell_info).promotePrice
                }
                sold={item?.product_sold?.sold}
                title={item?.name}
                type={item?.type}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListProduct
