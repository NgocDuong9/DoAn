'use client'

import {
  Box,
  Button,
  Collapse,
  Divider,
  Image,
  Modal,
  Pagination,
  Rating,
  Text
} from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react'
import { Fragment, useEffect, useMemo, useState } from 'react'
import EvaluateUser from '../component/evaluate-user'
import CorePagination from '@/components/custom/pagination/CorePagination'
import { getReviewProductAdmin } from '@/apis/client/review'
import CircleProgress, { getRatingProgess } from './CircleProgess'
import { usePagination } from '@/hooks/usePagination'

interface EvaluateProps {
  type: string
  id: string
}

function Evaluate({ type, id }: EvaluateProps) {
  const [opened, { toggle }] = useDisclosure(false)
  const [reviews, setReviews] = useState<any>()
  const [medium, setMedium] = useState<any>()
  const [count, setCount] = useState<number>(1)
  const pagination = usePagination({
    defaultPageSize: 5
  })

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getReviewProductAdmin(id, pagination.pageSetting)
        setReviews(data)
        setCount(data?.total ?? 1)

        const newMedium = data?.data?.map(item => {
          return item?.detail
        })
        setMedium(newMedium)
      } catch (error) {}
    }
    getData()
  }, [pagination.pageSetting])

  const isMobile = useMediaQuery('(max-width: 768px)')

  const average = useMemo(() => {
    if (type === 'DICH_VU') {
      return {
        noise: 5,
        smoothness: 5,
        reliability: 5
      }
    }
    if (!medium || medium.length === 0) {
      return { noise: 0, smoothness: 0, reliability: 0 }
    }

    const total = medium.reduce(
      (acc: any, obj: any) => {
        acc.noise += obj.noise
        acc.smoothness += obj.smoothness
        acc.reliability += obj.reliability
        return acc
      },
      { noise: 0, smoothness: 0, reliability: 0 }
    )

    return {
      noise: total.noise / medium.length,
      smoothness: total.smoothness / medium.length,
      reliability: total.reliability / medium.length
    }
  }, [medium])

  return (
    <Box className="md:px-4 py-4">
      {type !== 'DICH_VU' && (
        <Box className="flex flex-wrap gap-8 justify-center md:min-h-[140px]">
          <Box className="flex flex-col items-center ">
            {/* <Image src="/svg/circle.svg" className="md:w-[141px] w-[70px]" /> */}
            <CircleProgress
              size={isMobile ? 100 : 140}
              progress={getRatingProgess(average.smoothness)}
            />
            <Box className="md:-mt-[70px] -mt-[38px]">
              <Text className="font-bold md:text-[32px] text-[16px] mb-1">
                {(average.smoothness * 2).toFixed(1)}
              </Text>
              <Text className="font-medium md:text-[16px] text-[10px]">
                Độ êm
              </Text>
            </Box>
          </Box>

          <Box className="flex flex-col items-center ">
            <CircleProgress
              size={isMobile ? 100 : 140}
              progress={getRatingProgess(average.noise)}
            />

            <Box className="md:-mt-[70px] -mt-[38px]">
              <Text className="font-bold md:text-[32px] text-[16px] mb-1">
                {(average.noise * 2).toFixed(1)}
              </Text>
              <Text className="font-medium md:text-[16px] text-[10px]">
                Độ ồn
              </Text>
            </Box>
          </Box>
          <Box className="flex flex-col items-center ">
            <CircleProgress
              size={isMobile ? 100 : 140}
              progress={getRatingProgess(average.reliability)}
            />

            <Box className="md:-mt-[70px] -mt-[38px]">
              <Text className="font-bold md:text-[32px] text-[16px] mb-1">
                {(average.reliability * 2).toFixed(1)}
              </Text>
              <Text className="font-medium md:text-[16px] text-[10px]">
                Độ bền
              </Text>
            </Box>
          </Box>
        </Box>
      )}
      <Box
        className="flex flex-wrap justify-between cursor-pointer items-center my-7 py-3 px-6 bg-[#F8F8F8] w-full rounded-lg"
        onClick={toggle}
      >
        <Text className="font-semibold md:text-lg">Đánh giá đã mua</Text>
        <Box className="flex gap-2 items-center">
          {/* <Rating fractions={4} value={rate} readOnly />
          <Text className="font-semibold text-xs">{reviews?.total ?? 0}</Text>
          <Text className="text-xs text-[#E2E2E2]">|</Text>
          <Text className="text-xs ">{reviews?.total ?? 0} đánh giá</Text>
          <Text className="text-xs text-[#E2E2E2]">|</Text>
          <Text className="text-xs">Đã bán: {reviews?.total ?? 0}</Text> */}
          <Text>
            {opened ? (
              <IconChevronDown size={'14px'} />
            ) : (
              <IconChevronRight size={'14px'} />
            )}
          </Text>
        </Box>
        {/* <Box className="flex gap-2">
          <Select
            placeholder="Lọc theo sao"
            data={["Tất cả sao", "5 sao", "4 sao", "3 sao", "2 sao", "1 sao"]}
            clearable
            w={"150px"}
          />
          <Select
            placeholder="Lọc theo đánh giá"
            data={["Đánh giá từ thấp đến cao", "Đánh giá từ cao đến thấp"]}
            clearable
            // w={"150px"}
          />
        </Box> */}
      </Box>
      <Collapse in={opened} pt={12}>
        <Box className="px-4">
          <Box className="flex flex-col gap-2">
            {reviews?.data?.map((item: any, idx: number) => {
              return (
                <Fragment key={idx}>
                  <EvaluateUser data={item} />
                  <Divider />
                </Fragment>
              )
            })}
            {/* <EvaluateUser /> */}
          </Box>
          {reviews?.data?.length > 0 && (
            <Box className="py-4 flex justify-center">
              <CorePagination
                onChange={(page: number, size: number) => {
                  // setPage(page)
                  pagination.handleChangePage(page)
                }}
                pageSize={pagination.pageSetting.pageSize}
                activePage={pagination.pageSetting.page}
                total={count}
                // reset={reset}
              />
            </Box>
          )}
        </Box>
      </Collapse>
    </Box>
  )
}

export default Evaluate
