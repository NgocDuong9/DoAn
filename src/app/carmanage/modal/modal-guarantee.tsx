'use client'

import { ProductType } from '@/apis/client/interface'
import { userCreateWarranty } from '@/apis/client/warranty'
import {
  Button,
  Flex,
  Grid,
  GridCol,
  Image,
  Loader,
  Modal,
  Select,
  Text,
  TextInput
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { useEffect, useMemo, useState } from 'react'
import 'dayjs/locale/vi'

interface Props {
  opened: boolean
  close: () => void
  openSucces: () => void
  car: any
  type: string
  refetch: () => Promise<void>
}

type TimePeriod = {
  days?: number
  months?: number
  years?: number
}

const ModalGuarantee = ({
  opened,
  close,
  openSucces,
  car,
  type,
  refetch
}: Props) => {
  const [loading, setLoading] = useState(false)

  const form = useForm({
    initialValues: {
      product_name: '',
      count: '',
      garage_name: '',
      address: '',
      phone: '',
      buy_date: '',
      timeGuarantee: ''
    },
    validateInputOnChange: true,
    validate: {
      product_name: value =>
        value
          ? value.length <= 100
            ? null
            : 'Sản phẩm/dịch vụ không được vượt quá 100 ký tự'
          : 'Nhập sản phẩm/dịch vụ',
      count: value =>
        value
          ? value.length <= 3
            ? null
            : 'Số lượng không được vượt quá 3 ký tự'
          : null,
      garage_name: value => (value ? null : 'Nhập đơn vị bảo hành'),
      // address: (value) => (value ? null : "Address is required"),
      phone: value => {
        if (!value) return null
        const phoneRegex = /((09|03|07|08|05)+([0-9]{8})\b)/g
        if (!phoneRegex.test(value)) {
          return 'Số điện thoại không hợp lệ'
        }
        return null
      },
      buy_date: value => (value ? null : 'Chọn ngày mua'),
      timeGuarantee: value =>
        value
          ? value.length <= 5
            ? null
            : 'Thời gian bảo hành không được vượt quá 5 ký tự'
          : 'Nhập thời gian bảo hành'
    }
  })

  const formItems = [
    {
      name: 'product_name',
      label: 'Sản phẩm/dịch vụ',
      type: 'text',
      placeholder: 'Nhập tên sản phẩm/dịch vụ',
      required: true
    },
    {
      name: 'count',
      label: 'Số lượng',
      type: 'text',
      placeholder: 'Nhập số lượng',
      required: false
    },
    {
      name: 'garage_name',
      label: 'Đơn vị bảo hành',
      type: 'text',
      placeholder: 'Nhập tên đơn vị',
      required: true
    },
    {
      name: 'address',
      label: 'Địa chỉ',
      type: 'text',
      placeholder: 'Nhập địa chỉ',
      required: false
    },
    {
      name: 'phone',
      label: 'Số điện thoại',
      placeholder: 'Nhập số điện thoại',
      type: 'text',
      required: false
    }
  ]

  const [date, setDate] = useState('Ngày')

  function addTimeToDate(dateStr: string, period: TimePeriod): string {
    const date = new Date(dateStr) ?? new Date()

    if (period.years) {
      date.setFullYear(date.getFullYear() + period.years)
    }

    if (period.months) {
      date.setMonth(date.getMonth() + period.months)
    }

    if (period.days) {
      date.setDate(date.getDate() + period.days)
    }

    return date.toISOString()
  }
  const periodToAdd = useMemo(() => {
    if (date === 'Ngày') return { days: Number(form.getValues().timeGuarantee) }
    if (date === 'Tháng')
      return { months: Number(form.getValues().timeGuarantee) }
    if (date === 'Năm') return { years: Number(form.getValues().timeGuarantee) }
  }, [date, form.getValues().timeGuarantee])

  const dateEx = useMemo(() => {
    if (!form.getValues().buy_date || !periodToAdd) return 0
    const newDate = addTimeToDate(form.getValues().buy_date, periodToAdd)
    return newDate
  }, [form.getValues().buy_date, form.getValues().timeGuarantee, date])

  const handleCreate = async () => {
    const newData = {
      product_name: form.getValues().product_name,
      count: form.getValues().count,
      garage_name: form.getValues().garage_name,
      address: form.getValues().address,
      phone: form.getValues().phone,
      buy_date: form.getValues().buy_date,
      duration: form.getValues().timeGuarantee + ' ' + date,
      product_type: type,
      user_id: car.user_id,
      car_id: car.id,
      expried_at: dateEx ?? new Date()
    }

    const { hasErrors } = form.validate()

    if (!hasErrors) {
      setLoading(true)
      try {
        //@ts-ignore
        const create = await userCreateWarranty({ body: newData })
        if (create.data) {
          form.reset()
          close()
          openSucces()
          refetch()
        }
      } catch (error) {
        console.error('Failed to create warranty:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  const renderTitle = useMemo(() => {
    if (type === ProductType.LOP) return 'lốp'
    if (type === ProductType.AC_QUY) return 'ắc quy'
    if (type === ProductType.CUU_HO) return 'cứu hộ'
    if (type === ProductType.DO_XE) return 'độ xe'
    if (type === ProductType.PHU_TUNG) return 'phụ tùng'
  }, [type])

  const handleClose = () => {
    close()
    form.reset()
  }

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Modal
      withCloseButton={false}
      size={'xl'}
      opened={opened}
      onClose={handleClose}
      radius={20}
      zIndex={100}
    >
      <Flex direction={'column'} gap={24} p={10}>
        <Text className="lg:text-[32px] text-[20px] font-medium text-center">
          Tạo bảo hành {renderTitle}
        </Text>
        <form onSubmit={form.onSubmit(handleCreate)}>
          <Grid>
            {formItems.map((item, idx) => (
              <Grid.Col span={isMobile ? 12 : 6} key={idx}>
                <TextInput
                  label={item.label}
                  variant="filled"
                  radius="md"
                  placeholder={item.placeholder}
                  required={item.required}
                  className=""
                  size="md"
                  key={form.key(item.name)}
                  error={form.errors[item.name]}
                  {...form.getInputProps(item.name)}
                />
              </Grid.Col>
            ))}
            <GridCol span={isMobile ? 12 : 6}>
              <DateInput
                locale="vi"
                label={'Ngày mua'}
                placeholder="Chọn ngày"
                valueFormat="DD/MM/YYYY"
                className="w-full flex-1"
                size="md"
                required
                rightSection={<Image src={'/svg/calendar.svg'} />}
                variant="filled"
                radius="md"
                key={form.key('buy_date')}
                error={form.errors.buy_date}
                {...form.getInputProps('buy_date')}
              />
            </GridCol>
            <GridCol span={12}>
              <TextInput
                label={'Thời hạn bảo hành'}
                variant="filled"
                radius="md"
                type="number"
                rightSection={
                  <div className="w-[200px] relative">
                    <Select
                      placeholder="Chọn đơn vị"
                      data={['Tháng', 'Năm']}
                      size="md"
                      className="absolute right-[0px] top-[-20px]"
                      variant="unstyled"
                      radius="md"
                      w={150}
                      checkIconPosition={'right'}
                      value={date}
                      onChange={e => {
                        if (e) {
                          setDate(e)
                        } else {
                          setDate('months')
                        }
                      }}
                    />
                  </div>
                }
                placeholder={isMobile ? 'Thời hạn' : 'Nhập thời hạn bảo hành'}
                required
                className="flex-1"
                size="md"
                key={form.key('timeGuarantee')}
                error={form.errors.timeGuarantee}
                {...form.getInputProps('timeGuarantee')}
              />
            </GridCol>
            <GridCol span={12}>
              <Flex className="mt-2  gap-4">
                <Button
                  size="lg"
                  radius={'md'}
                  onClick={handleClose}
                  disabled={loading}
                  variant="outline"
                  color="red"
                  className="w-[50%] h-[42px] lg:w-[30%]"
                >
                  Huỷ
                </Button>
                <Button
                  style={{
                    background:
                      'var(--Gradient, linear-gradient(91deg, #258DBA 1.26%, #26D3E0 66.99%, #8BF6C8 126.97%))'
                  }}
                  size="lg"
                  className="w-[50%] lg:w-[70%] h-[42px] border-none"
                  radius={'md'}
                  onClick={handleCreate}
                  // type="submit"
                >
                  {!loading ? 'Tạo' : <Loader color="blue" />}
                </Button>
              </Flex>
            </GridCol>
          </Grid>
        </form>
      </Flex>
    </Modal>
  )
}

export default ModalGuarantee
