'use client'

import { getProdInCart, getProductByCartItemIds } from '@/apis/client/cart'
import { insertOrder, insertOrderItem } from '@/apis/client/order'
import { getCarUser } from '@/apis/managecar'
import FooterHome from '@/components/footer'
import HeaderBar from '@/components/header/header'
import { MapAccompaniesLabel } from '@/types/order'
import { formatNumber, getProductPriceWithDiscount } from '@/utils/formatPrice'
import { getFileUrl } from '@/utils/images'
import {
  Box,
  Button,
  Flex,
  Image,
  LoadingOverlay,
  Select,
  Stack,
  Textarea
} from '@mantine/core'
import { DateInput, TimeInput } from '@mantine/dates'
import 'dayjs/locale/vi'

import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import {
  IconAlertCircle,
  IconCalendarMonth,
  IconClock,
  IconClockHour8
} from '@tabler/icons-react'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useRouter, useSearchParams } from 'next/navigation'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { Database } from '../../../supabase/database'
import ModalCustomer from './ModalCustomer'
import ModalNotice from './ModalNotice'
import ModalSuccess from './ModalSuccess'
import Link from 'next/link'
import Joyride, { CallBackProps, STATUS } from 'react-joyride'
import {
  ActionNotify,
  useNotifications
} from '@/components/context/notify.context'
import { useAuth } from '@/components/context/auth.context'
import useDisableHtmlScroll from '@/hooks/useDisableHtmlScroll'
import { formatSchedulesNew, getClassifiesFromCartOrOrder } from '@/utils'
import { notifications } from '@mantine/notifications'
import selectCss from './selectcss.module.css'

dayjs.extend(customParseFormat)

const steps = [
  {
    target: '[data-tour="step-1"]',
    content: 'Kiểm tra thông tin người đặt lịch.',
    disableBeacon: true
  },
  {
    target: '[data-tour="step-2"]',
    content: 'Bạn đặt lịch cho xe nào?',
    disableBeacon: true
  },
  {
    target: '[data-tour="step-3"]',
    content: 'Bạn đặt lịch vào thời gian nào?',
    disableBeacon: true
  },
  {
    target: '[data-tour="step-4"]',
    content: 'Điền lưu ý cho cửa hàng về đơn hàng của bạn (nếu cần).',
    disableBeacon: true
  },
  {
    target: '[data-tour="step-5"]',
    content: 'Hãy kiểm tra lại các sản phẩm/dịch vụ trước khi đặt lịch.',
    disableBeacon: true
  }
]

const Checkout: React.FC = () => {
  const searchParams = useSearchParams()
  const selectedProds = searchParams.get('list')?.split(',') || []

  const [cart, setCart] = useState<any[]>([])
  const [garage, setGarage] = useState<Record<string, any>>({})
  const [selectedInfo, setSelectedInfo] = useState<Record<string, any>>({})
  const [cars, setCars] = useState<any[]>([])
  const [selectedCar, setSelectedCar] = useState<Record<string, any>>({})

  const [loading, setLoading] = useState<boolean>(true)
  const [checkoutLoading, setCheckoutLoading] = useState<boolean>(false)
  const [showCarForm, setShowCarForm] = useState<boolean>(false)
  const [code, setCode] = useState<string>('')
  const [showScheduleWarning, setShowScheduleWarning] = useState<boolean>(false)

  const [showMS, { open: openMS, close: closeMS }] = useDisclosure(false)
  const [showMC, { open: openMC, close: closeMC }] = useDisclosure(false)
  const [showMN, { open: openMN, close: closeMN }] = useDisclosure(false)

  const { userId } = useAuth()
  const { pushNotify } = useNotifications()
  const router = useRouter()

  // const discountPrice = (item: any) => {
  //   const record = item.detail.classifies
  //     ? item.detail.classifies
  //     : item.product.sell_info
  //   return record.discount_number
  //     ? record.discount_type === 'CURRENCY'
  //       ? record.price - record.discount_number
  //       : (record.price * (100 - record.discount_number)) / 100
  //     : record.price
  // }

  const finalPrice = (item: any) => {
    const classify = getClassifiesFromCartOrOrder(item)
    const { promotePrice } = getProductPriceWithDiscount(classify)

    return (
      item.count * promotePrice +
      (item?.detail?.accompanies?.reduce(
        (total: number, curr: any) => total + curr.price,
        0
      ) ?? 0)
    )
  }

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {},
    validate: {
      car_id: (value: string) => !value,
      date: (value: Date) => !value,
      time: (value: string) => !value,
      note: (value: string) =>
        value?.length > 150 ? 'Ghi chú không quá 150 ký tự' : null
    }
  })

  form.watch('date', ({ value }: any) => {
    const { time }: any = form.getValues()
    handleCheckSchedule(value, time)
  })

  form.watch('time', ({ value }: any) => {
    const { date }: any = form.getValues()
    handleCheckSchedule(date, value)
  })

  const lunchBreak = useMemo(() => {
    if (
      garage?.description?.times?.[garage?.description?.times?.length - 1]
        .day === 'LUNCHBREAK'
    ) {
      return garage?.description?.times?.[
        garage?.description?.times?.length - 1
      ]
    }
    return {}
  }, [garage])

  const handleCheckSchedule = (date: Date, time: string) => {
    if (!date || !time) {
      return
    }
    const daysOfWeek: any = {
      0: 'SUNDAY',
      1: 'MONDAY',
      2: 'TUESDAY',
      3: 'WEDNESDAY',
      4: 'THURSDAY',
      5: 'FRIDAY',
      6: 'SATURDAY'
    }
    const selectedDay = garage.description?.times?.find(
      (i: { day: any }) => i.day === daysOfWeek[new Date(date).getDay()]
    )

    if (
      !selectedDay?.work ||
      ((dayjs(time, 'HH:mm').isBefore(
        dayjs(selectedDay.time[0], 'HH:mm'),
        'minute'
      ) ||
        dayjs(time, 'HH:mm').isAfter(
          dayjs(lunchBreak?.time?.[0], 'HH:mm'),
          'minute'
        )) &&
        (dayjs(time, 'HH:mm').isBefore(
          dayjs(lunchBreak?.time?.[1], 'HH:mm'),
          'minute'
        ) ||
          dayjs(time, 'HH:mm').isAfter(
            dayjs(selectedDay.time[1], 'HH:mm'),
            'minute'
          )))
    ) {
      !showCarForm && setShowScheduleWarning(true)
    } else {
      showCarForm && setShowScheduleWarning(false)
    }
  }

  useEffect(() => {
    selectedProds[0] ? handleFetchCart() : setLoading(false)
  }, [])

  const handleFetchCart = async () => {
    setLoading(true)
    try {
      const { data, status }: any = await getProductByCartItemIds(selectedProds)
      const { data: dataCars }: any = await getCarUser()

      if (status === 200) {
        setGarage(data?.[0]?.garage ?? {})
        setCart(data)
      }

      setCars(dataCars)
      const selectedCar = dataCars?.find((i: any) => i.default) || dataCars?.[0]
      setSelectedCar(selectedCar)
      form.setFieldValue('car_id', selectedCar.id)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleShowCarForm = () => {
    setShowCarForm(true)
    form.setValues({ car_id: selectedCar.id })
  }

  const handleSaveCarForm = () => {
    const { car_id }: any = form.getValues()
    setShowCarForm(false)
    setSelectedCar(cars.find(i => i.id === car_id))
  }

  const handleCheckout = async () => {
    const { hasErrors, errors } = form.validate()

    if (!hasErrors) {
      setCheckoutLoading(true)
      const data: any = form.getValues()
      const genCode = `${new Date().getTime()}`

      const [hour, minute] = data.time.split(':')
      const time = dayjs(new Date(data.date).setHours(+hour, +minute)).format(
        'HH:mm DD/MM/YYYY'
      )

      try {
        const insertOrderRes = await insertOrder({
          body: {
            car_id: selectedCar.id,
            carType: selectedCar.type,
            license_plate: selectedCar.license_plate,
            order_time: new Date(
              new Date(data.date).setHours(+hour, +minute)
            ).toISOString(),
            price: cart.reduce(
              (total: number, curr: any) => total + finalPrice(curr),
              0
            ),
            name: selectedInfo?.name,
            phone: selectedInfo?.phone,
            code: genCode,
            garage_id: garage.id,
            note: data.note,
            status: 'INPROGESS',
            status_note: 'ĐƠN HÀNG',
            // @ts-ignore
            time: {
              // old_time: time,
              order_time: time,
              order_time_without_format: new Date(data.date).setHours(
                +hour,
                +minute
              )
            },
            type: 'NEW'
          }
        })

        if (insertOrderRes && insertOrderRes.data) {
          const insertBody = cart.map(item => {
            const { garage, garage_id, product, detail, ...data } = item

            const option = product.sell_info?.classifies?.find(
              (_classify: any) =>
                _classify?.manufacture === detail?.classifies?.manufacture
            )

            const {
              accompanies: _accompanies,
              classifies: _classifies,
              ...sell_info_res
            } = product.sell_info

            const classifies = option
              ? option
              : {
                  ...sell_info_res
                }

            const accompanies = product.sell_info?.accompanies?.filter(
              (_accompany: any) =>
                detail?.accompanies.some(
                  (_item: any) =>
                    _item.type === _accompany.type &&
                    _item.name === _accompany.name
                )
            )

            return {
              ...data,
              order_id: insertOrderRes.data.id,
              detail: {
                accompanies,
                classifies
              }
            }
          })

          const insertOrderItemRes = await insertOrderItem({
            body: insertBody as [
              Database['public']['Tables']['orderItem']['Insert']
            ]
          })

          if (insertOrderItemRes.error) {
            notifications.show({
              message: insertOrderItemRes.error as string
            })

            const errorData = insertOrderItemRes.errorData

            // show toast message here
            console.log('errorData:::', errorData)

            return
          }

          if (insertOrderItemRes && insertOrderItemRes.data) {
            // todo: delete cart

            setCode(genCode)
            openMS()

            pushNotify({
              title: `Mã đơn hàng ${genCode}`,
              status: 'SENT',
              order_id: insertOrderRes.data.code,
              sender_id: userId,
              sender_type: 'USER',
              recipients_group: [userId],
              image_url: cart?.[0]?.product?.detail_info?.images?.[0] ?? '',
              action: `Bạn đã đặt lịch`
              // license_plate: insertOrderRes.data.license_plate
            })
            pushNotify({
              title: `Khách hàng đã đặt lịch vào lúc ${dayjs().format('HH:mm DD/MM/YYYY')}. Mã đơn hàng: ${genCode}`,
              status: 'SENT',
              order_id: insertOrderRes.data.code,
              sender_id: userId,
              sender_type: 'USER',
              recipients_group: [garage.id],
              image_url: cart?.[0]?.product?.detail_info?.images?.[0] ?? '',
              action: `Xe ${insertOrderRes.data.license_plate} | đã đặt lịch`
              // license_plate: insertOrderRes.data.license_plate
            })
          }
        }
      } catch (e) {
        console.error(e)
      } finally {
        setCheckoutLoading(false)
      }
    }
  }

  const [run, setRun] = useState(false)

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED]

    if (finishedStatuses.includes(status)) {
      setRun(false)
    }
  }

  useDisableHtmlScroll(loading)

  return (
    <Fragment>
      <Box className="">
        {!run && <HeaderBar />}
        <Box className="w-[100vw] bg-[#F8F8F8] gap-4 md:pt-[120px] pt-[80px] md:pb-[23px] pb-[18px] md:px-[60px] px-[12px] mx-auto flex items-center">
          <Flex gap={6} className="max-w-main w-full mx-auto">
            <h1 className="md:text-2xl text:xl font-medium">
              Thông tin đặt lịch
            </h1>
            <button className="text-sm underline" onClick={() => setRun(true)}>
              (Hướng dẫn)
            </button>
          </Flex>
        </Box>
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

        <Box className="w-[100vw] max-w-main bg-white gap-4 md:px-[60px] px-[12px] pr-[26px] py-[20px] mx-auto relative ">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-x-2 md:gap-x-8 font-normal pb-[15px]">
            <div>
              <div
                className="flex gap-x-2 items-center w-max"
                data-tour="step-1"
              >
                <label className="md:text-base text-sm font-medium">
                  {selectedInfo.name ?? '...loading'}
                </label>
                <hr className="h-[24px] border-r-2 border-main" />
                <label className="md:text-base text-sm font-medium">
                  {selectedInfo.phone}
                </label>
                <Button
                  variant="transparent"
                  size="xs"
                  className="p-[0px]"
                  onClick={openMC}
                >
                  {/* <span className="gradientUnderline md:text-base text-sm font-medium">
                 Thay đổi
               </span> */}

                  <img src="/svg/pencilgradient.svg" alt="" />
                </Button>
              </div>

              {!showCarForm && selectedCar && (
                <Flex gap="xs" align="center" data-tour="step-2">
                  <Flex
                    gap="xs"
                    align="center"
                    // className="md:min-h-[56px] min-h-[38px] md:text-base text-sm px-[20px] rounded-[10px] text-[#FFFFFF] md:my-[20px] my-[10px] min-w-[200px]"
                    // style={{
                    //   background:
                    //     'linear-gradient(91.57deg, #258DBA 1.33%, #26D3E0 63.56%, #8BF7C8 120.36%)'
                    // }}
                    className="font-medium flex-wrap"
                  >
                    <div className="whitespace-normal md:text-base text-sm  flex-1 max-w-screen">
                      Xe {selectedCar?.license_plate} | {selectedCar?.name} |{' '}
                      {selectedCar?.color}
                    </div>
                    {selectedCar?.default && (
                      <div className="min-w-[78px] h-[29px] bg-gradient-order text-[12px] justify-center items-center px-[12px] rounded-[7px] text-white hidden md:flex">
                        Mặc định
                      </div>
                    )}
                  </Flex>
                  <Button
                    variant="transparent"
                    size="xs"
                    className="p-[0px]"
                    onClick={handleShowCarForm}
                  >
                    {/* <span className="gradientUnderline text-base font-medium leading-[28px]">
                   Thay đổi
                 </span> */}

                    <img src="/svg/pencilgradient.svg" alt="" />
                  </Button>
                </Flex>
              )}

              {!selectedCar && !showCarForm && (
                <div>
                  Chưa tạo hồ sơ xe{' '}
                  <Link href="/carmanage">
                    {' '}
                    <span className="gradientUnderline text-base font-medium leading-[28px]">
                      Đến trang tạo mới
                    </span>
                  </Link>
                </div>
              )}

              <form onSubmit={form.onSubmit(values => console.log(values))}>
                <div>
                  {showCarForm && (
                    <>
                      <div>
                        <div className="mt-[5px] flex items-end gap-x-2">
                          <div className="flex-1">
                            <label className="text-base font-medium ">
                              Chọn xe
                            </label>

                            <div className="flex items-center gap-x-2 select-css">
                              <Select
                                size="md"
                                variant="filled"
                                placeholder="Chọn"
                                radius="md"
                                data={[
                                  ...cars.map(i => ({
                                    value: i.id,
                                    label: `Xe ${i.license_plate} | ${i.name} | ${i.color}`
                                  })),
                                  {
                                    label: '+Tạo mới xe',
                                    value: 'create'
                                  }
                                ]}
                                key={form.key('car_id')}
                                {...form.getInputProps('car_id')}
                                onChange={e => {
                                  if (e === 'create') {
                                    router.push('/carmanage')
                                  }
                                }}
                                className="flex-1"
                              />
                              <div className="p-[0px]">
                                <div className="flex flex-col">
                                  <Button
                                    variant="transparent"
                                    size="xs"
                                    className="p-[0px]"
                                    onClick={handleSaveCarForm}
                                  >
                                    <span className="gradientText text-base">
                                      Lưu
                                    </span>
                                  </Button>
                                  <Button
                                    variant="transparent"
                                    size="xs"
                                    color="#FA4D4D"
                                    className="p-[0px] text-base"
                                    onClick={() => setShowCarForm(false)}
                                  >
                                    Hủy
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <Box data-tour="step-3">
                    <div className="pt-[5px] pb-[0px]">
                      <label className="text-base font-medium">Thời gian</label>
                    </div>
                    <div className="pt-[0px]">
                      <label className="text-[14px] leading-8">Ngày</label>
                      <DateInput
                        locale="vi"
                        valueFormat="DD/MM/YYYY"
                        minDate={new Date()}
                        size="md"
                        variant="filled"
                        placeholder="Nhập"
                        rightSection={<IconCalendarMonth color="#666666" />}
                        radius="md"
                        key={form.key('date')}
                        {...form.getInputProps('date')}
                      />
                    </div>
                    <div className="pt-[0px]">
                      <label className="text-[14px] leading-8 mt-2">Giờ</label>
                      <TimeInput
                        // valueFormat="DD/MM/YYYY"
                        // minDate={new Date()}
                        size="md"
                        variant="filled"
                        placeholder="Nhập"
                        rightSection={<IconClock color="#666666" />}
                        radius="md"
                        key={form.key('time')}
                        {...form.getInputProps('time')}
                      />
                    </div>
                  </Box>

                  {showScheduleWarning && (
                    <div className="py-[0px]">
                      <Flex gap={5} align="center">
                        <IconAlertCircle color="#F46A6A" />
                        <span className="text-[14px] text-[#F46A6A]">
                          Thời gian đặt lịch ngoài giờ làm việc của gara. Gara
                          có thể tính thêm phí ngoài giờ
                        </span>
                      </Flex>
                    </div>
                  )}

                  <div className="pt-[0px]" data-tour="step-4">
                    <label className="text-base font-medium leading-10">
                      Ghi chú
                    </label>
                    <Textarea
                      size="md"
                      variant="filled"
                      placeholder="Nhập"
                      radius="md"
                      key={form.key('note')}
                      {...form.getInputProps('note')}
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="md:mt-0 mt-8">
              <Box data-tour="step-5">
                <Flex gap="md" align="center">
                  <Image src="/svg/store.svg" w={24} />
                  <label className="text-base font-medium">{garage.name}</label>
                  {garage?.information?.tag && (
                    <div className="h-[29px] text-[12px] bg-[#F1B44C] flex justify-center items-center px-[12px] rounded-[7px] text-white">
                      {garage?.information?.tag}
                    </div>
                  )}
                </Flex>

                <div className="rounded-[10px] bg-[#F8F8F8] md:py-[12px] md:pl-[31px] md:my-[20px] py-[6px] my-[10px] pl-[10px]">
                  <div>
                    <div className="flex gap-x-2 items-center">
                      <IconClockHour8 color="#666666" />
                      <span className="md:text-base text-xs font-normal">
                        Thời gian làm việc:
                      </span>
                    </div>
                  </div>
                  <div className="flex md:text-base text-xs flex-col gap-y-2 mt-1">
                    {formatSchedulesNew(garage?.description?.times)}
                  </div>
                </div>

                {cart.map(item => {
                  const classify = getClassifiesFromCartOrOrder(item)
                  const {
                    discount_type,
                    originPrice,
                    promotePrice,
                    discount_number
                  } = getProductPriceWithDiscount(classify)

                  return (
                    <div className="my-[10px]" key={item.id}>
                      <div>
                        <div className="flex items-start gap-x-1 md:gap-x-2">
                          <img
                            src={getFileUrl(item.product.detail_info.images[0])}
                            className="md:w-[80px] md:h-[80px] h-[40px] w-[40px] rounded-md object-cover"
                          />
                          <div className="flex flex-col gap-1 md:gap-2">
                            <Stack gap={1}>
                              <label className="md:text-base text-sm font-medium line-clamp-2">
                                {item.product.detail_info.name}
                              </label>
                              {item.detail.classifies?.manufacture && (
                                <label className="md:text-sm text-xs font-normal">
                                  Năm sản xuất:{' '}
                                  {item.detail.classifies.manufacture}
                                </label>
                              )}
                            </Stack>
                            <div className="flex items-center justify-between">
                              <Flex gap="xs" align="center" wrap="wrap">
                                <span className="md:text-base text-sm font-medium">
                                  {item.count}
                                </span>
                                <span className="md:text-base text-sm font-medium">
                                  x
                                </span>
                                <span className="gradientText md:text-base text-sm font-medium">
                                  {formatNumber(promotePrice)}
                                </span>

                                {promotePrice !== originPrice && (
                                  <span className="text-sm font-medium line-through opacity-50 mt-[1px]">
                                    {formatNumber(originPrice)}
                                  </span>
                                )}
                              </Flex>

                              {/* <span className="gradientText md:text-base text-sm font-medium">
                             {formatNumber(promotePrice * item.count)}
                           </span> */}
                            </div>

                            {item?.detail?.accompanies?.map(
                              (i: any, idx: number) => {
                                const { color, label } = MapAccompaniesLabel?.[
                                  i.type
                                ] ?? { color: '', label: '' }
                                return (
                                  <div
                                    className="flex items-center gap-x-2"
                                    key={idx}
                                  >
                                    <div>
                                      <div className="flex gap-x-2 items-center">
                                        <div
                                          className="p-[1px] rounded-[7px] border-2"
                                          style={{
                                            color,
                                            borderColor: color
                                          }}
                                        >
                                          <div className="bg-white rounded-[7px] h-[20px] flex justify-center items-center md:w-[80px] w-[60px]">
                                            <span className="text-[10px] font-medium">
                                              {label}
                                            </span>
                                          </div>
                                        </div>
                                        <label className="font-normal text-sm">
                                          {i.name}
                                        </label>
                                      </div>
                                    </div>
                                    <div className="md:text-base text-sm">
                                      {formatNumber(i.price)}
                                    </div>
                                  </div>
                                )
                              }
                            )}
                          </div>
                        </div>
                      </div>
                      {/* <div className="hidden md:block">
                     <span className="gradientText text-base float-right font-bold">
                       {formatNumber(finalPrice(item))}
                     </span>
                   </div> */}
                    </div>
                  )
                })}

                <div
                  className="h-[40px] text-[14px] flex items-center px-[24px] rounded-[5px] text-main my-[20px]"
                  style={{
                    background:
                      'linear-gradient(91.49deg, rgba(37, 141, 186, 0.1) 1.26%, rgba(38, 211, 224, 0.1) 66.99%, rgba(139, 247, 200, 0.1) 126.97%)'
                  }}
                >
                  Đặt lịch miễn phí. Thanh toán tại gara
                </div>

                <Flex
                  direction="column"
                  gap="xs"
                  className="border-y border-[#E2E2E2] py-[15px]"
                >
                  <label className="md:text-base text-sm font-medium">
                    Cửa hàng {garage?.payment ? '' : 'không'} chấp nhận hình
                    thức thanh toán thẻ tín dụng ghi nợ.
                  </label>
                  <Flex
                    direction="column"
                    gap="xs"
                    className="font-medium pl-[10px] text-sm md:text-base"
                  >
                    {garage.payment?.money && <span>• Tiền mặt</span>}
                    {garage.payment?.banking && <span>• Chuyển khoản</span>}
                    {garage.payment?.card && (
                      <span>
                        • ATM/Thẻ quốc tế
                        <p className="opacity-50 md:text-sm text-xs">
                          Miễn phí dịch vụ thanh toán thẻ đối với giao dịch trên{' '}
                          {formatNumber(garage.payment['free-amount'])}
                        </p>
                      </span>
                    )}
                    {garage.payment?.['elect-wallet'] && (
                      <span>• Ví điện tử</span>
                    )}
                  </Flex>
                </Flex>

                <Flex
                  align="center"
                  justify="space-between"
                  className="my-[20px]"
                >
                  <label className="text-base font-medium">Tổng tiền:</label>
                  <span className="gradientText text-base font-bold">
                    {formatNumber(
                      cart.reduce(
                        (total: number, curr: any) => total + finalPrice(curr),
                        0
                      )
                    )}
                  </span>
                </Flex>
              </Box>

              <Button
                style={{
                  background:
                    'linear-gradient(91.57deg, #258DBA 1.33%, #26D3E0 63.56%, #8BF7C8 120.36%)'
                }}
                className="h-[48px] rounded-[10px] text-base border-0 w-full text-white"
                radius="md"
                disabled={!cart[0]}
                onClick={() =>
                  showScheduleWarning ? openMN() : handleCheckout()
                }
                loading={checkoutLoading}
              >
                Đặt lịch
              </Button>
            </div>
          </div>
        </Box>

        <FooterHome />

        <ModalSuccess opened={showMS} close={closeMS} code={code} />

        <ModalCustomer
          opened={showMC}
          close={closeMC}
          selectedProds={selectedProds}
          selectedInfo={selectedInfo}
          setSelectedInfo={setSelectedInfo}
        />

        <ModalNotice
          opened={showMN}
          close={closeMN}
          handleCheckout={handleCheckout}
        />
      </Box>
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ blur: 2 }}
      />
    </Fragment>
  )
}

export default Checkout
