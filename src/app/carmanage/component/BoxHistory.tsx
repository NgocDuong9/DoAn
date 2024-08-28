import { formatTimes } from '@/utils/formatDate'
import { formatNumber, getProductPriceWithDiscount } from '@/utils/formatPrice'
import { Box, Divider, Flex, Image, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  IconCalendar,
  IconCalendarWeek,
  IconChevronDown,
  IconChevronUp,
  IconClock,
  IconHome2,
  IconMapPin,
  IconPhone,
  IconTool,
  IconUser,
  IconUsers
} from '@tabler/icons-react'
import React from 'react'
import CarInsurance from './CarInsurance'
import { navigate } from '@/apis/auth'
import { MapProductType } from '@/types/product'
import { getFileUrl } from '@/utils/images'
import Link from 'next/link'

const dayTranslations: { [key: string]: string } = {
  MONDAY: 'Thứ Hai',
  TUESDAY: 'Thứ Ba',
  WEDNESDAY: 'Thứ Tư',
  THURSDAY: 'Thứ Năm',
  FRIDAY: 'Thứ Sáu',
  SATURDAY: 'Thứ Bảy',
  SUNDAY: 'Chủ Nhật'
}

const BoxHistory = ({ item, keysearch }: { item: any; keysearch: any }) => {
  // function getWorkingDays(schedule: any[]): string {
  //   return schedule
  //     .filter(day => day.work)
  //     .map(day => dayTranslations[day.day])
  //     .join(', ')
  // }

  // const [opened, { open, close }] = useDisclosure(false)

  // const renderCategoryCode = (code?: string) => {
  //   if (!code) return ''
  //   if (code === 'LOP') {
  //     return 'Lốp'
  //   }
  //   if (code === 'AC_QUY') {
  //     return 'Ắc quy'
  //   }
  //   return 'Bảo dưỡng, sửa chữa'
  // }

  const { promotePrice } = getProductPriceWithDiscount(item.detail.classifies)

  return (
    <div className="flex flex-col gap-4 md:mx-auto w-full  px-2 justify-start">
      <div className="flex flex-col lg:flex-row md:items-center">
        <Flex gap={12} align={'start'} className="flex-1 mb-3 lg:mb-0">
          <Box>
            <img
              src={getFileUrl(item?.product.detail_info.images[0])}
              className="md:w-[80px] object-cover md:h-[80px] rounded-lg w-[60px] h-[60px]"
            />
          </Box>
          <Box maw={300}>
            {/* <Text
              className="text-sm md:text-base text-transparent rounded-lg font-extrabold"
              style={{
                background:
                  'linear-gradient(90deg, #52BAE6 0%, #67F2D1 99.99%, #51C2A7 100%)',
                '-webkit-background-clip': 'text',
                '-webkit-text-fill-color:': 'transparent'
              }}
            >
              {renderCategoryCode(item?.product?.category_code)}
            </Text> */}
            <Text className="md:mt-2 text-sm md:text-base md:max-w-[200px] lg:max-w-full">
              {item?.product?.name}
            </Text>
          </Box>
        </Flex>
        <Flex direction={'column'} className="flex-1 gap-1">
          <Flex gap={12}>
            {/* <IconCalendar /> */}
            <img src="/svg/calendar.svg" alt="" className="w-[20px]" />
            <Text className="text-sm md:text-lg">
              Ngày mua: {formatTimes(item.order.time.order_time_without_format)}
            </Text>
          </Flex>
          <Flex gap={12} className="items-center">
            <img src="/svg/homeicon.svg" alt="" className="w-[20px]" />
            <Text className="text-sm md:text-lg">
              {item?.order?.garage?.name}
            </Text>
            <Link href={`/search/garage/${item?.product?.garage_id}`}>
              <img src="/svg/link.svg" className="w-[20px] cursor-pointer" />
            </Link>

            {/* {check ? (
              <IconChevronDown
                onClick={toggle}
                className="cursor-pointer"
                width={20}
              />
            ) : (
              <IconChevronUp
                onClick={toggle}
                className="cursor-pointer"
                width={20}
              />
            )} */}
          </Flex>
        </Flex>
        <Box className="flex-1">
          <Flex align={'center'} gap={12} className="mt-1 md:mt-0">
            <img src="/svg/dolar.svg" className="w-[20px]" />
            <Text className="text-sm md:text-lg text-[#333] font-medium">
              {formatNumber(promotePrice)}
            </Text>
          </Flex>
          {/* {item?.product?.category_code === 'LOP' && (
            <Flex align={'center'} gap={12} className="mt-1 md:mt-0">
              <img src="/svg/creditcard.svg" className="w-[20px]" />
              <Text className="text-sm md:text-lg text-[#333] font-medium">
                Thẻ bảo hành
              </Text>
              <img
                src="/svg/link.svg"
                className="w-[20px] cursor-pointer"
                onClick={open}
              />
            </Flex>
          )} */}
        </Box>
      </div>
      <Divider />
      {/* {check && (
        <Flex
          justify={'space-between'}
          className="flex flex-col lg:flex-row mb-2 gap-2"
        >
          <Flex direction={'column'} className="lg:gap-[22px] flex-1">
            {item?.order?.garage?.merchant.deputy && (
              <Flex gap={11}>
                <IconUser />
                <Text className="text-sm md:text-base">
                  Quản lý: {item?.order?.garage?.merchant.deputy}
                </Text>
              </Flex>
            )}
            <Flex gap={11}>
              <IconClock />
              <Text maw={250} className="text-sm md:text-base">
                Giờ hoạt động:{' '}
                {item?.order?.garage?.description?.times[0]?.time[0] +
                  ' - ' +
                  item?.order?.garage?.description?.times[0]?.time[1]}
                {getWorkingDays(item?.order?.garage?.description.times)}
              </Text>
            </Flex>
            {item?.order?.garage?.description.size && (
              <Flex gap={11}>
                <IconUsers />
                <Text className="text-sm md:text-base">
                  Số lượng NV: {item?.order?.garage?.description.size}
                </Text>
              </Flex>
            )}
          </Flex>
          <Flex direction={'column'} className="lg:gap-[22px] flex-1">
            <Flex gap={11}>
              <IconCalendarWeek />
              <Text maw={350} className="text-sm md:text-base">
                Chuyên môn: {item?.order?.garage?.services}
              </Text>
            </Flex>
            {item?.order?.garage?.description.device && (
              <Flex gap={11}>
                <IconTool />
                <Text maw={350} className="text-sm md:text-base">
                  Máy móc: {item?.order?.garage?.description?.device}
                </Text>
              </Flex>
            )}
          </Flex>
          <Flex direction={'column'} className="lg:gap-[22px] flex-1">
            <Flex gap={11}>
              <IconPhone />
              <Text className="text-sm md:text-base">
                Liên hệ: {item?.order?.garage?.hotline}
              </Text>
            </Flex>
            <Flex gap={11}>
              <IconMapPin />
              <Text className="text-sm md:text-base">
                Địa chỉ: {item?.order?.garage?.information?.address}
              </Text>
            </Flex>
          </Flex>
          <div className="flex mt-2 flex-1 flex-row md:flex-col gap-2 md:gap-4">
            <Flex
              justify={'center'}
              align={'center'}
              style={{
                background:
                  'var(--Gradient, linear-gradient(91deg, #258DBA 1.26%, #26D3E0 66.99%, #8BF6C8 126.97%))'
              }}
              className="rounded-[10px] cursor-pointer w-full md:w-[140px]"
              h={36}
              gap={4}
            >
              <IconCalendar color="white" />
              <Text className={`text-[16px] text-white font-medium`}>
                Đặt lịch
              </Text>
            </Flex>
            <Flex
              gap={4}
              className="rounded-[10px] cursor-pointer w-full md:w-[140px]"
              justify={'center'}
              align={'center'}
            >
              <Text
                className="text-[#24CCD9] py-1 w-full border-[#24CCD9] cursor-pointer text-center border rounded-lg font-semibold "
                onClick={() => {
                  navigate(`/search/garage/${item?.order?.garage.id}`)
                }}
              >
                Xem Gara
              </Text>
            </Flex>
          </div>
        </Flex>
      )} */}
      {/* <CarInsurance
        close={close}
        opened={opened}
        gara={item?.order?.garage?.name}
        name={item?.product?.name}
      /> */}
    </div>
  )
}

export default BoxHistory
