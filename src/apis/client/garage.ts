'use server'

import { QueryProductInterface } from './interface'
import { createClient } from '@/libs/supabase/server'

export async function getCategoryGarage(garage_id: string) {
  const supabase = createClient()

  const dataCategory = await supabase
    .from('category')
    .select('*')
    .eq('garage_id', garage_id)
    .eq('status', true)

  if (dataCategory.error) {
    return { error: dataCategory.error.message }
  }
  return dataCategory.data
}

export async function getDetailGarage(garage_id: string) {
  const supabase = createClient()

  const dataGarage = await supabase
    .from('garage')
    .select('*, garage_sold(product_sold, rating)')
    .eq('id', garage_id)
    .single()

  if (dataGarage.error) {
    return { error: dataGarage.error.message }
  }
  return dataGarage.data
}

export async function getDataOriginGarage(garage_id: string) {
  const supabase = createClient()

  const dataOrigin = await supabase
    .from('product')
    .select('detail_info->>origin')
    .eq('garage_id', garage_id)
    .eq('status', true)
    .is('verify', true)

  if (dataOrigin.error) {
    return { error: dataOrigin.error.message }
  }
  return dataOrigin.data?.map(item => item.origin).filter(item => !!item)
}

export async function getDataBrandGarage(garage_id: string) {
  const supabase = createClient()

  const dataBrand = await supabase
    .from('product')
    .select('detail_info->>key_brand')
    .eq('garage_id', garage_id)
    .eq('status', true)
    .is('verify', true)

  if (dataBrand.error) {
    return { error: dataBrand.error.message }
  }
  return dataBrand.data?.map(item => item.key_brand).filter(item => !!item)
}

export async function searchProductInGarage({
  category_id,
  garage_id,
  query
}: {
  query: QueryProductInterface
  garage_id: string
  category_id?: string
}) {
  const supabase = createClient()
  const get_from = (query?.page - 1) * query?.limit || 0
  const get_to = get_from + (query?.limit || 10) - 1

  let select = `*,product_sold(sold), category(id, title)`

  if (category_id) {
    select = `*,product_sold(sold), category!inner(id,title)`
  }

  let searchProduct = supabase
    .from('product')
    .select(select, {
      count: 'estimated'
    })
    .eq('status', true)
    .eq('garage_id', garage_id)

  if (query?.category) {
    searchProduct = searchProduct.overlaps('key_search', query?.category)
  }
  if (query?.key) {
    searchProduct = searchProduct.or(
      `name.ilike.%${query.key}%,description.ilike.%${query?.key}%`
    )
  }

  if (query?.price_from) {
    searchProduct = searchProduct.gte(
      'sell_info->price_from',
      query?.price_from
    )
  }

  if (query?.price_to) {
    searchProduct = searchProduct.lte('sell_info->price_to', query?.price_to)
  }

  if (query?.key_brand) {
    searchProduct = searchProduct.in(
      'detail_info->>key_brand',
      query?.key_brand
    )
  }

  if (query?.origin) {
    searchProduct = searchProduct.in('detail_info->>origin', query?.origin)
  }

  if (category_id) {
    searchProduct = searchProduct.eq('category.id', category_id)
  }

  const {
    data: resultProduct,
    error,
    count
  } = await searchProduct
    .is('verify', true)
    .order('price', { ascending: query?.order_price })
    .range(get_from, get_to)

  if (error) {
    return { error: error.message }
  }

  return { data: resultProduct, count }
}

export async function getCategoryTopInGarage({
  garage_id
}: {
  garage_id: string
}) {
  const supabase = createClient()

  let select = `*, product(*, product_sold(sold, rating))`

  let searchProduct = supabase
    .from('category')
    .select(select, {
      count: 'estimated'
    })
    .eq('status', true)
    .eq('product.status', true)
    .eq('product.display', true)
    .or('order.eq.1,order.eq.2')
    .eq('garage_id', garage_id)

  const {
    data: resultProduct,
    error,
    count
  } = await searchProduct
    .is('product.verify', true)
    .order('order', { ascending: true })
    .range(0, 2)

  if (error) {
    console.log({ error })

    return { error: error.message }
  }

  return { data: resultProduct, count }
}

export async function getProductTopSellGarage({
  garage_id
}: {
  garage_id: string
}) {
  const supabase = createClient()

  let searchProduct = supabase
    .from('product')
    .select('*, product_sold(sold, rating)', {
      count: 'estimated'
    })
    .eq('status', true)
    .eq('garage_id', garage_id)
    .order('product_sold(sold)', { ascending: false })

  const {
    data: resultProduct,
    error,
    count
  } = await searchProduct.is('verify', true).range(0, 4)

  if (error) {
    return { error: error.message }
  }

  return { data: resultProduct, count }
}
