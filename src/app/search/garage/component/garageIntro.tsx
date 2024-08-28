import { Box, Grid, Text } from '@mantine/core'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'

import ImageSlide from './ImageSlide'
import RenderIcon from './renderIcon'

function GarageIntro({ data }: any) {
  return (
    <div className="flex bg-[#1B1B1B] w-full justify-center min-h-[600px]">
      <div className="flex flex-col md:flex-row w-full py-5 md:py-10 max-w-main px-10 md:px-12">
        <div className="w-full md:w-3/5 md:pr-10 text-white">
          <Text className="text-white text-2xl md:text-3xl font-medium md:mb-4 mb-2">
            Giới thiệu gara
          </Text>
          <div className="flex flex-col gap-y-2 mb-5">
            {data?.description?.description && (
              <p className="text-white mb-5">
                {data?.description?.description}
              </p>
            )}
            <div>
              Năng lực phục vụ:{' '}
              {data?.description?.acreage ?? 'Chưa có dữ liệu'}
            </div>
            <div>
              Số lượng nhân viên: {data?.description?.size ?? 'Chưa có dữ liệu'}
            </div>

            <div className="">
              {/* {data?.payment?.card && (
                  <div>
                    <Text className="text-base text-white">
                      &#8226; ATM/Thẻ quốc tế
                    </Text>
                    <Text className="text-sm text-white text-opacity-80">
                      Miễn phí dịch vụ thanh toán thẻ đối với giao dịch trên
                      1.000.000đ
                    </Text>
                  </div>
                )}
                {data?.payment?.['elect-wallet']?.length > 0 && (
                  <div>
                    <Text className="text-base text-white pt-2">
                      &#8226; Ví điện tử
                    </Text>
                    <Box className="pt-2 flex gap-x-2 justify-start items-center">
                      {data?.payment?.['elect-wallet'].map((item: any) => (
                        <RenderIcon type={item} label={item} />
                      ))}
                    </Box>
                  </div>
                )} */}

              {!data?.payment?.card &&
              (data?.payment?.['elect-wallet']?.length === 0 ||
                !data?.payment?.['elect-wallet']) ? (
                <div>
                  Gara chấp nhận các hình thức thanh toán ngoại trừ thẻ tín
                  dụng/thẻ ghi nợ
                </div>
              ) : (
                <div className="flex gap-x-2 items-center">
                  <div>Gara chấp nhận thanh toán thẻ tín dụng/ghi nợ</div>

                  <div className="flex gap-x-1">
                    <img src="/svg/visa.svg" alt="" className="h-[25px]" />
                    <img
                      src="/svg/master-card.svg"
                      alt=""
                      className="h-[25px]"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex relative w-ful md:px-0 md:w-2/5 h-full">
          {data?.description?.imagesGarage?.length > 0 ? (
            <ImageSlide data={data?.description?.imagesGarage} />
          ) : (
            <div>
              <img
                src="/box/car-banner.png"
                className="w-full h-full rounded-[20px]"
              />

              <div
                className="flex absolute bottom-10 left-[50%] gap-x-2"
                style={{
                  transform: 'translateX(-50%)'
                }}
              >
                <Box className="h-10 w-10 bg-white flex justify-center items-center rounded-full">
                  <IconChevronLeft />
                </Box>
                <Box className="h-10 w-10 bg-white flex justify-center items-center   rounded-full">
                  <IconChevronRight />
                </Box>
              </div>
            </div>
          )}
        </div>
        {/* <div className="w-full md:w-1/3 h-full pt-10 md:pt-0 md:pl-10">
          <Box className="flex flex-col justify-between border w-full h-full border-white bg-gradient-to-r from-[#767676] to-[#121212] bg-opacity-40 rounded-[20px] p-6 gap-y-2 md:gap-y-0">
            <div>
              <div className="flex gap-4 items-center">
                <div className="w-4 h-[5px] bg-gradient-to-r from-[#52BAE6] via-[#67F2D1] to-[#51C2A7] rounded-full "></div>
                <Text className="text-sm md:text-base text-white">
                  Trang thiết bị gara
                </Text>
              </div>
              <div className="md:pt-2 pl-10">
                <Text className="line-clamp-3 text-white">
                  {data?.description?.device
                    ? data?.description?.device
                    : 'Chưa có mô tả'}
                </Text>
              </div>
            </div>
            <div>
              <div className="flex gap-4 items-center">
                <div className="w-4 h-[5px] bg-gradient-to-r from-[#52BAE6] via-[#67F2D1] to-[#51C2A7] rounded-full "></div>
                <Text className="text-sm md:text-base text-white">
                  Diện tích gara
                </Text>
              </div>
              <Text className="text-xl md:text-2xl text-white pl-8">
                {data?.description?.acreage}m2
              </Text>
            </div>
            <div>
              <div className="flex gap-4 items-center">
                <div className="w-4 h-[5px] bg-gradient-to-r from-[#52BAE6] via-[#67F2D1] to-[#51C2A7] rounded-full "></div>

                <Text className="text-sm md:text-base text-white">
                  Số lượng nhân viên
                </Text>
              </div>
              <Text className="text-xl md:text-2xl text-white pl-8">
                {data?.description?.size}
              </Text>
            </div>
            <div>
              <div className="flex gap-4 items-center">
                <div className="w-5 h-[5px] bg-gradient-to-r from-[#52BAE6] via-[#67F2D1] to-[#51C2A7] rounded-full "></div>
                <Text className="text-sm md:text-base text-white">
                  Gara chấp nhận các hình thức thanh toán
                </Text>
              </div>
              <div className="pl-8">
                {data?.payment?.card && (
                  <div>
                    <Text className="text-base text-white">
                      &#8226; ATM/Thẻ quốc tế
                    </Text>
                    <Text className="text-sm text-white text-opacity-50">
                      Miễn phí dịch vụ thanh toán thẻ đối với giao dịch trên
                      1.000.000đ
                    </Text>
                  </div>
                )}
                {data?.payment?.['elect-wallet']?.length > 0 && (
                  <div>
                    <Text className="text-base text-white pt-2">
                      &#8226; Ví điện tử
                    </Text>
                    <Box className="pt-2 flex gap-x-2 justify-start items-center">
                      {data?.payment?.['elect-wallet'].map((item: any) => (
                        <RenderIcon type={item} label={item} />
                      ))}
                    </Box>
                  </div>
                )}
              </div>
            </div>
          </Box>
        </div> */}
      </div>
    </div>
  )
}

export default GarageIntro
