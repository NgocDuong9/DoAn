'use client'

import { useCart } from '@/components/context/cart.context'
import FooterHome from '@/components/footer'
import HeaderBar from '@/components/header/header'
import { formatNumber, getProductPriceWithDiscount } from '@/utils/formatPrice'
import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  Image,
  LoadingOverlay,
  rem
} from '@mantine/core'
import { useRouter } from 'next/navigation'
import { Fragment, useMemo, useState } from 'react'
import Accompanies from './Accompanies'
import QuantityInput from './QuantityInput'
import Link from 'next/link'
import { getFileUrl } from '@/utils/images'
import { useMediaQuery } from '@mantine/hooks'
import classNames from 'classnames'
import { getClassifiesFromCartOrOrder } from '@/utils'

const Cart: React.FC = () => {
  const router = useRouter()
  const { cartItems, loading, updateCart, removeFromCart } = useCart()

  const [checkedProd, setCheckedProd] = useState<any[]>([])
  const isMobile = useMediaQuery('(max-width: 768px)')

  const allChecked = (item: any) =>
    !!item.products.every((i: any) => checkedProd.find(c => c.id === i.id))

  const finalPrice = (item: any) => {
    const classify = getClassifiesFromCartOrOrder(item)

    const { promotePrice } = getProductPriceWithDiscount(classify)
    return (
      item.count * promotePrice +
      (item?.detail?.accompanies?.reduce(
        (total: number, curr: any) => total + (curr?.price ?? 0),
        0
      ) ?? 0)
    )
  }

  const handleCheckAll = (checked: boolean, record: any) => {
    if (checked) {
      setCheckedProd([...checkedProd, ...record.products])
    } else {
      setCheckedProd(checkedProd.filter(i => i.garage_id !== record.garage.id))
    }
  }

  const handleCheckbox = (checked: boolean, record: any) => {
    if (checked) {
      setCheckedProd([...checkedProd, record])
    } else {
      setCheckedProd(checkedProd.filter(p => p.id !== record.id))
    }
  }

  const getCartIds = (garageId: string) => {
    const cartIds = checkedProd
      .filter(c => c.garage_id === garageId)
      .flatMap(i => i.id)
    // router.push(`/checkout?list=${arr}`);
    return cartIds
  }

  return (
    <Box className="h-[100vh]">
      <HeaderBar />

      <Box className=" bg-[#F8F8F8]">
        <div className="w-[100vw] bg-[#F8F8F8] gap-4 pt-[80px] pb-[20px] px-[10px] md:pt-[113px] md:pb-[23px] md:px-[140px]  mx-auto flex justify-between items-center  max-w-main ">
          <h1 className="text:xl md:text-2xl font-medium">
            Giỏ hàng&nbsp;
            <span className="text-sm">
              (
              {cartItems.reduce(
                (total: number, curr: any) => total + curr.products.length,
                0
              )}{' '}
              sản phẩm/dịch vụ)
            </span>
          </h1>
          {checkedProd[0] && (
            <Button
              leftSection={<Image src="/svg/trash.svg" width={16} h={16} />}
              variant="outline"
              color="#E52121"
              className="md:h-[48px] md:w-[121px] h-[35px] w-[100px] mr-2 md:mr-0 rounded-[10px] md:text-lg text-sm"
              onClick={() => removeFromCart(checkedProd.flatMap(i => i.id))}
            >
              Xóa
            </Button>
          )}
        </div>
      </Box>

      <div className="overflow-x-visible md:overflow-x-auto">
        <Box
          className="w-[100vw] bg-white gap-4 px-3 md:px-[60px] py-[20px] relative mx-auto"
          style={{
            ...(!isMobile && {
              width: '1200px'
            })
          }}
        >
          {cartItems[0] ? (
            <>
              {!isMobile && (
                <Grid columns={24} className="font-normal  pb-[15px]">
                  <Grid.Col span={8}>Sản phẩm/dịch vụ</Grid.Col>
                  <Grid.Col span={6}>Đơn giá</Grid.Col>
                  <Grid.Col className="flex-[0_0_160px] text-center">
                    Số lượng
                  </Grid.Col>
                  <Grid.Col span={4}>Số tiền</Grid.Col>
                  <Grid.Col span="auto" />
                </Grid>
              )}

              {cartItems.map((item, idx) => {
                return (
                  <div
                    className={classNames(
                      'border-[#E2E2E2] pb-[8px]',
                      !isMobile && 'border-t',
                      isMobile && idx !== 0 && 'border-t'
                    )}
                    key={item.garage.id}
                  >
                    <Grid columns={24} align="center" className="py-[15px]">
                      <Grid.Col span={17}>
                        <div className="flex gap-x-2 items-center">
                          <Checkbox
                            className="gradientCheckbox"
                            checked={allChecked(item)}
                            indeterminate={
                              !!item.products.some((i: any) =>
                                checkedProd.find(c => c.id === i.id)
                              ) && !allChecked(item)
                            }
                            onChange={e =>
                              handleCheckAll(e.target.checked, item)
                            }
                          />
                          <Image src="/svg/store.svg" w={24} />
                          <label className="text-base font-medium whitespace-nowrap">
                            {item.garage.name}
                          </label>
                          {item?.garage?.information?.tag && (
                            <div className="h-[29px] md:text-sm text-xs bg-[#F1B44C] justify-center items-center px-[12px] rounded-[7px] text-white whitespace-nowrap hidden md:flex">
                              {item?.garage?.information?.tag}
                            </div>
                          )}
                        </div>
                      </Grid.Col>

                      {!isMobile && (
                        <Grid.Col span={4} className="text-lg font-bold">
                          {formatNumber(
                            item.products.reduce(
                              (total: number, cur: any) =>
                                total + finalPrice(cur),
                              0
                            )
                          )}
                        </Grid.Col>
                      )}

                      <Grid.Col span="auto">
                        {!!checkedProd.find(
                          c => c.garage_id === item.garage.id
                        ) ? (
                          <Link
                            href={`/checkout?list=${getCartIds(item.garage.id)}`}
                            // onClick={() => handleCheckout(item.garage.id)}
                            className="md:h-[47px] md:w-[121px] md:mr-0 mr-2 h-[30px] w-[100px] text-sm float-right cursor-pointer border-2 border-[#55c1e4] text-[#55c1e4] flex items-center justify-center rounded-lg font-semibold"
                          >
                            Đặt lịch
                          </Link>
                        ) : (
                          <div style={{ height: 47 }} />
                        )}
                      </Grid.Col>
                    </Grid>

                    {item.products.map((i: any) => {
                      const findClassify = getClassifiesFromCartOrOrder(i)

                      const {
                        discount_type,
                        originPrice,
                        promotePrice,
                        discount_number
                      } = getProductPriceWithDiscount(findClassify)

                      return (
                        <div className="mb-[15px]">
                          <Grid columns={24} align="center" key={i.id}>
                            <Grid.Col span={isMobile ? 24 : 8}>
                              <div className="flex">
                                <div className="flex flex-1 gap-x-2 items-center">
                                  <Checkbox
                                    className="gradientCheckbox"
                                    checked={
                                      !!checkedProd.find(c => c.id === i.id)
                                    }
                                    onChange={e =>
                                      handleCheckbox(e.target.checked, i)
                                    }
                                  />
                                  <img
                                    src={getFileUrl(
                                      i.product.detail_info.images[0]
                                    )}
                                    className="w-[40px] h-[40px] md:w-[80px] md:h-[80px] aspect-square rounded-md object-cover"
                                  />
                                  <div className="flex flex-col  md:gap-y-2">
                                    <label className="text-sm md:text-base font-medium">
                                      {i.product.detail_info.name}
                                    </label>
                                    {i.detail.classifies?.manufacture && (
                                      <label className="text-xs md:text-sm font-normal">
                                        Năm sản xuất:{' '}
                                        {i.detail.classifies.manufacture}
                                      </label>
                                    )}
                                  </div>
                                </div>

                                {isMobile && (
                                  <QuantityInput
                                    record={i}
                                    handleUpdateCart={updateCart}
                                    handleDeleteCart={removeFromCart}
                                  />
                                )}
                              </div>
                            </Grid.Col>

                            <Grid.Col span={6}>
                              <div className="flex items-center gap-x-2 pl-[112px] md:pl-0 flex-col md:flex-row">
                                <span className="text-sm md:text-base font-semibold mt-[4px]">
                                  {formatNumber(promotePrice)}
                                </span>
                                <div>
                                  {(i.detail.classifies || i.product.sell_info)
                                    ?.discount_type && (
                                    <div className="flex items-center flex-col md:flex-row">
                                      <div className="text-xs md:text-sm font-medium line-through opacity-50 mt-[1px]">
                                        {formatNumber(originPrice)}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </Grid.Col>

                            {!isMobile && (
                              <Grid.Col className="flex-[0_0_160px]">
                                <QuantityInput
                                  record={i}
                                  handleUpdateCart={updateCart}
                                  handleDeleteCart={removeFromCart}
                                />
                              </Grid.Col>
                            )}

                            {!isMobile && (
                              <Fragment>
                                <Grid.Col
                                  span={4}
                                  className="text-base font-semibold -ml-3"
                                >
                                  {formatNumber(finalPrice(i))}
                                </Grid.Col>
                                <Grid.Col span="content">
                                  <ActionIcon
                                    variant="transparent"
                                    className="float-right"
                                    onClick={() => removeFromCart(i.id)}
                                  >
                                    <Image src="/svg/trash.svg" />
                                  </ActionIcon>
                                </Grid.Col>
                              </Fragment>
                            )}
                          </Grid>

                          {i.detail.accompanies?.[0] && (
                            <Accompanies
                              record={i}
                              handleUpdateCart={updateCart}
                            />
                          )}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </>
          ) : (
            <Flex
              gap="xs"
              direction="column"
              align="center"
              justify="center"
              style={{ height: 'calc(100vh - 556px)', minHeight: 157 }}
            >
              <Image src="/svg/empty_cart.svg" w={64} />
              <h3 className="font-medium">
                Không có sản phẩm/dịch vụ trong giỏ hàng của bạn
              </h3>
              <Link href={'/'}>
                <Button
                  style={{
                    background:
                      'linear-gradient(91.57deg, #258DBA 1.33%, #26D3E0 63.56%, #8BF7C8 120.36%)'
                  }}
                  className="h-[48px] min-w-[270px] rounded-[10px] text-sm border-0"
                  radius="md"
                >
                  Quay về trang chủ
                </Button>
              </Link>
            </Flex>
          )}
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ blur: 2 }}
          />
        </Box>
      </div>

      <FooterHome />
    </Box>
  )
}

export default Cart
