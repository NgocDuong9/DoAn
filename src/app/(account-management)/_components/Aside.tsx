'use client'
import { useAuth } from '@/components/context/auth.context'
import TextGradiant from '@/components/core/TextGradiant'
import { getFileUrl } from '@/utils/images'
import { Button, Skeleton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { IoChevronDownOutline, IoChevronForwardOutline } from 'react-icons/io5'
import Notify from '../_icons/Notify'
import Personal from '../_icons/Personal'

function Aside({
  className = '',
  children
}: {
  className?: string
  children?: ReactNode
}) {
  const pathname = usePathname()
  const { user: dataUser, handleSignout, loading } = useAuth()

  //  @ts-ignore
  const titleName = (dataUser?.name ?? dataUser?.phone ?? dataUser?.email) || ''
  //  @ts-ignore
  const avatar = getFileUrl(dataUser?.avatar)

  const [visible, { toggle }] = useDisclosure(false)

  const isActiveProfileMenu =
    pathname.includes('/profile') || pathname.includes('/change-password')

  return (
    <aside className={className}>
      {dataUser && (
        <div className={'w-full flex items-center gap-2'}>
          <Image
            src={avatar}
            width={42}
            height={42}
            className={
              'max-w-[42px] max-h-[42px] object-cover w-[42px] h-[42px] min-h-[42px] min-w-[42px] rounded-full bg-main'
            }
            alt={titleName}
          />
          {loading || !dataUser ? (
            <Skeleton className={'w-48 h-8'} />
          ) : (
            <h2
              className={'text-[20px] font-medium cursor-pointer leading-none'}
            >
              {titleName}
            </h2>
          )}
        </div>
      )}
      <div className="mt-4">{children}</div>
      {dataUser && (
        <div className={'actions '}>
          <div className={'info-action'}>
            <h3
              className={classNames(
                'flex items-center gap-2 cursor-pointer',
                isActiveProfileMenu ? '' : 'filter-image'
              )}
              onClick={toggle}
            >
              <Personal />
              <TextGradiant
                disableGradiant={!isActiveProfileMenu}
                className={'!text-start !items-start'}
              >
                Tài khoản của tôi
              </TextGradiant>
              <div>
                {visible ? (
                  <IoChevronDownOutline />
                ) : (
                  <IoChevronForwardOutline />
                )}
              </div>
            </h3>
            {visible && (
              <ul className={'pl-12 space-y-1 my-2'}>
                <li className={'cursor-pointer'}>
                  <Link href={'/profile'} className={'cursor-pointer'}>
                    <TextGradiant
                      disableGradiant={!pathname.startsWith('/profile')}
                      className={'!text-start !items-start'}
                    >
                      Hồ sơ tài khoản
                    </TextGradiant>
                  </Link>
                </li>
                {/* <li className={'cursor-pointer'}>Quản lý người đặt lịch</li> */}
                <li className={'cursor-pointer'}>
                  <Link href={'/change-password'} className={'cursor-pointer'}>
                    <TextGradiant
                      disableGradiant={!pathname.startsWith('/change-password')}
                      className={'!text-start !items-start'}
                    >
                      Đổi mật khẩu
                    </TextGradiant>
                  </Link>
                </li>
              </ul>
            )}
          </div>
          <div className="mt-4">
            <Link href={'/notifications'}>
              <TextGradiant
                disableGradiant={!pathname.startsWith('/notifications')}
                className={classNames(
                  'flex items-center gap-2 mt-2 mb-3 cursor-pointer',
                  pathname.startsWith('/notifications') ? '' : 'filter-image'
                )}
              >
                <Notify /> <span>Thông báo</span>
              </TextGradiant>
            </Link>
          </div>
          <Button
            classNames={{
              label: 'items-center justify-center gap-3'
            }}
            className={classNames(
              'flex md:hidden bg-transparent  rounded-[10px] text-red-600  border border-red-500  h-[30px] hover:bg-transparent hover:text-red-500',
              children ? 'mt-4' : ''
            )}
            onClick={handleSignout}
          >
            Đăng xuất
          </Button>
        </div>
      )}
    </aside>
  )
}

export default Aside
