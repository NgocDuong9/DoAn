import { Box, Flex, Image, Text, Tooltip } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { IconArrowUpRight } from '@tabler/icons-react'
import ModalGuarantee from '../modal/modal-guarantee'
import ModalSuccess from '../modal/modal-succecs'
import ModalWarranty from '@/app/component/modal/modal-warranty'
import { Dispatch, SetStateAction, useMemo } from 'react'
import { ProductType } from '@/apis/client/interface'

interface Props {
  top: string
  left: string
  car: any
  type: ProductType
  refreshData: () => Promise<void>
  mobile?: boolean
  openMobile?: boolean
  run?: boolean
  detail?: boolean
}

const Describe = ({
  top,
  left,
  car,
  type,
  refreshData,
  mobile,
  openMobile,
  run,
  detail
}: Props) => {
  const [opened, { open, close }] = useDisclosure(false)
  const [succes, { open: openSucces, close: closeSucces }] =
    useDisclosure(false)
  const [warran, { open: openWarran, close: closeWarran }] =
    useDisclosure(false)

  const filterData = useMemo(() => {
    const data = car?.warranty?.filter(
      (item: any) => item.product_type === type
    )
    return data
  }, [car])

  function getTimeDifferenceToNow(dateStr: string): {
    months: number
    days: number
  } {
    const givenDate = new Date(dateStr)
    const now = new Date()

    let yearsDifference = givenDate.getFullYear() - now.getFullYear()
    let monthsDifference = givenDate.getMonth() - now.getMonth()
    let daysDifference = givenDate.getDate() - now.getDate()

    if (daysDifference < 0) {
      const prevMonth = new Date(
        givenDate.getFullYear(),
        givenDate.getMonth(),
        0
      )
      daysDifference += prevMonth.getDate()
      monthsDifference--
    }

    if (monthsDifference < 0) {
      monthsDifference += 12
      yearsDifference--
    }

    const totalMonths = yearsDifference * 12 + monthsDifference

    return {
      months: totalMonths > 0 ? totalMonths : 0,
      days: daysDifference > 0 ? daysDifference : 0
    }
  }

  const dateExpried = useMemo(() => {
    if (filterData?.length < 1) return 0
    const dateEx = getTimeDifferenceToNow(filterData?.[0]?.expried_at)
    return dateEx
  }, [filterData])
  const renderTitle = useMemo(() => {
    if (type === ProductType.LOP) return 'Lốp'
    if (type === ProductType.AC_QUY) return 'Ắc quy'
    if (type === ProductType.CUU_HO) return 'Cứu hộ'
    if (type === ProductType.DO_XE) return 'Độ xe'
    if (type === ProductType.PHU_TUNG) return 'Phụ tùng'
  }, [type])

  function shortenText(text: string): string {
    if (text.length > 15) {
      return text.substring(0, 15) + '...'
    }
    return text
  }

  return (
    <>
      {!mobile ? (
        <Box
          style={{
            backgroundImage: 'url(/box/subbox.png)',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            top: top,
            left: left
          }}
          className={`absolute z w-max h-max  min-w-[330px] min-h-[130px] object-cover  ${run ? 'block' : 'hidden'} py z-[200]  group-hover:block`}
        >
          <Image
            src="/background/dot2.png"
            w={30}
            className="absolute top-[40px] -left-1"
          />
          {filterData?.length > 0 ? (
            <Box className="pl-[68px] pt-[18px] ">
              <Text
                className="text-transparent text-[18px] rounded-lg font-bold"
                style={{
                  background:
                    'linear-gradient(90deg, #52BAE6 0%, #67F2D1 99.99%, #51C2A7 100%)',
                  '-webkit-background-clip': 'text',
                  '-webkit-text-fill-color:': 'transparent'
                }}
              >
                {renderTitle}
              </Text>
              <Text size="18px" className="font-semibold py-0.5 ">
                {shortenText(filterData[0].product_name)}
              </Text>
              <Flex gap={6} mb={4} align={'flex-end'}>
                <Text
                  size="24px"
                  className="text-transparent rounded-lg font-extrabold"
                  style={{
                    background:
                      'linear-gradient(90deg, #52BAE6 0%, #67F2D1 99.99%, #51C2A7 100%)',
                    '-webkit-background-clip': 'text',
                    '-webkit-text-fill-color:': 'transparent'
                  }}
                >
                  {
                    //@ts-ignore
                    dateExpried?.months
                  }
                </Text>
                <Text className="mt-"> tháng </Text>
                <Text
                  size="24px"
                  className="text-transparent rounded-lg font-extrabold"
                  style={{
                    background:
                      'linear-gradient(90deg, #52BAE6 0%, #67F2D1 99.99%, #51C2A7 100%)',
                    '-webkit-background-clip': 'text',
                    '-webkit-text-fill-color:': 'transparent'
                  }}
                >
                  {
                    //@ts-ignore
                    dateExpried?.days
                  }
                </Text>
                <Text>ngày</Text>
              </Flex>
              <Flex gap={8} align={'flex-end'} className="cursor-pointer">
                <Image src="/svg/plus2.svg" w={30} className="" />
                <Text
                  size="16px"
                  className="text-transparent rounded-lg font-bold"
                  style={{
                    background:
                      'linear-gradient(90deg, #52BAE6 0%, #67F2D1 99.99%, #51C2A7 100%)',
                    '-webkit-background-clip': 'text',
                    '-webkit-text-fill-color:': 'transparent'
                  }}
                  onClick={open}
                >
                  Thêm bảo hành
                </Text>
              </Flex>
              <Box
                w={36}
                h={36}
                className="rounded-full bg-[#ececec] absolute right-6 bottom-4 cursor-pointer"
                onClick={openWarran}
              >
                <IconArrowUpRight
                  size={24}
                  className="absolute top-1.5 left-1.5"
                />
              </Box>
            </Box>
          ) : (
            <Box className="pl-[68px] pt-[18px] ">
              <Flex gap={6} mb={24} mt={10} align={'flex-end'}>
                <Text
                  className="text-transparent text-[18px] rounded-lg font-bold"
                  style={{
                    background:
                      'linear-gradient(90deg, #52BAE6 0%, #67F2D1 99.99%, #51C2A7 100%)',
                    '-webkit-background-clip': 'text',
                    '-webkit-text-fill-color:': 'transparent'
                  }}
                >
                  {renderTitle}
                </Text>
              </Flex>
              <Flex gap={8} align={'flex-end'} className="cursor-pointer">
                <Image src="/svg/plus2.svg" w={30} className="" />
                <Text
                  size="16px"
                  className="text-transparent rounded-lg font-bold"
                  style={{
                    background:
                      'linear-gradient(90deg, #52BAE6 0%, #67F2D1 99.99%, #51C2A7 100%)',
                    '-webkit-background-clip': 'text',
                    '-webkit-text-fill-color:': 'transparent'
                  }}
                  onClick={open}
                >
                  Thêm bảo hành
                </Text>
              </Flex>
              <Box
                w={36}
                h={36}
                className="rounded-full bg-[#ececec] absolute right-6 bottom-6 cursor-pointer"
                onClick={openWarran}
              >
                <IconArrowUpRight
                  size={24}
                  className="absolute top-1.5 left-1.5"
                />
              </Box>
            </Box>
          )}
        </Box>
      ) : (
        <Box>
          {openMobile && (
            <>
              {filterData?.length > 0 ? (
                <Box className="px-3 py-4 flex gap-1.5 flex-col relative rounded-lg w-[220px] ml-12 -mt-20 bg-white">
                  <Text
                    className="text-transparent text-[16px] rounded-lg font-bold"
                    style={{
                      background:
                        'linear-gradient(90deg, #52BAE6 0%, #67F2D1 99.99%, #51C2A7 100%)',
                      '-webkit-background-clip': 'text',
                      '-webkit-text-fill-color:': 'transparent'
                    }}
                  >
                    {renderTitle}
                  </Text>
                  <Text size="16px" className="font-semibold ">
                    {shortenText(filterData[0].product_name)}
                  </Text>
                  <Flex gap={6} align={'flex-end'}>
                    <Text
                      size="16px"
                      className="text-transparent rounded-lg font-extrabold"
                      style={{
                        background:
                          'linear-gradient(90deg, #52BAE6 0%, #67F2D1 99.99%, #51C2A7 100%)',
                        '-webkit-background-clip': 'text',
                        '-webkit-text-fill-color:': 'transparent'
                      }}
                    >
                      {
                        //@ts-ignore
                        dateExpried?.months
                      }
                    </Text>
                    <Text className="" size="16px">
                      {' '}
                      tháng{' '}
                    </Text>
                    <Text
                      size="16px"
                      className="text-transparent rounded-lg font-extrabold"
                      style={{
                        background:
                          'linear-gradient(90deg, #52BAE6 0%, #67F2D1 99.99%, #51C2A7 100%)',
                        '-webkit-background-clip': 'text',
                        '-webkit-text-fill-color:': 'transparent'
                      }}
                    >
                      {
                        //@ts-ignore
                        dateExpried?.days
                      }
                    </Text>
                    <Text className="" size="12px">
                      ngày
                    </Text>
                  </Flex>
                  <Flex gap={8} align={'center'} className="cursor-pointer">
                    <Image src="/svg/plus2.svg" w={30} className="" />
                    <Text
                      size="14px"
                      className="text-transparent  font-bold"
                      style={{
                        background:
                          'linear-gradient(90deg, #52BAE6 0%, #67F2D1 99.99%, #51C2A7 100%)',
                        '-webkit-background-clip': 'text',
                        '-webkit-text-fill-color:': 'transparent'
                      }}
                      onClick={open}
                    >
                      Thêm bảo hành
                    </Text>
                  </Flex>
                  <Box
                    w={22}
                    h={22}
                    className="rounded-full bg-[#ececec] absolute right-5 bottom-3"
                    onClick={openWarran}
                  >
                    <IconArrowUpRight
                      size={14}
                      className="absolute top-1 left-1"
                    />
                  </Box>
                </Box>
              ) : (
                <Box className="px-3 py-4 relative rounded-lg w-[220px] ml-12 -mt-16 bg-white">
                  <Flex gap={6} align={'flex-end'}>
                    <Text
                      className="text-transparent rounded-lg text-base font-bold w-[180px] h-6"
                      style={{
                        background:
                          'linear-gradient(90deg, #52BAE6 0%, #67F2D1 99.99%, #51C2A7 100%)',
                        '-webkit-background-clip': 'text',
                        '-webkit-text-fill-color:': 'transparent'
                      }}
                    >
                      {renderTitle}
                    </Text>
                  </Flex>
                  <Flex gap={8} align={'center'} className="cursor-pointer">
                    <Image src="/svg/plus2.svg" className="" />
                    <Text
                      className="text-transparent text-base font-bold"
                      style={{
                        background:
                          'linear-gradient(90deg, #52BAE6 0%, #67F2D1 99.99%, #51C2A7 100%)',
                        '-webkit-background-clip': 'text',
                        '-webkit-text-fill-color:': 'transparent'
                      }}
                      onClick={open}
                    >
                      Thêm bảo hành
                    </Text>
                  </Flex>
                  <Box
                    w={22}
                    h={22}
                    className="rounded-full bg-[#ececec] absolute  bottom right-5 bottom-3"
                    onClick={openWarran}
                  >
                    <IconArrowUpRight
                      size={14}
                      className="absolute top-1 left-1"
                    />
                  </Box>
                </Box>
              )}
            </>
          )}
        </Box>
      )}
      <ModalGuarantee
        opened={opened}
        close={close}
        openSucces={openSucces}
        car={car}
        type={type}
        refetch={refreshData}
      />
      <ModalWarranty
        opened={warran}
        close={closeWarran}
        open={openWarran}
        car={car}
        type={type}
        refetch={refreshData}
      />
      <ModalSuccess opened={succes} close={closeSucces} refetch={refreshData} />
    </>
  )
}

export default Describe
