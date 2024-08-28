'use client'

import { signout } from '@/apis/auth'
import Notify from '@/components/header/_components/Notify'
import { Box, Flex, Popover, Skeleton } from '@mantine/core'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment, useEffect, useRef, useState } from 'react'

import Aside from '@/app/(account-management)/_components/Aside'
import { useDisclosure } from '@mantine/hooks'
import classNames from 'classnames'
import { CgCommunity } from 'react-icons/cg'
import { FiHome, FiShoppingCart } from 'react-icons/fi'
import { GiHamburgerMenu } from 'react-icons/gi'
import {
  IoCarSportOutline,
  IoChevronDownOutline,
  IoChevronForwardOutline,
  IoCloseSharp
} from 'react-icons/io5'
import { useAuth } from '../context/auth.context'
import BtnHeader from '../custom/button/button.header'
import DropDown from '../dropdown'
import Cart from './_components/Cart'
import classes from './header.module.css'
import TextGradiant from '../core/TextGradiant'
import useDisableHtmlScroll from '@/hooks/useDisableHtmlScroll'
import AuthButton from '../custom/button/auth-button'
import useClickOutside from '@/app/search/search-result/components/useClickOutside'
import useOnClickOutside from '@/hooks/useOnClickOutsideWithArray'
interface Props {
  dataUser: any
}

const LandingPageHeader = ({ type }: { type: 'app' | 'landing-page' }) => {
  const { user: dataUser, loading } = useAuth()
  const headerRef = useRef<HTMLDivElement | null>(null)
  const [openMobileMenu, setOpenMobileMenu] = useState(false)

  const pathname = usePathname()
  // const isLandingPage = type === "landing-page";
  const isLandingPage = type === 'landing-page'

  useDisableHtmlScroll(openMobileMenu)

  const headerHeight = headerRef.current?.getBoundingClientRect().height

  const [opened, { toggle }] = useDisclosure(false)
  const [profile, { close: closePro, open: openPro }] = useDisclosure(false)

  useEffect(() => {
    setOpenMobileMenu(false)
  }, [pathname])

  const ref = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useOnClickOutside([ref, menuRef], () => {
    setOpenMobileMenu(false)
  })

  // useClickOutside(ref, () => {
  //   setOpenMobileMenu(false)
  // })
  const menus = [
    {
      link: '/',
      title: 'Trang chủ',
      icon: <FiHome />
    },
    {
      link: '/carmanage',
      title: (
        <AuthButton>
          <p>Quản lý xe</p>
        </AuthButton>
      ),
      icon: <IoCarSportOutline />
    },
    {
      link: '#',
      title: (
        <Flex gap={4} align={'center'} onClick={toggle}>
          <p>Giao dịch</p>
          <div>
            {opened ? <IoChevronDownOutline /> : <IoChevronForwardOutline />}
          </div>
        </Flex>
      ),
      icon: (
        <div className="ml-[-2px]">
          <FiShoppingCart />
        </div>
      ),
      dropDown: (
        <Flex direction={'column'} gap={4}>
          <Box>
            <Link
              href={'/orders'}
              style={{
                color: pathname === '/orders' ? '#55b0ce' : '#333'
              }}
              className="font-normal cursor-pointer"
            >
              Quản lý đơn hàng
            </Link>
          </Box>
          {/* <Flex align={'center'} gap={12} className="cursor-pointer" mb={6}>
            <p className="font-normal">Quản lý chi tiêu</p>
            <p
              style={{
                color: 'white',
                background:
                  'var(--Gradient, linear-gradient(91deg, #258DBA 1.26%, #26D3E0 66.99%, #8BF6C8 126.97%))',
                borderRadius: '4px',
                fontSize: '8px',
                fontWeight: '600',
                padding: '2px 4px'
              }}
            >
              Sắp ra mắt
            </p>
          </Flex> */}
        </Flex>
      )
    }
    // {
    //   link: '#',
    //   title: (
    //     <Flex
    //       align={'center'}
    //       gap={4}
    //       className="relative  md:mt-0 cursor-auto"
    //     >
    //       <p>Cộng đồng</p>
    //       <p
    //         style={{
    //           color: 'white',
    //           background:
    //             'var(--Gradient, linear-gradient(91deg, #258DBA 1.26%, #26D3E0 66.99%, #8BF6C8 126.97%))',
    //           borderRadius: '4px',
    //           fontSize: '8px',
    //           fontWeight: '600',
    //           position: 'absolute',
    //           right: '-60px'
    //         }}
    //         className="px-1 py-0.5 md:py-0"
    //       >
    //         Sắp ra mắt
    //       </p>
    //     </Flex>
    //   ),
    //   icon: (
    //     <div className="text-2xl ml-[-2px] mt-2">
    //       <CgCommunity />
    //     </div>
    //   )
    // }
  ]

  return (
    <Fragment>
      <Box
        className={classNames(
          isLandingPage ? classes.section : classes.appHeader,
          'px-5 py-3 md:px-10 md:py-5 text-sm md:text-base'
        )}
        style={{
          boxShadow: type === 'app' ? 'rgb(222 222 222 / 30%) 1px 1px 3px' : ''
        }}
        ref={headerRef}
        onMouseLeave={() => {
          // close()

          closePro()
        }}
      >
        <Flex
          justify="space-between"
          align="center"
          w="100%"
          mx="auto"
          className="max-w-main mx-auto"
        >
          <Link href="/">
            <img
              src={isLandingPage ? '/logo/logo.png' : '/logo/applogo.png'}
              alt="logo-main"
              className="h-[40px] md:h-[60px]"
            />
          </Link>

          <div className="hidden gap-x-4 md:flex pl-[13%]">
            {menus.map((item, idx) => (
              <Popover
                width={230}
                position="bottom"
                withArrow
                shadow="md"
                arrowSize={16}
                opened={opened && !openMobileMenu}
                radius={16}
                // onClose={close}
                key={idx}
              >
                <Popover.Target>
                  <Link
                    href={item.link}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '50px',
                      color: isLandingPage ? '#fff' : '#333',
                      ...(item.link === pathname && {
                        border: isLandingPage
                          ? '1px solid #e5e5e5'
                          : '1px solid #515757'
                      })
                    }}
                    // onMouseEnter={item.dropDown ? open : close}
                  >
                    {item.title}
                  </Link>
                </Popover.Target>
                {item.dropDown && (
                  <Popover.Dropdown
                    style={{ pointerEvents: 'auto' }}
                    className="font-semibold"
                  >
                    {item.dropDown}
                  </Popover.Dropdown>
                )}
              </Popover>
            ))}
          </div>

          <div className="md:pr-6">
            {loading ? (
              <div>
                <Skeleton height={8} width={180} mb={10} />
              </div>
            ) : (
              <Flex direction="row" columnGap={12} align="center">
                {dataUser ? (
                  <Fragment>
                    {/* <DropDown
                      handleSignOut={async () => {
                        signout()
                      }}
                    >
                      <div
                        className={classNames(
                          isLandingPage ? 'text-white' : 'text-main'
                        )}
                      >
                        {
                          //@ts-ignore
                          dataUser?.name ?? dataUser?.email
                        }
                      </div>
                    </DropDown> */}

                    <Popover
                      width={200}
                      position="bottom"
                      withArrow
                      shadow="md"
                      opened={profile}
                      radius={16}
                      arrowSize={16}
                      onClose={closePro}
                    >
                      <Popover.Target>
                        <div onMouseEnter={openPro} className="py-2.5">
                          <p
                            className={classNames(
                              !isLandingPage ? 'text-[#333]' : 'text-white'
                            )}
                          >
                            {
                              //@ts-ignore
                              dataUser?.name ?? dataUser?.email
                            }
                          </p>
                        </div>
                      </Popover.Target>

                      <Popover.Dropdown
                        style={{ pointerEvents: 'auto' }}
                        onMouseLeave={closePro}
                        className="font-semibold"
                      >
                        <div className="flex gap-1 font-normal flex-col cursor-pointer">
                          <Link href={'/profile'}>
                            <p>Quản lý tài khoản</p>
                          </Link>
                          <p
                            onClick={() => {
                              signout()
                            }}
                          >
                            Đăng xuất
                          </p>
                        </div>
                      </Popover.Dropdown>
                    </Popover>

                    <div
                      className={
                        'flex md:gap-4 gap-4 md:flex items-center mt-2 '
                      }
                      onMouseEnter={closePro}
                    >
                      <Cart
                        className={classNames(
                          isLandingPage ? '' : 'filter-image'
                        )}
                        isLandingPage={isLandingPage}
                      />
                      <Notify
                        className={classNames(
                          isLandingPage ? '' : 'filter-image'
                        )}
                        isLandingPage={isLandingPage}
                      />
                    </div>

                    <div className={'flex gap-6 md:hidden'}>
                      <div
                        className={classNames(
                          isLandingPage ? 'text-white' : 'text-main',
                          'cursor-pointer'
                        )}
                        onClick={() => setOpenMobileMenu(!openMobileMenu)}
                        ref={menuRef}
                      >
                        {openMobileMenu ? (
                          <div className="text-2xl ml-1">
                            <IoCloseSharp />
                          </div>
                        ) : (
                          <div className="text-xl ml-2">
                            <GiHamburgerMenu />
                          </div>
                        )}
                      </div>
                    </div>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Link
                      href={'/login'}
                      className={classNames(
                        isLandingPage ? 'text-white' : 'text-[#333]'
                      )}
                    >
                      <div className="flex items-center gap-x-1">
                        <img src="/svg/default-avatar.svg" alt="" />

                        <div>Đăng nhập</div>
                      </div>
                    </Link>
                    <div className={'flex gap-2 items-center md:hidden'}>
                      <div
                        className={classNames(
                          isLandingPage ? 'text-white' : 'text-main',
                          'cursor-pointer'
                        )}
                        onClick={() => setOpenMobileMenu(!openMobileMenu)}
                        ref={menuRef}
                      >
                        {openMobileMenu ? (
                          <div className="text-2xl ml-1">
                            <IoCloseSharp />
                          </div>
                        ) : (
                          <div className="text-xl ml-2">
                            <GiHamburgerMenu />
                          </div>
                        )}
                      </div>
                    </div>
                  </Fragment>
                )}
              </Flex>
            )}
          </div>
        </Flex>
      </Box>
      <div
        className={classNames(
          'text-white fixed w-screen flex flex-col items-end',
          !openMobileMenu ? 'hidden' : 'fixed'
        )}
        style={{
          height: `calc(100vh - ${headerHeight}px)`,
          top: `${headerHeight}px`,
          zIndex: 1000,
          // ...(isLandingPage
          //   ? {
          //       backgroundImage:
          //         "linear-gradient(90deg, rgba(0, 0, 0, 0.93) 0%, rgb(16, 16, 16) 100%)",
          //     }
          //   : {
          //       background: "#fff",
          //       borderTop: "1px solid #e4e4e4",
          //     }),
          background: '#0000007e'
          // borderTop: '1px solid #e4e4e4'
        }}
      >
        <div
          ref={ref}
          className="flex flex-col justify-between py-4 px-3 flex-1 bg-white min-w-[270px] w-fit"
        >
          <Aside className={'md:border-r px-2 text-main '}>
            <div className="flex flex-col ">
              {menus.map((item, idx) => (
                <Fragment key={idx}>
                  <Link
                    href={dataUser ? item.link : '/login'}
                    className={classNames(
                      'cursor-pointer w-fit flex items-center gap-x-2',
                      item.dropDown ? 'mb-1' : 'mb-2'
                    )}
                    style={{
                      padding: '4px 0',
                      // color: isLandingPage ? "#cdcdcd" : "#333",
                      color: '#333',
                      ...(item.link === pathname && {
                        // color: isLandingPage ? "#fff" : "#55b0ce",
                        // fontWeight: "bold",
                        color: '#55b0ce'
                      })
                    }}
                  >
                    <div className="text-[20px] ml-[2px]">{item.icon}</div>{' '}
                    <TextGradiant disableGradiant={item.link !== pathname}>
                      {item.title}
                    </TextGradiant>
                  </Link>
                  {opened && (
                    <Box className="ml-12">
                      {item.dropDown && item.dropDown}
                    </Box>
                  )}
                </Fragment>
              ))}
            </div>
          </Aside>
        </div>
      </div>
    </Fragment>
  )
}

export default LandingPageHeader
