'use client'

import {
  Box,
  Collapse,
  Divider,
  Flex,
  Grid,
  GridCol,
  Image,
  Stack,
  Text
} from '@mantine/core'
import classes from './thematic-price.module.css'
import Link, { LinkProps } from 'next/link'
import { Fragment, useState } from 'react'
import BtnSubmit from '@/components/custom/button/button.submit'
import { FiPlus, FiMinus } from 'react-icons/fi'
import LandingCollapse from './landing-collapse'
import classNames from 'classnames'
import { useMediaQuery } from '@mantine/hooks'

const collapses = [
  {
    quantity: '12',
    title: 'Gara',
    desc: 'Mạng lưới gara rộng và uy tín được kiểm chứng chất lượng bởi cộng đồng chủ xe',
    img: '/box/image-money.png'
  },
  {
    quantity: '12K',
    title: 'Khách hàng',
    desc: 'Triết lý kinh doanh đi từ sự tử tế, luôn lấy khách hàng làm trọng tâm',
    img: '/box/image-money.png'
  },
  {
    quantity: '21',
    title: 'Kĩ thuật viên',
    desc: 'Nền tảng kiến thức chuyên môn sâu từ các kỹ thuật hãng',
    img: '/box/image-money.png'
  }
]

const ThematicPrice = () => {
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <Box className={classNames('relative ', classes.main)}>
      <Box className="max-w-main px-[20px] mx-auto">
        <div className="flex mt-0  mx-auto w-full max-w-[1630px] items-center md:justify-between justify-center">
          <Box>
            <div className="text-2xl  md:text-5xl font-bold text-main pt-[80px]">
              Tiền đề làm nên giá trị
            </div>
          </Box>
          {/* <Box className="hidden md:block">
            <div className="text-sm md:text-base font-normal text-[#555] max-w-[580px] md:mr-20">
              Reference site about Lorem Ipsum, giving information on its
              origins, as well as a random Lipsum generator.
            </div>
          </Box> */}
        </div>

        <Box mt={24} mx="auto" maw={1630}>
          <Divider c="#D3D3D3" />

          {collapses.map((item, index) => (
            <LandingCollapse key={index} item={item} />
          ))}
        </Box>

        <div className="mt:50px hidden md:mt-[150px] max-w-[1200px] mx-auto w-full">
          <div className="flex flex-wrap justify-center md:justify-between">
            <div className="text-2xl md:text-3xl font-bold text-main">
              Tin tức & Mẹo hay về xe
            </div>
            <Text className="text-sm md:text-base font-medium max-w-[590px] text-[#555] mt-2 md:mt-0">
              Reference site about Lorem Ipsum, giving information on its
              origins, as well as a random Lipsum generator.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-[30px]">
            <div>
              <Box pos="relative" className={classes.card1}>
                <SvgNew1 isMobile={isMobile} />
                <div
                  className="px-6 py-5 md:px-20 md:py-20 w-full h-full"
                  style={{
                    borderRadius: 10,
                    background:
                      'linear-gradient(0deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.60) 100%)'
                  }}
                >
                  <Stack gap={30}>
                    <Text className={classes.textCard}>Kỹ năng lái</Text>
                    <Text size="28px" fw={500} c="#fff" lh="120%" maw={417}>
                      Đổ đèo an toàn khi có sương mù
                    </Text>
                    <Text size="16px" fw={400} c="#fff" lh="120%" maw={456}>
                      Reference site about Lorem Ipsum, giving information on
                      its origins, as well as a random Lipsum generator.
                    </Text>
                    <IconLink href="#" bg="white" isMobile={isMobile} />
                  </Stack>
                </div>
              </Box>
            </div>

            <div>
              <Box pos="relative" className={classes.card2}>
                <SvgNew2 isMobile={isMobile} />
                <div
                  className="px-6 py-5 md:px-20 md:py-20 w-full h-full"
                  style={{
                    borderRadius: 10,
                    background:
                      'linear-gradient(0deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.60) 100%)'
                  }}
                >
                  <Stack gap={30}>
                    <Text className={classes.textCard}>Thị trường xe</Text>
                    <Text size="28px" fw={500} c="#fff" lh="120%" maw={494}>
                      Toyota ra mắt mẫu xe hybrid hỗ trợ AI cảnh báo nguy hiểm
                    </Text>
                    <Text size="16px" fw={400} c="#fff" lh="120%" maw={456}>
                      Reference site about Lorem Ipsum, giving information on
                      its origins, as well as a random Lipsum generator.
                    </Text>
                    <IconLink href="#" bg="white" isMobile={isMobile} />
                  </Stack>
                </div>
              </Box>
            </div>
          </div>
        </div>
      </Box>
      <Box
        mx="auto"
        w="100%"
        className={classNames(classes.info, 'py-[60px] md:py-[120px]')}
      >
        <Box className="max-w-main mx-auto">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-2xl md:text-5xl font-bold text-main">
              Giới thiệu Gara quen
            </div>
            {/* <Text size="20px" fw={500} lh="120%" c="#222" mt={10}> */}
            <div className="text-base md:text-2xl text-main mt-3">
              Gia nhập mạng lưới để cùng tích lũy giá trị
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 mt-[48px] px-[20px] md:px-[40px] gap-[24px] w-full items-end">
            <div className="w-full">
              <label htmlFor="gara">
                <div className="text-base md:text-lg font-semibold text-main">
                  Tên gara
                </div>
              </label>
              <input
                id="gara"
                className="mt-2 md:mt-4 h-[50px] md:h-[70px] px-6 rounded-xl border-1 border-solid border-white outline-none text-main bg-[#ecf3f5] placeholder-[#666] w-full"
                placeholder="Nhập tên gara"
              />
            </div>

            <div className="w-full">
              <label htmlFor="phone">
                <div className="text-base md:text-lg font-semibold text-main">
                  Số điện thoại
                </div>
              </label>
              <input
                id="phone"
                className="mt-2 md:mt-4 h-[50px] md:h-[70px] px-6 rounded-xl border-1 border-solid border-white outline-none text-main bg-[#ecf3f5] placeholder-[#666] w-full"
                placeholder="Nhập số điện thoại"
              />
            </div>

            <div className="w-full">
              <label htmlFor="address">
                <div className="text-base md:text-lg font-semibold text-main">
                  Địa chỉ
                </div>
              </label>
              <input
                id="address"
                className="mt-2 md:mt-4 h-[50px] md:h-[70px] px-6 rounded-xl border-1 border-solid border-white outline-none text-main bg-[#ecf3f5] placeholder-[#666] w-full"
                placeholder="Nhập địa chỉ gara"
              />
            </div>

            <BtnSubmit className="h-[50px] md:h-[70px] min-w-[270px]">
              Gửi ngay
            </BtnSubmit>
          </div>
        </Box>
      </Box>
    </Box>
  )
}
export default ThematicPrice

const IconLink = (
  props: LinkProps & { bg?: string } & { isMobile: boolean | undefined }
) => {
  const { bg = '#ECF3F5', isMobile, ...linkProps } = props
  return (
    <Link {...linkProps}>
      <Box
        bg={bg}
        style={{
          borderRadius: 100,
          display: 'grid',
          placeContent: 'center',
          width: isMobile ? '32px' : '64px',
          height: isMobile ? '32px' : '64px'
        }}
      >
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: isMobile ? '14px' : '24px',
            height: isMobile ? '14px' : '24px'
          }}
        >
          <path
            d="M13 5.5H19V11.5"
            stroke="#222222"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 5.5L5 19.5"
            stroke="#222222"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Box>
    </Link>
  )
}

const SvgNew1 = ({ isMobile }: { isMobile: boolean | undefined }) => {
  return (
    <svg
      // width="84"
      // height="83"
      viewBox="0 0 84 83"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: isMobile ? '42px' : '84px',
        height: isMobile ? '42px' : '83px'
      }}
    >
      <path d="M0.840759 83L3.5 0.5L84 83H0.840759Z" fill="#E7E7E7" />
    </svg>
  )
}
const SvgNew2 = ({ isMobile }: { isMobile: boolean | undefined }) => {
  return (
    <svg
      viewBox="0 0 85 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: isMobile ? '42px' : '85px',
        height: isMobile ? '38px' : '76px'
      }}
    >
      <path
        d="M4.61893e-07 10.5669L85 0L3.5 76L4.61893e-07 10.5669Z"
        fill="#E7E7E7"
      />
    </svg>
  )
}
