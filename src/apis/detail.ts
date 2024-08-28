'use server'
import { createClient } from '@/libs/supabase/server'
import { cache } from 'react'
import { ObjectTypeReview } from './client/interface'

export interface QueryProductInterface {
  key?: string // key search
  type?: string
  category?: string[] // linh vuc
  province?: string[] // khu vuc
  price_from?: number //gia
  price_to?: number //gia
  key_brand?: string[] // thuong hieu
  origin?: string[] // xuat xu
  key_type?: string[] // loai ac quy
  key_voltage?: string[] // dien ap ac quy
  key_capacity?: string[] // dung luong ac quy
  key_treadCode?: string[] // ma gai lop
  key_rim?: string[] //la-zang lop
  page?: number //page
  limit?: number //limit record
  order_price?: 'desc' | 'asc' // order sort price
  id?: string // product id
  slug: string
  product_id?: string
  pageSetting?: {
    page: number
    pageSize: number
  }
  orderRating?: 'desc' | 'asc'
}

export interface QueryProductRelateInterface {
  key_brand?: string // thuong hieu
  key_capacity?: string // dung luong ac quy
  key_size?: string //kich co lop
  category_code?: string
  slug?: string
}

export const getProductsId = async (id: string) => {
  if (!id)
    return {
      data: null
    }

  const supabase = createClient()
  const data = await supabase.from('productadmin').select('*').eq('id', id)
  const key = await supabase.from('categoryadmin').select('*')
  if (!data) return { data: null }
  //@ts-ignore
  const brand = data?.data?.[0]?.detail_info.key_brand
  const relate = await searchProductRelate({
    key_brand: brand
  })

  return { data: data.data, key: key.data, relate: relate.data }
}

export const getProductBySlug = cache(async (slug: string) => {
  if (!slug)
    return {
      data: null
    }

  const supabase = createClient()
  const data = await supabase
    .from('productadmin')
    .select('*, productadmin_sold(*)')
    .eq('slug', slug)
    .single()

  const key = await supabase.from('categoryadmin').select('*')
  if (!data) return { data: null }
  //@ts-ignore
  const brand = data?.data?.detail_info.key_brand
  const category_code = data?.data?.category_code as string

  const relates = await searchProductRelate({
    key_brand: brand,
    category_code,
    slug
  })

  return { data: data.data as any, key: key.data, relates: relates.data }
})

export const getCategory = async () => {
  const supabase = createClient()
  const data = await supabase.from('categoryadmin').select('*')
  return { data: data }
}

export async function searchProductDetail(query: QueryProductInterface) {
  const supabase = createClient()

  let searchProduct = supabase
    .from('product')
    .select(
      '*,productadmin!inner(*), product_sold!inner(*), garage!inner(*, garage_sold(*), merchant!inner())',
      { count: 'estimated' }
    )
    // .from('productadmin')
    // .select(
    //   '*, productadmin_sold(*), product!inner(*,product_sold(*), count(), garage!inner(*, garage_sold(*), merchant!inner())),categoryadmin(*)',
    //   {
    //     count: "estimated",

    //   }
    // )
    .eq('status', true)
    .eq('garage.status', true)
    .eq('productadmin.status', true)
    .eq('garage.merchant.status', true)

  if (query.category) {
    searchProduct = searchProduct.overlaps('key_search', query.category)
  }
  if (query.key) {
    searchProduct = searchProduct.or(
      `name.wfts.'${query.key}',description.wfts.'${query.key}'`
    )
  }

  if (query.province) {
    searchProduct = searchProduct.in(
      'garage.information->>province',
      query.province
    )
  }

  if (query.type) {
    searchProduct = searchProduct.eq('type', query.type)
  }

  if (query.price_from) {
    searchProduct = searchProduct.gte('sell_info->price', query.price_from)
  }

  if (query.price_to) {
    searchProduct = searchProduct.lte('sell_info->price', query.price_to)
  }

  if (query.key_brand) {
    searchProduct = searchProduct.in('detail_info->>key_brand', query.key_brand)
  }

  if (query.origin) {
    searchProduct = searchProduct.in('detail_info->>origin', query.origin)
  }

  if (query.key_rim) {
    searchProduct = searchProduct.in('detail_info->>key_rim', query.key_rim)
  }

  if (query.key_treadCode) {
    searchProduct = searchProduct.in(
      'detail_info->>key_treadCode',
      query.key_treadCode
    )
  }

  if (query.key_type) {
    searchProduct = searchProduct.in('detail_info->>key_type', query.key_type)
  }

  if (query.key_voltage) {
    searchProduct = searchProduct.likeAnyOf(
      'detail_info->>key_voltage',
      query.key_voltage
    )
  }

  if (query.key_capacity) {
    searchProduct = searchProduct.likeAnyOf(
      'detail_info->>key_capacity',
      query.key_capacity
    )
  }

  if (query.id) {
    // todo:::::
  } else {
    searchProduct = searchProduct.eq('slug', query.slug)
  }
  if (query.product_id) {
    searchProduct = searchProduct.eq('id', query.product_id)
  }

  const querySearchProduct = searchProduct.is('verify', true)

  if (query.order_price) {
    querySearchProduct.order('price', {
      ascending: query.order_price === 'asc' ? true : false
    })
  }

  if (query.orderRating) {
    querySearchProduct.order('product_sold(rating)', {
      ascending: query.orderRating === 'asc' ? true : false
    })
  }

  if (query.pageSetting) {
    const { page, pageSize } = query.pageSetting
    querySearchProduct.range((page - 1) * pageSize, page * pageSize - 1)
  }

  const { data: resultProduct, error, count } = await querySearchProduct

  console.log('resultProduct:::::', query, resultProduct)

  return {
    data: resultProduct,
    count,
    error
  }
}

export async function searchProductRelate(query: QueryProductRelateInterface) {
  const supabase = createClient()

  let searchProduct = supabase
    .from('productadmin')
    .select(
      '*,productadmin_sold(*), product!inner(*,product_sold(*), garage!inner(*,garage_sold(*), merchant!inner())),categoryadmin(*)',
      {
        count: 'estimated'
      }
    )
    .eq('product.status', true)
    .eq('product.garage.status', true)
    .eq('product.garage.merchant.status', true)

  if (query.key_brand) {
    searchProduct = searchProduct.neq(
      'detail_info->>key_brand',
      query.key_brand
    )
  }
  if (query.key_size) {
    searchProduct = searchProduct.eq('detail_info->>key_size', query.key_size)
  }

  if (query.key_capacity) {
    searchProduct = searchProduct.eq(
      'detail_info->>key_capacity',
      query.key_capacity
    )
  }

  if (query.category_code) {
    searchProduct = searchProduct.eq('category_code', query.category_code)
  }
  if (query.slug) {
    searchProduct.neq('slug', query?.slug)
  }

  const {
    data: resultProduct,
    error,
    count
  } = await searchProduct
    .is('verify', true)
    .range(0, 4)
    .limit(1, { referencedTable: 'product' })

  return {
    data: resultProduct,
    count,
    error
  }
}
