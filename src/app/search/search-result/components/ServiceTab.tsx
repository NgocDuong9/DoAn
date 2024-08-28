'use client'

import { Box, Grid, Loader, Text } from '@mantine/core'
import { IconChevronRight, IconFilter } from '@tabler/icons-react'
import {
  createQueryStringDetail,
  mergeUniqueByCode,
  removeEmptyProperties
} from '@/utils'
import { useEffect, useState } from 'react'

import CorePagination from '@/components/custom/pagination/CorePagination'
import FilterModalService from './modal-filter-service'
import ModalZone from './modal-zone'
import { NestedCheckboxes } from './nested-checkbox'
import NotFound from './not-found'
import PriceRange from './price-range-slider'
import TagAds from './tag-ads'
import TagProduct from '@/components/custom/tag/tag-product'
import { filterPrice, getProductPriceWithDiscount } from '@/utils/formatPrice'
import { navigate } from '@/apis/auth'
import { searchProduct } from '@/apis/client/auth'
import SearchSkeleton from './SearchSkeleton'
import Link from 'next/link'
import { SERVICE_CATEGORY } from '@/constants/category'

interface Props {
  filters: any
  category: any
  dataCount: (e: any) => void
  handleChangeFilterAndUpdateToUrl: (data: any) => void
  paramsObj: any
}

const initZoneChecked = [
  {
    name: 'Hà Nội',
    slug: 'ha-noi',
    type: 'thanh-pho',
    name_with_type: 'Thành phố Hà Nội',
    code: '01'
  },
  {
    name: 'TP Hồ Chí Minh',
    slug: 'ho-chi-minh',
    type: 'thanh-pho',
    name_with_type: 'Thành phố Hồ Chí Minh',
    code: '79'
  },
  {
    name: 'Đà Nẵng',
    slug: 'da-nang',
    type: 'thanh-pho',
    name_with_type: 'Thành phố Đà Nẵng',
    code: '48'
  },
  {
    name: 'Hải Phòng',
    slug: 'hai-phong',
    type: 'thanh-pho',
    name_with_type: 'Thành phố Hải Phòng',
    code: '31'
  },
  {
    name: 'Cần Thơ',
    slug: 'can-tho',
    type: 'thanh-pho',
    name_with_type: 'Thành phố Cần Thơ',
    code: '92'
  }
]

const ServiceTab = ({
  filters,
  category,
  dataCount,
  handleChangeFilterAndUpdateToUrl,
  paramsObj
}: Props) => {
  const [servField, setServField] = useState<any>({})
  const [openModalZone, setOpenModalZone] = useState(false)
  const [productData, setProductData] = useState<any>([])
  const [productCount, setProductCount] = useState<any>(0)
  const [loading, setLoading] = useState(true)
  const [curPage, setCurPage] = useState<any>(1)
  const [perPage, setPerPage] = useState<any>(9)
  const [reset, setReset] = useState(false)
  const [openFilterPopup, setOpenFilterPopup] = useState(false)
  const [zoneChecked, setZoneCheck] = useState(initZoneChecked)

  useEffect(() => {
    setServField({
      ...servField,
      serviceType: SERVICE_CATEGORY
    })
  }, [category])

  const handleSelectCheckboxItem = ({
    data: { item, isChecked },
    filterKey,
    itemKey,
    type = 'checkbox'
  }: {
    data: { item: any; isChecked: any }
    filterKey: 'category' | 'province'
    itemKey: 'key' | 'code' | 'value'
    type?: 'checkbox' | 'radio'
  }) => {
    let updatedChecked

    if (type === 'checkbox') {
      if (isChecked) {
        updatedChecked = [...filters[filterKey], item[itemKey]]
      } else {
        updatedChecked = filters?.[filterKey]?.filter(
          (checkedItem: any) => checkedItem !== item[itemKey]
        )
      }
    } else {
      if (isChecked) {
        updatedChecked = [item[itemKey]]
      } else {
        updatedChecked = filters?.[filterKey]?.filter(
          (checkedItem: any) => checkedItem !== item[itemKey]
        )
      }
    }

    const newFilters = {
      ...filters,
      [filterKey]: updatedChecked
    }

    handleChangeFilterAndUpdateToUrl(newFilters)
  }

  const handleGetProducts = async () => {
    setLoading(true)
    const params = removeEmptyProperties(filters)
    const { data: listProduct, count } = await searchProduct({
      ...params
    } as any)

    //@ts-ignore
    if (listProduct?.error) {
    } else {
      setProductData(listProduct)
      setProductCount(count)
      dataCount(count)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (!filters.is_init) return
    handleGetProducts()
  }, [JSON.stringify(filters)])

  return (
    <div className="md:p-4 p-2 flex-col">
      <div className="flex flex-col md:flex-row h-full">
        <div className="hidden md:block md:w-1/4">
          <div className="p-2">
            {/* !todo */}
            <NestedCheckboxes
              title={'Lĩnh vực'}
              data={servField?.serviceType ?? []}
              checkedItems={filters?.category ?? []}
              onChange={(e: any, isChecked: boolean) => {
                handleSelectCheckboxItem({
                  data: {
                    item: e,
                    isChecked
                  },
                  filterKey: 'category',
                  itemKey: 'key',
                  type: 'radio'
                })
              }}
              filterKey="key"
              type="radio"
            />
          </div>

          <div className="p-2">
            <NestedCheckboxes
              title={'Khu vực'}
              data={zoneChecked}
              checkedItems={filters?.province ?? []}
              onChange={(e: any, isChecked: boolean) => {
                handleSelectCheckboxItem({
                  data: {
                    item: e,
                    isChecked
                  },
                  filterKey: 'province',
                  itemKey: 'code'
                })
              }}
              filterKey="code"
            />
            <Box
              onClick={() => {
                setOpenModalZone(true)
              }}
              className="flex items-center cursor-pointer "
            >
              <p className="text-[14px]">Khác</p> <IconChevronRight size={14} />
            </Box>

            <ModalZone
              handleCheckedData={(e: any) => {
                const merged = mergeUniqueByCode(zoneChecked, e)
                setZoneCheck(merged)
                const checkedZone = e.map((item: any) => item.code)
                handleChangeFilterAndUpdateToUrl({
                  ...filters,
                  province: checkedZone
                })
              }}
              checkedData={filters?.province}
              showDropdown={openModalZone}
              setShowDropdown={() => setOpenModalZone(false)}
            />
          </div>
          <div className="p-2">
            <PriceRange
              title="Giá"
              setData={(e: any) => {
                // setPrice(e);
                if (e[0] === 0 && e[1] === 100) {
                  const newFilters = {
                    ...filters
                  }
                  delete newFilters.price_from
                  delete newFilters.price_to

                  handleChangeFilterAndUpdateToUrl(newFilters)
                } else {
                  const newFilters = {
                    ...filters,
                    // price: e,
                    price_from: filterPrice(e, 'from'),
                    price_to: filterPrice(e, 'to')
                  }

                  handleChangeFilterAndUpdateToUrl(newFilters)
                }
              }}
              valuePick={[filters.price_from, filters.price_to]}
            />
          </div>

          <div className="p-2">
            <TagAds
              title="Depo White Headlight"
              url="https://images.unsplash.com/photo-1632260260864-caf7fde5ec36?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              content="Imported LED"
              price="$5000"
              btnAddToCart="Thêm vào giỏ hàng"
              btnDetail="Xem chi tiết"
            />
          </div>
        </div>
        <div className="flex justify-between md:pb-6 mt-3 md:mt-0">
          <Text className="md:hidden">
            Kết quả tìm kiếm{' '}
            {`${
              productCount && paramsObj.type !== 'GARAGE'
                ? '(' + productCount + ')'
                : ''
            }`}
          </Text>
          <Box
            className="cursor-pointer md:hidden"
            onClick={() => {
              setOpenFilterPopup(!openFilterPopup)
            }}
          >
            <IconFilter />
          </Box>
          <FilterModalService
            handleCheckedData={(e: any) => {
              handleChangeFilterAndUpdateToUrl({
                ...e
              })
            }}
            checkedData={[]}
            showDropdown={openFilterPopup}
            setShowDropdown={() => setOpenFilterPopup(false)}
            prodField={servField}
            filters={filters}
            zoneChecked={zoneChecked}
            setZoneCheck={setZoneCheck}
          />
        </div>
        <div className="w-full md:w-3/4 md:pl-4">
          <div className="flex justify-between mb-4"></div>
          <Grid>
            {loading ? (
              <div className="flex w-full justify-center items-center">
                {/* <Loader /> */}
                <SearchSkeleton />
              </div>
            ) : productCount === 0 ? (
              <div className="flex w-full justify-center items-center">
                <NotFound />
              </div>
            ) : (
              productData?.map((item: any, index: number) => (
                <Grid.Col key={index} span={{ base: 6, md: 4 }}>
                  <Link href={`/detail/${item?.slug?.toLocaleLowerCase()}`}>
                    <TagProduct
                      url={item?.detail_info?.images[0]}
                      countRate={item?.countRate}
                      price={
                        getProductPriceWithDiscount(item?.product[0]?.sell_info)
                          ?.promotePrice
                      }
                      rate={item?.productadmin_sold?.rating ?? 5}
                      sold={item?.productadmin_sold?.sold ?? 0}
                      title={item?.name}
                      type={item?.type}
                      // onClick={() => {
                      //   navigate(
                      //     `/detail/${createQueryStringDetail({
                      //       id: item?.product[0]?.product_id,
                      //       searchParams: filters,
                      //       title: item?.name,
                      //     })}`
                      //   );
                      // }}
                    />
                  </Link>
                </Grid.Col>
              ))
            )}
          </Grid>
          {loading ? (
            <div className="flex w-full justify-center items-center">
              {/* <Loader /> */}
            </div>
          ) : productCount === 0 ? (
            <div className="flex w-full justify-center items-center">
              {/* <NotFound /> */}
            </div>
          ) : (
            <div className="flex justify-center items-center mt-10">
              <CorePagination
                onChange={(page: number, size: number) => {
                  handleChangeFilterAndUpdateToUrl({
                    ...filters,
                    page: page
                  })
                  setReset(false)
                }}
                pageSize={paramsObj?.limit ? Number(paramsObj?.limit) : 9}
                activePage={paramsObj?.page ? Number(paramsObj?.page) : 1}
                total={productCount ?? 0}
                reset={reset}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ServiceTab
