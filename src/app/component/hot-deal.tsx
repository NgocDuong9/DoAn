'use client'
import {
  type HotDealGroup,
  type ResultHotDeal,
  selectHotDeal
} from '@/apis/client/hotdeal'
import use from '@/hooks/use'
import { formatPrice } from '@/utils/formatPrice'
import { getFileUrl } from '@/utils/images'
import { Box, Flex, Stack, Text } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import classes from './hot-deal.module.css'
import { chunk } from 'lodash'
import { useAuth } from '@/components/context/auth.context'
import { getUserId } from '@/apis/managecar'
import { getDataProductReviewUser } from '@/apis/client/order'
import ModalEvalute from '@/components/custom/modal/modal-evalute'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

const HotDeal = () => {
  const isShowBackgroundHotDeal = useMediaQuery('(max-width: 1280px)')
  // const {
  //   fetchCallback: getListHotDeal,
  //   data: hotdeals,
  //   loading
  // } = use<ResultHotDeal<HotDealGroup>>(selectHotDeal)
  const [page, setPage] = useState(0)
  const [open, { open: openModal, close: closeModal }] = useDisclosure(false)
  const [hotDeals, setHotDeals] = useState([])
  const [swiper, setSwiper] = useState<any>(null)

  useEffect(() => {
    selectHotDeal().then(res => {
      setHotDeals(res?.data ?? [])
    })
  }, [])

  const [reviewData, setReviewData] = useState<any>()
  const { userId } = useAuth()

  const getReview = async () => {
    if (!userId) return
    try {
      const data = await getDataProductReviewUser({ userId: userId })

      if (data?.count) {
        openModal()
      }
      setReviewData(data)
    } catch (error) {}
  }

  useEffect(() => {
    getReview()
  }, [userId])

  // useLayoutEffect(() => {
  //   getListHotDeal()
  // }, [])

  // const desc = useMemo(
  //   () => hotdeals?.data?.description,
  //   [hotdeals?.data?.description]
  // )

  const hotDealsChunk = chunk(hotDeals, 2)

  return (
    <div className="bg-[#020710] py-3 px-3 md:px-8 md:py-8">
      <ModalEvalute
        opened={open}
        close={() => {
          closeModal()
        }}
        data={reviewData?.data}
      />
      <div
        className="mx-auto px-4 py-4 md:px-10 md:py-10 rounded-3xl md:rounded-[48px] max-w-main w-full"
        style={{
          ...(!isShowBackgroundHotDeal
            ? {
                backgroundImage: 'url(./background/hotdeal.png)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain'
              }
            : {
                background: '#252628'
              })
        }}
      >
        <div className="relative h-fit ">
          <div className="h-fit flex flex-col">
            <div className="flex justify-between items-center flex-wrap">
              <div className="text-white text-2xl font-bold">
                Sản phẩm, Dịch vụ nổi bật
              </div>
              <div className="flex items-center gap-x-4 relative mt-5 lg:mt-0">
                <div className="max-w-[460px] text-white text-sm md:text-base">
                  {/* @ts-ignore */}
                  {hotDeals?.[0]?.description}
                </div>

                <div className="justify-center gap-x-3 hidden md:flex">
                  {Array.from({ length: hotDealsChunk.length }).map((_, i) => (
                    <Box
                      key={i}
                      aria-checked={page === i}
                      className={classes.pagination_card}
                      onClick={() => {
                        swiper.slideTo(i * 2)
                      }}
                    >
                      &nbsp;
                    </Box>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Swiper
            onSwiper={setSwiper}
            pagination={true}
            modules={[Pagination]}
            onPaginationUpdate={swipperEl => {
              const activeIndex = swipperEl.activeIndex
              if (activeIndex % 2 === 0) {
                setPage(activeIndex / 2)
              }
            }}
            className="mySwiper text-white md:mt-20 mt-10"
            spaceBetween={24}
            breakpoints={{
              0: {
                slidesPerView: 1
              },
              768: {
                slidesPerView: 2
              }
            }}
          >
            {hotDeals.map((item: any, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="h-full">
                    <Flex justify="space-between" align="baseline">
                      <div className="text-xl md:text-2xl text-white font-bold mb-5">
                        {item?.product?.name.split('|')[0]}
                      </div>

                      <Flex justify="flex-end" align="center" columnGap={10}>
                        <div className="text-sm md:text-base text-white font-normal">
                          {formatPrice(item?.product?.price ?? 0)}
                        </div>
                      </Flex>
                    </Flex>

                    <Link
                      href={`/detail/${item?.product?.slug}?product_id=${item.product_id}&garage_id=${item?.garage_id}`}
                    >
                      <img
                        src={getFileUrl(item?.image)}
                        alt=""
                        className="w-full object-cover h-[380px] rounded-3xl"
                      />
                    </Link>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
    </div>
  )
}
export default HotDeal
