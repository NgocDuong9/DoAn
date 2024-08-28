import { formatSchedulesNew } from '@/utils'
import { getFileUrl } from '@/utils/images'
import { Box, Rating, Text } from '@mantine/core'

import { IconPercentage } from '@tabler/icons-react'
import { Fragment, useMemo } from 'react'
interface TagProps {
  url?: string
  type?: string
  title: string
  price: string
  rate: number
  countRate: number
  sold: number
  onClick?: () => void
  address?: string | null
  workingTime?: any
  breakTime?: any
  tag?: string
  services?: any
}

const treeData = [
  // { title: 'Sản phẩm', key: 'SAN_PHAM' },
  { title: 'Lốp', key: 'LOP' },
  { title: 'Ắc quy', key: 'AC_QUY' },
  // { title: 'Dịch vụ', key: 'DICH_VU' },
  { title: 'Bảo dưỡng', key: 'BAO_DUONG' },
  { title: 'Điều hòa', key: 'DIEU_HOA' },
  { title: 'Thân vỏ', key: 'THAN_VO' },
  { title: 'Máy', key: 'MAY' },
  { title: 'Điện', key: 'DIEN' },
  { title: 'Gầm', key: 'GAM' },
  { title: 'Cứu hộ', key: 'CUU_HO' },
  { title: 'Bảo dưỡng sửa chữa khác', key: 'BAO_DUONG_SUA_CHUA_KHAC' }
]

function TagLikes({
  url,
  title,
  rate,
  countRate,
  address,
  onClick,
  workingTime,
  tag,
  services
}: TagProps) {
  const filteredItems = treeData.filter(item => services?.includes(item.key))
  const workingDataNew = formatSchedulesNew(workingTime)
  const scheduleArray = workingDataNew.split('\n')

  const timeCustums = useMemo(() => {
    const test = scheduleArray?.[0]?.split('|')
    if (test.length === 1) {
      return <Text className="text-[14px] text-left flex">{test[0]}</Text>
    }
    return (
      <>
        <Text className="text-[14px] text-left flex">
          {test[0]}
          <span className="text-[#E2E2E2]"> | </span> {test[1]}
        </Text>
      </>
    )
  }, [scheduleArray])

  return (
    <div
      className="bg-white rounded-xl h-full w-full cursor-pointer py-4 md:py-6 pr-2 md:pr-0 flex flex-col justify-between"
      style={{
        boxShadow: '0px 4px 30px 0px rgba(0, 0, 0, 0.05)'
      }}
    >
      <div className="px-2 md:px-4" onClick={onClick}>
        <img
          className="aspect-square w-[80px] h-[80px] object-cover rounded-full mx-auto md:mb-2"
          src={getFileUrl(url) ?? url}
        />
        <div className="flex flex-col justify-between w-full">
          <Text className="text-lg font-medium line-clamp-1 text-center">
            {title ? title : 'Garage'}
          </Text>
          {/* <div className="mx-auto">
            <Text
              className={`text-white font-medium  rounded-xl px-2 py-1 text-sm md:px-4 md:py-2 md:text-base ${
                tag ? 'bg-[#F1B44C]' : 'bg-white h-10'
              }`}
            >
              {tag ? tag : ''}
            </Text>
          </div> */}

          {tag && (
            <div
              className={`text-white absolute font-medium px-2 py-1 text-sm md:px-4 md:py-1 md:text-sm w-fit top-0 right-0 rounded-tr-xl  rounded-bl-xl ${
                tag ? 'bg-[#F1B44C]' : 'bg-white'
              }`}
            >
              {tag ? tag : 'tag'}
            </div>
          )}

          <div className="flex flex-row items-center gap-2  justify-center mt-2">
            <div className="flex gap-x-2 items-center">
              <Rating
                value={rate ?? 5}
                fractions={5}
                readOnly
                size={'16px'}
                color="yellow"
              />
              <Text className="text-[14px]">{rate ? rate : 5.0}</Text>
            </div>
            <Text className="text-[14px]">
              <span className="text-[#E2E2E2]">|</span> Đánh giá:{' '}
              {countRate ? countRate : 0}
            </Text>
          </div>

          <div className="md:px-2 flex flex-col md:gap-y-2 gap-y-1">
            <div className="flex gap-2 w-full items-center mt-2">
              <div className="flex items-start gap-2">
                <img
                  className="md:w-6 md:h-6 w-4 h-4 object-cover"
                  src={'/svg/icon_position.svg'}
                />

                <Text className="text-[14px] text-center md:text-start line-clamp-3">
                  {address ? address : '--'}
                </Text>
              </div>
            </div>

            <div className="flex justify-start gap-x-2 items-start">
              <img
                className="md:w-6 md:h-6 w-4 h-4 object-cover mt-1"
                src={'/svg/icon_clock.svg'}
              />

              <div>
                {scheduleArray.map((line, idx) => (
                  <Fragment key={idx}>
                    {idx === 0 ? (
                      timeCustums
                    ) : (
                      <Text key={idx} className="text-[14px] text-left flex">
                        {line ?? '--'}
                      </Text>
                    )}
                  </Fragment>
                ))}
              </div>
            </div>
            {filteredItems.length > 0 && (
              <div className="flex justify-start items-start gap-x-2">
                <div className="flex items-center gap-2">
                  <img
                    className="md:w-6 md:h-6 w-4 h-4 object-cover mt-0.5"
                    src={'/svg/icon_note.svg'}
                  />
                  {/* <p className="text-[14px] ">Chuyên môn: </p> */}
                </div>

                <div className="flex-1 mt-1">
                  {/* {filteredItems.map(item => (
                    <Box key={item.key}>
                      <Text className="text-[14px] font-medium">
                        {item.title}
                      </Text>
                    </Box>
                  ))} */}
                  <div className="text-sm">
                    {filteredItems?.map(item => item.title)?.join(', ')}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <div className="flex  justify-center items-center bg-[#56C3E31A] py-3 px-1 rounded-md mx-2 cursor-pointer mt-4 md:text-base text-xs">
        <Box className="font-medium flex gap-2">
          <div className="rounded-full bg-gradient-to-r from-[#258DBA] via-[#26D3E0] to-[#8BF6C8] bg-opacity-50 font-medium aspect-square">
            <IconPercentage color="white" />
          </div>
          Giảm 50% chỉnh lái
        </Box>
      </div> */}
    </div>
  )
}

export default TagLikes
