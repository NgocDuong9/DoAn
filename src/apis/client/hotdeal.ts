'use server'

import { createClient } from '@/libs/supabase/server'
import { Database } from '../../../supabase/database'

const LIMIT_PAGE_PROMO = 4
const LIMIT_PRODUCT_PROMO = 2
type Row = Database['public']['Tables']['hotdeal']['Row']

export type HotDealBody = Database['public']['Tables']['hotdeal']['Insert']
export type Garage = Database['public']['Tables']['garage']['Row']
export type Product = Database['public']['Tables']['product']['Row']

export interface HotDeal extends Row {
  garage: Garage
  product: Product
}

export interface ResultHotDeal<T> {
  data: T | null
  error: string | null
}

export interface HotDealGroup {
  description: string | null
  pages: HotDeal[][]
}

export async function selectHotDeal(): Promise<any> {
  const supabase = createClient()

  const hotdeal = await supabase
    .from('hotdeal')
    .select('*, garage(*), product(*)')
    .order('page', { ascending: true })
    .order('index', { ascending: true })
    .range(0, 7)

  if (hotdeal.error) {
    return { error: hotdeal.error.message, data: null }
  }

  // const commonDescription =
  //   hotdeal.data.length > 0 ? hotdeal.data[0].description : null;
  // const data = hotdeal.data;
  // const groupedByPage = groupByPageLogic(data as HotDeal[]);
  return {
    data: hotdeal?.data,
    error: null
  }
}

function groupByPageLogic(data: HotDeal[]): HotDeal[][] {
  const pageSize = LIMIT_PAGE_PROMO
  const productPerPage = LIMIT_PRODUCT_PROMO
  let result: HotDeal[][] = []

  for (let page = 1; page <= pageSize; page++) {
    let pageData: HotDeal[] = []
    for (let index = 1; index <= productPerPage; index++) {
      const hotDealItem = data.find(
        item => item.page === page && item.index === index - 1
      )
      if (hotDealItem) {
        pageData.push(hotDealItem)
      } else {
        pageData.push({ page, index: index - 1 } as unknown as HotDeal)
      }
    }
    result.push(pageData)
  }
  return result
}
