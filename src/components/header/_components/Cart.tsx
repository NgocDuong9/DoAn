'use client'
import { useCart } from '@/components/context/cart.context'
import FastCartDetail from '@/components/header/_components/FastCartDetail'
import { useScreenDetector } from '@/hooks/useScreenDetector'
import { useMediaQuery } from '@mantine/hooks'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Cart({
  className,
  isLandingPage
}: {
  className?: string
  isLandingPage: boolean
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const isMobile = useMediaQuery('(max-width: 768px)')

  const pathname = usePathname()
  const { totalCart } = useCart()
  if (pathname.startsWith('/cart')) return null
  return (
    <div
      className={'relative'}
      onMouseOver={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link href="/cart" className={'block w-fit h-fit'}>
        {/* <Image
          src="/svg/cart.svg"
          alt="logo-main"
          width={20}
          height={20}
          className={className}
        /> */}
        <div className="pb-1">
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.63477 22C9.18705 22 9.63477 21.5523 9.63477 21C9.63477 20.4477 9.18705 20 8.63477 20C8.08248 20 7.63477 20.4477 7.63477 21C7.63477 21.5523 8.08248 22 8.63477 22Z"
              stroke={isLandingPage ? '#fff' : '#333'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19.6348 22C20.1871 22 20.6348 21.5523 20.6348 21C20.6348 20.4477 20.1871 20 19.6348 20C19.0825 20 18.6348 20.4477 18.6348 21C18.6348 21.5523 19.0825 22 19.6348 22Z"
              stroke={isLandingPage ? '#fff' : '#333'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2.68457 2.0498H4.68457L7.34457 14.4698C7.44215 14.9247 7.69524 15.3313 8.06028 15.6197C8.42532 15.908 8.87948 16.0602 9.34457 16.0498H19.1246C19.5797 16.0491 20.0211 15.8931 20.3756 15.6076C20.7301 15.3222 20.9767 14.9243 21.0746 14.4798L22.7246 7.0498H5.75457"
              stroke={isLandingPage ? '#fff' : '#333'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {totalCart > 0 && (
          <span
            className={
              'absolute text-white -top-3 -right-4 bg-gradient-order rounded-full w-fit px-2 h-5 flex justify-center items-center'
            }
          >
            {totalCart ?? 0}
          </span>
        )}
      </Link>
      <FastCartDetail isOpen={isOpen && !isMobile} />
    </div>
  )
}
