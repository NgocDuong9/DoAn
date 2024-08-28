'use server'

import { createClient } from '@/libs/supabase/server'
import { HistoryCareType, OrderStatus, ServiceType } from './interface'

export async function selectHistoryCare({
  car_id,
  key,
  type
}: {
  car_id: string
  type?: HistoryCareType
  key?: string
}) {
  const supabase = createClient()

  const user = await supabase.auth.getUser()

  if (!user.data.user) {
    return { error: user.error }
  }
  const categoryadmin = await supabase.from('categoryadmin').select('*')

  const query = supabase
    .from('orderItem')
    .select(
      '*,product!inner(*), order!inner(*,garage!inner(*, merchant!inner(*)), car!inner(*))'
    )
    .eq('order.car_id', car_id)
    .eq('order.auth_id', user.data.user?.id)
    .eq('order.status', OrderStatus.USER_CONFIRMED)
    .order('updated_at', { ascending: true })

  if (key) {
    query.or(`name.ilike.%${key}%, name.wfts.'${key}'`, {
      referencedTable: 'product'
    })
  }

  if (type == HistoryCareType.BAO_DUONG_SUA_CHUA) {
    query.in('product.category_code', [
      'MAY',
      'GAM',
      'DIEN',
      'DIEU_HOA',
      'THAN_VO',
      'BAO_DUONG_SUA_CHUA_KHAC'
    ])
  } else if (type) {
    query.eq('product.category_code', type)
  }

  const data = await query

  if (data.error) {
    return { error: data.error.message }
  }

  return { data: data.data, key: categoryadmin.data }
}
