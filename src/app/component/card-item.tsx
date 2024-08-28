import { formatNumber, getProductPriceWithDiscount } from '@/utils/formatPrice'
import { getFileUrl } from '@/utils/images'
import { Box, Flex, Image, Rating, Text } from '@mantine/core'
import { IconHeart, IconHeartFilled } from '@tabler/icons-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

enum Type {
  SAN_PHAM = 'Sản phẩm',
  DICH_VU = 'Dịch vụ'
}

const CardItem = ({ data }: { data: any }) => {
  return (
    <Flex direction={'column'} justify={'space-between'} h={'100%'}>
      <Box className="relative">
        <Link href={`/detail/${data.slug}?id=${data.id}`}>
          <Image
            src={getFileUrl(data.detail_info.images[0])}
            className="rounded-2xl w-full aspect-square cursor-pointer"
          />
        </Link>
        {/* <Box
          className=" cursor-pointer absolute flex justify-center items-center w-10 h-11  top-2 right-2 rounded-[10px]"
          style={{
            backgroundColor:
              "linear-gradient(180deg, rgba(4, 4, 4, 0.56) 0%, rgba(26, 26, 26, 0.42) 100%)",
            backdropFilter: " blur(2px)",
          }}
          onClick={() => setCheck(!check)}
        >
          {check ? (
            <IconHeartFilled color="white" className="" />
          ) : (
            <IconHeart color="white" className="" />
          )}
        </Box> */}
        <Link href={`/detail/${data.slug}?id=${data.id}`}>
          <Text className="md:text-base text-sm font-medium pt-3 cursor-pointer">
            {data.name}
          </Text>
        </Link>
      </Box>
      <Link href={`/detail/${data.slug}?id=${data.id}`}>
        <Box className="flex flex-col gap-2 pnb-3 cursor-pointer">
          <Text className="text-[14px] font-medium opacity-50">
            {data.type === 'SAN_PHAM' ? Type.SAN_PHAM : Type.DICH_VU}
          </Text>
          <Box className="flex gap-3 items-center">
            <Rating
              size="xs"
              fractions={5}
              value={data.productadmin_sold.rating ?? 5}
              readOnly
            />
            <Text className="text-xs ">
              Đã bán: {data.productadmin_sold.sold ?? 0}
            </Text>
          </Box>
          <Text className="text-base font-bold text-main">
            {data &&
              formatNumber(
                data?.sell_info?.classifies
                  ? getProductPriceWithDiscount(data?.sell_info?.classifies[0])
                      .promotePrice
                  : getProductPriceWithDiscount(data?.sell_info).promotePrice
              )}
          </Text>
        </Box>
      </Link>
    </Flex>
  )
}

export default CardItem
