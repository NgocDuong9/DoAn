'use client'

import {
  mergeUniqueByCode,
  removeDiacritics,
  removeEmptyProperties
} from '@/utils'
import { Box, Grid, Text } from '@mantine/core'
import { IconChevronRight, IconFilter } from '@tabler/icons-react'
import { Fragment, useEffect, useState } from 'react'

import { searchProduct } from '@/apis/client/auth'
import CorePagination from '@/components/custom/pagination/CorePagination'
import TagProduct from '@/components/custom/tag/tag-product'
import { PRODUCT_CATEGORY } from '@/constants/category'
import { filterPrice } from '@/utils/formatPrice'
import { useMediaQuery } from '@mantine/hooks'
import Link from 'next/link'
import CheckboxWithFilter from './checkbox-with-filter'
import FilterModalProduct from './modal-filter-product'
import ModalZone from './modal-zone'
import { NestedCheckboxes } from './nested-checkbox'
import NotFound from './not-found'
import PriceRange from './price-range-slider'
import SearchSkeleton from './SearchSkeleton'
import TagAds from './tag-ads'
import classNames from 'classnames'
import { useMetaDataContext } from '@/components/context/metadata.context'

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

const ProductTab = ({
  filters,
  category,
  dataCount,
  paramsObj,
  handleChangeFilterAndUpdateToUrl
}: Props) => {
  const [prodField, setProdField] = useState<any>({})
  const [openModalZone, setOpenModalZone] = useState(false)
  const [productData, setProductData] = useState<any>([])
  const [productCount, setProductCount] = useState<any>(0)
  const [loading, setLoading] = useState(true)
  const [reset, setReset] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [zoneChecked, setZoneCheck] = useState(initZoneChecked)
  const [openFilterPopup, setOpenFilterPopup] = useState(false)

  const { bateryTags, tireTags } = useMetaDataContext()

  useEffect(() => {
    const brandFilter = category?.data?.filter(
      (item: any) =>
        (item.type === 'BRAND' && item.category === 'BATTERY') ||
        (item.type === 'BRAND' && item.category === 'TIRE')
    )
    const rimFilter = category?.data?.filter(
      (item: any) => item.category === 'TIRE' && item.type === 'RIM'
    )
    const treadFilter = category?.data?.filter(
      (item: any) => item.category === 'TIRE' && item.type === 'TREAD'
    )
    const typeAQFilter = category?.data?.filter(
      (item: any) => item.category === 'BATTERY' && item.type === 'TYPE'
    )
    const voltageAQFilter = category?.data?.filter(
      (item: any) => item.category === 'BATTERY' && item.type === 'VOLTAGE'
    )
    const capacityAQFilter = category?.data?.filter(
      (item: any) => item.category === 'BATTERY' && item.type === 'CAPACITY'
    )
    const originFilter = category?.data?.filter(
      (item: any) => item.category === 'EXCEPTION' && item.type === 'COUNTRY'
    )

    setProdField({
      ...prodField,
      productType: PRODUCT_CATEGORY,
      productBrand: brandFilter,
      productRim: rimFilter,
      productTread: treadFilter,
      productAQ: typeAQFilter,
      productVoltage: voltageAQFilter,
      productCapacity: capacityAQFilter,
      originType: originFilter
    })
  }, [category])

  const handleSelectCheckboxItem = ({
    data: { item, isChecked },
    filterKey,
    itemKey,
    type = 'checkbox'
  }: {
    data: { item: any; isChecked: any }
    filterKey:
      | 'category'
      | 'province'
      | 'key_brand'
      | 'origin'
      | 'key_rim'
      | 'key_treadCode'
      | 'key_voltage'
      | 'key_type'
      | 'key_capacity'
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
      [filterKey]: updatedChecked,
      ...(updatedChecked.includes('LOP') && {
        key_type: [],
        key_voltage: [],
        key_capacity: []
      }),
      ...(updatedChecked.includes('AC_QUY') && {
        key_rim: [],
        key_treadCode: []
      })
    }

    handleChangeFilterAndUpdateToUrl(newFilters)
  }

  const handleGetProducts = async () => {
    setLoading(true)
    const params = removeEmptyProperties(filters)
    const tags = [...bateryTags, ...tireTags].filter(item => {
      console.log('xxxxxxxx', removeDiacritics(params.key), item.value)
      return removeDiacritics(params.key).includes(item.value)
    })
    console.log('tags', tags)

    const { data: listProduct, count } = await searchProduct({
      ...params,
      tags
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
            <NestedCheckboxes
              title={'Lĩnh vực'}
              data={prodField?.productType ?? []}
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
              className="flex items-center cursor-pointer"
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
            <NestedCheckboxes
              title="Thương hiệu phổ biến"
              data={prodField?.productBrand ?? []}
              checkedItems={filters?.key_brand ?? []}
              onChange={(e: any, isChecked: boolean) => {
                handleSelectCheckboxItem({
                  data: {
                    item: e,
                    isChecked
                  },
                  filterKey: 'key_brand',
                  itemKey: 'key'
                })
              }}
              filterKey="key"
            />
          </div>
          <div className="p-2">
            <NestedCheckboxes
              title="Xuất xứ"
              data={prodField?.originType}
              checkedItems={filters?.origin ?? []}
              onChange={(e: any, isChecked: boolean) => {
                handleSelectCheckboxItem({
                  data: {
                    item: e,
                    isChecked
                  },
                  filterKey: 'origin',
                  itemKey: 'key'
                })
              }}
              filterKey="key"
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
          <FilterModalProduct
            handleCheckedData={(e: any) => {
              handleChangeFilterAndUpdateToUrl({
                ...e
              })
            }}
            checkedData={[]}
            showDropdown={openFilterPopup}
            setShowDropdown={() => setOpenFilterPopup(false)}
            prodField={prodField}
            filters={filters}
            zoneChecked={zoneChecked}
            setZoneCheck={setZoneCheck}
          />
        </div>
        <div className="w-full md:w-3/4 md:pl-4">
          <div className="flex justify-between mb-4 ">
            <div
              className={classNames(
                'flex gap-2',
                isMobile ? 'flex-col' : 'flex-row'
              )}
            >
              {filters?.category?.includes('LOP') && (
                <Fragment>
                  <CheckboxWithFilter
                    data={prodField?.productRim ?? []}
                    title="La-zăng"
                    onChange={(e: any, isChecked: boolean) => {
                      // setFilterState({ ...filterState, key_rim: e });
                      handleSelectCheckboxItem({
                        data: {
                          item: e,
                          isChecked
                        },
                        filterKey: 'key_rim',
                        itemKey: 'key'
                      })
                    }}
                    checkedData={filters?.key_rim ?? []}
                  />
                  <CheckboxWithFilter
                    data={prodField?.productTread ?? []}
                    title="Mã gai"
                    onChange={(e: any, isChecked: boolean) => {
                      // setFilterState({ ...filterState, key_rim: e });
                      handleSelectCheckboxItem({
                        data: {
                          item: e,
                          isChecked
                        },
                        filterKey: 'key_treadCode',
                        itemKey: 'key'
                      })
                    }}
                    checkedData={filters?.key_treadCode ?? []}
                  />
                </Fragment>
              )}

              {filters?.category?.includes('AC_QUY') && (
                <Fragment>
                  <CheckboxWithFilter
                    data={prodField?.productAQ ?? []}
                    title="Loại ắc quy"
                    onChange={(e: any, isChecked: boolean) => {
                      // setFilterState({ ...filterState, key_rim: e });
                      handleSelectCheckboxItem({
                        data: {
                          item: e,
                          isChecked
                        },
                        filterKey: 'key_type',
                        itemKey: 'key'
                      })
                    }}
                    checkedData={filters?.key_type ?? []}
                  />
                  <CheckboxWithFilter
                    data={prodField?.productVoltage ?? []}
                    title="Điện áp ắc quy"
                    onChange={(e: any, isChecked: boolean) => {
                      // setFilterState({ ...filterState, key_rim: e });
                      handleSelectCheckboxItem({
                        data: {
                          item: e,
                          isChecked
                        },
                        filterKey: 'key_voltage',
                        itemKey: 'key'
                      })
                    }}
                    checkedData={filters?.key_voltage ?? []}
                  />
                  <CheckboxWithFilter
                    data={prodField?.productCapacity ?? []}
                    title="Dung lượng ắc quy"
                    onChange={(e: any, isChecked: boolean) => {
                      // setFilterState({ ...filterState, key_rim: e });
                      handleSelectCheckboxItem({
                        data: {
                          item: e,
                          isChecked
                        },
                        filterKey: 'key_capacity',
                        itemKey: 'key'
                      })
                    }}
                    checkedData={filters?.key_capacity ?? []}
                  />
                </Fragment>
              )}
            </div>
          </div>
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
                      rate={item?.productadmin_sold?.rating ?? 5}
                      price={
                        // getProductPriceWithDiscount(item?.sell_info)
                        //   .promotePrice
                        item.price
                      }
                      sold={item?.productadmin_sold?.sold ?? 0}
                      title={item?.name}
                      type={item?.type}
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
            <div className="flex justify-center items-center md:mt-10 mt-2">
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
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductTab
