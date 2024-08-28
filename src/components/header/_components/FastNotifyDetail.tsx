'use client'
import { useNotifications } from '@/components/context/notify.context'
import TextGradiant from '@/components/core/TextGradiant'
import { PopoverData } from '@/components/popover/_interface/Popover.interface'
import Popover from '@/components/popover/Popover'
import { cn } from '@/libs/utils'
import { slug } from '@/utils'
import { formatDate } from '@/utils/formatDate'
import { getFileUrl } from '@/utils/images'
import Image from 'next/image'
import Link from 'next/link'

export default function FastNotifyDetail({ ...props }) {
  const { notifyList } = useNotifications()
  const data: PopoverData[] = []
  notifyList.forEach((item, i) => {
    const date = formatDate(item?.created_at)
    data.push({
      jsx: (
        <Link
          href={`/notifications#${slug(item?.title, item.id)}`}
          key={item.id + i}
          className={cn(
            'rounded-lg flex justify-between items-center gap-2 w-[460px] py-1 px-1 my-1',
            item?.isRead && 'bg-gray-100 opacity-70'
          )}
        >
          <div className="flex items-center max-w-[60px] min-w-[60px] max-h-[60px] min-h-[60px]">
            <Image
              src={getFileUrl(item?.image_url)}
              alt={item?.title || ''}
              width={60}
              height={60}
              className="rounded-md object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col gap-y-1 w-full max-w-[460px]">
            <label className="text-md">{item?.action}</label>
            <div className="line-clamp-2 text-sm">{item.title}</div>
            {item?.created_at && (
              <label className="text-sm font-normal text-main">
                {date.hours} {date.fullTime}
              </label>
            )}
          </div>
        </Link>
      )
    })
  })

  const EmptyNotify = () => (
    <Link
      href={'/notifications'}
      className={
        'flex items-center gap-2 w-[320px] text-sm hover:text-[#258DBA] hover:underline'
      }
    >
      Không có thông báo
    </Link>
  )

  return (
    <Popover
      {...props}
      // className='max-h-[50vh] overflow-y-auto'
      data={data}
      footer={
        data?.length <= 0 ? (
          <EmptyNotify />
        ) : (
          <div>
            <Link href="/notifications">
              <TextGradiant className={'font-bold text-md cursor-pointer'}>
                Xem thêm
              </TextGradiant>
            </Link>
          </div>
        )
      }
    />
  )
}
