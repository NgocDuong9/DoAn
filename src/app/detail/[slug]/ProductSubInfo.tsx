'use client'

import { QueryProductInterface, searchProductDetail } from '@/apis/detail'
import BreadCrumbs from '@/app/component/breadcrumbs'
import CorePagination from '@/components/custom/pagination/CorePagination'
import FooterHome from '@/components/footer'
import HeaderBar from '@/components/header/header'
import { usePagination } from '@/hooks/usePagination'
import { MapBreadcrumbsLink, MapProductType } from '@/types/product'
import {
  Box,
  Divider,
  Image,
  Rating,
  Select,
  Skeleton,
  Text
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import classNames from 'classnames'
import { useParams, useSearchParams } from 'next/navigation'
import {
  Fragment,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import CardGara from '../../component/card-gara'
import Care from '../Care'
import Description from '../Description'
import Evaluate from '../Evaluate'
import ImageView from '../ImageView'
import Parameters from '../Parameters'
import { getFileUrl } from '@/utils/images'

function ProductSubInfo({
  product,
  searchKey,
  relates
}: {
  product: any
  searchKey: any
  relates: any
}) {
  const isMobile = useMediaQuery('(max-width: 768px)')

  const [active, setActive] = useState(0)
  const tabs = [
    isMobile ? 'Thông số' : 'Thông số kỹ thuật',
    'Mô tả',
    'Đánh giá'
  ]

  const [stores, setStores] = useState<any>(null)
  const [count, setCount] = useState<number>(1)
  const [productId, setProductId] = useState<string | null>(null)

  const params = useParams()
  const [filters, setFilters] = useState<QueryProductInterface>({
    slug: params.slug as string
  })
  const [loadingStore, setLoadingStore] = useState(true)
  const searchParams = useSearchParams()

  const pagination = usePagination({
    defaultPageSize: 5
  })

  // useEffect(() => {
  //   const id = searchParams.get('product_id')
  //   setProductId(id)
  //   setFilters({
  //     product_id: id ?? '',
  //     slug: params.slug as string
  //   })
  // }, [])

  const fetchProduct = async () => {
    const id = searchParams.get('product_id')

    setLoadingStore(true)
    try {
      if (id) {
        setProductId(id)
        const res = await searchProductDetail({
          ...filters,
          product_id: id ?? '',
          pageSetting: pagination.pageSetting
        })

        console.log('res:::::', res)

        //@ts-ignore
        setStores(res?.data ?? null)
        setCount(res?.count ?? 1)

        return
      }
      const res = await searchProductDetail({
        ...filters,
        pageSetting: pagination.pageSetting
      })
      //@ts-ignore
      setStores(res?.data ?? null)
      setCount(res?.count ?? 1)
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingStore(false)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [filters, pagination.pageSetting])

  const breadcrumbs = useMemo(() => {
    return (
      product?.array_fields?.map((item: any, index: number) => ({
        label: MapProductType?.[item] ?? item,
        href: MapBreadcrumbsLink?.[item]
      })) ?? []
    )
  }, [product])

  return (
    <Fragment>
      <HeaderBar />

      {product && (
        <Box className="">
          <Box className="w-[100vw] max-w-main  bg-white gap-4 md:pt-[100px] pt-[80px] md:px-10 px-4 mx-auto">
            <div className="mb-5 md:mt-5 mt-2">
              <BreadCrumbs breadcrumbs={breadcrumbs} />
            </div>
            <Box className="flex justify-between items-center pb-4">
              <Text className="md:text-2xl text-base  text-[#333] font-medium  be-vietnam-pro-medium">
                {product.name}
              </Text>
              <div className="gap-2 items-center hidden md:flex">
                {/* <Image src="/svg/heart.svg" w={"28px"} /> */}
                <Rating
                  // fractions={4}
                  value={product?.productadmin_sold?.rating ?? 5}
                  readOnly
                />
                <Text className="">
                  {product?.productadmin_sold?.rating?.toFixed(1)}
                </Text>
                <Text className=" text-[#E2E2E2]">|</Text>
                <Text className="">
                  <span className="">
                    {product?.productadmin_sold?.count_rating}
                  </span>{' '}
                  đánh giá
                </Text>
                <Text className=" text-[#E2E2E2]">|</Text>
                <span className="">
                  <span className="">{product?.productadmin_sold?.sold}</span>{' '}
                  đã bán
                </span>
              </div>
            </Box>
            <div className="md:grid grid-cols-1 md:grid-cols-12 gap-2">
              <Box className="col-span-5">
                <ImageView
                  urlImage={
                    productId
                      ? stores?.[0]?.detail_info?.images
                      : product.detail_info.images
                  }
                  video={
                    productId
                      ? stores?.[0]?.detail_info?.videos?.[0]
                      : product.detail_info.videos?.[0]
                  }
                />
                <div className="gap-2 items-center flex md:hidden mt-4">
                  <Image src="/svg/heart.svg" w={'28px'} />
                  <Rating
                    fractions={4}
                    value={product?.productadmin_sold?.rating ?? 5}
                    readOnly
                  />
                  <Text className="text-xs">
                    {product?.productadmin_sold?.rating?.toFixed(1)}
                  </Text>
                  <Text className="text-xs">|</Text>
                  <Text className="text-xs">
                    <span className="text-xs">
                      {product?.productadmin_sold?.count_rating}
                    </span>{' '}
                    đánh giá
                  </Text>
                  <Text className="text-xs">|</Text>
                  <span className="text-xs">
                    <span className="text-xs">
                      {product?.productadmin_sold?.sold}
                    </span>{' '}
                    đã bán
                  </span>
                </div>
              </Box>
              <Box className="flex flex-col gap-2 md:pl-4 col-span-7">
                <Box className="flex flex-col md:px-4">
                  <Box className="flex justify-between md:gap-3 gap-1 mt-4 md:mt-0">
                    {tabs.map((tab, index) => {
                      return (
                        <Box
                          key={index}
                          className="w-full cursor-pointer flex flex-col justify-between "
                          onClick={() => setActive(index)}
                        >
                          <Text
                            className={classNames(
                              'flex justify-center items-center text-center md:text-xl text-base',
                              active === index
                                ? 'font-semibold text-[#3D3D3D]'
                                : 'text-[#A5A5A5]'
                            )}
                          >
                            {tab}
                          </Text>
                          <Box
                            className={`h-1 w-full rounded-[22px] mt-[10px]`}
                            style={{
                              background:
                                active === index
                                  ? 'var(--Gradient, linear-gradient(90deg, #52BAE6 0%, #67F2D1 99.99%, #51C2A7 100%))'
                                  : '#E9E9E9 '
                            }}
                          ></Box>
                        </Box>
                      )
                    })}
                  </Box>
                  <Box>
                    {active === 0 && (
                      <Parameters
                        parameters={product.detail_info}
                        sellInfo={product.sell_info}
                        carKey={searchKey}
                      />
                    )}
                    {active === 1 && (
                      <Description describe={product.detail_info.description} />
                    )}
                    {active === 2 && (
                      <Suspense fallback={<div>...loading</div>}>
                        <Evaluate type={product.type} id={product.id} />
                      </Suspense>
                    )}
                  </Box>
                </Box>
              </Box>
            </div>

            <div className="mb-2 md:pt-6 md:pb-0 pt-4 text-main text-lg md:text-xl font-semibold grid grid-cols-1 md:grid-cols-3">
              <div className="text-lg md:text-xl font-semibold order-2 md:order-1 mt-4 md:mt-0">
                Cửa hàng
              </div>
              <FilterItem filters={filters} handleFilters={setFilters} />
            </div>

            {loadingStore ? (
              <div className="block md:flex gap-x-5 mt-5 mb-12">
                <div className="flex gap-x-2 flex-1">
                  <Skeleton height={70} width={70} />
                  <Skeleton height={70} />
                </div>
                <div className="flex-1 mt-2 md:mt-0">
                  <div className="flex gap-x-2">
                    <Skeleton height={30} width={70} />
                    <Skeleton height={30} />
                  </div>
                  <div className="flex gap-x-2 mt-2">
                    <Skeleton height={30} width={70} />
                    <Skeleton height={30} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="">
                <div>
                  <div>
                    <div className="flex gap-8 flex-col mt-2">
                      {stores?.map((item: any, index: any) => {
                        return (
                          <Box key={index}>
                            <CardGara
                              //@ts-ignore
                              data={item}
                            />
                            {/* {isMobile && (
                                <Box className="h-0.5 bg-slate-200 mt-3"> </Box>
                              )} */}
                          </Box>
                        )
                      })}
                    </div>
                  </div>

                  <Box className="w-full justify-center flex pt-4 mb-4">
                    <CorePagination
                      onChange={(page: number, size: number) => {
                        // setPage(page)
                        pagination.handleChangePage(page)
                      }}
                      pageSize={pagination.pageSetting.pageSize}
                      activePage={pagination.pageSetting.page}
                      total={count}
                      // reset={reset}
                    />
                  </Box>
                </div>
                <Divider className="md:pb-12 pb-4" />
              </div>
            )}
            <Care relates={relates} />
          </Box>
          <FooterHome />
        </Box>
      )}

      {!product && <div>Không tìm thấy sản phẩm</div>}
    </Fragment>
  )
}

export default ProductSubInfo

interface Props {
  filters: any
  handleFilters: (data: any) => void
}

const FilterItem = ({ filters, handleFilters }: Props) => {
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <Fragment>
      <div className="hidden md:block order-2">
        <div>Sản phẩm/Dịch vụ đi kèm</div>
      </div>
      <div className="flex items-center font-semibold w-full order-1 md:order-3 md:justify-end ">
        <div className="flex flex-col ">
          <div className="text-sm text-main font-semibold mb-1 block md:hidden">
            Sắp xếp theo
          </div>
          <div className="flex gap-2 items-center justify-start md:justify-end flex-wrap md:flex-nowrap">
            <Select
              placeholder="Đánh giá"
              data={[
                { label: 'Thấp đến cao', value: 'asc' },
                { label: 'Cao đến thấp', value: 'desc' }
              ]}
              onChange={e => {
                if (e && filters) {
                  delete filters?.order_price
                  handleFilters({
                    ...filters,
                    orderRating: e
                  })
                  return
                }
                if (!e) {
                  delete filters?.orderRating
                  return
                }
              }}
              clearable
              w={isMobile ? '150px' : '150px'}
              radius={'80px'}
            />
            {/* <Select
              placeholder="Khoảng cách"
              data={['Từ gần đến xa', 'Từ xa đến gần']}
              clearable
              w={isMobile ? '150px' : '150px'}
              radius={'80px'}
            /> */}
            <Select
              placeholder="Giá"
              data={[
                { label: 'Thấp đến cao', value: 'asc' },
                { label: 'Cao đến thấp', value: 'desc' }
              ]}
              clearable
              w={isMobile ? '150px' : '150px'}
              radius={'80px'}
              onChange={e => {
                if (e && filters) {
                  delete filters?.orderRating
                  handleFilters({
                    ...filters,
                    order_price: e
                  })
                  return
                }
                if (!e) {
                  delete filters?.order_price
                  return
                }
              }}
            />
          </div>
        </div>
      </div>
    </Fragment>
  )
}
