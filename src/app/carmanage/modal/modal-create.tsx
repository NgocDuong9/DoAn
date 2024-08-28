import { createCar, getBrand, getCarType } from '@/apis/managecar'
import {
  Box,
  Button,
  Flex,
  Image,
  Loader,
  Modal,
  Select,
  Text,
  TextInput
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'
import { colors } from './modal-edit'
import 'dayjs/locale/vi'
import { IconClose } from '@/components/ui/icons'
import { notifications } from '@mantine/notifications'

interface Props {
  opened: boolean
  close: () => void
  refetch: () => Promise<void>
}

const ModalCreate = ({ opened, close, refetch }: Props) => {
  const [purpose, setPurpose] = useState('service')
  const [barnd, setBrand] = useState<{ label: string; value: string }[]>([])
  const [carTypeSelected, setCarTypeSelected] = useState<string | null>(null)
  const [carTypes, setCarTypes] = useState<{ label: string; value: string }[]>(
    []
  )
  const [barndId, setBrandId] = useState<string | null>()

  const [mesbrand, setMessBrand] = useState(false)
  const [mesType, setMessType] = useState(false)

  const [loading, setLoading] = useState(false)

  const form = useForm({
    initialValues: {
      license_plate: '',
      color: '',
      insurance: '',
      maintenance: '',
      registry: '',
      year: ''
    },
    validateInputOnChange: true,
    validate: {
      license_plate: value => (value ? null : 'Vui lòng nhập biển số xe'),
      color: value => (value ? null : 'Vui lòng chọn màu sơn'),
      year: value => (value ? null : 'Vui lòng nhập năm sản xuất')
    }
  })

  useEffect(() => {
    form.reset()
    setCarTypeSelected(null)
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

  const handleBrandChange = async (value: string | null) => {
    form.setFieldValue('typeCar', '')
    setBrandId(value)
    setCarTypeSelected(null)
  }

  useEffect(() => {
    if (!opened) return
    const getCarTypes = async () => {
      if (!barndId) return
      const { data } = await getCarType(barndId)
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
    // setCarTypes([]);
  }, [barndId, opened])

  const findLabelFromValue = (
    options: { label: string; value: string }[],
    targetValue: string
  ) => {
    const option = options.find(opt => opt.value === targetValue)
    return option ? option.label : ''
  }

  const handleCreate = async () => {
    const { hasErrors } = form.validate()
    setMessBrand(false)
    setMessType(false)

    const type = findLabelFromValue(barnd, barndId ?? '')
    const name = findLabelFromValue(carTypes, carTypeSelected ?? '')

    if (!Boolean(type) && !Boolean(type)) {
      setMessBrand(true)
      setMessType(true)
      return
    }

    if (!Boolean(type)) {
      setMessBrand(true)
      return
    }

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

        const res = await createCar(newData)
        if (res.data) {
          close()
          refetch()
          notifications.show({ message: 'Tạo mới xe thành công' })
        }
      } catch (error) {
      } finally {
        setLoading(false)
        // close();
      }
    }
  }

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
        <div onClick={close} className="absolute top-5 right-5 cursor-pointer">
          <IconClose fontSize={24} />
        </div>
        <Text className="lg:text-[32px] text-[24px] font-medium text-center ">
          Tạo hồ sơ xe
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
                className="lg:flex-1 w-full"
                size="md"
                key={form.key('license_plate')}
                {...form.getInputProps('license_plate')}
              />
              <Box className="lg:flex-1 w-full">
                <Select
                  label="Nhãn hiệu"
                  placeholder="Chọn xe"
                  data={barnd ?? []}
                  required
                  searchable
                  size="md"
                  variant="filled"
                  radius="md"
                  error={mesbrand}
                  onChange={value => {
                    setMessBrand(false)
                    if (!value) {
                      setMessBrand(true)
                    }
                    handleBrandChange(value)
                  }}
                  // {...form.getInputProps("brand")}
                />
                {mesbrand && (
                  <p className="text-[14px] text-[#FC6D6C]">
                    Vui lòng chọn nhãn hiệu
                  </p>
                )}
              </Box>
              <Box className="lg:flex-1 w-full">
                <Select
                  label="Loại xe"
                  placeholder="Loại xe"
                  data={carTypes ?? []}
                  required
                  searchable
                  size="md"
                  variant="filled"
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
                  <p className="text-[14px] text-[#FC6D6C]">
                    Vui lòng chọn loại xe
                  </p>
                )}
              </Box>
              <Select
                label="Màu sơn"
                placeholder="Màu sơn"
                data={colors}
                searchable
                required
                size="md"
                className="lg:flex-1 w-full"
                variant="filled"
                radius="md"
                key={form.key('color')}
                {...form.getInputProps('color')}
              />
            </Box>
            <Box className="flex w-full gap-3 flex-col lg:flex-row">
              <Box className="flex-1">
                <Text className="font-medium border-none">
                  Mục đích sử dụng xe
                </Text>
                <Flex gap={4}>
                  <Button
                    w={'100%'}
                    h={'42px'}
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
                    className="border-none"
                  >
                    {' '}
                    Xe dịch vụ
                  </Button>
                  <Button
                    w={'100%'}
                    radius="md"
                    h={'42px'}
                    className="border-none"
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
                  <Box className="relative">
                    <Box>
                      <Text className="font-medium">
                        Ngày đến hạn bảo dưỡng
                      </Text>
                    </Box>
                  </Box>
                }
                locale="vi"
                variant="filled"
                rightSection={<Image src={'/svg/calendar.svg'} />}
                radius="md"
                placeholder="Nhập ngày"
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
                  <Box className="relative">
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
                size="md"
                rightSection={<Image src={'/svg/calendar.svg'} />}
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
                className="w-full flex-1"
                size="md"
                rightSection={<Image src={'/svg/calendar.svg'} />}
                variant="filled"
                radius="md"
                key={form.key('registry')}
                {...form.getInputProps('registry')}
              />
            </Box>
            <Button
              w={'100%'}
              className="mt-2 border-none h-[42px]"
              style={{
                background:
                  'var(--Gradient, linear-gradient(91deg, #258DBA 1.26%, #26D3E0 66.99%, #8BF6C8 126.97%))'
              }}
              size="lg"
              radius={'md'}
              onClick={handleCreate}
              disabled={loading}
            >
              {!loading ? ' Tạo ngay' : <Loader color="blue" />}
            </Button>
          </Box>
        </form>
      </Flex>
    </Modal>
  )
}

export default ModalCreate
