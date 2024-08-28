'use client'
import { useNotifications } from '@/components/context/notify.context'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import FastNotifyDetail from './FastNotifyDetail'
import { useScreenDetector } from '@/hooks/useScreenDetector'
import { useMediaQuery } from '@mantine/hooks'
import { trace } from 'console'

export default function Notify({
  className,
  isLandingPage
}: {
  className?: string
  isLandingPage: boolean
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { totalNotify } = useNotifications()
  const pathname = usePathname()
  const isMobile = useMediaQuery('(max-width: 768px)')

  if (pathname.startsWith('/notifications')) return null
  return (
    <div
      className={'relative'}
      onMouseOver={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link href="/notifications" className={'block w-fit h-fit pb-1'}>
        {/* <Image
          src="/svg/notify.svg"
          alt="logo-main"
          width={20}
          height={20}
          className={className}
        /> */}
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.63477 8C6.63477 6.4087 7.26691 4.88258 8.39213 3.75736C9.51734 2.63214 11.0435 2 12.6348 2C14.2261 2 15.7522 2.63214 16.8774 3.75736C18.0026 4.88258 18.6348 6.4087 18.6348 8C18.6348 15 21.6348 17 21.6348 17H3.63477C3.63477 17 6.63477 15 6.63477 8Z"
            stroke={isLandingPage ? '#fff' : '#333'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.9346 21C11.102 21.3044 11.348 21.5583 11.6471 21.7352C11.9461 21.912 12.2871 22.0053 12.6346 22.0053C12.982 22.0053 13.323 21.912 13.6221 21.7352C13.9211 21.5583 14.1672 21.3044 14.3346 21"
            stroke={isLandingPage ? '#fff' : '#333'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {totalNotify > 0 && (
          <span
            className={
              'absolute text-white -top-3 -right-4 bg-gradient-order rounded-full w-fit px-2 h-5 flex justify-center items-center'
            }
          >
            {totalNotify ?? 0}
          </span>
        )}
      </Link>
      <FastNotifyDetail isOpen={isOpen && !isMobile} />
    </div>
  )
}
