import {
  Box,
  Button,
  Flex,
  Image,
  Select,
  Text,
  TextInput
} from '@mantine/core'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { getBrand, getCarType } from '@/apis/managecar'

import BoxTime from '../component/BoxTime'
import { Car } from '../CarManageBox'
import { DateInput } from '@mantine/dates'
import { IconPencil, IconWheel } from '@tabler/icons-react'
import ModalEdit, { colors } from '../modal/modal-edit'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import Describe from '../component/Describe'
import { ProductType } from '@/apis/client/interface'
import { getFileUrl, onErrorHandlerCar } from '@/utils/images'

interface Props {
  car: Car
  refech: () => Promise<void>
}

const DetailCar = ({ car, refech }: Props) => {
  const [purpose, setPurpose] = useState('service')
  const [barnd, setBrand] = useState<{ label: string; value: string }[]>([])
  const [carTypeSelected, setCarTypeSelected] = useState<string | null>(null)
  const [carTypes, setCarTypes] = useState<{ label: string; value: string }[]>(
    []
  )
  const [edit, { open, close }] = useDisclosure(false)

  // const [barndId, setBrandId] = useState<string | null>();
  // const [loading, { toggle }] = useDisclosure(false);

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
    }
  })

  useEffect(() => {
    setCarTypeSelected(car.carType?.id)
    setPurpose(car.detail.purpose)
    form.setFieldValue('brand', car.carType?.brand?.id)
  }, [])

  useEffect(() => {
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
  }, [])

  useEffect(() => {
    // form.setFieldValue("typeCar", "");
    setCarTypeSelected(null)
  }, [form.values.brand])

  useEffect(() => {
    const getCarTypes = async () => {
      if (!form.values.brand) return
      const { data } = await getCarType(form.values.brand)
      setCarTypeSelected(car.carType?.id)
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
  }, [form.values.brand])

  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <Box>
      <Box
        w={isMobile ? 300 : 800}
        h={isMobile ? 150 : 300}
        style={{
          borderRadius: '805px',
          background:
            'linear-gradient(90deg, rgba(82, 186, 230, 0.80) 0%, rgba(103, 242, 209, 0.80) 50.5%, rgba(81, 194, 167, 0.80) 100%)',
          filter: 'blur(200px)'
        }}
        className="absolute left-[50%] -translate-x-[50%] top-[300px] -z-1"
      ></Box>
      <Box
        w={'100%'}
        style={{
          minHeightheight: '100vh',
          marginTop: '190px',
          zIndex: 2
        }}
        className="flex flex-col max-w-main mx-auto"
      >
        <Box className="absolute top-[60px]  w-full  hidden lg:block">
          <Image
            src={'/svg/ellipse2.svg'}
            className=" absolute h-[429px] w-[429px] top-20  object-contain z-30"
          />
          <Image
            src={'/svg/cirlemanage2.svg'}
            className=" absolute h-[140px] w-[140px] top-[220px] left-[60px]  object-contain z-30"
          />
          <Box className="absolute w-[134px] h-[100px] top-[130px] left-[163px] group group-fill-white">
            <Image
              src={'/icons/xoay.png'}
              className="absolute  object-contain z-30  top-[-60px] left-[-52px] rotate-[-109deg] opacity-0 group-hover:opacity-100"
            />
            <Image
              src={'/svg/bg6.svg'}
              className="absolute h-6 -left-[10px] w-max object-contain top-1 lef-[-2px] z-30 fill-white-1"
            />
            <Describe
              top="-84px"
              left="15px"
              car={car}
              type={ProductType.DO_XE}
              refreshData={refech}
            />
          </Box>
          <Box className="absolute w-[134px] top-[199px] left-[240px] group group-fill-white">
            <Image
              src={'/icons/xoay.png'}
              className="absolute  object-contain z-30  top-[-66px] left-[-52px] rotate-[-72deg] opacity-0 group-hover:opacity-100"
            />
            <Image
              src={'/svg/bg7.svg'}
              className=" absolute h-6 w-max top-[-10px] left-[-10px]  object-contain z-30 fill-white-1"
            />
            <Describe
              top="-79px"
              left="32px"
              car={car}
              type={ProductType.CUU_HO}
              refreshData={refech}
            />
          </Box>
          <Box className="absolute h-6  w-[134px] top-[295px] left-[268px] group group-fill-white">
            <Image
              src={'/icons/xoay.png'}
              className="absolute  object-contain z-30  top-[-66px] left-[-52px] rotate-[-39deg] opacity-0 group-hover:opacity-100"
            />
            <IconWheel className=" absolute h-6 w-max top-[-10px] object-contain z-30 fill-white-1" />
            <Describe
              top="-54px"
              left="42px"
              car={car}
              type={ProductType.LOP}
              refreshData={refech}
              // run={run}
            />
          </Box>

          <Box className="absolute h-6  w-[134px] top-[378px] left-[246px] group group-fill-white">
            <Image
              src={'/icons/xoay.png'}
              className="absolute  object-contain z-30  top-[-66px] left-[-52px] rotate-[-10deg] opacity-0 group-hover:opacity-100"
            />
            <Image
              src={'/svg/bg8.svg'}
              className=" absolute h-6 w-max top-[-10px] object-contain z-30 fill-white-1"
            />
            <Describe
              top="-40px"
              left="40px"
              car={car}
              type={ProductType.AC_QUY}
              refreshData={refech}
            />
          </Box>

          <Box className="absolute h-6  w-[134px] top-[445px] left-[172px] group group-fill-white">
            <Image
              src={'/icons/xoay.png'}
              className="absolute  object-contain z-30  top-[-66px] left-[-52px] rotate-[26deg] opacity-0 group-hover:opacity-100"
            />

            <Image
              src={'/svg/bg9.svg'}
              className=" absolute h-6 w-max top-[-12px] left-1 object-contain z-30 fill-white-1"
            />
            <Describe
              top="-20px"
              left="26px"
              car={car}
              type={ProductType.PHU_TUNG}
              refreshData={refech}
            />
          </Box>
        </Box>
        <Image
          src={car ? getFileUrl(car?.carType?.image) : '/background/carbg.png'}
          onError={onErrorHandlerCar}
          className={`z-2 relative lg:w-[900px] max-h-[375px] w-[80%] mx-auto object-contain ${!car?.carType?.image && '-mt-48'}`}
        />
      </Box>
      <div className="flex flex-col gap-2 lg:mt-[120px] items-center justify-center md:pt-14 pb-5">
        <Text className="text-2xl md:text-4xl text-main font-semibold">
          Hồ sơ xe
        </Text>
        <Flex
          gap={12}
          align={'center'}
          justify={'center'}
          className="relative lg:w-main mt-[70px] lg:mt-8 lg:w-[1140px]"
        >
          {car.detail.maintenance && (
            <BoxTime
              title="Bảo dưỡng"
              time={car.detail.maintenance}
              wfull={true}
            />
          )}
          {car.detail.registry && (
            <BoxTime
              title="Đăng kiểm"
              time={car.detail.registry}
              wfull={true}
            />
          )}
          {car.detail.insurance && (
            <BoxTime
              title="Bảo hiểm"
              time={car.detail.insurance}
              wfull={true}
            />
          )}
          <Box className="absolute lg:right-0 top-[-80px] right-[calc(50% - 139px)]">
            <Text
              className=" border-[#24CCD9] cursor-pointer py-[8px] px-[16px] text-center border rounded-lg font-semibold flex gap-1"
              onClick={open}
              style={{
                background:
                  'var(--Gradient, linear-gradient(91deg, #258DBA 1.26%, #26D3E0 66.99%, #8BF6C8 126.97%))',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              <Box className="hidden md:block">
                <Image src={'/svg/pencil.svg'} w={24} h={24} />
              </Box>
              <p className="text-nowrap text-xs md:text-base">Chỉnh sửa</p>
            </Text>
          </Box>
        </Flex>
        <Box>
          <Flex direction={'column'} gap={24} p={10} className="lg:w-[1140px]">
            <form>
              <Box className="flex flex-col gap-2">
                <Box className="flex w-full gap-3 flex-col lg:flex-row">
                  <TextInput
                    label="Biển số xe"
                    variant="filled"
                    radius="md"
                    placeholder="Chọn"
                    required
                    className="flex-1"
                    size="md"
                    readOnly
                    key={form.key('license_plate')}
                    {...form.getInputProps('license_plate')}
                  />
                  <Select
                    label="Nhãn hiệu"
                    placeholder="Chọn xe"
                    data={barnd ?? []}
                    required
                    readOnly
                    className="flex-1"
                    size="md"
                    variant="filled"
                    radius="md"
                    // onChange={(value) => handleBrandChange(value)}
                    // value={"aad62e8d-8796-4675-9c15-22cd6e66e315"}
                    {...form.getInputProps('brand')}
                  />
                  <Select
                    label="Loại xe"
                    placeholder="Loại xe"
                    data={carTypes ?? []}
                    required
                    readOnly
                    className="flex-1"
                    size="md"
                    variant="filled"
                    radius="md"
                    key={form.key('typeCar')}
                    value={carTypeSelected}
                    onChange={value => {
                      setCarTypeSelected(value)
                    }}
                    // {...form.getInputProps("typeCar")}
                  />
                  <Select
                    label="Màu sơn"
                    placeholder="Màu sơn"
                    data={colors}
                    required
                    readOnly
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
                        style={{
                          background:
                            'var(--Gradient, linear-gradient(91deg, #258DBA 1.26%, #26D3E0 66.99%, #8BF6C8 126.97%))'
                        }}
                        radius="md"
                        className="border-none h-[42px]"
                      >
                        {purpose === 'service' ? 'Xe dịch vụ' : 'Xe cá nhân'}
                      </Button>
                    </Flex>
                  </Box>
                  <TextInput
                    label="Năm sản xuất"
                    variant="filled"
                    radius="md"
                    required
                    readOnly
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
                    variant="filled"
                    radius="md"
                    readOnly
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
                    readOnly
                    label={
                      <Box>
                        <Box>
                          <Text className="font-medium">Bảo hiểm</Text>
                          <Text className="text-xs">Ngày hết hạn bảo hiểm</Text>
                        </Box>
                      </Box>
                    }
                    placeholder="Nhập"
                    valueFormat="DD/MM/YYYY"
                    rightSection={<Image src={'/svg/calendar.svg'} />}
                    className="w-full flex-1"
                    size="md"
                    variant="filled"
                    radius="md"
                    key={form.key('insurance')}
                    {...form.getInputProps('insurance')}
                  />
                  <DateInput
                    readOnly
                    label={
                      <Box>
                        <Box>
                          <Text className="font-medium">Đăng kiểm</Text>
                          <Text className="text-xs">
                            Ngày hết hạn đăng kiểm
                          </Text>
                        </Box>
                      </Box>
                    }
                    placeholder="Nhập"
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
              </Box>
            </form>
          </Flex>
        </Box>
      </div>

      <ModalEdit close={close} opened={edit} refech={refech} car={car} />
    </Box>
  )
}

export default DetailCar
