import { Box, Grid, Image, Loader, Text } from '@mantine/core'
import { IconHeart, IconHeartFilled } from '@tabler/icons-react'
import { formatSchedulesNew, renderFullAddress } from '@/utils'
import { useEffect, useState } from 'react'

import Overview from '../component/overview'
import RenderIcon from '../component/renderIcon'
import { getFileUrl } from '@/utils/images'
import { union, unionBy } from 'lodash'

function HeaderGarage({
  initCategory,
  initOverview,
  data,
  dataOverview,
  userLikedGarage,
  handleLikedGarage,
  loading,
  handleViewRating,
  opened
}: any) {
  const [listIcon, setListIcon] = useState<any>([])
  const workingDataNew = formatSchedulesNew(data?.description?.times)
  const scheduleArray = workingDataNew.split('\n')
  useEffect(() => {
    const dataFilter = data?.information?.service?.filter(
      (item: any) =>
        item !== 'DICH_VU' &&
        item !== 'BAO_DUONG_SUA_CHUA' &&
        item !== 'SAN_PHAM'
    )
    setListIcon(dataFilter)
  }, [data])

  console.log('initOverview:::', data)

  return (
    <div className="w-full h-[100vh-90px]">
      <div>
        {data?.cover_image ? (
          <Image
            src={getFileUrl(data?.cover_image)}
            alt={'alt'}
            className="w-full h-80"
            fit="cover"
          />
        ) : (
          <img src="/box/Banner-garage.png" className="w-full h-full" />
          // <img src="/box/banner_ads.png" className="w-full h-full" />
        )}
      </div>

      <Box className="grid md:grid-cols-11 grid-cols-1 gap-x-5 w-full max-w-main h-full bg-white md:pt-10 pt-5 mx-auto px-3 md:px-6 ">
        <div className="col-span-4 flex flex-col justify-center w-full h-full md:h-[360px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 gap-x-8">
            {initOverview?.map((item: any, index: any) => (
              <div key={index}>
                <Overview
                  icon={item.icon}
                  content={item.content}
                  value={
                    item.icon === 'heart'
                      ? dataOverview.likedCount
                      : item.icon === 'cart'
                        ? dataOverview.soldCount
                        : item.icon === 'star'
                          ? (+dataOverview?.rating ?? 5).toFixed(2)
                          : dataOverview.startYear
                  }
                  // handleViewRating={(e) => handleViewRating(e)}
                  handleViewRating={handleViewRating}
                  opened={opened}
                />
              </div>
            ))}
          </div>
          <div className="pt-4 grid grid-cols-1 text-main">
            <div>
              <div className="flex md:gap-x-2 gap-x-2 pb-2 items-start flex-wrap">
                <div className="flex items-center min-w-[60px] gap-x-2">
                  <img
                    className="w-6 h-6 gap-x-1 object-cover filter-image"
                    src={'/svg/location.svg'}
                  />
                  <Text className="text-sm md:text-base font-normal text-center flex gap-x-2 items-center whitespace-nowrap">
                    Địa chỉ:
                  </Text>
                </div>
                <Text className="text-sm md:text-base font-normal text-left line-clamp-2">
                  {(data?.information?.address
                    ? data?.information?.address
                    : '') +
                    ' ' +
                    renderFullAddress(
                      data?.information?.ward,
                      data?.information?.district,
                      data?.information?.province
                    )}
                </Text>
              </div>
            </div>
            <div className="pt-2">
              <div className="flex gap-x-2 items-start flex-wrap">
                <div className="flex gap-x-1 items-center min-w-[60px]">
                  <img
                    className="w-6 h-6 object-cover filter-image"
                    src={'/svg/clock.svg'}
                  />
                  <Text className="text-sm md:text-base font-normal text-center flex gap-x-2 items-center whitespace-nowrap">
                    Thời gian làm việc:
                  </Text>
                </div>
                <Text className="text-sm md:text-base font-medium text-left">
                  {scheduleArray.map((line, idx) => (
                    <Text
                      key={idx}
                      className="text-sm md:text-base text-left flex"
                    >
                      {line ?? '--'}
                    </Text>
                  ))}
                </Text>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 flex flex-col w-full px-2 md:h-[300px] border-t-1 border-b-1 my-4 md:border-0 md:my-0">
          <div className="flex flex-col h-full py-4 justify-between items-center gap-y-2">
            <div className="flex bg-gradient-to-r from-[#52BAE6] via-[#67F2D1] to-[#51C2A7] rounded-full bg-opacity-5">
              <img
                src={
                  data?.avatar
                    ? getFileUrl(data?.avatar)
                    : '/box/ficar-image.png'
                }
                className="rounded-full h-28 md:h-32 aspect-square p-2 object-cover"
              />
            </div>
            {data?.information?.tag && (
              <div>
                <Text className="text-white font-medium bg-[#F1B44C] md:rounded-xl rounded md:px-4 md:py-2 px-2 py-1 text-sm md:text-base">
                  {data?.information?.tag}
                </Text>
              </div>
            )}
            <Text className="font-medium md:text-2xl text-xl">
              {data?.name}
            </Text>
            <div
              className="border md:py-2 md:px-4 py-1 px-2 md:text-base text-sm rounded-md border-[#EB5757] cursor-pointer"
              onClick={!loading ? handleLikedGarage : ''}
            >
              {loading ? (
                <div className="w-36 flex justify-center items-center h-6">
                  <Loader size={22} />
                </div>
              ) : userLikedGarage ? (
                <Text className="flex justify-center text-center  text-[#EB5757] gap-2 w-36">
                  <IconHeartFilled /> Đã yêu thích
                </Text>
              ) : (
                <Text className="flex justify-center text-center text-[#EB5757] gap-2 w-36">
                  <IconHeart /> Yêu thích
                </Text>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-4 flex justify-center items-center w-full px-10 h-full md:h-[300px]">
          <Grid className=" w-full">
            {union(listIcon)?.map((item: any) => (
              <Grid.Col span={{ base: 2, lg: 2, sm: 3, md: 3 }}>
                <RenderIcon type={item} />
              </Grid.Col>
            ))}
          </Grid>
        </div>
      </Box>
    </div>
  )
}

export default HeaderGarage
