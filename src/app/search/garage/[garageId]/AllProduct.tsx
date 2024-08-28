'use client'

import { Box, Grid, Loader } from '@mantine/core'
import { getUniqueArray, removeEmptyProperties } from '@/utils'
import { useEffect, useState } from 'react'

import CheckboxWithFilter from '../../search-result/components/checkbox-with-filter'
import CorePagination from '@/components/custom/pagination/CorePagination'
import FilterModalAllProduct from '../component/modal-filter-all-product'
import FooterHome from '@/components/footer'
import { IconFilter } from '@tabler/icons-react'
import Link from 'next/link'
import { NestedCheckboxes } from '../../search-result/components/nested-checkbox'
import NotFound from '../../search-result/components/not-found'
import TagProduct from '@/components/custom/tag/tag-product'
import { filterPrice, getProductPriceWithDiscount } from '@/utils/formatPrice'
import { searchProductInGarage } from '@/apis/client/garage'

interface Props {
  filters: any
  categoryAdmin: any
  dataCount: (e: any) => void
  handleChangeFilterAndUpdateToUrl: (data: any) => void
  query?: any
  data: any
  garageId: any
  paramsObj: any
  dataBrand: any
  dataOrigin: any
  dataCategory: any
}

const AllProduct = ({
  filters,
  categoryAdmin,
  dataCount,
  query,
  handleChangeFilterAndUpdateToUrl,
  data,
  garageId,
  paramsObj,
  dataBrand,
  dataOrigin,
  dataCategory
}: Props) => {
  const [productData, setProductData] = useState<any>([])
  const [productCount, setProductCount] = useState<any>(0)
  const [loading, setLoading] = useState(true)
  const [reset, setReset] = useState(false)
  const [category, setCategory] = useState<any>([])
  const [brand, setBrand] = useState<any>(null)
  const [origin, setOrigin] = useState<any>(null)
  const [openFilterPopup, setOpenFilterPopup] = useState(false)

  function filterItemsByKeys(items: any, keysToFilter: any) {
    return items?.filter((item: any) =>
      keysToFilter?.includes(item?.key ?? item?.id)
    )
  }

  const getBrand = async () => {
    const filterBrand = getUniqueArray(dataBrand)
    const dataFromCategoryAdmin = filterItemsByKeys(categoryAdmin, filterBrand)
    setBrand(dataFromCategoryAdmin)
  }
  const getOrigin = () => {
    const filterOrigin = getUniqueArray(dataOrigin)
    const dataFromCategoryAdmin = filterItemsByKeys(categoryAdmin, filterOrigin)
    setOrigin(dataFromCategoryAdmin)
  }
  useEffect(() => {
    getBrand()
    getOrigin()
  }, [categoryAdmin])

  useEffect(() => {
    const serviceRoot = dataCategory?.filter((item: any) => !item.parent_id)

    const serviceChild = dataCategory?.filter((item: any) => item.parent_id)
    serviceRoot?.forEach((service: any) => {
      // @ts-ignore
      service.children = serviceChild?.filter(
        (item: any) => item?.parent_id === service?.id
      )
    })

    setCategory(serviceRoot)
  }, [dataCategory])

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
    <div className="pt-4 flex-col w-full">
      <div className="flex pb-10 md:pt-6 w-full mx-auto max-w-main justify-center">
        <div className={`hidden md:block md:w-1/4`}>
          <div className="p-2 px-6">
            <NestedCheckboxes
              title={'Danh mục'}
              data={category ? category : []}
              checkedItems={filters?.category_id ?? []}
              onChange={(e: any, isChecked: boolean) => {
                handleSelectCheckboxItem({
                  data: {
                    item: e,
                    isChecked
                  },
                  filterKey: 'category_id',
                  itemKey: 'id',
                  type: 'radio'
                })
              }}
              filterKey="id"
              type="radio"
            />
          </div>
        </div>
        <div className="w-full md:px-10 px-5 md:w-3/4 md:pl-4">
          <div className="hidden md:flex justify-between mb-4">
            <Grid className="flex justify-between w-full gap-2">
              <Grid.Col span={3}>
                <CheckboxWithFilter
                  data={[]}
                  title="Mức giá"
                  onChange={(e: any) => {
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
                />
              </Grid.Col>
              <Grid.Col span={3}>
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
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <CheckboxWithFilter
                  data={brand ? brand : []}
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
                />
              </Grid.Col>
              <Grid.Col span={3}>
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
                    filters?.order_price != undefined
                      ? [filters?.order_price?.toString()]
                      : []
                  }
                  type="radio"
                  bgColor="transparent"
                  hideNumb
                />
              </Grid.Col>
            </Grid>
          </div>
          <div className="flex justify-between pb-6 px-5 md:px-10">
            <Box></Box>
            <Box
              className="cursor-pointer md:hidden flex gap-4"
              onClick={() => {
                setOpenFilterPopup(!openFilterPopup)
              }}
            >
              Bộ lọc tìm kiếm <IconFilter />
            </Box>
            <FilterModalAllProduct
              handleCheckedData={(e: any) => {
                handleChangeFilterAndUpdateToUrl({
                  ...e
                })
              }}
              checkedData={[]}
              showDropdown={openFilterPopup}
              setShowDropdown={() => setOpenFilterPopup(false)}
              filters={filters}
              category={category}
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
                <Grid.Col key={index} span={{ base: 6, md: 4 }}>
                  <Link
                    href={`/detail/${item?.slug?.toLocaleLowerCase()}?product_id=${item.id}`}
                  >
                    <TagProduct
                      url={item?.detail_info?.images[0]}
                      countRate={item?.countRate}
                      rate={item?.rate}
                      price={
                        item?.sell_info?.classifies
                          ? getProductPriceWithDiscount(
                              item?.sell_info?.classifies[0]
                            ).promotePrice
                          : getProductPriceWithDiscount(item?.sell_info)
                              .promotePrice
                      }
                      sold={item?.sold}
                      title={item?.name}
                      type={item?.type}
                    />
                  </Link>
                </Grid.Col>
              ))
            )}
          </Grid>
          <div className="flex justify-center items-center mt-10">
            {loading ? (
              <div className="flex w-full justify-center items-center">
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
      <FooterHome />
    </div>
  )
}

export default AllProduct
