'use client'

import { Box, Flex, Image, Text } from '@mantine/core'
import classes from './footer.module.css'
import Link, { LinkProps } from 'next/link'
import { ReactNode, useState } from 'react'
import { IconFacebook, IconInstagram, IconTiktok } from '../icon'
import classNames from 'classnames'
import ModalFeedback from '../modal/ModalFeedback'
import { useMediaQuery } from '@mantine/hooks'

const FooterHome = () => {
  const [open, setOpen] = useState(false)

  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <div>
      <ModalFeedback open={open} onClose={() => setOpen(false)} />
      <Box className={classes.main}>
        <div className="max-w-main mx-auto">
          <div className="flex justify-between items-center px-10 py-5 mx-auto">
            <Flex align="center" gap={30}>
              <Link href="/">
                <Image
                  h={isMobile ? 40 : 60}
                  src="/logo/logo.png"
                  alt="ficar logo"
                  fit="contain"
                />
              </Link>
            </Flex>
            <div className="hidden md:grid grid-cols-2 md:grid-cols-5 gap-4 ">
              <TextLink href="#">Về Trolyoto</TextLink>
              <TextLink href="#">Chính sách</TextLink>
              <Text
                size="16px"
                className="cursor-pointer"
                fw={500}
                c="#fff"
                onClick={() => setOpen(true)}
              >
                Báo cáo lỗi
              </Text>

              <TextLink href="#">Tuyển dụng</TextLink>
              <TextLink href="#">Hợp tác</TextLink>
            </div>

            <Flex>
              {/* <Flex>
                <div className="text-sm md:text-base font-medium text-white">
                  090 220 3122
                </div>
                <div className="text-sm md:text-base font-medium text-white">
                  hotro@ficar.vn
                </div>
                <div className="text-sm md:text-base font-medium text-white">
                  Số 102 phố Thái Thịnh, phường Trung Liệt, quận Đống Đa, thành
                  phố Hà Nội
                </div>
              </Flex> */}

              <Flex columnGap={11}>
                {/* <IconTiktok />
                <IconInstagram /> */}
                <IconFacebook />
              </Flex>
            </Flex>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 px-10 md:hidden">
            <TextLink href="#">Về Trolyoto</TextLink>
            <TextLink href="#">Chính sách</TextLink>
            <Text
              className=" cursor-pointer"
              size="16px"
              fw={500}
              c="#fff"
              onClick={() => setOpen(true)}
            >
              Báo cáo lỗi
            </Text>
            <TextLink href="#">Tuyển dụng</TextLink>
            <TextLink href="#">Hợp tác</TextLink>
          </div>

          <div className="gap-2 px-10 mx-auto  pt-10 pb-4 md:py-4 flex flex-col">
            <div className="text-sm md:text-base font-medium text-white">
              Hotline: 090 220 3122
            </div>
            <div className="text-sm md:text-base font-medium text-white">
              Email: hotro@ficar.vn
            </div>
            <div className="text-sm md:text-base font-medium text-white">
              Địa chỉ: Số 102 phố Thái Thịnh, phường Trung Liệt, quận Đống Đa,
              thành phố Hà Nội
            </div>
          </div>

          <Flex
            justify="space-between"
            align="center"
            maw={1630}
            px={40}
            mx={'auto'}
            style={{
              overflow: 'hidden',
              fill: 'linear-gradient(180deg, #FFF -11.71%, rgba(255, 255, 255, 0.00) 125.8%)'
            }}
            className="md:h-[230px] h-[120px]"
          >
            <Text
              className={classNames(
                classes.textFi,
                'text-[50px] md:text-[140px] lg:text-[200px]'
              )}
            >
              T
            </Text>
            <Text
              className={classNames(
                classes.textFi,
                'text-[50px] md:text-[140px] lg:text-[200px]'
              )}
            >
              R
            </Text>
            <Text
              className={classNames(
                classes.textFi,
                'text-[50px] md:text-[140px] lg:text-[200px]'
              )}
            >
              O
            </Text>
            <Text
              className={classNames(
                classes.textFi,
                'text-[50px] md:text-[140px] lg:text-[200px]'
              )}
            >
              L
            </Text>
            <Text
              className={classNames(
                classes.textFi,
                'text-[50px] md:text-[140px] lg:text-[200px]'
              )}
            >
              Y
            </Text>
            <Text
              className={classNames(
                classes.textFi,
                'text-[50px] md:text-[140px] lg:text-[200px]'
              )}
            >
              O
            </Text>
            <Text
              className={classNames(
                classes.textFi,
                'text-[50px] md:text-[140px] lg:text-[200px]'
              )}
            >
              T
            </Text>
            <Text
              className={classNames(
                classes.textFi,
                'text-[50px] md:text-[140px] lg:text-[200px]'
              )}
            >
              O
            </Text>
          </Flex>
        </div>
      </Box>
    </div>
  )
}
export default FooterHome

const TextLink = (props: LinkProps & { children: ReactNode }) => {
  const { children, ...linkProps } = props
  return (
    <Link {...linkProps}>
      <Text size="16px" fw={500} c="#fff">
        {children}
      </Text>
    </Link>
  )
}
