'use server'

import { createClient } from '@/libs/supabase/server'

export const getUserId = async (isGetAllData?: boolean) => {
  const supabase = createClient()
  const auth_user = await supabase.auth.getUser()
  const auth_id = await auth_user.data.user?.id
  if (!auth_id) return null

  const data = await supabase
    .from('users')
    .select('*')
    .eq('auth_id', auth_id)
    .single()

  if (data.error) return null

  if (isGetAllData) return data?.data
  return data?.data?.id
}

export const getBrand = async () => {
  const supabase = createClient()
  const data = await supabase.from('brand').select('*')
  return { data: data.data }
}

export const getCarType = async (id: string) => {
  if (!id)
    return {
      data: null
    }
  const supabase = createClient()
  const data = await supabase.from('carType').select('*').eq('brand_id', id)
  return { data: data.data }
}

export const createCar = async (datas: any) => {
  if (!datas)
    return {
      data: null
    }
  const supabase = createClient()

  const user_id = await getUserId()
  if (!user_id)
    return {
      data: null
    }

  const newData = { ...datas, user_id: user_id }

  const { data, error } = await supabase.from('car').insert(newData).select()

  if (error) {
    return {
      data: null
    }
  }

  return { data }
}

export const updateCar = async (datas: any, id: string) => {
  if (!datas)
    return {
      data: null
    }
  const supabase = createClient()

  const { data, error } = await supabase
    .from('car')
    .update(datas)
    .eq('id', id)
    .select()

  if (error) {
    return {
      data: null
    }
  }

  return { data }
}

export const getCarUser = async () => {
  const supabase = createClient()

  const user_id = await getUserId()

  if (!user_id) {
    return {
      data: null
    }
  }
  const data = await supabase
    .from('car')
    .select('*, warranty(*),carType(*,brand(*))')
    .eq('user_id', user_id)
    .order('created_at', { ascending: false, referencedTable: 'warranty' })

  const carType = await supabase.from('carType').select('*')

  const result = data.data?.map(car => {
    const seen = new Set()
    const filterWarranty = car.warranty.filter(item => {
      if (!seen.has(item.product_type)) {
        seen.add(item.product_type)
        return true
      }
      return false
    })
    return { ...car, warranty: filterWarranty }
  })

  return { data: result, carType: carType.data }
}

export const deleteCar = async (id: string) => {
  if (!id)
    return {
      data: null
    }
  const supabase = createClient()
  const data = await supabase.from('car').delete().eq('id', id).select()
  return { data: data.data }
}

export const getDetailCar = async (id: string) => {
  if (!id)
    return {
      data: null
    }
  const supabase = createClient()

  const data = await supabase
    .from('car')
    .select('*, warranty(*),carType(*,brand(*))')
    .eq('id', id)
  return { data: data.data }
}
