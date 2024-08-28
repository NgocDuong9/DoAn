'use client'
import { useCart } from '@/components/context/cart.context'
import TextGradiant from '@/components/core/TextGradiant'
import { IconShop } from '@/components/icon'
import { PopoverData } from '@/components/popover/_interface/Popover.interface'
import Popover from '@/components/popover/Popover'
import { cn } from '@/libs/utils'
import { formatNumber } from '@/utils/formatPrice'
import { getFileUrl } from '@/utils/images'
import Image from 'next/image'
import Link from 'next/link'

export default function FastCartDetail({ ...props }) {
  const { cartItems } = useCart()

  const discountPrice = (item: any) => {
    const record = item.detail.classifies
      ? item.detail.classifies
      : item.product.sell_info
    return record.discount_number
      ? record.discount_type === 'CURRENCY'
        ? record.price - record.discount_number
        : (record.price * (100 - record.discount_number)) / 100
      : record.price
  }

  const finalPrice = (item: any) =>
    item.count * discountPrice(item) +
    (item?.detail?.accompanies?.reduce(
      (total: number, curr: any) => total + curr.price,
      0
    ) ?? 0)
  const data: PopoverData[] = cartItems.map(item => {
    const infoGarage = item.garage.information
    const tag = infoGarage?.tag || ''
    const address = infoGarage?.address || ''
    const name = item?.garage?.name || ''

    return {
      jsx: (
        <div key={item.garage.id}>
          <Link
            href={`/search/garage/${item.garage.id}`}
            className={cn('flex items-start gap-2 w-[540px] my-2')}
          >
            <IconShop className={cn('w-[20px] h-[20px] mt-1')} />
            <h2 className={'text-lg line-clamp-2 flex-1'}>
              {name || 'Gara'} {address}
            </h2>
            {/* {tag && (
              <span className="text-sm font-normal text-white px-3 py-1 bg-[#F1B44C] rounded-md">
                {tag}
              </span>
            )} */}
          </Link>
          {item?.products?.map((_item: any, i: number) => (
            <div
              key={_item.id}
              className={cn(
                'flex justify-between items-center gap-2 w-[540px] my-2'
              )}
            >
              <div className="flex items-center max-w-[60px] min-w-[60px] max-h-[60px] min-h-[60px]">
                <img
                  src={getFileUrl(_item?.product?.detail_info?.images[0])}
                  alt={_item?.product?.detail_info?.name || ''}
                  className="rounded-md object-cover w-[60px] h-[60px]"
                />
              </div>
              <div className="flex flex-col gap-y-1 w-full max-w-[460px]">
                <label className="text-md leading-[23.5px]">
                  {_item?.product?.detail_info?.name.split('|')[0]}
                </label>
                {_item?.detail?.classifies?.manufacture && (
                  <label className="text-sm font-normal text-main">
                    Năm sản xuất: {_item?.detail?.classifies?.manufacture}
                  </label>
                )}
              </div>
              <TextGradiant className={'font-bold text-md'}>
                {formatNumber(finalPrice(_item))}
              </TextGradiant>
            </div>
          ))}
        </div>
      )
    }
  })

  const EmptyCart = () => (
    <Link
      href={'/search'}
      className={
        'flex items-center px-3 gap-2 w-[220px] text-sm hover:text-[#258DBA] hover:underline'
      }
    >
      Không có gì trong giỏ hàng, thêm ngay
    </Link>
  )

  return (
    <Popover
      {...props}
      data={data}
      footer={
        data?.length <= 0 ? (
          <EmptyCart />
        ) : (
          <div>
            <Link href="/cart">
              <TextGradiant className={'font-bold text-md cursor-pointer'}>
                Xem thêm
              </TextGradiant>
            </Link>
          </div>
        )
      }
    />
  )
}
