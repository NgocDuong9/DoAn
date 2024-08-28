import { navigate } from '@/apis/auth'
import { useCart } from '@/components/context/cart.context'
import {
  formatNumber,
  formatPrice,
  getProductPriceWithDiscount
} from '@/utils/formatPrice'
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Image,
  Rating,
  Select,
  Text
} from '@mantine/core'

import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { IconMapPin } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import districts from '../../assets/address/district.json'

import province from '../../assets/address/province.json'
import Link from 'next/link'
import { MapAccompaniesLabel } from '@/types/order'
import { useMediaQuery } from '@mantine/hooks'
import AuthButton from '@/components/custom/button/auth-button'
import { getFileUrl } from '@/utils/images'

interface Address {
  id: string
  ward: string
  address: string
  user_id: string | null
  district: string
  location: string | null
  province: string
  garage_id: string
}

interface Garage {
  id: string
  fee: number | null
  tag: string
  name: string
  size: number | null
  year: number | null
  email: string
  phone: string
  avatar: string
  device: string | null
  status: boolean
  acreage: number
  address: Address[]
  hotline: string
  product: string[]
  service: string[]
  taxCode: string
  openTime: string | null
  closeTime: string | null
  description: string
  merchant_id: string
}

interface SellInfo {
  price: number
  stock: string
  dateGuarantee: number
  typeGuarantee: string
}

interface DetailInfo {
  name: string
  images: string[]
  videos: string[]
  timeWork: number
  description: string
  key_vehicle: string[]
}

interface CardGaraProps {
  id: string
  name: string
  type: string
  price: number | null
  garage: Garage
  status: boolean
  verify: boolean
  garage_id: string
  sell_info: SellInfo
  created_at: string
  key_search: string[]
  product_id: string
  updated_at: string
  category_id: string
  collections: string | null
  description: string
  detail_info: DetailInfo
  array_fields: string[]
  category_code: string
}

interface YearProps {
  value: string
  label: string
}

// @ts-ignore
const CardGara = ({ data }: CardGaraProps) => {
  const router = useRouter()
  const [count, setCount] = useState(1)
  const [manufacture, setManufacture] = useState(0)
  const [year, setYear] = useState<YearProps[]>()
  const [address, setAddress] = useState('')

  const isMobile = useMediaQuery('(max-width: 768px)')

  const form = useForm({
    mode: 'uncontrolled'
  })
  const { addToCart: addProdToCart } = useCart()

  const findAddressByCode = (codeDistrict: string, codeCity: string) => {
    //@ts-ignore
    const city = province[codeCity]

    //@ts-ignore
    const district = districts[codeDistrict]
    if (!city || !district) return ''
    return district?.name + ', ' + city.name
  }

  const addToCart = async () => {
    try {
      const { accompanies } = form.getValues()
      return await addProdToCart(
        {
          count,
          product_id: data.id,
          detail: {
            classifies: data.sell_info.classifies?.[manufacture],
            accompanies: accompanies?.map((i: string) => JSON.parse(i)) || []
          }
        },
        {
          onSuccess() {
            notifications.show({ message: 'Đã thêm vào giỏ hàng' })
          }
        }
      )
    } catch (error) {
      console.error(error)
    }
  }

  const buyNow = async () => {
    const res: any = await addToCart()

    if (res?.data?.id) {
      router.push(`/checkout?list=${res.data.id}`)
    }
  }

  function shortenText(text: string): string {
    if (isMobile) return text
    if (text.length > 15) {
      return text.substring(0, 15) + '...'
    }
    return text
  }

  useEffect(() => {
    if (data.category_code !== 'LOP') return
    //@ts-ignore
    const option = data.sell_info.classifies.map((item, index) => {
      return {
        value: String(index),
        label: String(item.manufacture)
      }
    })
    setYear(option)

    if (data.garage.address) {
      const addr = findAddressByCode(
        data.garage.address.district,
        data.garage.address.province
      )
      setAddress(addr)
    }
  }, [data])

  const isEmpty = (obj: object): boolean => {
    if (!obj) return false
    return Object.keys(obj).length === 0
  }
  const { discount_type, originPrice, promotePrice, discount_number } =
    data.category_code === 'LOP'
      ? getProductPriceWithDiscount(data.sell_info.classifies[manufacture])
      : getProductPriceWithDiscount(data.sell_info)

  return (
    <>
      {data.status && (
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-2">
          <div className="flex gap-3">
            <Image
              src={getFileUrl(data?.garage?.avatar)}
              radius={10}
              className="md:w-[80px] md:h-[80px] w-[40px] h-[40px] aspect-square object-cover"
              style={{
                backgroundImage:
                  'radial-gradient(496.37% 143.51% at 101.05% 3.36%, rgba(139, 246, 200, 0.62) 0%, #B9E1EC 51.56%, #FFF 100%)'
              }}
            />
            <Box>
              <Box className="flex flex-col md:gap-1 gap-0">
                <Box className="flex gap-4 items-center flex-wrap">
                  <Link href={`/search/garage/${data?.garage.id}`}>
                    <div className="font-semibold cursor-pointer text-main text-lg">
                      {data.garage.name}
                    </div>
                  </Link>
                  {data.garage.tag && (
                    <Text
                      size="12px"
                      className="p-2 bg-[#F1B44C] text-white rounded-lg font-semibold"
                    >
                      {data.garage.tag}
                    </Text>
                  )}
                </Box>
                <Box
                  display={'flex'}
                  className="gap-2 items-center text-xs flex-wrap"
                >
                  <Rating
                    fractions={4}
                    value={data?.product_sold?.rating ?? 5}
                    readOnly
                    size={10}
                  />
                  <Text size="12px" className="font-bold">
                    {data?.product_sold?.rating?.toFixed(1) ?? 5}
                  </Text>
                  <Text size="12px" c={'#E2E2E2'}>
                    |
                  </Text>
                  <Text size="12px" className="">
                    {data?.product_sold?.count_rating ?? 0} đánh giá
                  </Text>
                  <Text size="12px" c={'#E2E2E2'}>
                    |
                  </Text>
                  {data?.garage.information.address && (
                    <Text size="12px" className="flex  items-center">
                      <IconMapPin size="12px" />{' '}
                      <Text>
                        {shortenText(data?.garage.information.address)}
                      </Text>
                    </Text>
                  )}

                  {address && (
                    <>
                      <Text size="12px" c={'#E2E2E2'}>
                        |
                      </Text>
                      <Text size="12px" className="flex  items-center">
                        <Text>{address}</Text>
                      </Text>
                    </>
                  )}
                </Box>
                {data.category_code === 'LOP' ? (
                  <Box className="flex gap-8 items-center flex-wrap">
                    <Box className="flex gap-2 items-center flex-wrap min-h-[36px]">
                      <Text className="font-bold md:text-lg text-base">
                        {/* {data.sell_info.classifies[manufacture]
                          .discount_number &&
                          (data.sell_info.classifies[manufacture]
                            .discount_type === 'CURRENCY'
                            ? formatNumber(
                                data.sell_info.classifies[manufacture].price -
                                  data.sell_info.classifies[manufacture]
                                    .discount_number
                              )
                            : formatNumber(
                                (data.sell_info.classifies[manufacture].price *
                                  (100 -
                                    data.sell_info.classifies[manufacture]
                                      .discount_number)) /
                                  100
                              ))} */}
                        {formatPrice(promotePrice)}
                      </Text>
                      {/* {data.sell_info.classifies && (
                        <>
                          <Text
                            size="16px"
                            className="line-through text-gray-400"
                          >
                            {data.sell_info.classifies[manufacture].price &&
                              formatNumber(
                                data.sell_info.classifies[manufacture].price
                              )}
                          </Text>
                        </>
                      )} */}
                      {originPrice !== promotePrice && (
                        <Text
                          size="16px"
                          className="line-through text-gray-400"
                        >
                          {formatPrice(originPrice)}
                        </Text>
                      )}
                    </Box>
                  </Box>
                ) : (
                  <Box className="flex gap-8 items-center flex-wrap">
                    <Box className="flex gap-2 items-center flex-wrap min-h-[36px]">
                      <div className="font-bold md:text-lg text-base">
                        {formatPrice(promotePrice)}
                      </div>

                      {originPrice !== promotePrice && (
                        <div className="text-sm md:text-base line-through text-gray-400">
                          {formatNumber(originPrice)}
                        </div>
                      )}
                    </Box>
                  </Box>
                )}
                <Box className="flex gap-4 font-semibold items-center flex-wrap">
                  {data.category_code === 'LOP' && (
                    <div className="flex gap-3 justify-center items-center">
                      <div className="text-sm md:text-base whitespace-nowrap font-normal">
                        Năm sản xuất
                      </div>
                      <Box>
                        {year && (
                          <Select
                            placeholder="Năm"
                            data={year}
                            clearable={false}
                            w={'100px'}
                            checkIconPosition={'right'}
                            selectFirstOptionOnChange={false}
                            radius={'8px'}
                            defaultValue={
                              year && year[0] ? year[0].value : '2024'
                            }
                            className="bg-[#F8F8F8]"
                            onChange={e => {
                              setManufacture(Number(e))
                            }}
                          />
                        )}
                      </Box>
                    </div>
                  )}
                  {data.type === 'SAN_PHAM' && (
                    <Box className="flex gap-3 text-[14px] items-center">
                      <div className="text-sm md:text-base whitespace-nowrap font-normal">
                        Số lượng
                      </div>
                      <div className="flex items-center gap-x-2">
                        <button
                          onClick={() => setCount(count - 1)}
                          disabled={count === 1}
                          className="text-xl"
                        >
                          -
                        </button>
                        <Text
                          size="20px"
                          className="md:mt-1 bg-[#F8F8F8] w-[48px] h-[32px] flex items-center justify-center"
                        >
                          <span className="">{count}</span>
                        </Text>
                        <button
                          onClick={() => setCount(count + 1)}
                          className="text-xl"
                        >
                          +
                        </button>
                      </div>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </div>
          <div>
            {data.sell_info.accompanies &&
              !isEmpty(data.sell_info.accompanies[0]) && (
                <div className="mt-2">
                  <Box className="flex flex-col gap-4">
                    <form>
                      <Checkbox.Group
                        defaultValue={['react']}
                        key={form.key('accompanies')}
                        {...form.getInputProps('accompanies')}
                      >
                        {data.sell_info.accompanies &&
                          //@ts-ignore
                          data.sell_info.accompanies.map(item => {
                            return (
                              <Checkbox
                                size={isMobile ? 'xs' : 'sm'}
                                label={
                                  <div className="text-xs md:text-base flex gap-2 items-center -mt-1 pb-3">
                                    <div
                                      className={`px-2 py-1 rounded-md md:border-2 border-1 font-semibold text-xs whitespace-nowrap`}
                                      style={{
                                        color:
                                          MapAccompaniesLabel?.[item.type]
                                            ?.color,
                                        borderColor:
                                          MapAccompaniesLabel?.[item.type]
                                            ?.color
                                      }}
                                    >
                                      {MapAccompaniesLabel?.[item.type]?.label}
                                    </div>
                                    <Box className="flex gap-x-2 items-center">
                                      <div className="text-main text-sm">
                                        {item.name}
                                      </div>

                                      {item.price > 0 && (
                                        <div className="text-main text-xs font-semibold ">
                                          {item.price &&
                                            formatNumber(Number(item.price))}
                                        </div>
                                      )}
                                    </Box>
                                  </div>
                                }
                                color={'#52BAE6'}
                                value={JSON.stringify(item)}
                              />
                            )
                          })}
                      </Checkbox.Group>
                    </form>
                  </Box>
                </div>
              )}
          </div>

          <Box className="gap-2.5 flex md:mt-2 flex-wrap content-start justify-end">
            <AuthButton onClick={addToCart}>
              <Button
                variant="outline"
                color="#52BAE6"
                className="md:h-[42px] h-8 rounded-[10px] flex-1 md:flex-none"
              >
                <Image src="/svg/shoppingcart.svg" className="h-4 md:h-5" />
              </Button>
            </AuthButton>
            <AuthButton onClick={buyNow}>
              <Button
                variant="filled"
                color="linear-gradient(91deg, #258DBA 1.26%, #26D3E0 66.99%, #8BF6C8 126.97%)"
                radius="xs"
                className="md:w-[190px] border-none flex-1 md:flex-none md:rounded-lg rounded-md md:h-[42px] h-8"
              >
                <Text className="font-semibold  text-sm md:text-base">
                  Đặt ngay
                </Text>
              </Button>
            </AuthButton>
          </Box>
        </div>
      )}
    </>
  )
}

export default CardGara
