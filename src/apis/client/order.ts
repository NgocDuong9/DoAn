'use server'

import { createClient } from '@/libs/supabase/server'
import { IOrder, type OrderDetail } from '@/types/order'
import { Database } from '../../../supabase/database'
import { getUserId } from '../managecar'
import { OrderStatus, ProductType } from './interface'

import dayjs from 'dayjs'
import { checkProductIsOutOfStock } from '@/utils'

export async function insertOrder({
  body
}: {
  body: Database['public']['Tables']['order']['Insert']
}) {
  const supabase = createClient()

  const user_id = (await getUserId(false)) as string

  const insertOrder = await supabase
    .from('order')
    // @ts-ignore
    .insert({ ...body, user_id })
    .select()
    .single()

  if (!insertOrder.data || insertOrder.error) {
    return { error: insertOrder.error.message ?? 'ERROR' }
  }

  return { data: insertOrder.data }
}

export async function insertOrderItem({
  body
}: {
  body: [Database['public']['Tables']['orderItem']['Insert']]
}) {
  const supabase = createClient()

  const productIds = body.map(item => item.product_id)

  const { data: products } = await supabase
    .from('product')
    .select()
    .in('id', productIds)

  const dataWithOutOfStockFlag = body.map(cartItem => {
    const findProduct = products?.find(item => item.id === cartItem.product_id)

    return checkProductIsOutOfStock({
      product: findProduct,
      selectedItem: cartItem
    })
  })

  const isOutOfStock = dataWithOutOfStockFlag.some(item => item.isOutOfStock)

  if (isOutOfStock) {
    return { error: 'Sản phẩm đã hết hàng', errorData: dataWithOutOfStockFlag }
  }

  const newOrderItem = await supabase.from('orderItem').insert(body).select()

  if (!newOrderItem.data || newOrderItem.error) {
    return { error: newOrderItem.error.message ?? 'ERROR' }
  }

  // check xem newOrderItem co con hang hay khong.

  const selectCart = await supabase
    .from('cart')
    .delete()
    .in(
      'id',
      body.flatMap(i => i.id)
    )
    .select()
  if (selectCart.error) {
    return { error: selectCart.error.message }
  }

  return { data: newOrderItem.data }
}

export async function updateOrder({
  id,
  body
}: {
  id: string
  body: Database['public']['Tables']['order']['Update']
}) {
  const supabase = createClient()

  const updateOrder = await supabase
    .from('order')
    .update(body)
    .eq('id', id)
    .select()

  if (!updateOrder.data || updateOrder.error) {
    return { error: updateOrder.error.message ?? 'ERROR' }
  }

  return { data: updateOrder.data }
}

export async function updateOrderItem({
  id,
  body
}: {
  id: string
  body: Database['public']['Tables']['orderItem']['Update']
}) {
  const supabase = createClient()

  const updateOrderItem = await supabase
    .from('orderItem')
    .update(body)
    .eq('id', id)
    .select()

  if (!updateOrderItem.data || updateOrderItem.error) {
    return { error: updateOrderItem.error.message ?? 'ERROR' }
  }

  return { data: updateOrderItem.data }
}

export async function deleteOrderItem({ id }: { id: string }) {
  const supabase = createClient()

  const deleteOrderItem = await supabase
    .from('orderItem')
    .delete()
    .eq('id', id)
    .select()

  if (deleteOrderItem.error) {
    return { error: deleteOrderItem.error.message }
  }

  return { data: deleteOrderItem.data }
}

export async function getDataOrderUser({
  status,
  userId,
  pageSetting
}: {
  status?: OrderStatus
  userId: string
  pageSetting?: {
    page: number
    pageSize: number
  }
}) {
  const supabase = createClient()

  // const auth_user = await supabase.auth.getUser();
  // const auth_id = auth_user.data.user?.id;

  if (!userId) {
    return null
  }

  let queryOrder = supabase
    .from('order')
    .select(
      '*, car!inner(*), garage!inner(*), orderItem!inner(*, product!inner(*)),review(*) ',
      { count: 'estimated' }
    )
    .eq('user_id', userId)
    .order('created_at', {
      ascending: false
    })

  if (status) {
    queryOrder = queryOrder.eq('status', status)
  }

  if (pageSetting) {
    const { page, pageSize } = pageSetting
    queryOrder = queryOrder.range((page - 1) * pageSize, page * pageSize - 1)
  }

  const dataOrder = await queryOrder

  if (dataOrder.error) {
    return { error: dataOrder.error.message }
  }

  return { data: dataOrder.data as any as IOrder[], count: dataOrder.count }
}

export const updateOrderStatus = async ({
  id,
  status,
  note = '',
  time,
  logs
}: {
  id: string
  status?: OrderStatus
  note?: string
  time?: any
  logs?: any
}) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('order')
    .update({
      ...(note && {
        status_note: note
      }),
      ...(status && {
        status
      }),
      ...(time && {
        time,
        order_time: time.order_time_without_format
      }),
      ...(logs && { logs }),
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()

  return data
}

export const fetchOrderDetail = async (orderCode: string) => {
  const supabase = createClient() // Create Supabase client
  const { data, error } = await supabase
    .from('order')
    .select('*,orderItem!inner(*, product!inner(*)),car(*)')
    .eq('code', orderCode)
    .single()
  if (!error) {
    return data as any as OrderDetail
  }
}

export async function getDataProductReviewUser({ userId }: { userId: string }) {
  const supabase = createClient()

  if (!userId) {
    return null
  }

  const date = dayjs().subtract(60, 'days').toISOString()

  let queryOrder = supabase
    .from('orderItem')
    .select(
      '*, product!inner(*), order!inner(*, users!inner(*), garage!inner(*))',
      { count: 'estimated' }
    )
    .eq('order.user_id', userId)
    .eq('order.status', OrderStatus.USER_CONFIRMED)
    .eq('product.type', 'SAN_PHAM')
    .eq('product.category_code', ProductType.LOP)
    .eq('review', false)
    .lte('notify', 1)
    .lte('order.order_time', date)
    .order('created_at', {
      ascending: false
    })

  const dataOrder = await queryOrder

  if (dataOrder.error) {
    return { error: dataOrder.error.message }
  }

  return { data: dataOrder.data, count: dataOrder.count }
}

export async function userCancelReviewProduct({
  orderItemIds
}: {
  orderItemIds: string[]
}) {
  const supabase = createClient()

  const orderItems = await supabase
    .from('orderItem')
    .select('*')
    .in('id', orderItemIds)

  const promise = orderItems?.data?.map(async item => {
    await supabase
      .from('orderItem')
      .update({ notify: item.notify + 1 })
      .eq('id', item.id)
      .select()
  })

  return
}
