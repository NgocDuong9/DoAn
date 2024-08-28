'use server'

import { Database } from '../../../supabase/database'
import { ObjectTypeReview } from './interface'
import { createClient } from '@/libs/supabase/server'
import { updateOrder } from './order'

export async function selectReview() {
  const supabase = createClient()

  const reviews = await supabase
    .from('review')
    .select('*', { count: 'estimated' })

  return { data: reviews.data }
}

export async function postNewReview({
  body
}: {
  body: Database['public']['Tables']['review']['Insert'][]
}) {
  const supabase = createClient()

  const reviews = await supabase.from('review').insert(body).select('*')
  if (reviews.error) {
    return { error: reviews.error.message }
  }
  if (body?.[0].type === ObjectTypeReview.GARAGE && body?.[0].order_id) {
    // @ts-ignore
    await updateOrder({ id: body?.[0].order_id, body: { review: true } })
  }

  if (body?.[0].type === ObjectTypeReview.LOP && body?.[0].order_id) {
    const orderIds = body.map(item => item.order_id)
    const productIds = body.map(item => item.product_id)

    await supabase
      .from('orderItem')
      .update({ review: true })
      .in('order_id', orderIds)
      .in('product_id', productIds)
      .eq('review', false)
      .select()
  }
  return { data: reviews.data }
}

export async function getReviewGarage(garage_id: string, query: any) {
  const supabase = createClient()
  const get_from = (query?.page - 1) * query?.limit || 0
  const get_to = get_from + (query.limit || 5) - 1

  let queryReview = supabase
    .from('review')
    .select('*, users(*)', { count: 'estimated' })
    .eq('garage_id', garage_id)
    .eq('type', ObjectTypeReview.GARAGE)

  const dataReview = await queryReview.range(get_from, get_to)
  if (dataReview.error) {
    return { error: dataReview.error.message }
  }
  return { data: dataReview.data, total: dataReview.count }
}

export async function getReviewProductAdmin(
  product_admin_id: string,
  query?: {
    page: number
    pageSize: number
  }
) {
  const supabase = createClient()
  // const get_from = (query?.page - 1) * query?.limit || 0
  // const get_to = get_from + (query.limit || 5) - 1

  let queryReview = supabase
    .from('review')
    .select('*, users(*)', { count: 'estimated' })
    .eq('productadmin_id', product_admin_id)

  if (query) {
    queryReview.range(
      (query.page - 1) * query.pageSize,
      query.page * query.pageSize - 1
    )
  }

  const dataReview = await queryReview
  // .range(get_from, get_to)
  if (dataReview.error) {
    return { error: dataReview.error.message }
  }
  return { data: dataReview.data, total: dataReview.count }
}

export async function getReviewOrderItem(order_id: string) {
  const supabase = createClient()
  // const get_from = (query?.page - 1) * query?.limit || 0
  // const get_to = get_from + (query.limit || 5) - 1

  let queryReview = await supabase
    .from('review')
    .select('*', { count: 'estimated' })
    .eq('garage_id', order_id)

  // const dataReview = await queryReview.range(get_from, get_to)
  if (queryReview.error) {
    return { error: queryReview.error.message }
  }
  return { data: queryReview.data, total: queryReview.count }
}

// const body = [
//   {
//     content: "Hàng đẹp giá rẻ, nên mua",
//     image: ["2d0qrj6dicym2okh"],
//     rating: 5,
//     type: ObjectTypeReview.GARAGE,
//     user_id: "5e48142e-64bd-4154-8acf-c0249789a6ae",
//     order_id: "c7042f89-b91f-4557-9521-3cfb23232634",
//     garage_id: "a7794c1a-7944-43a5-b3f6-b073ce505725",
//   },
//   {
//     content: "Hàng lởm, lừa đảo",
//     image: ["2d0qrj6dicym2okh"],
//     rating: 1,
//     type: ObjectTypeReview.GARAGE,
//     user_id: "5e48142e-64bd-4154-8acf-c0249789a6ae",
//     order_id: "c7042f89-b91f-4557-9521-3cfb23232634",
//     product_id: "50d3c9ad-e9ef-4417-a190-6a294380a36d",
//     garage_id: "a7794c1a-7944-43a5-b3f6-b073ce505725",
//     productadmin_id: "a0729efa-ea66-4e15-ae82-a086efad52c6",
//   },
//   {
//     content: "Hàng chất lượng cao",
//     image: ["2d0qrj6dicym2okh"],
//     rating: 5,
//     type: ObjectTypeReview.GARAGE,
//     user_id: "5e48142e-64bd-4154-8acf-c0249789a6ae",
//     order_id: "c7042f89-b91f-4557-9521-3cfb23232634",
//     product_id: "50d3c9ad-e9ef-4417-a190-6a294380a36d",
//     garage_id: "a7794c1a-7944-43a5-b3f6-b073ce505725",
//     productadmin_id: "a0729efa-ea66-4e15-ae82-a086efad52c6",
//   },
//   {
//     content: "Hàng đẹp giá rẻ",
//     image: ["2d0qrj6dicym2okh"],
//     rating: 5,
//     type: ObjectTypeReview.GARAGE,
//     user_id: "5e48142e-64bd-4154-8acf-c0249789a6ae",
//     order_id: "c7042f89-b91f-4557-9521-3cfb23232634",
//     product_id: "50d3c9ad-e9ef-4417-a190-6a294380a36d",
//     garage_id: "ad6685b9-81b6-4f43-b911-a35807dd0f3c",
//     productadmin_id: "a0729efa-ea66-4e15-ae82-a086efad52c6",
//   },
//   {
//     content: "Hàng đẹp giá rẻ",
//     image: ["2d0qrj6dicym2okh"],
//     rating: 5,
//     type: ObjectTypeReview.DICH_VU,
//     user_id: "5e48142e-64bd-4154-8acf-c0249789a6ae",
//     order_id: "c7042f89-b91f-4557-9521-3cfb23232634",
//     product_id: "50d3c9ad-e9ef-4417-a190-6a294380a36d",
//     garage_id: "bd481b06-e396-4f67-aba2-7195b5d051d5",
//     productadmin_id: "a0729efa-ea66-4e15-ae82-a086efad52c6",
//   },
// ];
