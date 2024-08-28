'use client'

import {
  createCar,
  getBrand,
  getCarType,
  getUserId,
  updateCar
} from '@/apis/managecar'
import { useAuth } from '@/components/context/auth.context'
import {
  Box,
  Button,
  Flex,
  Image,
  Loader,
  LoadingOverlay,
  Modal,
  Select,
  Skeleton,
  Text,
  TextInput
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState
} from 'react'
import { Car } from '../CarManageBox'
import 'dayjs/locale/vi'
import { notifications } from '@mantine/notifications'

interface Props {
  opened: boolean
  close: () => void
  refech: () => Promise<void>
  car: Car
}

export const colors = [
  'Bạc',
  'Đen',
  'Đỏ',
  'Nâu',
  'Trắng',
  'Vàng',
  'Xám',
  'Xanh dương',
  'Xanh rêu'
]

const ModalEdit = ({ opened, close, car, refech }: Props) => {
  const [purpose, setPurpose] = useState('service')
  const [barnd, setBrand] = useState<{ label: string; value: string }[]>([])
  const [carTypeSelected, setCarTypeSelected] = useState<string | null>(null)
  const [carTypes, setCarTypes] = useState<{ label: string; value: string }[]>(
    []
  )

  const [loading, setLoading] = useState(false)

  const [mesType, setMessType] = useState(false)

  // const [barndId, setBrandId] = useState<string | null>();

  const form = useForm({
    initialValues: {
      license_plate: car.license_plate,
      brand: '',
      color: car.color,
      typeCar: '',
      insurance: car.detail.insurance ? new Date(car.detail.insurance) : '',
      maintenance: car.detail.maintenance
        ? new Date(car.detail.maintenance)
        : '',
      registry: car.detail.registry ? new Date(car.detail.registry) : '',
      year: car.detail.year
    },
    validateInputOnChange: true,
    validate: {
      license_plate: value => (value ? null : 'Nhập biển số xe'),
      color: value => (value ? null : 'Chọn màu sơn'),
      year: value => (value ? null : 'Nhập năm sản xuất'),
      brand: value => (value ? null : 'Chọn hãng xe')
    }
  })

  useEffect(() => {
    if (!opened) return

    setCarTypeSelected(car.carType?.id)
    setPurpose(car.detail.purpose)
    form.setFieldValue('brand', car.carType?.brand?.id)
  }, [opened])

  useEffect(() => {
    if (!opened) return
    const getBrands = async () => {
      const { data } = await getBrand()
      if (data) {
        const newData = data.map(item => {
          return {
            label: item.name,
            value: item.id
          }
        })
        setBrand(newData)
      }
    }
    getBrands()
  }, [opened])

  useEffect(() => {
    // form.setFieldValue("typeCar", "");
    setCarTypeSelected(null)
  }, [form.values.brand])

  useEffect(() => {
    if (!opened) return

    const getCarTypes = async () => {
      if (!form.values.brand) return
      const { data } = await getCarType(form.values.brand)
      if (carTypes.length === 0) {
        setCarTypeSelected(car.carType?.id)
      }
      if (data) {
        const newData = data.map(item => {
          return {
            label: item.name,
            value: item.id
          }
        })
        setCarTypes(newData)
      }
    }

    getCarTypes()
  }, [form.values.brand, opened])

  const findLabelFromValue = (
    options: { label: string; value: string }[],
    targetValue: string
  ) => {
    const option = options.find(opt => opt.value === targetValue)
    return option ? option.label : ''
  }

  const handleUpdate = async () => {
    const { hasErrors } = form.validate()
    setMessType(false)

    const type = findLabelFromValue(barnd, form.values.brand ?? '')
    const name = findLabelFromValue(carTypes, carTypeSelected ?? '')

    if (!Boolean(name)) {
      setMessType(true)
      return
    }

    if (!hasErrors) {
      setLoading(true)

      try {
        const dataform = form.getValues()

        const newData = {
          license_plate: dataform.license_plate,
          carType_id: carTypeSelected,
          color: dataform.color,
          type,
          name,
          detail: {
            insurance: dataform.insurance,
            maintenance: dataform.maintenance,
            registry: dataform.registry,
            year: dataform.year,
            purpose: purpose
          }
        }

        const res = await updateCar(newData, car.id)

        if (res.data) {
          close()
          refech()
          notifications.show({ message: 'Chỉnh sửa xe thành công' })
        }
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }
  }

  // const [overLoad, setverLoad] = useState(true)

  return (
    <Modal
      withCloseButton={false}
      size={'60rem'}
      opened={opened}
      onClose={close}
      radius={20}
      zIndex={100}
    >
      <Flex direction={'column'} gap={24} p={10}>
        <Text className="lg:text-[32px] text-[24px] font-medium text-center">
          Chỉnh sửa hồ sơ xe
        </Text>
        <form>
          <Box className="flex flex-col gap-2">
            <Box className="flex w-full gap-3 flex-col lg:flex-row">
              <TextInput
                label="Biển số xe"
                variant="filled"
                radius="md"
                placeholder="Nhập biển số xe"
                required
                className="flex-1"
                size="md"
                key={form.key('license_plate')}
                {...form.getInputProps('license_plate')}
              />
              <Select
                label="Nhãn hiệu"
                placeholder="Chọn xe"
                data={barnd ?? []}
                searchable
                required
                className="flex-1"
                size="md"
                variant="filled"
                radius="md"
                // onChange={(value) => handleBrandChange(value)}
                // value={"aad62e8d-8796-4675-9c15-22cd6e66e315"}
                {...form.getInputProps('brand')}
              />
              <Box className="lg:flex-1 w-full">
                <Select
                  label="Loại xe"
                  placeholder="Loại xe"
                  data={carTypes ?? []}
                  required
                  size="md"
                  variant="filled"
                  searchable
                  radius="md"
                  key={form.key('typeCar')}
                  value={carTypeSelected}
                  error={mesType}
                  onChange={value => {
                    setMessType(false)
                    if (!value) {
                      setMessType(true)
                    }
                    setCarTypeSelected(value)
                  }}
                />
                {mesType && (
                  <p className="text-[14px] text-[#FC6D6C]">Chọn loại xe</p>
                )}
              </Box>
              <Select
                label="Màu sơn"
                placeholder="Màu sơn"
                data={colors}
                searchable
                required
                size="md"
                variant="filled"
                radius="md"
                key={form.key('color')}
                {...form.getInputProps('color')}
              />
            </Box>
            <Box className="flex w-full gap-3 flex-col lg:flex-row">
              <Box className="flex-1">
                <Text className="font-medium">Mục đích sử dụng xe</Text>
                <Flex gap={4}>
                  <Button
                    w={'100%'}
                    style={
                      purpose === 'service'
                        ? {
                            background:
                              'var(--Gradient, linear-gradient(91deg, #258DBA 1.26%, #26D3E0 66.99%, #8BF6C8 126.97%))'
                          }
                        : {
                            background: '#F9F9FA',
                            color: 'black'
                          }
                    }
                    onClick={() => setPurpose('service')}
                    radius="md"
                    h={'42px'}
                    className="border-none"
                  >
                    {' '}
                    Xe dịch vụ
                  </Button>
                  <Button
                    w={'100%'}
                    radius="md"
                    style={
                      purpose === 'individual'
                        ? {
                            background:
                              'var(--Gradient, linear-gradient(91deg, #258DBA 1.26%, #26D3E0 66.99%, #8BF6C8 126.97%))'
                          }
                        : {
                            background: '#F9F9FA',
                            color: 'black'
                          }
                    }
                    onClick={() => setPurpose('individual')}
                    h={'42px'}
                    className="border-none"
                  >
                    {' '}
                    Xe cá nhân
                  </Button>
                </Flex>
              </Box>
              <TextInput
                label="Năm sản xuất"
                variant="filled"
                radius="md"
                required
                placeholder="Nhập năm sản xuất"
                className="w-full flex-1"
                size="md"
                key={form.key('year')}
                {...form.getInputProps('year')}
              />
              <DateInput
                label={
                  <Box>
                    <Box>
                      <Text className="font-medium">
                        Ngày đến hạn bảo dưỡng
                      </Text>
                    </Box>
                  </Box>
                }
                locale="vi"
                variant="filled"
                radius="md"
                rightSection={<Image src={'/svg/calendar.svg'} />}
                placeholder="Nhập"
                valueFormat="DD/MM/YYYY"
                className="w-full flex-1"
                size="md"
                key={form.key('maintenance')}
                {...form.getInputProps('maintenance')}
              />
            </Box>
            <Box className="flex gap-3">
              <DateInput
                label={
                  <Box>
                    <Box>
                      <Text className="font-medium">Bảo hiểm</Text>
                      <Text className="text-xs">Ngày hết hạn bảo hiểm</Text>
                    </Box>
                  </Box>
                }
                locale="vi"
                placeholder="Nhập ngày"
                valueFormat="DD/MM/YYYY"
                className="w-full flex-1"
                rightSection={<Image src={'/svg/calendar.svg'} />}
                size="md"
                variant="filled"
                radius="md"
                key={form.key('insurance')}
                {...form.getInputProps('insurance')}
              />
              <DateInput
                label={
                  <Box className="relative">
                    <Box>
                      <Text className="font-medium">Đăng kiểm</Text>
                      <Text className="text-xs">Ngày hết hạn đăng kiểm</Text>
                    </Box>
                  </Box>
                }
                locale="vi"
                placeholder="Nhập ngày"
                valueFormat="DD/MM/YYYY"
                rightSection={<Image src={'/svg/calendar.svg'} />}
                className="w-full flex-1"
                size="md"
                variant="filled"
                radius="md"
                key={form.key('registry')}
                {...form.getInputProps('registry')}
              />
            </Box>
            <Flex className="mt-2  gap-4">
              <Button
                size="lg"
                radius={'md'}
                onClick={close}
                disabled={loading}
                variant="outline"
                color="red"
                className="w-[50%] lg:w-[30%] h-[42px]"
              >
                Huỷ bỏ
              </Button>

              <Button
                style={{
                  background:
                    'var(--Gradient, linear-gradient(91deg, #258DBA 1.26%, #26D3E0 66.99%, #8BF6C8 126.97%))'
                }}
                size="lg"
                className="w-[50%] lg:w-[70%] border-none h-[42px]"
                radius={'md'}
                onClick={handleUpdate}
                disabled={loading}
              >
                {!loading ? 'Lưu lại' : <Loader color="blue" />}
              </Button>
            </Flex>
          </Box>
        </form>
      </Flex>
      {/* <LoadingOverlay
        visible={overLoad}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      /> */}
    </Modal>
  )
}

export default ModalEdit
