'use server'

import { createClient } from '@/libs/supabase/server'

/**
 * Table notifications {
 *   id UUID [pk, default: `gen_random_uuid()`]
 *   title String [not null]
 *   content Text [not null]
 *   image_url String
 *   sender_id String [not null]
 *   sender_type Enum('ADMIN', 'GARAGE', 'USER') [not null]
 *   is_broadcast Boolean [default: false, not null]
 *   created_at Timestamp [default: `now()`]
 *   updated_at Timestamp
 *   recipients_group: Text
 *   readed_group: Text
 * }
 */

export async function pushNotify(data: any) {
  const supabase = createClient()

  const insertData = {
    ...data,
    sent_at: data.sent_at?.toISOString(),
    recipients_group: data.recipients_group ?? [],
    readed_group: data.readed_group ?? []
  }

  const { data: result, error } = await supabase
    .from('notifications')
    .insert([insertData])

  if (error) {
    return { error: error.message, data: null }
  }

  return { success: true, data: result }
}

export async function markAsRead(info: {
  notification_id: string | any
  recipient_id: string
}) {
  const supabase = createClient()
  const { notification_id, recipient_id } = info

  if (!notification_id) {
    return { error: 'Notification ID is required' }
  }

  const { data: currentData, error: fetchError } = await supabase
    .from('notifications')
    .select('readed_group, recipients_group, order_id')
    .eq('id', notification_id)
    .single()

  if (fetchError) {
    return { error: fetchError.message }
  }

  if (!currentData) {
    return { error: 'Notification not found' }
  }

  // Handle null readed_group
  const existingReadedGroup = currentData.readed_group || []
  const updatedReadedGroup = existingReadedGroup.includes(recipient_id)
    ? existingReadedGroup
    : [...existingReadedGroup, recipient_id]

  const { data, error } = await supabase
    .from('notifications')
    .update({
      readed_group: updatedReadedGroup,
      recipients_group: currentData.recipients_group,
      order_id: currentData.order_id
    })
    .eq('id', notification_id)

  if (error) {
    return { error: error.message }
  }

  return { success: true, data }
}

enum NotificationType {
  ALL = 'ALL',
  USER = 'USER',
  GARA = 'GARA'
}
// ALL
// USER
// GARA
export async function fetchNotifications(recipientId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('status', 'SENT')
    .or(
      `recipients_group.ov.{${recipientId}},is_broadcast.eq.${NotificationType.ALL},is_broadcast.eq.${NotificationType.USER}`
    )
    .order('created_at', { ascending: false })
    .range(0, 200)

  if (error) {
    console.error('error: ', error)
    return { error: error.message, notifications: [] }
  }

  const notificationsWithReadStatus = data.map(notification => {
    const isRead = notification.readed_group?.includes(recipientId)
    return {
      ...notification,
      isRead
    }
  })

  return { success: true, notifications: notificationsWithReadStatus ?? [] }
}

export async function markAsReadAll(recipientId: string) {
  if (!recipientId) {
    return { error: 'User ID is required' }
  }

  const supabase = createClient()

  // Fetch notifications where recipientId is in recipients_group but not in readed_group
  // let query = supabase
  //   .from('notifications')
  //   .select('id, recipients_group, readed_group')
  //   .or(
  //     `recipients_group.cs.{${recipientId}},is_broadcast.eq.ALL,is_broadcast.eq.USERS`
  //   )
  //   .not('readed_group', 'cs', `{${recipientId}}`)

  const { data: notificationsToUpdate, error: fetchError } = await supabase
    .from('notifications')
    .select('id, recipients_group, readed_group')
    .or(
      `recipients_group.cs.{${recipientId}},is_broadcast.eq.ALL,is_broadcast.eq.USER`
    )
    .not('readed_group', 'cs', `{${recipientId}}`)

  if (fetchError) {
    console.error('fetchError: ', fetchError)
    return { error: fetchError.message }
  }

  // Check if there are notifications to update
  if (!notificationsToUpdate || notificationsToUpdate.length === 0) {
    return { success: true, message: 'No notifications to update' }
  }

  // Update each notification to add recipientId to readed_group
  const updates = notificationsToUpdate.map(async notification => {
    const updatedReadedGroup = notification.readed_group
      ? [...notification.readed_group, recipientId]
      : [recipientId]
    return supabase
      .from('notifications')
      .update({ readed_group: updatedReadedGroup })
      .eq('id', notification.id)
  })

  // Wait for all updates to complete
  const results = await Promise.all(updates)
  const updateErrors = results.filter(result => result.error)

  if (updateErrors.length > 0) {
    return {
      error: 'Failed to update some notifications',
      details: updateErrors.map(e => e.error?.message)
    }
  }

  return { success: true, data: results.map(r => r.data) }
}

export type SenderNotifyType = 'USER' | 'ADMIN' | 'ALL'
