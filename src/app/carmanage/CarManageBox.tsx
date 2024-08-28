'use client'

import { Box, Button, Flex, Image, Loader, Text } from '@mantine/core'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'

import { ProductType } from '@/apis/client/interface'
import { getCarUser } from '@/apis/managecar'
import { useAiChatContext } from '@/components/context/ai.chat.context'
import { getFileUrl, onErrorHandlerCar } from '@/utils/images'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import Joyride, { CallBackProps, STATUS } from 'react-joyride'
import BoxCar from './component/BoxCar'
import BoxTime from './component/BoxTime'
import Describe from './component/Describe'
import ModalCreate from './modal/modal-create'

export interface Car {
  auth_id: string | null
  carType_id: string | null
  color: string
  created_at: string | null
  detail: any
  id: string
  license_plate: string
  name: string
  type: string
  updated_at: string | null
  user_id: string | null
  carType: any | null
}
;[]

export interface InfoCar {
  auth_id: string | null
  brand_id: string | null
  created_at: string
  id: string
  image: string | null
  key: string | null
  name: string
  updated_at: string
}

const listIcons = [
  {
    img: '/svg/bg1.svg',
    type: ProductType.DO_XE
  },
  {
    img: '/svg/bg2.svg',
    type: ProductType.CUU_HO
  },
  {
    img: '/icons/banhxe.png',
    type: ProductType.LOP
  },
  {
    img: '/svg/bg4.svg',
    type: ProductType.AC_QUY
  },
  {
    img: '/svg/bg5.svg',
    type: ProductType.PHU_TUNG
  }
]

const steps = [
  {
    target: '[data-tour="step-1"]',
    content: 'Xem thời hạn bảo dưỡng, đăng kiểm, bảo hiểm.',
    disableBeacon: true
  },
  {
    target: '[data-tour="step-2"]',
    content: 'Xem thời gian bảo hành và thêm mới bảo hành.',
    disableBeacon: true
  },
  {
    target: '[data-tour="step-3"]',
    content: 'Xem chi tiết xe, chỉnh sửa thông tin xe và thêm xe mới.',
    disableBeacon: true
  },
  {
    target: '[data-tour="step-4"]',
    content:
      'Hãy để Trolyoto AI của chúng tôi giải đáp mọi thắc mắc về xe của bạn.',
    disableBeacon: true
  }
]

const CarManageBox = ({
  run,
  setRun
}: {
  run: boolean
  setRun: Dispatch<SetStateAction<boolean>>
}) => {
  const [opened, { open, close }] = useDisclosure(false)
  const [loading, setLoading] = useState(true)
  const [select, setSelect] = useState(0)
  const [carUser, setCarUser] = useState<Car[]>([])
  const [infoCar, setInfoCar] = useState<InfoCar[]>([])
  const [perPage, setPerPage] = useState(0)
  const [totalItems, setTotalItems] = useState(3)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const { handleToggleChatModel } = useAiChatContext()

  const refreshData = async () => {
    setLoading(true)
    try {
      const { data, carType } = await getCarUser()
      if (data) setCarUser(data)
      if (carType) setInfoCar(carType)
    } catch (error) {
      console.error('Failed to fetch car data', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // call 1
    refreshData()
  }, [])

  useEffect(() => {
    if (isMobile) {
      setTotalItems(1)
    } else {
      setPerPage(0)
      setTotalItems(3)
    }
  }, [isMobile])

  const groupedCarUser = useMemo(() => {
    if (!carUser) return []
    const groupedArr = []
    for (let i = 0; i < carUser.length; i += totalItems) {
      groupedArr.push(carUser.slice(i, i + totalItems))
    }
    return groupedArr
  }, [carUser, totalItems])

  const handleClick = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index)
  }

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data

    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED]

    if (finishedStatuses.includes(status)) {
      setRun(false)
    }
  }

  const info = useMemo(() => {
    return infoCar.find(
      item => item.name === groupedCarUser[perPage][select]?.name
    )
  }, [groupedCarUser?.[perPage]?.[select]])

  return (
    <Box>
      <Joyride
        steps={steps}
        run={run}
        continuous={true}
        // scrollToFirstStep={true}
        showProgress={true}
        hideCloseButton
        showSkipButton={true}
        callback={handleJoyrideCallback}
        styles={{
          options: {
            zIndex: 10000
          },
          buttonNext: {
            color: 'white',
            background:
              'var(--Gradient, linear-gradient(91deg, #258DBA 1.26%, #26D3E0 66.99%, #8BF6C8 126.97%))',
            borderRadius: '4px'
          },
          buttonBack: {
            color: '#24CCD9',
            border: '1px #24CCD9 solid',
            borderRadius: '4px'
          }
        }}
        locale={{
          next: 'Tiếp theo',
          last: 'Hoàn thành',
          skip: 'Bỏ qua',
          close: 'Đóng',
          back: 'Quay lại'
        }}
      />
      <>
        {loading ? (
          <Box pos="relative" mih={'100vh'}>
            <>
              <Box
                w={'100%'}
                style={{
                  backgroundImage: 'url(/box/backgroundManage.png)',
                  backgroundColor: 'black',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  height: '100vh',
                  overflow: 'hidden',
                  paddingTop: '90px'
                }}
                // className="hidden lg:block"
              >
                <Box
                  style={{
                    backgroundImage: 'url(/box/carManagebg.png)',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    // width: "70%",
                    overflow: 'hidden'
                  }}
                  className="m-auto mt-[5%] h-[70%] md:w-[70%]"
                >
                  <Flex
                    className="rounded-[20px] h-[75%] md:w-[80%] w-[90%] mx-auto mt-[8%] flex-col justify-center items-center cursor-pointer gap-[25px] bg-[rgba(255, 255, 255, 0.05)] border border-dashed backdrop-blur-[18px] "
                    onClick={open}
                  >
                    <Loader color="blue" />
                    <div className="text-white">Đang tải...</div>
                  </Flex>
                </Box>
              </Box>
            </>
          </Box>
        ) : !carUser?.length ? (
          <>
            <Box
              w={'100%'}
              style={{
                backgroundImage: 'url(/box/backgroundManage.png)',
                backgroundColor: 'black',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
                overflow: 'hidden',
                paddingTop: '90px'
              }}
              className="hidden lg:block"
            >
              <Box
                style={{
                  backgroundImage: 'url(/box/carManagebg.png)',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  width: '70%',
                  overflow: 'hidden'
                }}
                className="m-auto mt-[5%]  h-[70%]"
              >
                <Flex
                  className="rounded-[20px] h-[75%] w-[80%] mx-auto mt-[8%] flex-col justify-center items-center cursor-pointer gap-[25px] bg-[rgba(255, 255, 255, 0.05)] border border-dashed backdrop-blur-[18px] "
                  onClick={open}
                >
                  <Box>
                    <Image src={'/svg/plus.svg'} w={70} h={70} />
                  </Box>
                  <Text
                    w={478}
                    className="text-white text-2xl text-center font-semibold"
                  >
                    Tạo hồ sơ xe để quản lý chi phí xe và kiểm soát sức khỏe xe
                  </Text>
                </Flex>
              </Box>
            </Box>
            <Box
              w={'100%'}
              style={{
                backgroundImage: 'url(/box/backgroundManage.png)',
                backgroundColor: 'black',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
                overflow: 'hidden',
                paddingTop: '90px'
              }}
              className="relative lg:hidden"
            >
              <Box
                style={{
                  backgroundImage: 'url(/box/carManagebg.png)',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'contain',
                  width: '70%',
                  overflow: 'hidden'
                }}
                className="m-auto mt-[5%]  h-[70%]"
              >
                <Flex
                  className="rounded-[20px] h-[30%] w-[90%] mx-auto mt-[50%] flex-col justify-center items-center cursor-pointer gap-[25px] bg-[rgba(255, 255, 255, 0.05)] border border-dashed backdrop-blur-[18px] "
                  onClick={open}
                >
                  <Box>
                    <Image src={'/svg/plus.svg'} w={35} h={35} />
                  </Box>
                  <Text
                    w={478}
                    className="text-white text-lg text-center font-semibold"
                  >
                    Tạo hồ sơ xe để quản lý
                  </Text>
                </Flex>
              </Box>
            </Box>
          </>
        ) : (
          <>
            <Box className="relative hidden lg:block">
              <Box
                w={800}
                h={440}
                style={{
                  borderRadius: '805px',
                  background:
                    'linear-gradient(90deg, rgba(82, 186, 230, 0.80) 0%, rgba(103, 242, 209, 0.80) 50.5%, rgba(81, 194, 167, 0.80) 100%)',
                  filter: 'blur(200px)'
                }}
                className="absolute left-[50%] -translate-x-[50%] -z-1"
              ></Box>
              <Box
                w={'100%'}
                style={{
                  backgroundColor: '#121316',
                  minHeightheight: '100vh',
                  paddingTop: '180px',
                  zIndex: 2
                }}
                className="flex flex-col "
              >
                <Box className="absolute top-[8%]  w-full ">
                  <Image
                    src={'/svg/ellipse.svg'}
                    className=" absolute h-[429px] w-[429px] top-20  object-contain z-30"
                  />
                  <Image
                    src={'/svg/cirlemanage.svg'}
                    className=" absolute h-[140px] w-[140px] top-[220px] left-[60px]  object-contain z-30"
                  />
                  <Box className="absolute w-[134px] h-[100px]  top-[131px] left-[160px] group">
                    <Image
                      src={'/icons/xoay.png'}
                      className="absolute  object-contain z-30  top-[-60px] left-[-52px] rotate-[-111deg] opacity-0 group-hover:opacity-100"
                    />
                    <Image
                      src={'/svg/bg1.svg'}
                      className="absolute h-6 -left-[10px] w-max object-contain top-1 lef-[-2px] z-30"
                    />
                    <Describe
                      top="-84px"
                      left="15px"
                      car={groupedCarUser[perPage][select]}
                      type={ProductType.DO_XE}
                      refreshData={refreshData}
                    />
                  </Box>
                  <Box className="absolute w-[134px] top-[199px] left-[240px] group">
                    <Image
                      src={'/icons/xoay.png'}
                      className="absolute  object-contain z-30  top-[-66px] left-[-52px] rotate-[-73deg] opacity-0 group-hover:opacity-100"
                    />
                    <Image
                      src={'/svg/bg2.svg'}
                      className=" absolute h-6 -top-[10px] left-[-8px] w-max object-contain z-30"
                    />
                    <Describe
                      top="-79px"
                      left="32px"
                      car={groupedCarUser[perPage][select]}
                      type={ProductType.CUU_HO}
                      refreshData={refreshData}
                    />
                  </Box>
                  <Box
                    className={`absolute h-[160px]  w-[134px] top-[295px] left-[268px] group `}
                  >
                    <Image
                      src={'/icons/xoay.png'}
                      className={`absolute object-contain z-30 top-[-66px] left-[-52px] rotate-[-39deg] ${run ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100`}
                    />
                    <Image
                      src={'/icons/banhxe.png'}
                      className=" absolute h-6 w-max top-[-10px] object-contain z-30"
                    />
                    <Describe
                      top="-54px"
                      left="42px"
                      car={groupedCarUser[perPage][select]}
                      type={ProductType.LOP}
                      refreshData={refreshData}
                      run={run}
                    />
                    <Box
                      data-tour="step-2"
                      className="absolute bottom-[72px] w-[445px] left-[-40px] h-[150px] "
                    ></Box>
                  </Box>

                  <Box className="absolute h-6  w-[134px] top-[378px] left-[246px] group">
                    <Image
                      src={'/icons/xoay.png'}
                      className="absolute  object-contain z-30  top-[-66px] left-[-52px] rotate-[-10deg] opacity-0 group-hover:opacity-100"
                    />
                    <Image
                      src={'/svg/bg4.svg'}
                      className=" absolute h-6 w-max top-[-10px] object-contain z-30"
                    />
                    <Describe
                      top="-40px"
                      left="40px"
                      car={groupedCarUser[perPage][select]}
                      type={ProductType.AC_QUY}
                      refreshData={refreshData}
                    />
                  </Box>

                  <Box className="absolute h-6  w-[134px] top-[445px] left-[172px] group">
                    <Image
                      src={'/icons/xoay.png'}
                      className="absolute  object-contain z-30  top-[-66px] left-[-52px] rotate-[26deg] opacity-0 group-hover:opacity-100"
                    />

                    <Image
                      src={'/svg/bg5.svg'}
                      className=" absolute h-6 w-max top-[-12px] left-1 object-contain z-30"
                    />
                    <Describe
                      top="-20px"
                      left="26px"
                      car={groupedCarUser[perPage][select]}
                      type={ProductType.PHU_TUNG}
                      refreshData={refreshData}
                    />
                  </Box>
                </Box>
                <Flex className="items-center w-full justify-center gap-4 relative z-10 ">
                  <Flex gap={12} align={'center'}>
                    {/* <Text className="text-[64px] text-white font-bold leading-[46px]">
                      {groupedCarUser?.[perPage]?.[select]?.type}
                    </Text> */}
                    {groupedCarUser?.[perPage]?.[select]?.carType?.brand
                      ?.image && (
                      <Image
                        src={
                          groupedCarUser?.[perPage]?.[select]?.carType?.brand
                            ?.image
                            ? getFileUrl(
                                groupedCarUser?.[perPage]?.[select]?.carType
                                  ?.brand?.image
                              )
                            : '/background/bmw.png'
                        }
                        className="z-2 relative h-[60px]  object-contain"
                      />
                    )}
                    <Text className="text-[32px] font-bold text-white">
                      {' '}
                      {groupedCarUser?.[perPage]?.[select]?.license_plate}
                    </Text>
                  </Flex>

                  <Flex
                    gap={12}
                    className="absolute items-center flex-col right-[20px] md:top-[-56px]"
                  >
                    <Flex gap={12} data-tour="step-1">
                      {groupedCarUser[perPage][select]?.detail?.maintenance && (
                        <BoxTime
                          title="Bảo dưỡng"
                          time={
                            groupedCarUser[perPage][select]?.detail?.maintenance
                          }
                        />
                      )}
                      {groupedCarUser[perPage][select]?.detail?.registry && (
                        <BoxTime
                          title="Đăng kiểm"
                          time={
                            groupedCarUser[perPage][select]?.detail?.registry
                          }
                        />
                      )}
                      {groupedCarUser[perPage][select]?.detail?.insurance && (
                        <BoxTime
                          title="Bảo hiểm"
                          time={
                            groupedCarUser[perPage][select]?.detail?.insurance
                          }
                        />
                      )}
                    </Flex>
                    <Box
                      data-tour="step-4"
                      onClick={handleToggleChatModel}
                      className="cursor-pointer"
                    >
                      <Image
                        src={'/svg/troly.svg'}
                        className="z-2 relative w-[66px]  object-contain"
                      />
                    </Box>
                  </Flex>
                </Flex>
                <Image
                  src={info ? getFileUrl(info.image) : '/background/gt3.png'}
                  onError={onErrorHandlerCar}
                  className="z-2 relative w-[1000px] max-h-[300px] mx-auto mt- object-contain"
                />
                <Flex
                  gap={80}
                  className="items-center justify-center max-w-main mx-auto"
                  pt={50}
                  px={20}
                >
                  <Flex direction={'column'}>
                    <Flex direction={'column'}>
                      <Text
                        size="36px"
                        className="text-white font-semibold items-center text-center"
                      >
                        Bộ sưu tập xe
                      </Text>
                      <button
                        className="text-sm underline text-white"
                        onClick={() => setRun(true)}
                      >
                        (Hướng dẫn)
                      </button>
                    </Flex>
                    {carUser.length > 2 && (
                      <Button
                        w={'100%'}
                        className="mt-6 border-none"
                        style={{
                          background:
                            'var(--Gradient, linear-gradient(91deg, #258DBA 1.26%, #26D3E0 66.99%, #8BF6C8 126.97%))'
                        }}
                        size="lg"
                        radius={'md'}
                        onClick={open}
                      >
                        <Image src={'/svg/plus.svg'} h={20} mr={8} />
                        Tạo mới xe
                      </Button>
                    )}
                  </Flex>
                  <Flex gap={12} data-tour="step-3">
                    {carUser.length < 3 && (
                      <Flex
                        style={{
                          background:
                            'linear-gradient(180deg, rgba(255, 255, 255, 0.13) 0%, rgba(255, 255, 255, 0.17) 100%)',
                          borderRadius: 27,
                          padding: 24,
                          backdropFilter: 'blur(19px)'
                        }}
                        className="flex-col items-center justify-center w-[180px]  h-[180px] cursor-pointer border border-dashed"
                        onClick={open}
                      >
                        <Box>
                          <Image src={'/svg/plus.svg'} w={24} h={24} />
                        </Box>
                        <Text className="text-white text-lg text-center font-semibold">
                          Thêm mới xe
                        </Text>
                      </Flex>
                    )}
                    {groupedCarUser &&
                      groupedCarUser[perPage].map((item, index) => {
                        return (
                          <Box
                            key={index}
                            onClick={() => setSelect(index)}
                            className="cursor-pointer"
                          >
                            <BoxCar
                              key={item.id}
                              car={item}
                              setPerPage={setPerPage}
                              infoCar={infoCar}
                              refech={refreshData}
                            />
                          </Box>
                        )
                      })}
                  </Flex>
                </Flex>
                <Flex
                  py={25}
                  gap={10}
                  justify={'center'}
                  className="items-center"
                >
                  {groupedCarUser &&
                    groupedCarUser.length > 1 &&
                    Array.from({ length: groupedCarUser.length }, (_, idx) => (
                      <Box
                        key={idx}
                        w={88}
                        h={5}
                        className="cursor-pointer"
                        style={
                          perPage === idx
                            ? {
                                background:
                                  'linear-gradient(90deg, #258DBA 0%, #26D3E0 51.5%, #8BF6C8 98.5%)',
                                borderRadius: '35px'
                              }
                            : {
                                background: 'white',
                                borderRadius: '35px'
                              }
                        }
                        onClick={() => setPerPage(idx)}
                      ></Box>
                    ))}
                </Flex>
              </Box>
            </Box>
            <Box className="relative lg:hidden">
              <Box
                w={400}
                h={220}
                style={{
                  borderRadius: '805px',
                  background:
                    'linear-gradient(90deg, rgba(82, 186, 230, 0.80) 0%, rgba(103, 242, 209, 0.80) 50.5%, rgba(81, 194, 167, 0.80) 100%)',
                  filter: 'blur(200px)'
                }}
                className="absolute left-[50%] -translate-x-[50%] -z-1"
              ></Box>
              <Box
                w={'100%'}
                style={{
                  backgroundColor: '#121316',
                  minHeightheight: '100vh',
                  paddingTop: '90px',
                  zIndex: 2
                }}
                className="flex flex-col "
              >
                <Flex className="items-start w-full justify-between  relative z-10 px-6">
                  <Flex direction={'column'} mt={8} gap={12}>
                    <Text w={80} className="text-white text-[12px] font-bold">
                      Thông tin bảo hành
                    </Text>
                    {listIcons.map((item, index) => {
                      return (
                        <Box
                          key={index}
                          w={42}
                          h={42}
                          style={{
                            background:
                              activeIndex === index
                                ? '#28afcdbd'
                                : 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '10px'
                          }}
                          className="relative"
                          onClick={() => handleClick(index)}
                        >
                          <Flex
                            align="center"
                            justify="center"
                            w={'100%'}
                            h={'100%'}
                          >
                            <Image
                              src={item.img}
                              w={24}
                              className="object-cover"
                            />
                          </Flex>
                          <Describe
                            top="-84px"
                            left="15px"
                            car={groupedCarUser[perPage][select]}
                            type={item.type}
                            refreshData={refreshData}
                            mobile={true}
                            openMobile={activeIndex === index}
                          />
                        </Box>
                      )
                    })}
                  </Flex>
                  <Flex
                    align={'center'}
                    className="absolute left-[50%] translate-x-[-50%] top-0"
                  >
                    <Flex>
                      {groupedCarUser?.[perPage]?.[select]?.carType?.brand
                        ?.image && (
                        <Image
                          src={
                            groupedCarUser?.[perPage]?.[select]?.carType?.brand
                              ?.image
                              ? getFileUrl(
                                  groupedCarUser?.[perPage]?.[select]?.carType
                                    ?.brand?.image
                                )
                              : '/background/bmw.png'
                          }
                          className="z-2 relative md:w-[64px] w-[40px]  object-contain"
                        />
                      )}
                    </Flex>
                    <Text className="text-[24px] text-white whitespace-nowrap">
                      {' '}
                      {groupedCarUser[perPage][select]?.license_plate}
                    </Text>
                  </Flex>
                </Flex>
                <Image
                  src={info ? getFileUrl(info.image) : '/background/gt3.png'}
                  onError={onErrorHandlerCar}
                  className="z-2 w-[360px] top-[300px] absolute left-[50%] translate-x-[-50%] mt-[-90px] object-contain"
                />
                <Flex gap={12} mt={30} mx={'auto'}>
                  {groupedCarUser[perPage][select]?.detail.maintenance && (
                    <BoxTime
                      title="Bảo dưỡng"
                      time={groupedCarUser[perPage][select]?.detail.maintenance}
                    />
                  )}
                  {groupedCarUser[perPage][select]?.detail.registry && (
                    <BoxTime
                      title="Đăng kiểm"
                      time={groupedCarUser[perPage][select]?.detail.registry}
                    />
                  )}
                  {groupedCarUser[perPage][select]?.detail.insurance && (
                    <BoxTime
                      title="Bảo hiểm"
                      time={groupedCarUser[perPage][select]?.detail.insurance}
                    />
                  )}
                </Flex>
                <Flex direction={'column'} className="my-6">
                  <Text
                    size="24px"
                    className="text-white font-semibold items-center text-center"
                  >
                    Bộ sưu tập xe
                  </Text>
                  {/* <button
                    className="text-sm underline text-white"
                    // onClick={() => setRun(true)}
                  >
                    (Hướng dẫn)
                  </button> */}
                </Flex>
                <Flex
                  gap={12}
                  className="items-center justify-center max-w-main mx-auto"
                  px={20}
                >
                  <Flex
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(255, 255, 255, 0.13) 0%, rgba(255, 255, 255, 0.17) 100%)',
                      borderRadius: 27,
                      backdropFilter: 'blur(19px)'
                    }}
                    className="flex-col items-center h-[130px] w-[130px] justify-center  border border-white border-dashed cursor-pointer"
                    onClick={open}
                  >
                    <Box>
                      <Image src={'/svg/plus.svg'} w={24} h={24} />
                    </Box>
                    <Text className="text-white text-[14px] text-center font-semibold">
                      Thêm mới xe
                    </Text>
                  </Flex>

                  <div className="flex items-center gap-x-5">
                    {groupedCarUser &&
                      groupedCarUser[perPage].map((item, index) => {
                        return (
                          <Box
                            key={index}
                            onClick={() => {
                              setSelect(index)
                            }}
                            className="cursor-pointer"
                          >
                            <BoxCar
                              key={item.id}
                              car={item}
                              infoCar={infoCar}
                              refech={refreshData}
                              setPerPage={setPerPage}
                            />
                          </Box>
                        )
                      })}
                  </div>
                </Flex>
                <Flex
                  py={25}
                  gap={10}
                  justify={'center'}
                  className="items-center"
                >
                  {groupedCarUser &&
                    groupedCarUser.length > 1 &&
                    Array.from({ length: groupedCarUser.length }, (_, idx) => (
                      <Box
                        key={idx}
                        h={5}
                        className="cursor-pointer w-[40px] lg:w-[88px]"
                        style={
                          perPage === idx
                            ? {
                                background:
                                  'linear-gradient(90deg, #258DBA 0%, #26D3E0 51.5%, #8BF6C8 98.5%)',
                                borderRadius: '35px'
                              }
                            : {
                                background: 'white',
                                borderRadius: '35px'
                              }
                        }
                        onClick={() => setPerPage(idx)}
                      ></Box>
                    ))}
                </Flex>
              </Box>
            </Box>
          </>
        )}
      </>

      <ModalCreate opened={opened} close={close} refetch={refreshData} />
    </Box>
  )
}

export default CarManageBox
