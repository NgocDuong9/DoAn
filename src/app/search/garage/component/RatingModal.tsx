import { Box, Loader, Modal, Rating, Text } from '@mantine/core'
import { IconChevronDown, IconChevronRight, IconX } from '@tabler/icons-react'

import CorePagination from '@/components/custom/pagination/CorePagination'
import EvaluateUser from './evaluate-user'

interface Props {
  opened: boolean
  close: () => void
  gara?: string
  name?: string
  data?: any
  rateCount?: number | undefined
  rating?: any
  productSold?: any
  pageR?: any
  pageSizeR?: any
  setPageR?: (e: any) => void
  setPageSizeR?: (e: any) => void
  loading?: boolean
}
const RatingModal = ({
  opened,
  close,
  data,
  rateCount,
  rating,
  productSold,
  pageR,
  pageSizeR,
  setPageR,
  setPageSizeR,
  loading = false
}: Props) => {
  return (
    <>
      <Modal
        style={{
          boxShadow: '-24px 21px 40px 0px rgba(0, 0, 0, 0.10)',
          borderRadius: '10px'
        }}
        withCloseButton={false}
        opened={opened}
        onClose={close}
        radius={20}
        size={600}
        centered
        className="hidden lg:block"
      >
        <Box className="flex items-center justify-between">
          <Text className="text-xl py-4">Đánh giá cửa hàng</Text>
          <Box
            onClick={close}
            className="rounded-full p-2 bg-[#F8F8F8] cursor-pointer"
          >
            <IconX />
          </Box>
        </Box>
        <Box className="flex gap-2 items-center p-4 mb-10 rounded-md bg-[#F8F8F8]">
          <Rating fractions={4} value={rating} readOnly />
          <Text className="font-semibold text-xs">{''}</Text>
          <Text className="text-xs">|</Text>
          <Text className="text-xs">{rateCount} đánh giá</Text>
          <Text className="text-xs">|</Text>
          <Text className="text-xs">
            Đã bán: {productSold ? productSold : 0}
          </Text>
          <Text>
            {opened ? (
              <IconChevronDown size={'14px'} />
            ) : (
              <IconChevronRight size={'14px'} />
            )}
          </Text>
        </Box>
        {loading ? (
          <div className="flex w-full justify-center items-center h-96">
            <Loader />
          </div>
        ) : rateCount === 0 ? (
          <div className="flex w-full justify-center items-center p-20">
            Cửa hàng chưa có đánh giá
          </div>
        ) : (
          data?.map((item: any, idx: number) => (
            <div className={`${idx} border-b-1 p-2`}>
              <EvaluateUser data={item} />
            </div>
          ))
        )}
        <div className="flex justify-center">
          {loading ? (
            <div className="flex w-full justify-center items-center">
              {/* <Loader /> */}
            </div>
          ) : rateCount === 0 ? (
            <div className="flex w-full justify-center items-center">
              {/* <NotFound /> */}
            </div>
          ) : (
            <CorePagination
              onChange={(page: number, size: number) => {
                // handleChangeFilterAndUpdateToUrl({
                //   ...filters,
                //   page: page,
                // });
                // setReset(false);
                //@ts-ignore
                setPageR(page)
              }}
              pageSize={pageSizeR ? Number(pageSizeR) : 9}
              activePage={pageR ? Number(pageR) : 1}
              total={rateCount ? rateCount : 0}
              // reset={reset}
            />
          )}
        </div>
      </Modal>
    </>
  )
}

export default RatingModal
