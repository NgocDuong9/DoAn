import { Box, Button, Grid, Text } from '@mantine/core'
import React, { useState } from 'react'
import CardItem from '../component/card-item'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import Link from 'next/link'
import TagProduct from '@/components/custom/tag/tag-product'
import { getProductPriceWithDiscount } from '@/utils/formatPrice'

const itemPage = 4

const Care = ({ relates }: { relates: any[] }) => {
  const [item, setItem] = useState(4)
  const newRelates = relates.slice(item - itemPage, item)

  return (
    <Box>
      <Box className="">
        {newRelates.length !== 0 && (
          <div className="text-lg md:text-2xl font-semibold md:font-normal text-main">
            Có thể bạn quan tâm
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 md:py-6 py-2 justify-center items-stretch gap-3 md:gap-4">
          {newRelates.map((item, index) => {
            if (index > 3) return
            return (
              <Link href={`/detail/${item?.slug?.toLocaleLowerCase()}`}>
                <TagProduct
                  url={item?.detail_info?.images[0]}
                  countRate={item?.countRate}
                  rate={item?.productadmin_sold?.rating}
                  price={item?.price}
                  sold={item?.productadmin_sold?.sold}
                  title={item?.name}
                  type={item?.type}
                />
              </Link>
            )
          })}
        </div>
      </Box>
      {relates.length > itemPage && (
        <Box className="flex gap-3 justify-center pb-8">
          <Button
            className={`bg-gray-200 hover:bg-slate-100 rounded-full md:w-12 md:h-12 w-10 h-10 flex justify-center items-center `}
            onClick={() => setItem(item - 1)}
            disabled={item === itemPage}
          >
            <IconChevronLeft color="#666666" size={'24px'} />
          </Button>
          <Button
            className={`bg-gray-200 rounded-full flex justify-center items-center md:w-12 md:h-12 w-10 h-10 hover:bg-slate-100 `}
            onClick={() => setItem(item + 1)}
            disabled={item === relates.length}
          >
            <IconChevronRight color="#666666" size={'24px'} />
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default Care
