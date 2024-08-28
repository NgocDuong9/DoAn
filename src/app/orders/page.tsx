'use client'

import { Fragment, useEffect, useState } from 'react'
import { IOrder, OrderStatus } from '@/types/order'

import AppPagination from '../component/pagination'
import CancelOrderDialog from './components/CancelOrderDialog'
import FooterHome from '@/components/footer'
import HeaderBar from '@/components/header/header'
import Order from './components/Order'
import OrderSkeleton from './components/OrderSkeleton'

import RatingMerchantDialog from './components/RatingMerchantDialog'
import classNames from 'classnames'
import { getDataOrderUser } from '@/apis/client/order'
import { useAuth } from '@/components/context/auth.context'
import { usePagination } from '@/hooks/usePagination'
import {
  ActionNotify,
  useNotifications
} from '@/components/context/notify.context'
import CorePagination from '@/components/custom/pagination/CorePagination'

const tabs = [
  {
    key: 'ALL',
    label: 'Tất cả'
  },
  {
    key: OrderStatus.INPROGESS,
    label: 'Đã đặt lịch'
  },
  {
    key: OrderStatus.COMPLETED,
    label: 'Đã hoàn thành'
  },
  {
    key: OrderStatus.USER_CONFIRMED,
    label: 'KH đã xác nhận'
  },
  {
    key: OrderStatus.CANCELED,
    label: 'Đã hủy'
  }
]

export type OrderTableAction =
  | 'cancel'
  | 'update'
  | 'complete'
  | 'rating'
  | 'viewrating'

const OrdersPage = () => {
  const { userId } = useAuth()

  const [tab, setTab] = useState<OrderStatus | 'ALL'>('ALL')
  const [orders, setOrders] = useState<IOrder[]>([])
  const [count, setCount] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  // const [action, setAction] = useState<OrderTableAction | null>(null);
  const [action, setAction] = useState<OrderTableAction | null>(null)
  const [orderSelected, setOrderSelected] = useState<IOrder | null>(null)
  const { pushNotify } = useNotifications()

  const pagination = usePagination({
    defaultPageSize: 3
  })

  const getOrderList = () => {
    if (!userId) return
    setLoading(true)
    getDataOrderUser({
      ...(tab !== 'ALL' && {
        status: tab
      }),
      userId,
      pageSetting: pagination?.pageSetting
    })
      .then(res => {
        setOrders(res?.data ?? [])
        setCount(res?.count ?? 0)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    setOrders([])
    getOrderList()
  }, [tab, userId, pagination?.pageSetting?.page])

  const handleClearAction = () => {
    // setAction('rating')
    setOrderSelected(null)
  }

  return (
    <div className="relative">
      <HeaderBar type="app" />

      <div
        className="md:px-0 px-2"
        style={{
          minHeight: 'calc(100vh - 90px - 242px)'
        }}
      >
        <div className="md:pt-[100px] pt-[70px]">
          <div className="bg-[#f8f8f8] md:h-[94px] h-[60px] flex items-center justify-start w-full px-6">
            <div className="max-w-main w-full mx-auto md:text-xl text-lg font-bold text-main">
              Quản lý đơn hàng
            </div>
          </div>
        </div>
        <div className="">
          <div
            className=" md:mt-5 mt-3 md:py-5 py-3 rounded-xl md:px-6 px-3 justify-between md:justify-start w-screen overflow-x-auto"
            style={{
              boxShadow: 'rgb(178 178 178 / 20%) 0px 0px 20px 0px'
            }}
          >
            <div className="max-w-main w-full mx-auto flex md:gap-x-2 gap-x-1">
              {tabs.map((item, index) => (
                <div
                  key={index}
                  className={classNames(
                    tab === item.key
                      ? 'bg-clip-text text-transparent bg-text-gradient border-b-gradient'
                      : 'text-main opacity-50',
                    'md:text-lg text-sm font-bold md:min-w-52 min-w-28 text-center cursor-pointer whitespace-nowrap'
                  )}
                  onClick={() => {
                    // @ts-ignore
                    setTab(item.key)
                    pagination?.handleChangePage &&
                      pagination?.handleChangePage(1)
                    setOrders([])
                  }}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          <div className="md:pb-5 md:pt-3 pt-1 pb-2 md:px-4 px-2 max-w-main w-full mx-auto">
            {orders.map(item => (
              <Order
                key={item.id}
                item={item}
                onSelectOrder={order => setOrderSelected(order)}
                onSelectAction={(action: OrderTableAction) => setAction(action)}
              />
            ))}

            {orders.length === 0 && !loading && (
              <div className="flex justify-center mt-4 text-main">
                Bạn chưa có đơn hàng
              </div>
            )}

            {loading && (
              <Fragment>
                <OrderSkeleton />
                <OrderSkeleton />
                <OrderSkeleton />
              </Fragment>
            )}
          </div>
        </div>
        {!loading && orders.length > 0 && (
          <div className="mb-10 w-full flex items-center justify-center">
            <CorePagination
              onChange={(page: number, size: number) => {
                pagination.handleChangePage(page)
              }}
              pageSize={pagination.pageSetting.pageSize}
              activePage={pagination.pageSetting.page}
              total={count}
            />
          </div>
        )}
        <CancelOrderDialog
          open={Boolean(action === 'cancel' && orderSelected)}
          orderSelected={orderSelected}
          onClose={handleClearAction}
          onSuccess={async ({ order, resason }) => {
            handleClearAction()
            getOrderList()

            if (!userId) return

            await Promise.all([
              pushNotify({
                title: `Bạn đã hủy đơn hàng ${order.code} với lí do: ${resason}, hãy đặt lịch vào thời gian khác nhé.`,
                status: 'SENT',
                order_id: order.code,
                sender_id: userId,
                sender_type: 'USER',
                recipients_group: [userId],
                image_url:
                  order?.orderItem[0]?.product?.detail_info?.images?.[0] ?? '',
                action: `Bạn đã hủy lịch`
              }),

              pushNotify({
                title: `Khách hàng đã huỷ đơn hàng ${order.code} với lí do: ${resason}`,
                status: 'SENT',
                order_id: order.code,
                sender_id: userId,
                sender_type: 'USER',
                recipients_group: [order.garage.id],
                image_url:
                  order?.orderItem[0]?.product?.detail_info?.images?.[0] ?? '',
                action: `Xe ${order.license_plate} | đã hủy lịch`
              })
            ])
          }}
        />

        <RatingMerchantDialog
          open={Boolean(
            // @ts-ignore
            ['rating', 'viewrating'].includes(action) && orderSelected
          )}
          // open={true}
          orderSelected={orderSelected}
          onClose={handleClearAction}
          onSuccess={() => {
            handleClearAction()
            getOrderList()
          }}
          view={action === 'viewrating'}
        />
      </div>

      <FooterHome />
    </div>
  )
}

export default OrdersPage
