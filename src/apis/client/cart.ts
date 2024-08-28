'use server'

import { createClient } from '@/libs/supabase/server'
import { Database } from '../../../supabase/database'

export async function addProdToCart(
  data: Database['public']['Tables']['cart']['Insert']
) {
  const supabase = createClient()

  if (!data.product_id) {
    return { error: 'Product is required' }
  }

  const product = await supabase
    .from('product')
    .select()
    .eq('id', data.product_id)
    .single()

  if (!product.data || product.error) {
    return { error: product.error.message }
  }

  const addToCart = await supabase
    .from('cart')
    .insert({ ...data, garage_id: product.data.garage_id })
    .select()
    .single()

  if (addToCart.error) {
    return { error: addToCart.error.message }
  }

  return addToCart
}

export async function updateCart({
  data,
  id
}: {
  data: Database['public']['Tables']['cart']['Update']
  id: string
}) {
  const supabase = createClient()

  const updateCart = await supabase
    .from('cart')
    .update(data)
    .eq('id', id)
    .select()

  if (updateCart.error) {
    return { error: updateCart.error.message }
  }

  return updateCart
}

export async function getProdInCart() {
  const supabase = createClient()
  const users = await supabase.auth.getUser()

  if (!users.data.user) {
    return { error: 'Authentication' }
  }

  const selectCart = await supabase
    .from('cart')
    .select('*, product!inner(*), garage(*)', { count: 'estimated' })
    .eq('auth_id', users.data.user?.id)

  if (selectCart.error) {
    return { error: selectCart.error.message }
  }
  return selectCart
}

export async function getProductByCartItemIds(ids: string[]) {
  const supabase = createClient()
  console.log(ids, 'abc')

  const users = await supabase.auth.getUser()

  if (!users.data.user) {
    return { error: 'Authentication' }
  }

  const selectCart = await supabase
    .from('cart')
    .select('*, product!inner(*), garage!inner(*)', { count: 'estimated' })
    .eq('auth_id', users.data.user?.id)
    .in('id', ids)

  if (selectCart.error) {
    return { error: selectCart.error.message }
  }
  return selectCart
}

export async function deleteProdInCart(arrayId: string[]) {
  const supabase = createClient()
  const users = await supabase.auth.getUser()
  if (!users.data.user) {
    return { error: 'Authentication' }
  }

  const selectCart = await supabase
    .from('cart')
    .delete()
    .in('id', arrayId)
    .select()

  if (selectCart.error) {
    return { error: selectCart.error.message }
  }
  return selectCart
}
