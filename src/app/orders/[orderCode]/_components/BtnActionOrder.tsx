'use client'

import { navigate } from '@/apis/auth'
import { updateOrderStatus } from '@/apis/client/order'
import {
  ActionNotify,
  useNotifications
} from '@/components/context/notify.context'
import TextGradiant from '@/components/core/TextGradiant'
import { type OrderDetail, OrderStatus } from '@/types/order'
import { Box, Button, LoadingOverlay } from '@mantine/core'
import React, { type Dispatch, type SetStateAction, useState } from 'react'

interface BtnActionsProps {
  statusOrder: OrderStatus | null
  order: any
  isInternal: boolean
  onClose?: () => void
  setOrderDetail: Dispatch<SetStateAction<OrderDetail | undefined>>
}

const BtnActions = ({
  statusOrder,
  order,
  isInternal,
  onClose,
  setOrderDetail
}: BtnActionsProps) => {
  const { pushNotify } = useNotifications()

  const [loading, setLoading] = useState(false)
  const goBack = () => {
    if (isInternal) {
      onClose && onClose()
    } else {
      navigate('/orders')
    }
  }

  const changeStatus = (status: OrderStatus) => {
    if (loading || !order?.id) return
    setLoading?.(true)
    updateOrderStatus({
      id: order?.id,
      status
    })
      .then(() => {
        setOrderDetail(prev => {
          if (!prev) return
          return {
            ...prev,
            status
          }
        })

        pushNotify({
          title: `Bạn đã xác nhận đơn hàng ${order?.code}.`,
          content: `Bạn hãy đánh giá trải nghiệm của mình tại gara ${order?.garage?.name}`,
          status: 'SENT',
          order_id: order?.code,
          sender_id: order?.user_id,
          sender_type: 'USER',
          recipients_group: [order?.user_id],
          image_url:
            order?.orderItem[0]?.product?.detail_info?.images?.[0] ?? '',
          action: `Bạn đã xác nhận đơn hàng`
        })

        pushNotify({
          title: `Khách hàng đã xác nhận đơn hàng ${order?.code}`,
          status: 'SENT',
          order_id: order?.code,
          sender_id: order?.user_id,
          sender_type: 'USER',
          recipients_group: [order?.garage_id],
          image_url:
            order?.orderItem[0]?.product?.detail_info?.images?.[0] ?? '',
          action: `Xe ${order.license_plate} | đã xác nhận đơn hàng`
        })
      })
      .finally(() => {
        setLoading?.(false)
      })
  }

  return (
    <>
      {statusOrder === 'COMPLETED' ? (
        <>
          <Button
            style={{
              background:
                'linear-gradient(91.57deg, #258DBA 1.33%, #26D3E0 63.56%, #8BF7C8 120.36%)'
            }}
            className="h-[36px] w-[133px] rounded-[10px] text-base border-0 py-1 px-5"
            radius="md"
            onClick={() => changeStatus(OrderStatus.USER_CONFIRMED)}
          >
            Xác nhận
          </Button>
        </>
      ) : (
        // <Button
        // 	style={{
        // 		background:
        // 			"linear-gradient(91.57deg, #258DBA 1.33%, #26D3E0 63.56%, #8BF7C8 120.36%)",
        // 	}}
        // 	className="h-[36px] w-[133px] rounded-[10px] text-base border-0 py-1 px-5"
        // 	radius="md"
        // 	onClick={() => changeStatus(OrderStatus.COMPLETED)}
        // >
        // 	TÉT
        // </Button>
        <Button
          className="md:h-[36px] h-[33px] w-[133px] rounded-[10px] text-xs md:text-base border-1 border-[#258DBA] py-1 px-5 bg-white hover:bg-white"
          radius="md"
          onClick={goBack}
        >
          <TextGradiant>Quay lại</TextGradiant>
        </Button>
      )}
      {loading && (
        <Box pos="fixed" mih={'100vh'} miw={'100vw'} inset={0}>
          <LoadingOverlay
            visible={true}
            zIndex={90}
            overlayProps={{ radius: 'sm', blur: 2 }}
            h={'100vh'}
          />
        </Box>
      )}
    </>
  )
}

export default BtnActions
