'use client'
import { IDiscountType, MapAccompaniesLabel, OrderItem } from '@/types/order'
import { formatPrice, getProductPriceWithDiscount } from '@/utils/formatPrice'
import { getFileUrl, onErrorHandler } from '@/utils/images'
import Image from 'next/image'
import { Fragment, useState } from 'react'

const ProductItem = ({ orderItem }: { orderItem: OrderItem }) => {
  const product = orderItem.product

  const { discount_type, originPrice, promotePrice, discount_number } =
    getProductPriceWithDiscount(orderItem?.detail?.classifies)

  return (
    <div className="flex items-start md:gap-x-4 gap-x-1 text-main mb-3">
      <img
        src={getFileUrl(product.detail_info.images[0])}
        alt={product.name}
        className="md:w-[100px] w-[40px] aspect-square object-cover rounded-lg mt-2 md:mt-0"
        onError={onErrorHandler}
      />
      <div className="mt-2 md:text-base text-sm flex-1">
        <div className="flex justify-between gap-x-2">
          <div className="font-bold">{product.name}</div>

          <div className="hidden md:block">
            <span className="bg-clip-text text-transparent bg-text-gradient font-bold md:text-lg text-sm">
              {formatPrice(promotePrice * orderItem.count)}
            </span>
          </div>
        </div>
        {orderItem.detail.classifies?.manufacture && (
          // <div className="text-sm">Năm sản xuất: --Chưa có</div>
          <div className="manufacture-year md:text-base text-xs">
            Năm sản xuất: {orderItem?.detail?.classifies?.manufacture}
          </div>
        )}

        <div className="md:mt-2 mt-1">
          <span className="font-semibold text-main">{orderItem.count} x</span>{' '}
          <span className="bg-clip-text text-transparent bg-text-gradient font-bold md:text-lg text-sm">
            {formatPrice(promotePrice)}
          </span>{' '}
          {discount_number && originPrice !== promotePrice && (
            <Fragment>
              <span className="font-semibold line-through text-main opacity-70">
                {formatPrice(originPrice)}
              </span>
            </Fragment>
          )}
        </div>

        {orderItem?.detail?.accompanies?.map((_accompaniesItem, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex items-center gap-x-2 md:mt-2 mt-1">
              <div
                className="px-2 py-1 rounded-md md:border-2 border-1 border-[#67f2d1] font-semibold text-xs"
                style={{
                  color: MapAccompaniesLabel?.[_accompaniesItem.type]?.color,
                  borderColor:
                    MapAccompaniesLabel?.[_accompaniesItem.type]?.color
                }}
              >
                {MapAccompaniesLabel?.[_accompaniesItem.type]?.label}
              </div>
              <div className="text-main">{_accompaniesItem.name}</div>{' '}
              <div className="ml-4">{formatPrice(_accompaniesItem.price)}</div>
            </div>
            <div className="md:block hidden">
              {formatPrice(_accompaniesItem.price)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductItem
