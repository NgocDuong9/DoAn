'use server'

import { createClient } from '@/libs/supabase/server'
import { getUserId } from '../managecar'

export async function countLikeGarage({ garage_id }: { garage_id: string }) {
  const supabase = createClient()

  const countLike = await supabase
    .from('user_garage')
    .select('users(*)', { count: 'estimated', head: true })
    .eq('garage_id', garage_id)

  if (countLike.error) {
    return { error: countLike.error }
  }

  return { data: countLike.count ?? 0 }
}

export async function userLikeGarage({
  user_id,
  garage_id
}: {
  user_id: string
  garage_id: string
}) {
  const supabase = createClient()

  const check = await supabase
    .from('user_garage')
    .select('*', { count: 'estimated', head: true })
    .eq('garage_id', garage_id)
    .eq('user_id', user_id)

  if (check.error) {
    return { error: check.error }
  }

  if (check.count !== 0) {
    const unlike = await supabase
      .from('user_garage')
      .delete()
      .eq('garage_id', garage_id)
      .eq('user_id', user_id)
      .select()

    if (unlike.error) {
      return { error: unlike.error }
    }
  } else {
    const like = await supabase
      .from('user_garage')
      .insert({
        garage_id,
        user_id
      })
      .select()

    if (like.error) {
      return { error: like.error }
    }
  }

  return true
}

export async function getGarageLike(key?: string) {
  const supabase = createClient()
  const userId = await getUserId()

  if (!userId) return

  const queryGarageLike = supabase
    .from('user_garage')
    .select('garage(*, garage_sold(*))', { count: 'estimated' })
    .eq('user_id', userId)

  if (key) {
    queryGarageLike.or(`name.wfts.'${key}', name.ilike.%${key}%`)
  }

  const garageLike = await queryGarageLike

  if (garageLike.error) {
    return { error: garageLike.error }
  }

  return { data: garageLike.data, count: garageLike.count }
}

export async function checkUserLikeGarage({
  user_id,
  garage_id
}: {
  user_id: string
  garage_id: string
}) {
  const supabase = createClient()

  const check = await supabase
    .from('user_garage')
    .select('*', { count: 'estimated', head: true })
    .eq('garage_id', garage_id)
    .eq('user_id', user_id)

  if (check.error) {
    return { error: check.error }
  }
  if (check.count !== 0) {
    return true
  } else {
    return false
  }
}
