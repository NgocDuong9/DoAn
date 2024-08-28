'use client'
import { useAuth } from '@/components/context/auth.context'
import { useNotifications } from '@/components/context/notify.context'
import { cn, nanoid } from '@/libs/utils'
import { slug } from '@/utils'
import { formatDate } from '@/utils/formatDate'
import { getFileUrl } from '@/utils/images'
import { Skeleton } from '@mantine/core'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import type { Database } from '../../../../../supabase/database'
import Link from 'next/link'

type Notification = Database['public']['Tables']['notifications']['Row']

function NotificationsPage() {
  const [hash, setHash] = useState('')
  const { notifyList, loading, markAsRead, readAllNotify, totalNotify } =
    useNotifications()
  const { user } = useAuth()
  const notifyListRef = useRef<HTMLDivElement>(null)
  const [animateScale, setAnimateScale] = useState({ scale: 1, opacity: 1 })
  const userId = user?.id

  useEffect(() => {
    const location = window.location
    setHash(location.hash)

    if (location.hash) {
      const id = location.hash.replace('#', '')

      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [hash, notifyList, userId])

  useEffect(() => {
    const notificationToMarkRead = notifyList.find(
      _ => `#${slug(_.title, _.id)}` === location.hash
    )
    console.log(notifyList, location, 'xxxxx')

    if (notificationToMarkRead?.id) {
      if (!userId) return
      markAsRead({
        notification_id: notificationToMarkRead.id,
        recipient_id: userId
      }).then()
    }
  }, [userId])

  useEffect(() => {
    setAnimateScale({ scale: 1.01, opacity: 0.5 })
  }, [notifyList, hash])

  const groupedNotifications = useMemo(() => {
    const groups: Record<string, Notification[]> = {}
    notifyList.forEach(notification => {
      const orderId = notification.order_id || `${nanoid()}`
      groups[orderId] = groups[orderId] || []
      groups[orderId].push(notification)
    })
    return Object.values(groups).map(notifications => ({ notifications }))
  }, [notifyList])

  return (
    <div className={'notify-list px-2'} ref={notifyListRef}>
      {loading &&
        !groupedNotifications?.length &&
        Array.from({ length: 3 }).map((_, i) => (
          <div key={i}>
            <Skeleton className={'w-full h-28 my-4'} />
            <div className={'pl-20'}>
              <Skeleton className={'w-full h-10 my-4'} />
              <Skeleton className={'w-full h-10 my-4'} />
              <Skeleton className={'w-full h-10 my-4'} />
            </div>
          </div>
        ))}
      {!loading && !groupedNotifications?.length && (
        <div className={'w-full h-28 my-4 px-3'}>
          Không tìm thấy thông báo nào!
        </div>
      )}
      {!loading && groupedNotifications?.length > 0 && (
        <>
          <div
            onClick={() => {
              if (totalNotify < 1) return
              readAllNotify()
            }}
            className="text-end text-xs cursor-pointer"
          >
            Đọc tất cả thông báo
          </div>
          {groupedNotifications.map((notificationGroup, i) => {
            const firsItem = notificationGroup.notifications[0]
            const date = formatDate(firsItem.created_at)
            const itemHash = `#${slug(firsItem.title, firsItem.id)}`
            return (
              <>
                <Link
                  href={
                    firsItem?.order_id ? `/orders/${firsItem.order_id}` : '#'
                  }
                  key={itemHash}
                >
                  <motion.div
                    className={'bg-[#52BAE60D] px-4 py-2 mt-4 '}
                    initial={{ scale: 1, opacity: 1 }}
                    animate={hash === itemHash && animateScale}
                    transition={{
                      duration: 0.15,
                      repeat: 2,
                      repeatType: 'reverse'
                    }}
                    onAnimationComplete={() =>
                      setAnimateScale({ scale: 1, opacity: 1 })
                    }
                    key={firsItem.id}
                  >
                    <div
                      id={firsItem.id}
                      className={cn(
                        'flex md:justify-between md:items-center items-start md:gap-4 gap-2 md:w-full '
                      )}
                    >
                      <div className="flex items-center md:max-w-[80px] w-[40px] h-[40px] min-w-[40px] min-h-[40px] md:min-h-[80px] md:min-w-[80px]">
                        <Image
                          src={getFileUrl(firsItem.image_url)}
                          alt={firsItem.title || ''}
                          width={80}
                          height={80}
                          className="rounded-full object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex flex-col gap-y-1 w-full md:max-w-full">
                        <label className="text-md leading-[23.5px]">
                          {/* {firsItem.title} */}
                          {/* @ts-ignore */}
                          {firsItem.action}
                        </label>
                        <label className="text-sm leading-[20px] text-[#333]">
                          {firsItem.title}
                        </label>
                        {firsItem.created_at && (
                          <label className="text-sm font-normal text-main opacity-80">
                            {date.hours} {date.fullTime}
                          </label>
                        )}
                      </div>
                    </div>
                  </motion.div>
                  <div className={'md:ml-20 ml-14 h-full border-l-1 relative'}>
                    {notificationGroup.notifications.map((item, i) => {
                      if (i < 1) return null
                      const date = formatDate(item.created_at)
                      const itemHash = `#${slug(item.title, item.id)}`
                      return (
                        <motion.div
                          className={'relative'}
                          initial={{ scale: 1, opacity: 1 }}
                          animate={hash === itemHash && animateScale}
                          transition={{
                            duration: 0.15,
                            repeat: 2,
                            repeatType: 'reverse'
                          }}
                          onAnimationComplete={() =>
                            setAnimateScale({ scale: 1, opacity: 1 })
                          }
                          key={item.id + i}
                        >
                          <div
                            id={item.id}
                            className={cn('md:pl-8 pl-4  my-2')}
                          >
                            <div className="absolute left-0 top-[12px] -translate-x-1/2 -translate-y-1/2 h-4 w-4 bg-gradient-order rounded-full" />

                            <div className="flex flex-col gap-y-1 w-full ">
                              <label className="text-md leading-[23.5px]">
                                {/* {item.title} */}
                                {item.action}
                              </label>
                              <label className="text-sm leading-[20px] text-[#333]">
                                {item.title}
                              </label>
                              {item.created_at && (
                                <label className="text-sm font-normal text-main opacity-80">
                                  {date.hours} {date.fullTime}
                                </label>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </Link>
              </>
            )
          })}
        </>
      )}
    </div>
  )
}

export default NotificationsPage
