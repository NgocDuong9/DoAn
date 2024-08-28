'use server'

import { createClient } from '@/libs/supabase/server'

export const getInfoUser = async () => {
  const supabase = createClient()

  const auth_user = await supabase.auth.getUser()
  const auth_id = await auth_user.data.user?.id

  if (!auth_id) return null

  const data = await supabase
    .from('users')
    .select('*')
    .eq('auth_id', auth_id)
    .single()

  if (!data.data) return null

  return { data: data.data }
}

export const updateInfoUser = async ({
  id,
  body
}: {
  id: string
  body: {
    name: string
    email: string
    phone: string
    sex: 'MALE' | 'FEMALE'
    birthday?: string
  }
}) => {
  const supabase = createClient()
  try {
    await supabase.auth.updateUser(body)
    const data = await supabase
      .from('users')
      .update(body)
      .eq('id', id)
      .select()
      .single()
    if (!data.data) return null
    return { data: data.data }
  } catch {
    return null
  }
}
interface InfoBooking {
  name: string
  index: number
  phone: string
  default: string
}
export const updateUserInfoBooking = async ({
  user_id,
  info_booking
}: {
  user_id: string
  info_booking: InfoBooking[]
}) => {
  const supabase = createClient()
  try {
    const data = await supabase
      .from('users')
      .update({
        // @ts-ignore
        info_booking: info_booking
      })
      .eq('id', user_id)
      .select()
      .single()

    if (!data.data) return null
    return { data: data.data }
  } catch {
    return null
  }
}
