'use client'

import { fetchOrderDetail } from '@/apis/client/order'
import OrderDetailSkeleton from '@/app/orders/[orderCode]/_components/OrderDetailSkeleton'
import FooterHome from '@/components/footer'
import HeaderBar from '@/components/header/header'
import {
  MapStatus,
  OrderStatus,
  type OrderDetail,
  type OrderItemDetail
} from '@/types/order'
import { truncate, upperFirstLetter } from '@/utils'
import { formatPrice, getProductPriceWithDiscount } from '@/utils/formatPrice'
import classNames from 'classnames'
import { Fragment, useLayoutEffect, useMemo, useState } from 'react'
import { FaRegClock } from 'react-icons/fa'
import { GrNotes } from 'react-icons/gr'
import { TbCalendarCancel } from 'react-icons/tb'
import BtnActions from './_components/BtnActionOrder'
import TableOrderItems from './_components/TableOrderItems'

const MapGaraNote: Record<string, string> = {
  '1': 'Hết hàng',
  '2': 'Kín lịch',
  other: 'Lý do khác'
}

function OrderDetail({ params }: any) {
  const { orderCode } = params
  const [orderDetail, setOrderDetail] = useState<OrderDetail>()
  const [loading, setLoading] = useState<boolean>()

  useLayoutEffect(() => {
    if (loading) return
    setLoading(true)
    fetchOrderDetail(orderCode)
      .then(data => {
        if (data) {
          setOrderDetail(data)
        }
      })
      .finally(() => setLoading(false))
  }, [orderCode])

  if (!orderDetail && loading !== undefined && !loading) {
    return (
      <div className="fixed top-1/2 -translate-y-1/2 w-screen flex flex-col justify-center items-center">
        <h1 className={'text-center text-[24px] font-bold text-red-700'}>
          Không tìm thấy đơn hàng
        </h1>
      </div>
    )
  }
  const statusOrder = orderDetail?.status as OrderStatus

  const timeOrder = orderDetail?.time
  //@ts-ignore
  const oldTime = timeOrder?.old_time!
  //@ts-ignore
  const orderTime = timeOrder?.order_time!
  //@ts-ignore
  const carDetail = orderDetail?.car!
  // const oldTimeFormat = formatDate(oldTime)
  // const orderTimeFormat = formatDate(orderTime)
  // const createTimeUI = (date: typeof orderTimeFormat, haveRange = false) => `${date.hourOnly}${haveRange ? `-${+(date.hourOnly) + 3}:30` : ''} ${date.day}, ngày ${date.fullTime}`

  console.log(orderDetail, 'detaillll')

  const calculateTotalOrderItemPrice = (orderItem: OrderItemDetail) => {
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
      orderDetail?.orderItem?.reduce(
        (acc, cur) => (acc += calculateTotalOrderItemPrice(cur)),
        0
      ) ?? []
    )
  }, [orderDetail])

  console.log('orderDetail:::', orderDetail)

  const garaNote = orderDetail?.logs?.data?.filter(
    item => item.created_by === 'Gara'
  )

  return (
    <div>
      <HeaderBar />

      {loading && (
        <div className="pt-20">
          <OrderDetailSkeleton />
        </div>
      )}
      {!loading && (
        <div
          className={
            'relative max-w-main mx-auto justify-center px-4 pt-[70px] md:pt-[75px]'
          }
        >
          <div className={'max-w-main mx-auto'}>
            <h1
              className={
                'font-medium text-xl lg:text-2xl md:pb-6 pb-3 md:mt-12 mt-3 border-b border-[#E2E2E2]'
              }
            >
              Chi tiết đơn hàng
            </h1>
            <div
              className={
                'orderDetail md:mt-6 mt-2 flex gap-2 sm:items-center flex-col sm:flex-row'
              }
            >
              <ul
                className={
                  'flex flex-col md:gap-3 gap-2 w-full md:w-1/2 lg:w-full'
                }
              >
                {orderDetail?.code && (
                  <li
                    className={
                      'md:text-base text-sm flex md:items-center flex-col-reverse md:flex-row gap-3'
                    }
                  >
                    <span>Mã đơn: {orderDetail?.code}</span>

                    <span
                      className={classNames(
                        'w-fit text-white text-[16px] leading-[1.25] rounded px-3 py-2',
                        `bg-[${MapStatus?.[orderDetail?.status].color}]`
                      )}
                    >
                      {MapStatus?.[orderDetail?.status]?.label}
                    </span>
                  </li>
                )}
                {orderDetail?.name && (
                  <li className={'md:text-base text-sm'}>
                    {orderDetail?.name}{' '}
                    {orderDetail?.phone && (
                      <span className={'md:text-base text-sm'}>
                        {' '}
                        | {orderDetail?.phone}
                      </span>
                    )}
                  </li>
                )}
                {timeOrder && (
                  <li className={'md:text-base text-sm flex gap-x-2'}>
                    <div
                      className={
                        'flex items-center md:gap-2 gap-1 text-main md:text-base text-sm'
                      }
                    >
                      <div className="text-main text-lg">
                        <FaRegClock />
                      </div>
                      <span className={'ml-1'}>Thời gian làm dịch vụ:</span>
                    </div>
                    <span className={'md:text-base text-sm'}>{orderTime}</span>
                    {oldTime && (
                      <span
                        className={
                          'ml-2 text-[14px] text-[#999999] line-through'
                        }
                      >
                        {oldTime}
                      </span>
                    )}
                  </li>
                )}
                {/* @ts-ignore */}
                {garaNote?.[0]?.desc && (
                  <li className={'md:text-base text-sm flex gap-x-2'}>
                    <div
                      className={
                        'flex items-center md:gap-2 gap-1 text-main md:text-base text-sm'
                      }
                    >
                      <div className="text-main text-lg">
                        <GrNotes />
                      </div>
                      <span className={'ml-1'}>Ghi chú của Gara:</span>
                    </div>
                    <span className={'md:text-base text-sm'}>
                      {upperFirstLetter(
                        MapGaraNote?.[garaNote?.[0]?.desc ?? '']
                      )}
                    </span>
                  </li>
                )}
                {orderDetail?.note && (
                  <li className={'md:text-base text-sm flex gap-x-2'}>
                    <div
                      className={
                        'flex items-center md:gap-2 gap-1 text-main md:text-base text-sm'
                      }
                    >
                      <div className="text-main text-lg">
                        <GrNotes />
                      </div>
                      <span className={'ml-1'}>Ghi chú của khách hàng:</span>
                    </div>
                    <span className={'md:text-base text-sm'}>
                      {upperFirstLetter(orderDetail.note)}
                    </span>
                  </li>
                )}

                {orderDetail?.logs?.data &&
                  orderDetail.status === OrderStatus.CANCELED && (
                    <li className={'md:text-base text-sm flex gap-x-2 items-start'}>
                      <div
                        className={
                          'flex items-center md:gap-2 gap-1 text-main md:text-base text-sm mt-1'
                        }
                      >
                        <div className="text-main text-lg">
                          <TbCalendarCancel className="text-xl" />{' '}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex gap-2">
                          <span className={'ml-1'}>Huỷ bởi: </span>
                          <p>{orderDetail?.logs?.data?.[0]?.created_by}</p>
                        </div>
                        <div className={'ml-1 flex gap-1'}>
                          <p>Lý do:</p>
                          {orderDetail?.logs?.data[0]?.desc?.value !=
                          'other' ? (
                            <p>{orderDetail?.logs?.data[0]?.desc?.label}</p>
                          ) : (
                            <Fragment>{orderDetail.status_note}</Fragment>
                          )}
                        </div>
                      </div>
                    </li>
                  )}
              </ul>
              <ul
                className={
                  'flex flex-col md:gap-4 gap-2 w-full md:w-1/2 lg:w-1/3 h-full md:min-h-[184px] p-5 bg-[#D7F4F680] rounded-[10px] md:text-base text-sm'
                }
              >
                {orderDetail?.license_plate && (
                  <li>
                    Biển số xe:
                    <b className="ml-1">
                      {truncate({
                        str: orderDetail?.license_plate,
                        hiddenStr: '*'
                      })}
                    </b>
                  </li>
                )}
                {carDetail?.color && (
                  <li>
                    Màu sơn: <b className="ml-1">{carDetail.color}</b>
                  </li>
                )}
                {orderDetail?.carType && (
                  <li>
                    Nhãn hiệu: <b className="ml-1">{orderDetail?.carType}</b>
                  </li>
                )}
                {/*@ts-ignore*/}
                {carDetail?.detail?.year! && (
                  <li>
                    Năm sản xuất:
                    {/*@ts-ignore*/}
                    <b className="ml-1">{carDetail?.detail?.year}</b>
                  </li>
                )}
              </ul>
            </div>
            <div
              className={'orderDetail-list md:mt-6 mt-2 flex flex-col gap-4'}
            >
              <TableOrderItems
                orderList={orderDetail?.orderItem! as OrderItemDetail[]}
              />
            </div>
            <div
              className={
                'orderDetail-actions items-end flex-col w-full md:mt-6 mt-2 flex justify-end gap-4 mb-4'
              }
            >
              <div className="text-sm">
                Tổng tiền:{' '}
                <span className="bg-clip-text text-transparent bg-text-gradient font-bold md:text-lg text-base">
                  {formatPrice(+totalPrice)}
                </span>
              </div>
              <BtnActions
                setOrderDetail={setOrderDetail}
                order={orderDetail}
                statusOrder={statusOrder}
                isInternal={false}
              />
            </div>
          </div>
        </div>
      )}

      <FooterHome />
    </div>
  )
}

export default OrderDetail
