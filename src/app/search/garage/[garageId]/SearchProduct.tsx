'use client'

import { Box, Grid, Loader, Text } from '@mantine/core'
import { PRODUCT_CATEGORY, SERVICE_CATEGORY } from '@/constants/category'
import {
  createQueryStringDetail,
  getUniqueArray,
  removeEmptyProperties
} from '@/utils'
import { useEffect, useState } from 'react'

import CheckboxWithFilter from '../../search-result/components/checkbox-with-filter'
import CorePagination from '@/components/custom/pagination/CorePagination'
import FilterModalSearchProduct from '../component/modal-filter-search-product'
import FooterHome from '@/components/footer'
import { IconFilter } from '@tabler/icons-react'
import NotFound from '../../search-result/components/not-found'
import TagProduct from '@/components/custom/tag/tag-product'
import { filterPrice, getProductPriceWithDiscount } from '@/utils/formatPrice'
import { navigate } from '@/apis/auth'
import { searchProductInGarage } from '@/apis/client/garage'

interface Props {
  filters: any
  categoryAdmin: any
  dataCount: (e: any) => void
  handleChangeFilterAndUpdateToUrl: (data: any) => void
  query: any
  data: any
  garageId: any
  paramsObj: any
  dataBrand: any
  dataOrigin: any
}

const SearchProduct = ({
  filters,
  categoryAdmin,
  dataCount,
  query,
  handleChangeFilterAndUpdateToUrl,
  data,
  garageId,
  paramsObj,
  dataBrand,
  dataOrigin
}: Props) => {
  const [productData, setProductData] = useState<any>([])
  const [productCount, setProductCount] = useState<any>(0)
  const [loading, setLoading] = useState(false)
  const [reset, setReset] = useState(false)
  const [categoryField, setCategoryField] = useState<any>({})
  const [brand, setBrand] = useState<any>(null)
  const [origin, setOrigin] = useState<any>(null)
  const [openFilterPopup, setOpenFilterPopup] = useState(false)

  function filterItemsByKeys(items: any, keysToFilter: any) {
    return items?.filter((item: any) => keysToFilter?.includes(item.key))
  }

  useEffect(() => {
    getBrand()
    getOrigin()
    setCategoryField({
      ...categoryField,
      prodType: [...PRODUCT_CATEGORY, ...SERVICE_CATEGORY]
    })
  }, [query])

  const getBrand = () => {
    const filterBrand = getUniqueArray(dataBrand)
    const dataFromCategoryAdmin = filterItemsByKeys(categoryAdmin, filterBrand)
    setBrand(dataFromCategoryAdmin)
  }
  const getOrigin = () => {
    const filterOrigin = getUniqueArray(dataOrigin)
    const dataFromCategoryAdmin = filterItemsByKeys(categoryAdmin, filterOrigin)
    setOrigin(dataFromCategoryAdmin)
  }

  const handleSelectCheckboxItem = ({
    data: { item, isChecked },
    filterKey,
    itemKey,
    type = 'checkbox'
  }: {
    data: { item: any; isChecked: any }
    filterKey: 'category' | 'key_brand' | 'origin' | 'category_id'

    itemKey: 'key' | 'code' | 'value' | 'id'
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

    const { data: listProduct, count } = await searchProductInGarage({
      garage_id: garageId,
      category_id: params.category_id,
      query: params
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
    let timeoutId: NodeJS.Timeout
    ;(async () => {
      timeoutId = setTimeout(() => {
        handleGetProducts()
      }, 500)
    })()

    return () => {
      clearTimeout(timeoutId)
    }
  }, [filters])
  return (
    <div className="flex flex-col justify-between">
      <div className="flex pt-4 flex-col w-full max-w-main justify-center mx-auto">
        <div className="flex h-full">
          <div className="w-full pl-4">
            <div className="flex justify-between mb-4 mx-4 md:mx-0 items-center bg-[#F8F8F8] p-4 rounded-md">
              <Text className="font-semibold">
                Kết quả tìm kiếm{' '}
                {`${productCount ? '(' + productCount + ')' : ''}`}
              </Text>

              <Grid className="hidden md:flex justify-between w-full md:w-4/5 gap-1">
                <Grid.Col span={2.4}>
                  <CheckboxWithFilter
                    data={categoryField?.prodType ?? []}
                    title="Lĩnh vực"
                    onChange={(e: any, isChecked: boolean) => {
                      handleSelectCheckboxItem({
                        data: {
                          item: e,
                          isChecked
                        },
                        type: 'radio',
                        filterKey: 'category',
                        itemKey: 'key'
                      })
                    }}
                    checkedData={filters?.category ?? []}
                    type="radio"
                    hideSearch
                    bgColor={'white'}
                  />
                </Grid.Col>
                <Grid.Col span={2.4}>
                  <CheckboxWithFilter
                    data={[]}
                    title="Mức giá"
                    onChange={(e: any, isChecked: boolean) => {
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
                    checkedData={[filters.price_from, filters.price_to] ?? []}
                    typeChildren="range"
                    hideSearch
                    hideNumb
                    bgColor={'white'}
                  />
                </Grid.Col>
                <Grid.Col span={2.4}>
                  <CheckboxWithFilter
                    data={origin ? origin : []}
                    title="Xuất xứ"
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
                    checkedData={filters?.origin ?? []}
                    hideSearch
                    bgColor={'white'}
                  />
                </Grid.Col>
                <Grid.Col span={2.4}>
                  <CheckboxWithFilter
                    data={brand ?? []}
                    title="Thương hiệu"
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
                    checkedData={filters?.key_brand ?? []}
                    hideSearch
                    bgColor={'white'}
                  />
                </Grid.Col>
                <Grid.Col span={2.4}>
                  <CheckboxWithFilter
                    data={[
                      { name: 'Liên quan', value: 'relation', key: 'relation' },
                      { name: 'Bán chạy', value: 'topSales', key: 'topSales' },
                      {
                        name: 'Giá từ thấp đến cao',
                        value: 'true',
                        key: 'true'
                      },
                      {
                        name: 'Giá từ cao đến thấp',
                        value: 'false',
                        key: 'false'
                      }
                    ]}
                    hideSearch={true}
                    title="Sắp xếp theo"
                    onChange={(e: any, isChecked: boolean) => {
                      if (isChecked) {
                        handleChangeFilterAndUpdateToUrl({
                          ...filters,
                          order_price: e.key
                        })
                      } else {
                        handleChangeFilterAndUpdateToUrl({
                          ...filters,
                          order_price: null
                        })
                      }
                    }}
                    checkedData={
                      filters.order_price != undefined
                        ? [filters?.order_price?.toString()]
                        : []
                    }
                    type="radio"
                    hideNumb
                  />
                </Grid.Col>
              </Grid>
              <Box
                className="cursor-pointer md:hidden flex gap-4"
                onClick={() => {
                  setOpenFilterPopup(!openFilterPopup)
                }}
              >
                Bộ lọc tìm kiếm <IconFilter />
              </Box>
              <FilterModalSearchProduct
                handleCheckedData={(e: any) => {
                  handleChangeFilterAndUpdateToUrl({
                    ...e
                  })
                }}
                checkedData={[]}
                showDropdown={openFilterPopup}
                setShowDropdown={() => setOpenFilterPopup(false)}
                filters={filters}
                categoryField={categoryField}
                origin={origin}
                brand={brand}
              />
            </div>
            <Grid>
              {loading ? (
                <div className="flex w-full justify-center items-center h-96">
                  <Loader />
                </div>
              ) : productCount === 0 ? (
                <div className="flex w-full justify-center items-center">
                  <NotFound />
                </div>
              ) : (
                productData?.map((item: any, index: number) => (
                  <Grid.Col key={index} span={{ base: 6, md: 3 }}>
                    <TagProduct
                      url={item?.detail_info?.images[0]}
                      countRate={item?.countRate}
                      rate={item?.rate}
                      price={
                        item?.sell_info?.classifies?.[0]
                          ? getProductPriceWithDiscount(
                              item?.sell_info?.classifies[0]
                            ).promotePrice
                          : getProductPriceWithDiscount(item?.sell_info)
                              .promotePrice
                      }
                      sold={item?.sold}
                      title={item?.name}
                      type={item?.type}
                      onClick={() => {
                        navigate(
                          `/detail/${createQueryStringDetail({
                            id: item?.product_id,
                            searchParams: filters,
                            title: item?.name
                          })}`
                        )
                      }}
                    />
                  </Grid.Col>
                ))
              )}
            </Grid>
            <div className="flex justify-center items-center mt-10">
              {loading ? (
                <div className="flex w-full justify-center items-center ">
                  {/* <Loader /> */}
                </div>
              ) : productCount === 0 ? (
                <div className="flex w-full justify-center items-center">
                  {/* <NotFound /> */}
                </div>
              ) : (
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
                  total={productCount ? productCount : 0}
                  reset={reset}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <FooterHome />
    </div>
  )
}

export default SearchProduct
