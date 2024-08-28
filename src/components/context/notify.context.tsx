'use client'

import {
  fetchNotifications,
  markAsRead as _markAsRead,
  pushNotify,
  SenderNotifyType,
  markAsReadAll
} from '@/apis/client/notify'
import { useAuth } from '@/components/context/auth.context'
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState
} from 'react'
import type { Database } from '../../../supabase/database'

type Notification = Database['public']['Tables']['notifications']['Row']

interface ActionsNotify {
  onError?: () => void
  onSuccess?: () => void
}

interface NotifyContextType {
  totalNotify: number
  notifyList: (Notification & { isRead: boolean })[] // Use NotificationGroup[] instead of Notification[]
  changeNotifyList: React.Dispatch<
    React.SetStateAction<(Notification & { isRead: boolean })[]>
  >
  fetchNotifyList: () => Promise<void>
  pushNotify: (notifyDetails: any, actions?: ActionsNotify) => Promise<void>
  markAsRead: (
    info: {
      notification_id: string
      recipient_id: string
    },
    actions?: ActionsNotify
  ) => Promise<void>
  loading: boolean
  changeLoading: React.Dispatch<React.SetStateAction<boolean>>
  readAllNotify: () => Promise<void>
}

const NotifyContext = createContext<NotifyContextType | undefined>(undefined)

interface NotifyProviderProps {
  children: ReactNode
}

interface PushNofityParams {
  title: string
  content: string
  status: string
  order_id: string
  sender_id: string
  sender_type: string
  recipients_group: string[]
  image_url: string
  action: string
  licensePlate: string
}

export const NotifyProvider: React.FC<NotifyProviderProps> = ({ children }) => {
  const [notifyList, setNotifyList] = useState<
    (Notification & { isRead: boolean })[]
  >([])
  const [loading, setLoading] = useState<boolean>(false)
  const { userId } = useAuth()

  const fetchNotifyList = useCallback(async () => {
    try {
      if (loading || !userId) return
      setLoading(true)
      const { notifications, success } = await fetchNotifications(userId)
      // @ts-ignore
      setNotifyList(success ? notifications : [])
    } catch (error) {
      console.error('Error fetching notifications:', error)
    } finally {
      setLoading(false)
    }
  }, [loading, userId])

  const markAsRead = async (
    info: { notification_id: string; recipient_id: string },
    actions?: ActionsNotify
  ) => {
    try {
      if (loading || !userId) return
      setLoading(true)
      const { success } = await _markAsRead(info)
      if (success) {
        fetchNotifyList().then(() => actions?.onSuccess?.())
      } else {
        actions?.onError?.()
      }
    } catch (error) {
      console.error('Error marking notification as read:', error)
      actions?.onError?.()
    } finally {
      setLoading(false)
    }
  }

  const readAllNotify = useCallback(async () => {
    try {
      if (loading || !userId) return
      setLoading(true)
      const reaAll = await markAsReadAll(userId)
      if (reaAll) {
        fetchNotifyList()
      } else {
        // actions?.onError?.()
      }
    } catch (error) {
      console.log(error, 'errr')
    } finally {
      setLoading(false)
    }
  }, [loading, userId])

  const createNotify = async (
    data: PushNofityParams,
    actions?: ActionsNotify
  ) => {
    try {
      if (loading || !userId) return
      setLoading(true)
      const { success } = await pushNotify(data)

      if (success) {
        fetchNotifyList().then(() => actions?.onSuccess?.())
      } else {
        console.error('Failed to fetch notifications')
        actions?.onError?.()
      }
    } catch (error) {
      console.error('Error fetching notifications', error)
      actions?.onError?.()
    } finally {
      setLoading(false)
    }
  }

  useLayoutEffect(() => {
    if (userId) {
      fetchNotifyList().then()
    }
  }, [userId])

  const totalNotify = useMemo(() => {
    return notifyList.filter(n => !n.isRead).length
  }, [notifyList])

  const valueData: NotifyContextType = {
    notifyList,
    totalNotify,
    changeNotifyList: setNotifyList,
    fetchNotifyList,
    pushNotify: createNotify,
    markAsRead,
    loading,
    changeLoading: setLoading,
    readAllNotify
  }

  return (
    <NotifyContext.Provider value={valueData}>
      {children}
    </NotifyContext.Provider>
  )
}

export function useNotifications(): NotifyContextType {
  const context = useContext(NotifyContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotifyProvider')
  }
  return context
}

export enum ActionNotify {
  CREATE = 'CREATE',
  GARA_CHANGE_SCHEDULE = 'GARA_CHANGE_SCHEDULE',
  COMPLETE = 'COMPLETE',
  UPDATE = 'UPDATE',
  CANCEL = 'CANCEL',
  USER_CONFIRM = 'USER_CONFIRM'
}
