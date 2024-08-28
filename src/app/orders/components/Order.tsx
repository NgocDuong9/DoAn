'use client'
import { useCart } from '@/components/context/cart.context'
import { formatPrice, getProductPriceWithDiscount } from '@/utils/formatPrice'
import Image from 'next/image'
import ProductItem from './ProductItem'
import { IOrder, MapStatus, OrderItem, OrderStatus } from '@/types/order'
import Link from 'next/link'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { OrderTableAction } from '../page'
import { notifications } from '@mantine/notifications'
import { addProdToCart } from '@/apis/client/cart'
import { useRouter } from 'next/navigation'

const Order = ({
  item,
  onSelectAction,
  onSelectOrder
}: {
  item: IOrder
  onSelectOrder?: (order: IOrder) => void
  onSelectAction?: (action: OrderTableAction) => void
}) => {
  const router = useRouter()
  const { addToCart: addProdToCart } = useCart()
  const addToCart = async () => {
    try {
      const newCartPromise = item?.orderItem?.map(_item => {
        const accompanies = _item.detail?.accompanies
        const count = 1
        const classifies = _item?.detail?.classifies

        return addProdToCart({
          count,
          product_id: _item.product_id,

          detail: {
            classifies: classifies,
            accompanies: accompanies
          }
        })
      })

      const result = await Promise.all(newCartPromise)
      const cartIds = result.map((resultItem: any) => resultItem?.data?.id)

      router.push(`/checkout?list=${cartIds.toString()}`)
    } catch (error) {
      console.error(error)
    }
  }

  const calculateTotalOrderItemPrice = (orderItem: OrderItem) => {
    const { promotePrice } = getProductPriceWithDiscount(
      orderItem.detail.classifies
    )

    const totalProductPrice = promotePrice * orderItem.count

    const accompaniesPrice =
      orderItem.detail?.accompanies?.reduce(
        (acc, cur) => (acc += cur.price),
        0
      ) ?? 0

    return totalProductPrice + accompaniesPrice
  }

  const totalPrice = useMemo(() => {
    return (
      item?.orderItem?.reduce(
        (acc, cur) => (acc += calculateTotalOrderItemPrice(cur)),
        0
      ) ?? []
    )
  }, [item])

  const getActions = (order: IOrder) => {
    const actions: Record<string, any> = {
      complete: (
        <div
          className="border-2 border-[#EF4A4C] md:px-4 md:py-2 px-2 py-1 flex items-center justify-center cursor-pointer text-[#EF4A4C] font-semibold rounded-lg md:min-w-[200px] min-w-[120px] text-center text-[14px] md:text-base"
          color="#34c38f"
          onClick={() => {}}
        >
          Hoàn thành
        </div>
      ),
      confirm: (
        <Link
          href={`/orders/${item.code}`}
          className="bg-gradient-order md:px-4 md:py-2 px-2 py-1 flex items-center justify-center cursor-pointer text-white font-semibold rounded-lg md:min-w-[200px] min-w-[120px] text-center text-[14px] md:text-base"
          color="#34c38f"
        >
          Xác nhận
        </Link>
      ),
      cancel: (
        <div
          className="border-2 border-[#EF4A4C] md:px-4 md:py-2 px-2 py-1 flex items-center justify-center cursor-pointer text-[#EF4A4C] font-semibold rounded-lg md:min-w-[200px] min-w-[120px] text-center text-[14px] md:text-base"
          onClick={() => {
            onSelectOrder && onSelectOrder(order)
            onSelectAction && onSelectAction('cancel')
          }}
        >
          Hủy lịch
        </div>
      ),
      view: (
        <Link
          href={`/orders/${item.code}`}
          className="bg-gradient-order md:px-4 md:py-2 px-2 py-1 flex items-center justify-center cursor-pointer text-white font-semibold rounded-lg md:min-w-[200px] min-w-[120px] text-center md:text-base text-sm"
        >
          Xem chi tiết
        </Link>
      ),
      viewWithBorderStyle: (
        <Link
          href={`/orders/${item.code}`}
          className="border-2 border-[#52c2e5] md:px-4 md:py-2 px-2 py-1 flex items-center justify-center cursor-pointer text-[#52c2e5] font-semibold rounded-lg md:min-w-[200px] min-w-[120px] text-center text-[14px] md:text-base"
        >
          Xem chi tiết
        </Link>
      ),
      reorder: (
        <div
          // className="border-2 border-[#EF4A4C] md:px-4 md:py-2 px-2 py-1 flex items-center justify-center cursor-pointer text-[#EF4A4C] font-semibold rounded-lg md:min-w-[200px] min-w-[120px] text-center"
          className="bg-gradient-order md:px-4 md:py-2 px-2 py-1 flex items-center justify-center cursor-pointer text-white font-semibold rounded-lg md:min-w-[200px] min-w-[120px] text-center md:text-base text-sm"
          onClick={() => {
            addToCart()
          }}
          color="#5f76e8"
        >
          Đặt lại
        </div>
      ),
      ratingShop: (
        <div
          className="border-2 border-[#52c2e5] md:px-4 md:py-2 px-2 py-1 flex items-center justify-center cursor-pointer text-[#52c2e5] font-semibold rounded-lg md:min-w-[200px] min-w-[120px] text-center text-[14px] md:text-base"
          onClick={() => {
            onSelectOrder && onSelectOrder(order)
            onSelectAction && onSelectAction('rating')
          }}
        >
          Đánh giá
        </div>
      ),
      viewRatingShop: (
        <div
          className="border-2 border-[#52c2e5] md:px-4 md:py-2 px-2 py-1 flex items-center justify-center cursor-pointer text-[#52c2e5] font-semibold rounded-lg md:min-w-[200px] min-w-[120px] text-center"
          onClick={() => {
            onSelectOrder && onSelectOrder(order)
            onSelectAction && onSelectAction('viewrating')
          }}
        >
          Xem đánh giá
        </div>
      )
    }

    if (order.status === OrderStatus.INPROGESS)
      return [actions.view, actions.cancel]

    if (order.status === OrderStatus.CANCELED)
      return [actions.reorder, actions.viewWithBorderStyle]

    if (order.status === OrderStatus.COMPLETED) return [actions.confirm]

    if (order.status === OrderStatus.USER_CONFIRMED)
      return [
        actions.reorder,
        order.review.length === 0 ? actions.ratingShop : actions.viewRatingShop,
        actions.viewWithBorderStyle
      ]
  }

  return (
    <div
      className="md:rounded-2xl rounded-xl md:p-5 md:my-4 p-3 my-2"
      style={{
        boxShadow: 'rgb(178 178 178 / 20%) 0px 0px 20px 0px'
      }}
    >
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="flex items-center md:gap-x-3 gap-x-1 flex-wrap">
          <div className="text-main md:text-xl text-base font-semibold">
            {item.garage.name}
          </div>
          {item.garage.information.tag && (
            <div className="px-3 py-2 bg-[#F1B44C] w-fit rounded-lg gap-x-2 items-center text-white font-semibold md:text-sm text-xs line-clamp-1">
              {item.garage.information.tag}
            </div>
          )}
          <Link
            href={`/search/garage/${item.garage_id}`}
            className="flex border-2 border-[#999999] md:px-3 md:py-2 px-2 py-1 w-fit rounded-lg gap-x-2 items-center text-[#666666] font-semibold text-sm"
          >
            <Image src="/svg/shop.svg" alt="logo-main" width={20} height={20} />
            <div className="hidden md:block">Xem cửa hàng</div>
            <div className="block md:hidden">Xem</div>
          </Link>
        </div>

        <div className="md:text-base text-sm font-normal md:mt-0 mt-2">
          Mã đơn: {item.code}{' '}
          <span
            className="ml-2 px-3 py-1 rounded-md text-white"
            style={{
              background: MapStatus?.[item?.status].color
            }}
          >
            {MapStatus?.[item?.status].label}
          </span>
        </div>
      </div>

      <div className="mt-4 mb-2 flex flex-col gap-y-1">
        <div className="flex items-center md:gap-x-5 gap-x-2 font-normal">
          <Image
            src="/svg/phone.svg"
            alt="logo-main"
            width={20}
            height={20}
            className="md:w-[20px] md:h-[20px] w-[15px] h-[15px]"
          />

          <div className="md:text-base text-sm">
            {item.garage.information.hotline ?? item?.garage?.hotline}
          </div>
        </div>
        <div className="flex items-center md:gap-x-5 gap-x-2 font-normal">
          <Image
            src="/svg/location.svg"
            alt="logo-main"
            width={20}
            height={20}
            className="md:w-[20px] md:h-[20px] w-[15px] h-[15px]"
          />
          <div className="md:text-base text-sm">
            {item.garage.information.address ?? '--'}
          </div>
        </div>
        <div className="flex items-center md:gap-x-5 gap-x-2 font-normal">
          <Image
            src="/svg/time.svg"
            alt="logo-main"
            width={20}
            height={20}
            className="md:w-[20px] md:h-[20px] w-[15px] h-[15px]"
          />
          <div className="flex gap-x-2 md:text-base text-sm">
            <span className=" text-main">
              {/* {dayjs(item.time.order_time).format("HH:mm ngày DD/MM/YYYY")} */}
              {item.time.order_time}
            </span>
            <span className=" line-through text-main opacity-70">
              {/* {dayjs(item.time.old_time).format("HH:mm ngày DD/MM/YYYY")} */}
              {item.time.old_time}
            </span>
          </div>
        </div>
      </div>

      {item.orderItem.map(_item => (
        <ProductItem key={_item.id} orderItem={_item} />
      ))}

      <div className="border-b-2 py-1"></div>

      <div className="flex flex-col items-end mt-4">
        <div className="text-sm">
          Tổng tiền:{' '}
          <span className="bg-clip-text text-transparent bg-text-gradient font-bold md:text-lg text-base">
            {formatPrice(totalPrice)}
          </span>
        </div>

        <div className="mt-4 flex gap-x-2 justify-end gap-y-2 flex-wrap">
          {getActions(item)}
        </div>
      </div>
    </div>
  )
}

export default Order
